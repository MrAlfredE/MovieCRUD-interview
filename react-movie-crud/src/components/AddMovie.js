import {useState} from 'react'


const AddMovie = ({mode,onAdd,movie}) => {
    const [name,setName] = useState(movie.name)
    const [year,setYear] = useState(movie.year)
    const [duration,setDuration] = useState(movie.duration)
    const [discript,setDiscription] = useState(movie.discript)

    var x
    
    if(mode === 1){
        x = ("Update Movie")
        
    }
    else{
        x= ("Create Movie")
        
    }
      
    const onSubmit =(e)=>{
        e.preventDefault()
        if(!name){
            alert('Please add a name')
            return
        }
        if(year<=0){
            alert('Please add a year')
            return
        }
        if(duration<=0){
            alert('Please add a run time')
            return
        }
        if(!discript){
            alert('Please add a plot')
            return
        }
        onAdd({name,discript,duration,year})
        setName('')
        setDuration(0)
        setYear(0)
        setDiscription  ('')
        



    }
    
    return (
        
        <form className ='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Movie</label>
                <input type='text' placeholder= 'Add Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Year</label>
                <input type='number' placeholder= 'Add Year' value={year} onChange={(e)=>setYear(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Duration</label>
                <input type='number' placeholder= 'Add Run Time' value={duration} onChange={(e)=>setDuration(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Discription</label>
                <input type='text' placeholder= 'Add Plot' value={discript} onChange={(e)=>setDiscription(e.target.value)}/>
            </div>
            <input type='submit' value = {x} className ='btn btn-block'/>
        </form>
    )
}
AddMovie.defultProps ={
    mode:2,
}
export default AddMovie