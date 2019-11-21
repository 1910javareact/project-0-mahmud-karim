import { User } from "./models/user";
import { Role } from "./models/role";

export let users = [
    new User(0,"Josh","passw0rd","Josh","Roy","rosh69@rev.net",new Role(1,"finance-manager")),
    new User(1,"Jose","password","Jose","Ind","jind22@rev.net",new Role(2,"admin"))
]