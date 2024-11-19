import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { vi } from 'vitest';

describe('AuthService', () => {
    let service: AuthService;

    const mockUserService = {
        getTestUser: vi.fn().mockReturnValue({
            id: 1,
            name: 'Test User',
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
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return access token when login', async () => {
        const result = await service.login();
        expect(result.access_token).toBeDefined();
    });
});
