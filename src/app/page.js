'use client'
import React, {useState, useEffect} from "react"
import Card from "./Card"


const gameCatalog = () => {
  const [list, setList] = useState([])
  const [genre, setGenre] = useState([])
  const [search, setSearch] = useState([])
  const [currentGenre, setCurrentGenre] = useState('')
  const [currentPage, setCurrentPage] = useState('https://api.rawg.io/api/games?page_size=40&key=5ea20edd3ffe46af97668ab0242fe5ce')
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()



useEffect(() => {
  fetch(currentPage)
  .then(response => response.json())
  .then(data => {
    setList(data.results)
    setNextPage(data.next, window.scrollTo(0,0))
    setPrevPage(data.previous, window.scrollTo(0,0))
    })
},[currentPage])


const topHundredClick = () => {
  fetch('https://api.rawg.io/api/games?page_size=40&key=5ea20edd3ffe46af97668ab0242fe5ce')
  .then(response => response.json())
  .then(data => {
    setList(data.results)
    setCurrentGenre(null)
    setSearch('')
    })
}

useEffect(() => {
  fetch('https://api.rawg.io/api/genres?key=5ea20edd3ffe46af97668ab0242fe5ce')
  .then(response => response.json())
  .then(data => {
    setGenre(data.results)
  })
},[])


const handleGenreClick = (genre) => {
  fetch(`https://api.rawg.io/api/games?page_size=40&genres=${genre.id}&key=5ea20edd3ffe46af97668ab0242fe5ce`)
  .then(response => response.json())
  .then(data => {
    setList(data.results)
  })
  setCurrentGenre(genre.name)
  setSearch('')
}



const handleSearchClick = () => {
  fetch(`https://api.rawg.io/api/games?search=${search}&key=5ea20edd3ffe46af97668ab0242fe5ce`)
  .then(response => response.json())
  .then(data => {
    setList(data.results)
   }, [search])
}

const goToNextPage = () => {
  setCurrentPage(nextPage)
}

const goToPrevPage = () => {
  setCurrentPage(prevPage)
}

  return (
    <>
<h1>{!currentGenre ? 'Top 100 Games' : `${currentGenre} Games`}</h1>


<div className="top100" onClick={topHundredClick}>Top 100</div>
     <div className="search-input">
     <input
     onChange={(e) => handleSearchClick(setSearch(e.target.value.toUpperCase()))}
     value={search}
     placeholder="Search Game... "/> 
    
</div>

<div className="game-body">
  
<div className="genre-list">

<h2>Genres</h2>
  {genre?.map((item, i) => {
    return <ul onClick={() => handleGenreClick(item)} className="genre-each" key={i}> 
    <img className="genre-image" src={item.image_background} />
    <div className="genre-name">{item.name}</div>
     </ul>
  } )}
</div>

 &nbsp;

  <div className="game-list">
{list?.map((game, i) => {

  return <Card key={i} game={game}  />
})}

</div>
</div>

<div className="footer"><button className="btn"  onClick={goToPrevPage}>Back</button><button className="btn" onClick={goToNextPage}>Next</button></div>

    </>
  )
}

export default gameCatalog;