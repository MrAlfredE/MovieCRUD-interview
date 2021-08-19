import {useState} from 'react'
const ForgotPassword = ({onRedeme}) => {
    const [email,setEmail] = useState('')
    
    
    
    const onSubmit =(e)=>{
        e.preventDefault()
        if(!email){
            alert('Please add a email')
            return
        }
        
        onRedeme({email})
        setEmail('')
        
    }
    
    return (
        <form className ='forget-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input type='text' placeholder= '' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <input type='submit' value = 'Redeem' className ='btn btn-block'/>
        </form>
        
        
    )
}

export default ForgotPassword