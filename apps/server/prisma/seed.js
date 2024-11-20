import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// interface UsercreateInput {
//     id?: number;
//     name: string;
// }

// interface PrivateArchitectureInput {
//     title: string;
//     authorId: number;
//     architecture: {}
//     createdAt?: Date | string
//     updatedAt?: Date | string | null
// }

// interface PrivateArchitectureVersionInput {
//     privateArchitectureId: number
//     title: string
//     createdAt?: Date | string
//     architecture: {}
// }

const prisma = new PrismaClient();

async function main() {
    await prisma.publicArchitectureStar.deleteMany({});
    await prisma.publicArchitectureImport.deleteMany({});
    await prisma.publicArchitecture.deleteMany({});
    await prisma.privateArchitectureVersion.deleteMany({});
    await prisma.privateArchitecture.deleteMany({});
    await prisma.user.deleteMany({});

    const userAmount = 10;
    const users = [];
    for (let i = 0; i < userAmount; i++) {
        const userName = faker.person.fullName();
        users.push({ name: userName });
    }
    const addUser = async () => await prisma.user.createMany({ data: users });
    await addUser();

    const userDatas = await prisma.user.findMany({});
    const privateArchitectureAmountPerUser = 5;
    const privateArchitectures = [];
    userDatas.forEach((userData) => {
        for (let j = 0; j < privateArchitectureAmountPerUser; j++) {
            const privateArchitecture = {
                title: faker.book.title(),
                authorId: userData.id,
                architecture: {},
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            privateArchitectures.push(privateArchitecture);
        }
    });
    const addPrivateArchitectures = async () =>
        await prisma.privateArchitecture.createMany({
            data: privateArchitectures,
        });
    await addPrivateArchitectures();

    const privateArchitectureDatas = await prisma.privateArchitecture.findMany(
        {},
    );
    const privateArchitectureVersionAmountPerPrivateArchitecture = 3;
    const privateArchitectureVersions = [];
    privateArchitectureDatas.forEach((privateArchitectureData) => {
        for (
            let j = 0;
            j < privateArchitectureVersionAmountPerPrivateArchitecture;
            j++
        ) {
            const privateArchitectureVersion = {
                privateArchitectureId: privateArchitectureData.id,
                title: faker.git.commitSha(),
                createdAt: new Date(),
                architecture: {},
            };
            privateArchitectureVersions.push(privateArchitectureVersion);
        }
    });
    const addPrivateArchitectureVersions = async () =>
        await prisma.privateArchitectureVersion.createMany({
            data: privateArchitectureVersions,
        });
    await addPrivateArchitectureVersions();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
