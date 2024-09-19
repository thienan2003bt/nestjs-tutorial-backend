import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Prisma } from '@prisma/client';

@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @Post()
    create(@Body() createAdminDto: Prisma.UserCreateInput) {
        return this.adminsService.create(createAdminDto);
    }

    @Get()
    findAll(@Query('status') status?: 'ACTIVE' | 'INACTIVE') {
        return this.adminsService.findAll(status);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.adminsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAdminDto: Prisma.UserUpdateInput) {
        return this.adminsService.update(+id, updateAdminDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adminsService.remove(+id);
    }
}
