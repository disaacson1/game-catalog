import React from "react";
import Link from "next/link";


const Card = ({game}) => {
    return (
        <div className="game"> 
        <Link href={`/details?id=${game.id}`}><img className="game-image" src={game.background_image} />
           <div className="title">{game.name} </div></Link>
            
              
        </div>
        
    )
}

export default Card;