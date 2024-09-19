import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'Lee Chong Wei',
            email: 'lcw.badminton@malaysia.com',
            status: 'ACTIVE',
        },
        {
            id: 2,
            name: 'Lin Dan',
            email: 'ld.badminton@china.com',
            status: 'ACTIVE',
        },
        {
            id: 3,
            name: 'Chen Long',
            email: 'cl.badminton@china.com',
            status: 'INACTIVE',
        },
        {
            id: 4,
            name: 'Viktor Axelsen',
            email: 'va.badminton@denmark.com',
            status: 'INACTIVE',
        },
    ];

    // Methods
    findAll(status?: 'ACTIVE' | 'INACTIVE') {
        if (status) {
            const foundUsers = this.users.filter(user => user.status === status);
            if (!foundUsers || foundUsers.length === 0) {
                throw new NotFoundException('User status not found!');
            }
            return foundUsers;
        }

        return this.users;
    }

    findOne(id: number) {
        const foundUser = this.users.find(user => user.id === id);
        if (!foundUser) {
            throw new NotFoundException('User not found!');
        }
        return foundUser;
    }

    create(user: CreateUserDto) {
        const newUserByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: newUserByHighestId[0]?.id + 1,
            ...user,
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: UpdateUserDto) {
        let foundUser = false;
        this.users = this.users.map(user => {
            if (user.id === id) {
                foundUser = true;
                return {
                    ...user,
                    ...updatedUser, //override the value of found user
                };
            }

            return user;
        });

        if (foundUser === false) {
            throw new NotFoundException('User to update is not found!');
        }
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        if (!removedUser) {
            throw new NotFoundException('User to delete is not found!');
        }
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
