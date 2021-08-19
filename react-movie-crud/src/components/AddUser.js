import {useState} from 'react'
const AddUser = ({onAdd}) => {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    
    
    const onSubmit =(e)=>{
        e.preventDefault()
        if(!name){
            alert('Please add a email')
            return
        }
        if(!surname){
            alert('Please add a password')
            return
        }
        if(!email){
            alert('Please add a email')
            return
        }
        if(!password){
            alert('Please add a password')
            return
        }
        
        onAdd({name,surname,email,password})
        setName('')
        setSurname('')
        setEmail('')
        setPassword('')
        
    }
    
    return (
        <form className ='add-user-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Password</label>
                <input type='text' placeholder= 'John' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='text' placeholder= 'Doe' value={surname} onChange={(e)=>setSurname(e.target.value)}/>
            </div>
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

export default AddUser