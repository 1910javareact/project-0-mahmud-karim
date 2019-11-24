
import { User} from "../models/user";
import { daoFindUsers, daoGetUserByUsernameAndPassword, daoGetUserById, daoUpdateUser } from "../repositories/find-users-dao";

export function getAllUsers():User[]{
    return daoFindUsers()
}

//gets the user name and password form the dao
export function getUserByUsernameAndPassword(username:string, password:string): Promise<User>{
    return daoGetUserByUsernameAndPassword(username, password)
}

//gets the user be the Id
export function getUserById(id:number):User{
    return daoGetUserById(id)
}

//Updates the user 
export function updateUser(user:User){  
    let dUser = daoGetUserById(user.userId)
    
    for(let u in user){
        if(user[u] !== dUser.hasOwnProperty(u)){
            dUser[u] = user[u];
        }
    }
    return daoUpdateUser(dUser)
}
