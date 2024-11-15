import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { vi } from 'vitest';

describe('AuthController', () => {
    let controller: AuthController;

    const mockAuthService = {
        login: vi.fn().mockImplementation(() => {
            return { access_token: 'ACCESS_TOKEN' };
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'JWT_SECRET',
                    signOptions: { expiresIn: '1d' },
                }),
            ],
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('AuthController는 정상적으로 정의되어야 한다.', () => {
        expect(controller).toBeDefined();
    });

    describe('POST /auth/login', () => {
        beforeAll(async () => {
            await controller.login();
        });

        it('authService.login()을 호출해야 한다.', async () => {
            expect(mockAuthService.login).toHaveBeenCalled();
        });

        it('authService.login()는 1번 호출되어야 한다.', async () => {
            expect(mockAuthService.login).toHaveBeenCalledTimes(1);
        });

        it('authService.login()는 아무 인자 없이 호출되어야 한다.', async () => {
            expect(mockAuthService.login.mock.calls[0]).toEqual([]);
        });

        it('로그인에 성공하면 authService.login()의 반환값을 그대로 반환해야 한다.', async () => {
            expect(mockAuthService.login.mock.results[0].value).toEqual({
                access_token: 'ACCESS_TOKEN',
            });
        });

        it('authService.login이 다른 값을 반환해도 그대로 반환해야 한다.', async () => {
            mockAuthService.login.mockReturnValueOnce({
                access_token: 'DIFFERENT_TOKEN',
                refresh_token: 'REFRESH_TOKEN',
            });
            const result = await controller.login();
            expect(result).toEqual({
                access_token: 'DIFFERENT_TOKEN',
                refresh_token: 'REFRESH_TOKEN',
            });
        });
        it('로그인에 실패하면 에러가 발생해야 한다.', async () => {
            mockAuthService.login.mockRejectedValueOnce(new Error());
            await expect(controller.login()).rejects.toThrow();
        });
    });

    describe('GET /auth/check', () => {
        it('로그인 된 사용자일 경우 사용자 정보를 반환해야 한다. ', () => {
            const user = { id: 1, username: 'Test User' };
            const result = controller.check(user as any);
            expect(result).toEqual(user);
        });
    });
});
