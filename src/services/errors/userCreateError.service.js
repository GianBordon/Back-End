export const userCreateError = (user) =>{
    return `Todos los campos son obligatorios, 
            Listado de campos obligatorios:
            first_name: Este campo debe ser de tipo string, y se recibio ${user.first_name},
            last_name: Este campo debe ser de tipo string, y se recibio ${user.last_name},
            email: Este campo debe ser de tipo string, y se recibio ${user.email},
            age: Este campo debe ser de tipo numerico, y se recibio ${user.age}`
}