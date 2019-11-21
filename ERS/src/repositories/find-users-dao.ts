import { User } from "../models/user";
import { users } from "../database";

export function daoFindUsers():User[]{
    return users
}

//Checks the input username and password with the one on the database
export function daoGetUserByUsernameAndPassword(username:string, password:string){
    for(let u of users){
        if(u.username === username && u.password === password){
            return u
        }
    }
    throw{
        status: 400,
        message: 'Invalid Credentials'
    }
}