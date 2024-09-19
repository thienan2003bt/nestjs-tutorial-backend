import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}
    private readonly logger = new MyLoggerService(AdminsController.name);

    @Post()
    create(@Body() createAdminDto: Prisma.UserCreateInput) {
        return this.adminsService.create(createAdminDto);
    }

    @SkipThrottle({ default: false })
    @Get()
    findAll(@Ip() ip: string, @Query('status') status?: 'ACTIVE' | 'INACTIVE') {
        this.logger.log(`Request for all admins by: ${ip}`, AdminsController.name);
        return this.adminsService.findAll(status);
    }

    @Throttle({ short: { ttl: 1000, limit: 1 } })
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
