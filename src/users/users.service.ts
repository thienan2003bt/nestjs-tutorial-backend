import { Injectable } from '@nestjs/common';

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
            return this.users.filter(user => user.status === status);
        }

        return this.users;
    }

    findOne(id: number) {
        const foundUser = this.users.find(user => user.id === id);
        return foundUser;
    }

    create(user: { name: string; email: string; status: 'ACTIVE' | 'INACTIVE' }) {
        const newUserByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: newUserByHighestId[0]?.id + 1,
            ...user,
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: { name?: string; email?: string; status?: 'ACTIVE' | 'INACTIVE' }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updatedUser, //override the value of found user
                };
            }

            return user;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
