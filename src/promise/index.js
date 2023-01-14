// promesas -> tienen 3 estados: - pendiente (cuando se esta ejecutando) - completada (cuando regreso la info deseada) - rechazada.
// para construir una promesa usamos la palabra reservada Promise, nos regresa una función anónima con 2 funciones dentro (resolve, reject).
const promise = new Promise(function(resolve, reject){
    //estructura básica de una promesa. 
    resolve('Hey!')
});

// para el ej. con 10 vacas cumplimos con el suministro de leche necesario, con menos vacas dejamos de cumplirlo.
const cows = 15; // cantidad de vacas disponibles

const countCows= new Promise(function(resolve, reject){
    // generamos una nueva promesa pasando la función anónima con resolve, reject.
    // hacemos la comparación de la cantidad de vacas necesarias.
    if(cows > 10 ) {
        resolve(`We have ${cows} cows on the farm`)
        // resolvemos ok si se cumple la condición anterior.
        // si no se cumple lo anterior caemos en el rechazo de la promesa.
    } else {
        // resultado a devolver si no se cumple la condición (if)
        reject("There is no cows on the farm")
    }
})

// podemos anidar tantos .then como queramos!! En este ejemplo la promesa se va cumplir por lo que va resolver en resolve.
// .then es un método donde pasamos una función anónima o función flecha, donde capturamos el resolve.
countCows.then((result) => {
    console.log(result);
    // mostramos en consola el resultado del resolve.
    // .catch es un método donde pasamos una función anónima o func. flecha, donde capturamos el error (reject) rechazo.
}).catch((error)=> {
    console.log(error);
    //mostramos en consola el error/rechazo de la promesa.
}).finally(()=> {
    console.log('Finally');
    // .finally es un método donde indicamos que finalizó, por más que se haya cumplido o rechazado.
});

//Challenge
/* En este desafío tienes la función delay la cual se espera que un tiempo específico retorne un mensaje

La función deberá recibir dos parámetros:

time: el tiempo de espera
message: el mensaje que debe imprimir después del tiempo de espera
La función delay debe retornar una promesa para poderlo usarlo de forma asíncrona.

Nota: Debes usar la función setTimeout con el namespace window para poder monitorear su uso en la ejecución de pruebas, ejemplo: */

export function delay(time, message) {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(message)
      }, time)
    })
  }
  delay(2000, "Hello after 2s")
    .then((message) => console.log(message))