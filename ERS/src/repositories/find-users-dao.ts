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