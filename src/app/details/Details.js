'use client'
import React, {useEffect, useState} from "react";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";




const Details = () => {
    const [game, setGame] = useState(null)
    const [pic, setPic] =useState()
    const searchParams = useSearchParams()


    useEffect(() => {
      fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=5ea20edd3ffe46af97668ab0242fe5ce`)
      .then(response => response.json())
      .then(data => {
        setPic(data.results)
        console.log(data.results)
        })
    },[])
 
  const id = searchParams.get('id')
  useEffect(() => {
    const getData = async () => {
       await fetch(`https://api.rawg.io/api/games/${id}?key=5ea20edd3ffe46af97668ab0242fe5ce`)
        .then(response => response.json())
        .then(data => {
          setGame(data)
          
          })
    }
    getData()

  },[id])


const findDate = () => {
  let date = game.released
  date= date.split('-').map(e => e[0] == '0' ? e.slice(1) : e);
  date = date[1] + '/' + date[2] + '/' + date[0]
  return date
}


if (!game) return null
    return( 
        <div className="details-container">

<Link href='/'>Back</Link>

        <div className="game-title"><h1>{game.name}</h1>
        <div className="collumns">

          <div className="column1">

<div><img className="game-pic" src={game.background_image} /></div>

          
<div className="info">

  <div className="info-l">

  <div>
    <h3>Platforms:</h3> {game.platforms.map((item, i) => {
        return <li key={i}>{item.platform.name}</li>
       })}</div>

<div><h3>Genre:</h3> {game.genres.map((item, i) => {
        return <li key={i}>{item.name}</li> 
       })}</div>


</div>

<div className="info-r">


       <div><h3>Metacritic:</h3> {game.metacritic}</div>

       <div><h3>Release Date:</h3> {findDate()}</div>

</div>
<a  className="website"><h3>Official Site:</h3> <Link target="_blank" onClick={() => window.open(game.website, "_blank")} href={game.website}>{game.website}</Link></a>

       </div>
       

       </div>

       <div className="column2">

       <div>{game.description_raw}</div>

<div className="pics">{pic?.map((shot, i) => {
  return <img className="photo" key={i}  src={shot.image} />
})}</div>

</div>

</div>
</div>

        </div>
        
    )
}

export default Details;