
import { User } from '../models/user';
import { daoFindUsers, daoGetUserByUsernameAndPassword, daoGetUserById, daoUpdateUser } from '../repositories/find-users-dao';

export function getAllUsers(): Promise<User[]> {
    try {
        return daoFindUsers();
    } catch (e) {
        throw e;
    }
}

// gets the user name and password form the dao
export function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    try {
        return daoGetUserByUsernameAndPassword(username, password);
    } catch (e) {
        throw e;
    }
}

// gets the user be the Id
export function getUserById(id: number): Promise<User> {
    return daoGetUserById(id);
}

// Updates the user
export async function updateUser(user: User): Promise<User> {
    try {
        const dUser = await daoGetUserById(user.userId);
        for (const u in user) {
            if (user[u] !== dUser.hasOwnProperty(u)) {
                dUser[u] = user[u];
            }
        }
        return daoUpdateUser(dUser);
    } catch (e) {
        throw e;
    }
}
