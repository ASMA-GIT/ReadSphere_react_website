import React from 'react';
import { HashLoader } from 'react-spinners';
import './css/Loader.css'

const Loader = () => {
  return (
    <div className='loadingPage'>
    <div className='loader'>
      <HashLoader color='#673ede'/>
    </div>
    </div>
  )
}

export default Loader