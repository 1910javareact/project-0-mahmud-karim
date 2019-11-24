import { User } from "../models/user";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser, multiUserDTOConverter } from "../util/userdto-to-user";

export async function daoFindUsers(): Promise<User[]> {
    let client: PoolClient

    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM project0.user natural join project0.user_roles natural join project0.roles')
        return multiUserDTOConverter(result.rows)
    } catch (e) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

//Checks the input username and password with the one on the database
export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient

    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.user natural join project0.user_roles natural join project0.roles WHERE username = $1 and password = $2',
            [username, password])
        if (result.rowCount === 0) {
            throw 'Invalid Credentials';
        } else {
            return userDTOtoUser(result.rows)
        }
    } catch (e) {
        if (e === 'Invalid Credentials') {
            throw {
                status: 400,
                message: 'Invalid Credentials'
            }
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    } finally {
        client && client.release();
    }
}

//Gets the garden by id from database
export async function daoGetUserById(id: number): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM project0.user natural join project0.user_roles natural join project0.roles where user_id = $1', [id])
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows)
        } else {
            throw 'No Such User'
        }
    } catch (e) {
        if (e === 'No Such User') {
            throw {
                status: 404,
                message: 'This user does not exist'
            }
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    } finally {
        client && client.release();
    }
}

//saves the updated user to database
export async function daoUpdateUser(user: User): Promise<User> {
    let client: PoolClient
    client = await connectionPool.connect()
    try {
        await client.query('BEGIN')
        console.log(user.username, user.password, user.firstName, user.lastName, user.email, user.userId);
        
        const result = await client.query('update project_0.user set username = $1, password = $2, first_name = $3, last_name = $4, email = $5 where user_id = $6',
        [user.username, user.password, user.firstName, user.lastName, user.email, user.userId])
        await client.query('COMMIT')
        return result.rows[0]
    } catch (e) {
        await client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}