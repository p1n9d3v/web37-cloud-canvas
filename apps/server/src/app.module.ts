import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PublicArchitectureModule } from 'src/public-architecture/public-architecture.module';
import { PrivateArchitectureModule } from 'src/private-architecture/private-architecture.module';
import { StarModule } from 'src/star/star.module';
import { ImportModule } from 'src/import/import.module';
import { VersionModule } from 'src/version/version.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PublicArchitectureModule,
        PrivateArchitectureModule,
        StarModule,
        ImportModule,
        VersionModule,
        RouterModule.register([
            {
                path: 'architectures',
                children: [
                    {
                        path: 'public',
                        module: PublicArchitectureModule,
                    },
                    {
                        path: 'public/:architectureId/star',
                        module: StarModule,
                    },
                    {
                        path: 'public/:architectureId/import',
                        module: ImportModule,
                    },
                    {
                        path: 'private',
                        module: PrivateArchitectureModule,
                    },
                    {
                        path: 'private/:architectureId/version',
                        module: VersionModule,
                    },
                ],
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
