
import React, {useEffect, useState} from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// TODO: Calcula la semana completa a partir del dia actual 
import getCurrentWeek from './utils/dates'

const TrackerTable = () => {
  
    const [date, setDate] = useState('')

  const getCurrentDate = () => { 
    return new Date()     
    
  }

  const getData = (date) => {



    const firtsDay = getCurrentWeek(date)

    console.log(firtsDay);
    

  
  }

  useEffect(() => {
    // Obtener la fecha actual, solo los primeros 10 caracteres
    const date = getCurrentDate()
    console.log('>> date : ', date);
    
    const stringDate = getCurrentDate().toISOString().slice(0, 10)
    setDate(stringDate)
    getData(date)
    
    
  

  }, [])

  const getPrevoiusWeek = () => {
  }

  const getNextWeek = () => {
  }

  
  

  
  
    return (
    
    
    <div className='container mx-auto p-4'>
        <div className='flex justify-between'>
            
            <div>
                <button
                    onChange={getPrevoiusWeek} 
                    className='bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded'>
                    <FaChevronLeft/>
                </button>
            </div>
            
            <div> Semana del {date} </div>
            
            <div>
             
                <button 
                  onChange={getNextWeek}
                  className='bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded'>
                    <FaChevronRight/>
                </button>
            </div>

        </div>
            

    </div>
  )
}

export default TrackerTable