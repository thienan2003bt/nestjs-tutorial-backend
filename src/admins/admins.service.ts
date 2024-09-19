import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createAdminDto: Prisma.UserCreateInput) {
        return this.databaseService.user.create({
            data: createAdminDto,
        });
    }

    findAll(status?: 'ACTIVE' | 'INACTIVE') {
        if (status) {
            return this.databaseService.user.findMany({
                where: {
                    status,
                },
            });
        }

        return this.databaseService.user.findMany();
    }

    findOne(id: number) {
        return this.databaseService.user.findUnique({
            where: {
                id,
            },
        });
    }

    update(id: number, updateAdminDto: Prisma.UserUpdateInput) {
        return this.databaseService.user.update({
            where: {
                id,
            },
            data: updateAdminDto,
        });
    }

    remove(id: number) {
        return this.databaseService.user.delete({
            where: {
                id,
            },
        });
    }
}
