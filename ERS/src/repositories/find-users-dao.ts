import { User } from "../models/user";
import { users } from "../database";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser } from "../util/userdto-to-user";

export function daoFindUsers():User[]{
    return users
}

//Checks the input username and password with the one on the database
export async function daoGetUserByUsernameAndPassword(username:string, password:string): Promise<User>{
    let client: PoolClient

    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.user natural join project0.user_roles natural join project0.roles WHERE username = $1 and password = $2',
        [username, password])
        if (result.rowCount === 0){
            throw 'Invalid Credentials';
        }else{
            return userDTOtoUser(result.rows)
        }
    } catch (e) {
        if (e === 'Invalid Credentials'){
            throw {
                status: 400,
                message: 'Invalid Credentials'
            }
        }else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }finally{
        client && client.release();
    }
}

//Gets the garden by id from database
export function daoGetUserById(id:number):User{
    for(let u of users){
        if(u.userId === id){
            return u
        }
    }
    throw {
        status:404,
        message:'This user does not exist'
    }
}

//saves the updated user to database
export function daoUpdateUser(user:User){
    for(let u of users){
        if(u.userId === user.userId){
            u = user
            return u
        }
    }
    throw {
        status:404,
        message:'This user does not exist'
    }
}