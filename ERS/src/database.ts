import { User } from "./models/user";
import { Role } from "./models/role";
import { Reimbursement } from "./models/reimbursement";

export let users = [
    new User(1,"Josh","passw0rd","Josh","Roy","rosh69@rev.net",new Role(1,"finance-manager")),
    new User(2,"Jose","password","Jose","Ind","jind22@rev.net",new Role(2,"admin"))
]

export let reimbursements = [
    new Reimbursement(1, 1, 100, 12, 13, "dinner", 3, 6, 7),
    new Reimbursement(2, 2, 50, 14, 15, "gas", 8, 9, 10)
]