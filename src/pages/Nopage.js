import React from 'react';
import desconexion from '../images/desconexion.png';

function Nopage() {
  return (
    <div>
      <h1>¡¡Error 404!!</h1>
      <p>It seems this page could not be found </p>
     <img className='desconx' src={desconexion}/>
    </div>
  );
}

export default Nopage;