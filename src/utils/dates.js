
export const getFirstDayOfWeek = (currentDate) => {   
       // Obtener la fecha actual
   
   // Obtengo el día actual de la semana. 0 es Domingo, 1 es Lunes, 2 es Martes, etc.
   const currentDay = currentDate.getDay()
   // Si el día actual es Domingo, le resto 6 días para obtener el Lunes de la semana actual
   const diff = currentDay === 0 ? 6 : currentDay - 1
   // Obtengo el Lunes de la semana actual
   const firtsDay = new Date(currentDate.setDate(currentDate.getDate() - diff))

   
   
   return firtsDay

   
}
// Crear toda la emana a partir del lunes
export const getCurrentWeek = (date) => {
    
    
    console.log('>> getCurrentWeek > date', date)

    const firtsDay = getFirstDayOfWeek(date)

    console.log('>> firtsDay : ', firtsDay)

    const curretWeek = []
    curretWeek.push(firtsDay)
    

    for (let index = 1; index < 7; index++) {

        const dayofWeek = new Date(firtsDay)
        dayofWeek.setDate(dayofWeek.getDate() + index)       
        curretWeek.push(dayofWeek)        
    }

    console.log('>> curretWeek : ', curretWeek)
    
    return curretWeek  
}

export const convertMinutestoTime = (totalminutes) => {
    const hours = Math.floor(totalminutes / 60);
    const minutes = totalminutes % 60;
  
    const hoursString = hours.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
  
    const totalHours = `${hoursString} : ${minutesString}`;

    return totalHours;
  
    
  };

  // Calcular la duración restantando la hora de fin de la de inicio
export const calculateDuration = (start, end) => {
    const startMinutes = convertTimetoMinutes(start);
    const endMinutes = convertTimetoMinutes(end);  
      
    const totalMinutes = endMinutes - startMinutes;    
  
    return convertMinutestoTime(totalMinutes);
  };

  export const convertTimetoMinutes = (time) => {
    
    const [hours, minutes] = time.split(":");  
    const hoursInMinutes = parseInt(hours) * 60;  
    const totalMinutes = hoursInMinutes + parseInt(minutes);     
    return totalMinutes;
  };

export default calculateDuration;