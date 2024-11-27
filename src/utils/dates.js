
const getFirstDayOfWeek = (currentDate) => {   
       // Obtener la fecha actual
   console.log('>> currentDate : ', currentDate)
   // Obtengo el día actual de la semana. 0 es Domingo, 1 es Lunes, 2 es Martes, etc.
   const currentDay = currentDate.getDay()
   // Si el día actual es Domingo, le resto 6 días para obtener el Lunes de la semana actual
   const diff = currentDay === 0 ? 6 : currentDay - 1
   // Obtengo el Lunes de la semana actual
   const firtsDay = new Date(currentDate.setDate(currentDate.getDate() - diff))

   
   
   return firtsDay

   
}
// Crear toda la emana a partir del lunes
const getCurrentWeek = (date) => {

    
    const firtsDay = getFirstDayOfWeek(date)
    const curretWeek = []
    curretWeek.push(firtsDay)
    

    for (let index = 1; index < 7; index++) {

        const dayofWeek = new Date(firtsDay)
        dayofWeek.setDate(dayofWeek.getDate() + index)

        console.log('dayofWeek : ', dayofWeek);
        curretWeek.push(dayofWeek)

        
    }
    console.log(curretWeek);
    
}

export default getCurrentWeek