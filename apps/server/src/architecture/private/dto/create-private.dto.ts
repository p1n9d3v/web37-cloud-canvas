export class CreatePrivateDto {
    title: string;
    authorId: number;
    architecture: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
