function sum(num1, num2){
    return num1 + num2;
}

function calc(num1, num2, callback){
    return callback(num1, num2);
}

console.log(calc(2, 2, sum));

setTimeout(function (){
    console.log('Hola JavaScript');
}, 5000);

function greeting(name){
    console.log(`Hola ${name}`);
}

setTimeout(greeting, 2000, 'Jesus');

//Al principio es difícil entender un callback de esta forma. Piensas, “si ya tengo la función sum, para que hacer un callback, puedo llamarla tal cual y omitir ese paso”. Pero piensa que tienes funciones para sumar, restar, multiplicar …como hacer una calculadora. Las declaras todas en lista, y abajo solo tienes que usar un callback que va tirando de todas a la vez.

function sum(num1, num2) {
    return num1 + num2;
}

function rest(num1, num2) {
    return num1 - num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    return num1 / num2;
}

function calc(num1, num2, callback) {
    return callback(num1, num2);
};

//Tienes la función execCallback que recibirá un callback es decir una función como parámetro, tu reto es ejecutar esa función con un tiempo de demora de 2 segundos.
//Para hacer que la función se demore 2 segundos debes usar la función setTimeout, pero para ejecutarla debes llamarla mediante el namescpace window para poder monitorear su uso en la ejecución de pruebas, ejemplo:
const myFunc = () => {
    console.log(`Hola mundo`)
  }
  
  export function execCallback(callback) {
    window.setTimeout(callback, 2000)
  }
  
  execCallback(myFunc)