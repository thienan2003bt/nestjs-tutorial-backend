import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Query('status') status?: 'INACTIVE' | 'ACTIVE') {
        return this.usersService.findAll(status);
    }

    @Get('/inactive-users')
    findInactiveUsers() {
        return [];
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    // POST
    @Post()
    create(@Body() user: { name: string; email: string; status: 'ACTIVE' | 'INACTIVE' }) {
        return this.usersService.create(user);
    }

    // PATCH
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() userUpdated: { name?: string; email?: string; status?: 'ACTIVE' | 'INACTIVE' },
    ) {
        return this.usersService.update(+id, userUpdated);
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
