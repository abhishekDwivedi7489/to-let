import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className='loading w-[100vw] h-[100vh]'>
       <div className='loader'>
       <div className="produ">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
   </div>
       </div>
    </div>
  )
}

export default Loader