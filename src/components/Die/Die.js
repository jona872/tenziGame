import React from 'react';
import './Die.css';


function Die(props) {
   const styles = {
      backgroundColor: props.holded ? "#59E391" : "white"
   }

   return (
      <button className="die"
         holded={props.holded.toString()}
         onClick={props.handleClick}
         style={styles}>
         {props.value}
      </button>
   );
}

export default Die;