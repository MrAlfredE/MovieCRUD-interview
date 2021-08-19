import Button from "./Button"


const MovieHeader = ({title,onAdd}) => {
    return (
        <header className = 'header'>
            <h1>{title}</h1>,
            <Button color= 'green' text = 'add' onClick ={onAdd}/> 
        </header>    
        
    )
}
MovieHeader.defultProps ={
    title:'Movie CRUD',
}
export default MovieHeader
