import React from 'react'
import flashsreen from '../../../assets/images/all-img/FlashScreen.jpeg'

import { useNavigate } from 'react-router-dom'
const FlashScreen = () => {
    const navigate = useNavigate();
  return (
    <div>
     <div className='flex w-full h-screen' onClick={()=>navigate('/login')}>
     <img src={flashsreen} className='h-full w-full'/>
     </div>
    </div>
  )
}

export default FlashScreen
