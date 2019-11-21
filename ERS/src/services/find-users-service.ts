
import { User} from "../models/user";
import { daoFindUsers, daoGetUserByUsernameAndPassword } from "../repositories/find-users-dao";

export function getAllUsers():User[]{
    return daoFindUsers()
}

//gets the user name and password form the dao
export function getUserByUsernameAndPassword(username:string, password:string){
    return daoGetUserByUsernameAndPassword(username, password)
}