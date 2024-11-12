#!/bin/bash

set -euo pipefail

# Constants
readonly PORT=4873
readonly MAX_ATTEMPTS=30
readonly TIMEOUT=1
readonly PACKAGE_NAME="cloud-canvas"
readonly CONFIG_DIR=".verdaccio"
readonly CONFIG_FILE="$CONFIG_DIR/config.yaml"
readonly REGISTRY_URL="http://localhost:$PORT"

# Colors
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[0;33m'
readonly NC='\033[0m'

# Process IDs
VERDACCIO_PID=""
PACKAGE_PID=""

# Verdaccio configuration
readonly CONFIG=$(
    cat <<EOL
storage: ./storage
packages:
    '**':
        access: \$all
        publish: \$all
        unpublish: \$all
server:
    keepAliveTimeout: 60
log: { type: stdout, format: pretty, level: info, colors: false }
EOL
)

function log() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ${GREEN}$*${NC}"
}

function error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $*${NC}" >&2
}

function check_dependencies() {
    local deps=("pnpm" "npm" "npx" "curl" "lsof")

    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &>/dev/null; then
            error "$dep is required but not installed."
            exit 1
        fi
    done
}

function clean_dist() {
    log "dist 폴더 삭제"
    if ! pnpm clean; then
        error "dist 폴더 삭제 실패"
        exit 1
    fi
}

function bundle() {
    log "번들링 시작"
    if ! pnpm bundle; then
        error "번들링 실패"
        exit 1
    fi
}

function clean_verdaccio() {
    if [ -d ".verdaccio" ]; then
        log "기존 Verdaccio 디렉토리 삭제"
        rm -rf "$CONFIG_DIR"
    fi
}

function kill_process() {
    local pid
    if pid=$(lsof -ti:"$PORT" 2>/dev/null); then
        log "$PORT 포트 사용 중인 프로세스 종료"
        kill -9 "$pid" 2>/dev/null || true
    fi
}

function setup_verdaccio() {
    log "Verdaccio 디렉토리 생성: $CONFIG_DIR"
    mkdir -p "$CONFIG_DIR"

    log "Verdaccio 설정 파일 생성: $CONFIG_FILE"
    echo "$CONFIG" >"$CONFIG_FILE"

    if [ ! -f "$CONFIG_FILE" ]; then
        error "Verdaccio 설정 파일 생성 실패"
        exit 1
    fi
}

function wait_for_verdaccio() {
    local attempt=0
    log "Verdaccio 서버 준비 대기 중..."

    while [ $attempt -lt "$MAX_ATTEMPTS" ]; do
        if curl -s "$REGISTRY_URL/-/ping" >/dev/null; then
            log "Verdaccio 서버 시작 완료"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep "$TIMEOUT"
    done

    error "Verdaccio 서버 시작 실패"
    return 1
}

function start_verdaccio() {
    log "Verdaccio 서버 시작"
    npx verdaccio --config "$CONFIG_FILE" &
    VERDACCIO_PID=$!

    if ! wait_for_verdaccio; then
        error "Verdaccio 서버 시작 시간 초과"
        cleanup
        exit 1
    fi
}

function publish_package() {
    log "$PACKAGE_NAME 패키지 배포 시작"
    if [ ! -d "packages/cli" ]; then
        error "packages/cli 디렉토리를 찾을 수 없습니다"
        exit 1
    fi

    cd packages/cli || exit 1

    echo "//localhost:4873/:_authToken=fake-token-123456789" >.npmrc

    if ! npm publish --registry "$REGISTRY_URL"; then
        error "패키지 배포 실패"
        cleanup
        exit 1
    fi

    if ! wait_for_package; then
        error "패키지 배포 시간 초과"
        cleanup
        exit 1
    fi
}

function wait_for_package() {
    local attempt=0
    log "패키지 배포 대기 중..."

    while [ $attempt -lt "$MAX_ATTEMPTS" ]; do
        if version=$(npm view "$PACKAGE_NAME" --registry "$REGISTRY_URL" version 2>/dev/null); then
            log "패키지 배포 완료: $version"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep "$TIMEOUT"
    done

    error "패키지 배포 실패"
    return 1
}

function run_package() {
    log "cloud-canvas 실행 중..."
    npx cloud-canvas --registry http://localhost:4873 &
    PACKAGE_PID=$!
}

function cleanup() {
    log "정리 작업 시작"

    rm .npmrc

    if [[ "$PWD" == *"/packages/cli" ]]; then
        cd ../.. || exit 1
    fi

    if [ -d "$CONFIG_DIR" ]; then
        log "Verdaccio 디렉토리 삭제: $CONFIG_DIR"
        rm -rf "$CONFIG_DIR"
    fi

    if [ -n "$VERDACCIO_PID" ]; then
        log "Verdaccio 프로세스 종료"
        kill $VERDACCIO_PID 2>/dev/null || true
    fi
    if [ -n "$PACKAGE_PID" ]; then
        log "$PACKAGE_NAME 프로세스 종료"
        kill $PACKAGE_PID 2>/dev/null || true
    fi

    log "정리 작업 완료"
    exit 0
}

function main() {
    trap cleanup SIGINT SIGTERM SIGHUP

    check_dependencies
    clean_dist
    bundle
    clean_verdaccio
    kill_process
    setup_verdaccio
    start_verdaccio
    publish_package
    run_package

    while true; do sleep 1; done
}

main
