//Does the check authorization checks
export function authorization(authRoles:string[]){
    return (req,res,next)=>{
        let isAuth = false
        //checks to see if the person is logged in
        if(!req.session.user){
            res.status(401).send('Please Login')
            return
        }
        //checks the authorization level
        if(req.session.user.role.role === 'finance-manager'){
            isAuth = true
        }

        //if they are authorized they go to the next step other wise they get an error message
        if(isAuth){
            next()
        }else{
            res.status(401).send('The incoming token has expired')
        }
    }
}