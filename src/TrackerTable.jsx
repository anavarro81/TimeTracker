

import React, {useEffect, useState, useRef} from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import {calculateDuration, getCurrentWeek, convertTimetoMinutes, convertMinutestoTime, getFirstDayOfWeek} from './utils/dates'



const TrackerTable = () => {
  
  const [dateString, setDateString] = useState('')
  const [date, setDate] = useState(new Date())  
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
  
  
  const setPickUpTime = (e, dayOfWeek) => {    

    
    const updatedTimeTable = [...timeTable]

    
    
    
    
    const currentEntry = updatedTimeTable.find((day) => day.day === dayOfWeek)
    
    
    
    currentEntry.pickUpTime = e.target.value


      
    if (currentEntry.pickUpTime > "00:00" && currentEntry.deliveryTime > "00:00") {    
      
      
      
      
        
        const totalhours = calculateDuration(currentEntry.pickUpTime, currentEntry.deliveryTime) 

        
        
        
        if (totalhours > "00:00") {
          currentEntry.totalHours = totalhours          
        }
        setTimeTable(updatedTimeTable)
        
        
  
      }
      else {
        setTimeTable(updatedTimeTable)
      }

  }

  const setDeliveryTime = (e, dayOfWeek) => {    

    // Se crea una copia del array de timeTable
    const updatedTimeTable = [...timeTable]    
    const exist = updatedTimeTable.find((day) => day.day === dayOfWeek)              
    
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
  const onBlurDeliveryTime = (e, dayOfWeek) => {    
    
    const updatedTimeTable = [...timeTable]

    // Busco el día actual en la tabla
    const exist = updatedTimeTable.find((day) => day.day === dayOfWeek)           

    const finalMinutes = convertTimetoMinutes(exist.deliveryTime)
    const initialMinutes = convertTimetoMinutes(exist.pickUpTime)    

    if (finalMinutes <= initialMinutes) {
      alert('La hora de entrega no puede ser igual o menor a la de recogida')
      
      
      
      exist.deliveryTime = "00:00"
      exist.totalHours = "00:00"
      
      

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
      
      const newTimeTable = [...timeTable]
      
      for (let i = 0; i < currentWeek.length; i++) {
        newTimeTable.push({day: currentWeek[i], pickupTime: "00:00", deliveryTime: "00:00", totalHours: "00:00"})
      }
      setTimeTable(newTimeTable)      
      
    
  }

  useEffect(() => {
    // Obtener la fecha actual, solo los primeros 10 caracteres
    const date = getCurrentDate()
    
    // Obtener el primer día de la semana y lo formatea para mostrarlo como dia del mes y mes
    // Muestra la fecha en el header <h2>
    const firstDay = getFirstDayOfWeek(date)
    const dateWeek = `${firstDay.getDate()} de ${months[firstDay.getMonth()]}`
    setDateString(dateWeek)    
    
    const currentWeek = getData(date)  
    setCurrentWeek(currentWeek)
    
  }, []) 

  // Cada vez que cambia el numero total de horas, se actualiza el total de horas por semana
  useEffect(() => {
     totalHours.reduce((acc, value) => acc + value, 0)
     setHoursPerWeek(convertMinutestoTime(totalHours.reduce((acc, value) => acc + value, 0))) 
  }, [totalHours])



  const getPrevoiusWeek = () => {
    
    
    // Obtener la fecha de la semana anterior. Establecer la fecha en el estado
    const prevWeekDate = new Date(date);
    const days = 7
    prevWeekDate.setDate(prevWeekDate.getDate() - days)  
    setDate(prevWeekDate)    

    // Obtiene el lunes de la semana anterior. 
    // Lo formatea para mostrarlo como dia del mes y mes
    // Actualiza el estado con la nueva fecha
    const firstDay = getFirstDayOfWeek(prevWeekDate)   
    const dateWeek = `${firstDay.getDate()} de ${months[firstDay.getMonth()]}`
    setDateString(dateWeek)
    
    // Recarga la semana a partir de la nueva fecha
    const currentWeek = getData(prevWeekDate)       

    setCurrentWeek(currentWeek)

    



    const existDay = timeTable.find((day) => {
      
      return new Date(day.day).toISOString().slice(0,10) === new Date(firstDay).toISOString().slice(0, 10);
    }); 

    
    
    if (!existDay) {
      
      loadWeek(currentWeek)
    } else {
      const newTimeTable = [...timeTable]
      setTimeTable(newTimeTable)
    }



  }

  const getNextWeek = () => {
    
    // Le suma 7 días a la fecha actual. Establece la fecha en el estado
    const nextWeekDate = new Date(date);
    const days = 7
    nextWeekDate.setDate(nextWeekDate.getDate() + days)
    setDate(nextWeekDate)

    // Obtiene el lunes de la semana anterior. 
    // Lo formatea para mostrarlo como dia del mes y mes
    // Actualiza el estado con la nueva fecha
    const firstDay = getFirstDayOfWeek(nextWeekDate)   
    const dateWeek = `${firstDay.getDate()} de ${months[firstDay.getMonth()]}`
    setDateString(dateWeek)



    // Recarga la semana a partir de la nueva fecha
    const currentWeek = getData(nextWeekDate)
    
    

    setCurrentWeek(currentWeek)


    const existDay = timeTable.find((day) => {
      
      return new Date(day.day).toISOString().slice(0,10) === new Date(firstDay).toISOString().slice(0, 10);
    });   
    
    
    console.log('>> existDay', existDay);
    
    if (!existDay) {
      
      loadWeek(currentWeek)
    } else {
      const newTimeTable = [...timeTable]
      setTimeTable(newTimeTable)
    }
    

  }

  
  
  
  
    return (
    
    
    <div className='container mx-auto p-4'>
        <div className='mb-4 flex justify-between items-center'>                       
                <button
                    onClick={getPrevoiusWeek} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    aria-label="Previous Week"
                    >
                    <FaChevronLeft/>
                </button>           
            
            <h2 className="text-2xl font-bold"> 
              Semana del {dateString} 
            </h2>
                <button 
                  onClick={getNextWeek}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  aria-label="Next Week">
                    <FaChevronRight/>
                </button>
            

        </div>
{/* Tabla de horarios */}

      <div className="overflow-x-auto">
        <table className='w-full border-collapse border border-gray-300'> 
        <thead>
          <tr className='bg-gray-100'>
              <th className="border border-gray-300 p-2">  Fecha </th>
              <th className="border border-gray-300 p-2">  Hora de recogida	 </th>
              <th className="border border-gray-300 p-2">  Hora de entrega		 </th>
              <th className="border border-gray-300 p-2">  Total horas		 </th>              
          </tr>
          </thead>  
          <tbody>
            {
              timeTable.map((day, index) => {

                // const exitDay = currentWeek.find((currentWeekDay) => currentWeekDay === day.day)

                const existDay = currentWeek.find((currentWeekDay) => {      
                  return new Date(day.day).toISOString().slice(0,10) === new Date(currentWeekDay).toISOString().slice(0, 10);
                }); 
            
                
                
                
                //Solo se muestran los días de la semana actual, no todo. 
                if (!existDay) {                
                  return 
                }                

                return (
                  <tr className="hover:bg-gray-50">
                    <td 
                      className="border border-gray-300 p-2"
                      key={index}> {daysOfWeek[day.day.getDay()]} , {day.day.getDate()} de {months[day.day.getMonth()]} 
                      
                    </td>
                    {/* Hora de regcogida */}
                    <td className="border border-gray-300 p-2">
                      <div className='flex items-center'>
                        <input type='time' 
                          className='border w-full'
                          onChange={(e) => setPickUpTime(e, day.day)}
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
                        onChange={(e) => setDeliveryTime(e, day.day)}
                        onBlur={(e) => onBlurDeliveryTime(e, day.day)}
                        value={timeTable[index]?.deliveryTime || "00:00"}
                        />                        
                        <button className='ml-2 text-red-500 hover:text-red-700'
                          onClick={() => clearInput(index, 'deliveryTime')}
                        >
                          <FaTimes/>
                        </button>

                      </div>
                        
                    </td>


                    
                    <td className="border border-gray-300 p-2 text-right">  {day.totalHours} </td>
                      
                  </tr>

                )
              })

            }
            </tbody>
            <tfoot> 
            <tr className='bg-gray-200 font-blod'> 
              <td colSpan="3" className='border border-gray-300 p-2 text-right'> Total horas semana:  </td>
              <td className='text-right pr-2'>  {hoursPerWeek} </td>
            </tr>
            </tfoot>
         
        </table>
      </div>
              

            

    </div>
  )
}

export default TrackerTable