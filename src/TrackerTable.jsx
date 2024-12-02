
import React, {useEffect, useState, useRef} from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import {calculateDuration, getCurrentWeek} from './utils/dates'

const TrackerTable = () => {
  
  const [date, setDate] = useState('')
  const [currentWeek, setCurrentWeek] = useState([])
  const [timeTable, setTimeTable] = useState([])

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

  const getCurrentDate = () => { 
    return new Date()     
    
  } 


  const setPickUpTime = (e, index) => {    
    
    const updatedTimeTable = [...timeTable]
    
    const currentEntry = updatedTimeTable.find((day) => day.day === currentWeek[index])
    currentEntry.pickUpTime = e.target.value
      
    if (currentEntry.pickUpTime > "00:00" && currentEntry.deliveryTime > "00:00") {       
        
        const totalhours = calculateDuration(currentEntry.pickUpTime, currentEntry.deliveryTime)        
        currentEntry.totalHours = totalhours        
        setTimeTable(updatedTimeTable)
      }


   

    
  
  }

  const setDeliveryTime = (e, index) => {    

    // Se crea una copia del array de timeTable
    const updatedTimeTable = [...timeTable]

    console.log('>> setDeliveryTime')
    console.log('>> updatedTimeTable', updatedTimeTable)
    console.log('>> currentWeek[index]', currentWeek[index])
    
    const exist = updatedTimeTable.find((day) => day.day === currentWeek[index])          
    
    
    console.log('>> exist :', exist )
    
    exist.deliveryTime = e.target.value      

    if (exist.pickUpTime > "00:00" && exist.deliveryTime > "00:00") {        
      const totalhours = calculateDuration(exist.pickUpTime, exist.deliveryTime)
      exist.totalHours = totalhours
      setTimeTable(updatedTimeTable)         
      console.log('timetable actualizado: ', timeTable);
      
    }
  }
  




  const getData = (date) => {
    
    const currentWeek = getCurrentWeek(date)

    console.log('>> currentWeek', currentWeek);
    
    
    // Cargo la tabla solo la primera vez
    if (timeTable.length == 0) {
      const newTimeTable = [...timeTable]
    
      for (let i = 0; i < currentWeek.length; i++) {
        newTimeTable.push({day: currentWeek[i], pickupTime: "00:00", deliveryTime: "00:00", totalHours: 0})
      }
      console.log('>> newTimeTable', newTimeTable);
      setTimeTable(newTimeTable)
      
      
    }

    
    
    

    
    
    
    return currentWeek
  }

  useEffect(() => {
    // Obtener la fecha actual, solo los primeros 10 caracteres
    const date = getCurrentDate()    
    
    // Estabñecer la fecha en el encabezado
    const stringDate = getCurrentDate().toISOString().slice(0, 10)
    setDate(stringDate)

    // Solo se carga una vez la tabla
    if (timeTable.length == 0) {
      const currentWeek = getData(date)  
      setCurrentWeek(currentWeek)
    }
    
    
  

  }, []) 




  const getPrevoiusWeek = () => {
    
    const prevWeekDate = new Date(date);
    const days = 7
    prevWeekDate.setDate(prevWeekDate.getDate() - days)
    console.log('>> prevWeekDate', prevWeekDate)

    const stringDate = prevWeekDate.toISOString().slice(0, 10)
    setDate(stringDate)

  }

  const getNextWeek = () => {
    
    const nextWeekDate = new Date(date);
    const days = 7
    nextWeekDate.setDate(nextWeekDate.getDate() + days)
    console.log('>> nextWeekDate', nextWeekDate)

    const stringDate = nextWeekDate.toISOString().slice(0, 10)
    setDate(stringDate)

  }

  
  
  
  
    return (
    
    
    <div className='container mx-auto p-4'>
        <div className='flex justify-between'>
            
            <div>
                <button
                    onClick={getPrevoiusWeek} 
                    className='bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded'>
                    <FaChevronLeft/>
                </button>
            </div>
            
            <div> Semana del {date} </div>
            
            <div>
             
                <button 
                  onClick={getNextWeek}
                  className='bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded'>
                    <FaChevronRight/>
                </button>
            </div>

        </div>
{/* Tabla de horarios */}

      <div>
        <table className='w-full mt-3 border-collapse border'> 
          <tr>
              <th>  Date </th>
              <th>  Pick-up Time	 </th>
              <th>  Delivery Time		 </th>
              <th>  Total Hours		 </th>              
          </tr>
            

            {
              timeTable.map((day, index) => {
                return (
                  <tr>
                    <td key={index}> {daysOfWeek[day.day.getDay()]} , {new Date(day.day).toLocaleDateString()} </td>
                    <td>
                      <input type='time' 
                        className='border w-full'
                        onChange={(e) => setPickUpTime(e, index)}/>
                    </td>
                    <td>
                      <input type='time' 
                        className='border w-full'
                        onChange={(e) => setDeliveryTime(e, index)}/>                        
                    </td>
                    <td>  {day.totalHours} </td>
                      
                  </tr>

                )
              })
            }
         
        </table>
      </div>


            

    </div>
  )
}

export default TrackerTable