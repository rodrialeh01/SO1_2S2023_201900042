import React, { useEffect, useState } from 'react'
import './App.css'
import Service from './Services/Service'
import Tabla from './Tabla'

const App = () => {
  const[ cols, setCols ] = useState(["Title", "Artist", "Year", "Genre"])
  const[ tuplas, setTuplas ] = useState([])
  const[ musica, setMusica ] = useState({
    artist: "",
    genre: "",
    title: "",
    year: ""
  })

  const handleSubmit = (e) => {
      e.preventDefault();
  }

  const handleChange = e => {
    setMusica({
      ...musica,
      [e.target.name]: e.target.value
    })
  }

  const handleForm = () => {
    Service.nuevaMusica(musica.artist, musica.genre, musica.title, musica.year)
    .then(response => {
      console.log(response)
      handleTable()
    })
  }

  const handleTable=()=>{
    Service.getMusica()
    .then((data) =>{
      let matriz = []
      console.log("data")
      console.log(data)
      for(let i of data){
        console.log("i")
        console.log(i.title)
        let fila = []
        fila.push(i.title)
        fila.push(i.artist)
        fila.push(i.year)
        fila.push(i.genre)
        matriz.push(fila)
      }
      setTuplas(matriz)

      console.log("matriz")
      console.log(matriz)
    })
  }
  useEffect(() => {
    handleTable();
  }, []);

  return (
    <>
      <h1>Biblioteca de musica</h1>
      <div className="card">
        <form action="" autoComplete="off" onSubmit={handleSubmit}> 
          <p>Ingresa una nueva musica:</p>
        
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">Título</span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Título" 
              aria-label="Título" 
              autoComplete="off" 
              aria-describedby="addon-wrapping" 
              id="title_music" 
              value={musica.title} 
              name="title"
              onChange={handleChange} />
          </div>
          <br />
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping1">Artista</span>
            <input type="text" className="form-control" placeholder="Artista" aria-label="Artista" autoComplete="off" aria-describedby="addon-wrapping1" id="artist_music" name="artist"value={musica.artist} onChange={handleChange} />
          </div>
          <br />
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping2">Año</span>
            <input type="text" className="form-control" placeholder="Año" aria-label="Año" autoComplete="off" aria-describedby="addon-wrapping2" id="year_music" name="year"value={musica.year} onChange={handleChange}/>
          </div>
          <br />
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping3">Género</span>
            <input type="text" className="form-control" placeholder="Género" aria-label="Género" autoComplete="off" aria-describedby="addon-wrapping3" id="genre_music"name="genre"value={musica.genre} onChange={handleChange}/>
          </div>
          <br />
          <button type="button" className="btn btn-primary" role="button" onClick={handleForm}>Agregar</button>
        </form>
      </div>
      <br />
      <div className="card">
        <p>Lista de musica</p>
        <Tabla columnas={cols} tuplas={tuplas}></Tabla>
      </div>
      
    </>
  )
}

export default App
