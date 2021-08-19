import Button from "./Button"

const UserHeader = ({title,onNew,onForgot,onLogin,B0,B1}) => {
    return (
        <header className = 'header'>
            <h1>{title}</h1>, 
            {(B0||!B1)&&<Button color= 'green' text = 'Forgot Password' onClick ={onForgot}/>}
            {(B0||B1)&&<Button color= 'green' text = 'Login' onClick ={onLogin}/>}
            {(!B0||B1)&&<Button color= 'green' text = 'New' onClick ={onNew}/>}
        </header>    
        
    )
}
UserHeader.defultProps ={
    title:'Login',
}
export default UserHeader