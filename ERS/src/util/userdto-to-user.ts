import { UserDTO } from "../dtos/user-dto";
import { User } from "../models/user";
import { Role } from "../models/role";

//Takes array of userDTOs and loops through it and grabs all role names
//them buids a new user object and passes in all the values
export function userDTOtoUser(uD: UserDTO[]): User {
    let role = new Role(uD[0].role_id, uD[0].role_name)
    return new User(
        uD[0].user_id,
        uD[0].username,
        uD[0].password,
        uD[0].first_name,
        uD[0].last_name,
        uD[0].email,
        role
    )
}

//Turns any set of user DTOs to Users
export function multiUserDTOConverter(uD: UserDTO[]): User[] {
    let currentUser: UserDTO[] = []
    const result: User[] = []
    for (const u of uD){
        if (currentUser.length === 0) {
            currentUser.push(u)
        }else if (currentUser[0].user_id === u.user_id){
            currentUser.push(u)
        }else{
            result.push(userDTOtoUser(currentUser))
            currentUser = []
            currentUser.push(u)
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}