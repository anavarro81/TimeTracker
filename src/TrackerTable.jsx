
import React, {useEffect, useState, useRef} from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import {calculateDuration, getCurrentWeek, convertTimetoMinutes, convertMinutestoTime} from './utils/dates'



const TrackerTable = () => {
  
  const [date, setDate] = useState('')
  const [currentWeek, setCurrentWeek] = useState([])
  const [timeTable, setTimeTable] = useState([])
  const [hoursPerWeek, setHoursPerWeek] = useState(0)

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const getCurrentDate = () => { 
    return new Date()     
    
  } 

  //
  const totalHours = timeTable.map((day) => convertTimetoMinutes(day.totalHours))
  
  
  const setPickUpTime = (e, index) => {    

    
    
    
    
    const updatedTimeTable = [...timeTable]
    
    const currentEntry = updatedTimeTable.find((day) => day.day === currentWeek[index])
    currentEntry.pickUpTime = e.target.value


      
    if (currentEntry.pickUpTime > "00:00" && currentEntry.deliveryTime > "00:00") {    
      
      console.log('currentEntry.pickUpTime ', currentEntry.pickUpTime);
      console.log('currentEntry.deliveryTime ', currentEntry.deliveryTime);
      
        
        const totalhours = calculateDuration(currentEntry.pickUpTime, currentEntry.deliveryTime) 

        
        
        
        if (totalhours > "00:00") {
          currentEntry.totalHours = totalhours          
        }
        setTimeTable(updatedTimeTable)
        console.log('updatedTimeTable > ', updatedTimeTable);
        
  
      }
      else {
        setTimeTable(updatedTimeTable)
      }

  }

  const setDeliveryTime = (e, index) => {    

    // Se crea una copia del array de timeTable
    const updatedTimeTable = [...timeTable]    
    const exist = updatedTimeTable.find((day) => day.day === currentWeek[index])              
    
    exist.deliveryTime = e.target.value     

    if (exist.pickUpTime > "00:00" && exist.deliveryTime > "00:00") {        
      
      const totalhours = calculateDuration(exist.pickUpTime, exist.deliveryTime)
      
      // Si la diferencia de horas es mayor a 0, se actualiza la tabla
      if (totalhours > "00:00") {
        exist.totalHours = totalhours        
      }
      
      setTimeTable(updatedTimeTable)
      
               
      
    } 
    
  }

  
  // Valida que la hora de entrega no sea menor a la de recogida
  const onBlurDeliveryTime = (e, index) => {    
    
    const updatedTimeTable = [...timeTable]

    // Busco el día actual en la tabla
    const exist = updatedTimeTable.find((day) => day.day === currentWeek[index])           

    const finalMinutes = convertTimetoMinutes(exist.deliveryTime)
    const initialMinutes = convertTimetoMinutes(exist.pickUpTime)    

    if (finalMinutes <= initialMinutes) {
      alert('La hora de entrega no puede ser igual o menor a la de recogida')
      
      console.log('Entro en el if');
      
      exist.deliveryTime = "00:00"
      exist.totalHours = "00:00"
      console.log('exist.deliveryTime > ', exist.deliveryTime);
      

      setTimeTable(updatedTimeTable)
      
    }   
  
  }

  const clearInput = (index, property) => {        

    const updateTimeTable = [...timeTable]
    updateTimeTable[index][property] = "00:00"        
    
    // Si se borra alguna hora, se pone a cero el total de horas  
    updateTimeTable[index].totalHours = "00:00"
    
    setTimeTable(updateTimeTable)
  }



  const getData = (date) => {
    
    const currentWeek = getCurrentWeek(date)

    
    // Cargo la tabla solo la primera vez
    if (timeTable.length == 0) {
      const newTimeTable = [...timeTable]
    
      for (let i = 0; i < currentWeek.length; i++) {
        newTimeTable.push({day: currentWeek[i], pickupTime: "00:00", deliveryTime: "00:00", totalHours: "00:00"})
      }
      setTimeTable(newTimeTable)      
      
    }

    return currentWeek
  }


  // Actualiza los días de la semana a partir de la nueva fecha
  const loadWeek = (currentWeek) => {    
      
      const newTimeTable = []
      
      for (let i = 0; i < currentWeek.length; i++) {
        newTimeTable.push({day: currentWeek[i], pickupTime: "00:00", deliveryTime: "00:00", totalHours: "00:00"})
      }
      setTimeTable(newTimeTable)      
      
    
  }

  useEffect(() => {
    // Obtener la fecha actual, solo los primeros 10 caracteres
    const date = getCurrentDate()    
    
    // Establecer la fecha en el encabezado
    const stringDate = getCurrentDate().toISOString().slice(0, 10)
    setDate(stringDate)

    // Solo se carga una vez la tabla
    if (timeTable.length == 0) {
      const currentWeek = getData(date)  
      setCurrentWeek(currentWeek)
    }
  }, []) 

  // Cada vez que cambia el numero total de horas, se actualiza el total de horas por semana
  useEffect(() => {
     totalHours.reduce((acc, value) => acc + value, 0)
     setHoursPerWeek(convertMinutestoTime(totalHours.reduce((acc, value) => acc + value, 0))) 
  }, [totalHours])



  const getPrevoiusWeek = () => {
    
    const prevWeekDate = new Date(date);
    const days = 7
    prevWeekDate.setDate(prevWeekDate.getDate() - days)
    

    const stringDate = prevWeekDate.toISOString().slice(0, 10)
    setDate(stringDate)
    
    // Recarga la semana a partir de la nueva fecha
    const currentWeek = getData(prevWeekDate)
    console.log('>>>> currentWeek', currentWeek);
    

    setCurrentWeek(currentWeek)
    loadWeek(currentWeek)

  }

  const getNextWeek = () => {
    
    const nextWeekDate = new Date(date);
    const days = 7
    nextWeekDate.setDate(nextWeekDate.getDate() + days)
    console.log('>> nextWeekDate', nextWeekDate)

    const stringDate = nextWeekDate.toISOString().slice(0, 10)
    setDate(stringDate)

    // Recarga la semana a partir de la nueva fecha
    const currentWeek = getData(nextWeekDate)
    console.log('>>>> currentWeek', currentWeek);
    

    setCurrentWeek(currentWeek)
    loadWeek(currentWeek)
    

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
        <thead>
          <tr>
              <th>  Date </th>
              <th>  Pick-up Time	 </th>
              <th>  Delivery Time		 </th>
              <th>  Total Hours		 </th>              
          </tr>
          </thead>  
          <tbody>
            {
              timeTable.map((day, index) => {
                return (
                  <tr>
                    <td key={index}> {daysOfWeek[day.day.getDay()]} , {day.day.getDate()} de {months[day.day.getMonth()]} </td>
                    {/* Hora de regcogida */}
                    <td className="border border-gray-300 p-2">
                      <div className='flex items-center'>
                        <input type='time' 
                          className='border w-full'
                          onChange={(e) => setPickUpTime(e, index)}
                          value={timeTable[index]?.pickUpTime || "00:00"}
                        />
                        <button className='ml-2 text-red-500 hover:text-red-700'
                          onClick={() => clearInput(index, 'pickUpTime')}
                        >
                          <FaTimes/>
                        </button>
                      </div>
                    </td>
                    
                    {/* Hora de entrega */}
                    <td className="border border-gray-300 p-2">
                    <div className='flex items-center'>
                      <input type='time' 
                        className='border w-full'
                        onChange={(e) => setDeliveryTime(e, index)}
                        onBlur={(e) => onBlurDeliveryTime(e, index)}
                        value={timeTable[index]?.deliveryTime || "00:00"}
                        />                        
                        <button className='ml-2 text-red-500 hover:text-red-700'
                          onClick={() => clearInput(index, 'deliveryTime')}
                        >
                          <FaTimes/>
                        </button>

                      </div>
                        
                    </td>


                    
                    <td>  {day.totalHours} </td>
                      
                  </tr>

                )
              })

            }
            <tr> 
              <td colSpan="3" className='text-right pr-2'> Total horas semana:  </td>
              <td className='text-right pr-2'>  {hoursPerWeek} </td>
            </tr>
         </tbody>
        </table>
      </div>
              

            

    </div>
  )
}

export default TrackerTable