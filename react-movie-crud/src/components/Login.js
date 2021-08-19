import {useState} from 'react'
const Login = ({onLog}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    
    
    const onSubmit =(e)=>{
        e.preventDefault()
        if(!email){
            alert('Please add a email')
            return
        }
        if(!password){
            alert('Please add a password')
            return
        }
        
        onLog({email,password})
        console.log(email)
        setEmail('')
        setPassword('')
        
    }
    
    return (
        <form className ='Log-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input type='text' placeholder= 'JohnDoe@anymous.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder= '********' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <input type='submit' value = 'Login' className ='btn btn-block'/>
        </form>
        
        
    )
}

export default Login