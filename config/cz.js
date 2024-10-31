module.exports = {
    types: [
        { value: '✨ Feat', name: '✨ Feat:\t새로운 기능 추가' },
        { value: '🐞 Fix', name: '🐞 Fix:\t버그 수정' },
        {
            value: '🐛 Design',
            name: '🐛 Design:\tCSS 등 사용자 UI 디자인 변경',
        },
        { value: '📝 Docs', name: '📝 Docs:\t문서 수정' },
        {
            value: '💄 Style',
            name: '💄 Style:\t코드 포맷 변경(세미콜론, 들여쓰기 등)만 수정',
        },
        {
            value: '🤖 Refactor',
            name: '🤖 Refactor:\t리팩토링, 파일 삭제, 수정, 이동 등',
        },
        {
            value: '✅ Test',
            name: '✅ Test:\t테스트 코드 관련작업',
        },
        {
            value: '🚚 Setting',
            name: '🚚 Setting:\t기타 작업(빌드 스크립트, 패키지 매니저 등등)',
        },
    ],
    allowCustomScopes: false,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['body'],
    subjectLimit: 200,
};
