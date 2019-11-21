
import { User} from "../models/user";
import { daoFindUsers, daoGetUserByUsernameAndPassword, daoGetUserById } from "../repositories/find-users-dao";

export function getAllUsers():User[]{
    return daoFindUsers()
}

//gets the user name and password form the dao
export function getUserByUsernameAndPassword(username:string, password:string){
    return daoGetUserByUsernameAndPassword(username, password)
}

//gets the user be the Id
export function getUserById(id:number):User{
    console.log("Service: I am looking for user " + id);

    return daoGetUserById(id)
}