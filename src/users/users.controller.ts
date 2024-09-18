import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    findAll(@Query('status') status?: 'INACTIVE' | 'ACTIVE') {
        return { status: status, data: [] };
    }

    @Get('/inactive-users')
    findInactiveUsers() {
        return [];
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return { id };
    }

    // POST
    @Post()
    create(@Body() user: object) {
        return { user };
    }

    // PATCH
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdated: object) {
        return { id, ...userUpdated };
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id') id: string) {
        return { id };
    }
}
