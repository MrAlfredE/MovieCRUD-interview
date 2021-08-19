
import './App.css';
import {useState} from 'react'
import Movies from './components/Movies'
import MovieHeader from './components/MovieHeader'
import UserHeader from './components/UserHeader'
import AddMovie from './components/AddMovie'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import AddUser from './components/AddUser'


function App() { 
  const[showAddMovie,setShowAddMovie] = useState(false)
  const[B0,setB0] = useState(false)
  const[B1,setB1] = useState(false)
  const[selectMovie,setSelectMovie] = useState(['','',0,0])
  const [cumode, setcumode] = useState(0)
  const [movies, setMovies] = useState([
    {
        movieId: 1,
        name: 'a',
        discript: 'baaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaa',
        duration: 90,
        year: 1992,
        userId: 1,
        image:"yes",
    },
    {
        movieId: 2,
        name: 'ab',
        discript: 'b',
        duration: 90,
        year: 1992,
        userId: 1,
        image:"yes",
    },
    {
        movieId: 3,
        name: 'ba',
        discript: 'b',
        duration: 90,
        year: 1992,
        userId: 1,
        image:"yes",
    }
])
/*useEffect(()=>{
  const fetchMovie = async() =>{
    const res = await fetch('http://localhost:8081')
  }

})*/
//Delete movie
const getIndex = (movieId)=>{
  var index;
  for(var i =0 ; i<movies.length;i++){
    if(movies[i].movieId === movieId){
      index = i
    }
  }  
  return index
}
const deleteMovie = (movieId)=>{
  console.log('delete',movieId)// send delete
}


const addMovie = (movie)=>{
  var movieId =21
  const newMovie = {movieId,...movie}
  setMovies([...movies, newMovie])
}

const updateMovieDisplay = (movieId)=>{
  var index = getIndex(movieId)
  setShowAddMovie(!showAddMovie)
  setcumode(1)
  setSelectMovie(movies[index])
  console.log('update',cumode,movies[index].name)//send data
}
const forgot =(User)=>{
  setB1(!B1)
}

const addU =(User)=>{
  setB0(!B0)
  //send user to server

}
const Log =(User)=>{
  /*fetch("localhost:8081/login",{
    method: "get",
    data: JSON.stringify({email: User.email, password: User.password})
  })*/


  setB1(!B1)
  setB0(!B0)
  //send user to server

}

  return (
    <div className="container">


      {(B1&&B0)&&<MovieHeader onAdd={()=> {setShowAddMovie(!showAddMovie); setcumode(0); setSelectMovie(['','',0,0])}} title = {"Movie List"}/>}
      {(B1&&B0)&&showAddMovie && <AddMovie mode = {cumode} onAdd={addMovie} movie ={selectMovie}/>}
      {(B1&&B0)&&<Movies movies= {movies} onDelete={deleteMovie} onUpdate = {updateMovieDisplay}/>}

      {(!B1&&B0) && <UserHeader title = {"Add User"} B1 ={B1} B0 = {B0} onForgot={()=> {setB1(!B1); setB0(!B0)}} onLogin={()=> {setB0(!B0)}}/>}
      {(!B1&&B0)&& <AddUser onAdd ={addU}/>}

      {(B1&&!B0)&&<UserHeader title = {"Forgot Password"} B1 ={B1} B0 = {B0} onNew={()=> {setB1(!B1); setB0(!B0)}} onLogin={()=> {setB1(!B1)}}/>}
      {(B1&&!B0)&&<ForgotPassword onRedeme={forgot}/>}

      {(!B1&&!B0)&&<UserHeader title = {"Login"} B1 ={B1} B0 = {B0} onNew={()=> {setB0(!B0)}} onForgot={()=> {setB1(!B1)}}/>}
      {(!B1&&!B0)&&<Login onLog ={Log}/>}
    
    </div>
  );
}

export default App;
