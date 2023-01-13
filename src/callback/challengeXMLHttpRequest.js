const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //llamado al XmlHttpRequest
const API = 'https://api.escuelajs.co/api/v1'; //API en mayúscula porque es una referencia que no va a cambiar

//funcion principal que obtendrá la informacion del producto como un objeto
function fetchData(urlApi, callback){ //urlApi: no confundir y colocar API
	 //inicializar un objeto de tipo XMLHttpRequest
	let xhttp = new XMLHttpRequest(); 

	//El metodo .open realiza la petición de apertura de comunicación, el metodo puede ser 'GET' o 'POST', luego se envia la URL, si es asincrono (true o false), usuario y contraseña. En esta caso solo se utiliza el metodo, la url y async
	xhttp.open('GET', urlApi, true); 
	//en este metodo Almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado
	xhttp.onreadystatechange = function(event) { //escucha diferentes estados de la solicitud y conocer cuando está disponible la información
	
	//el atributo readyState define el estado del objeto XMLHttpRequest
        //0 No inicializado
        //1 Loading
        //2 ejecutado
        //3 interactuando
        //4 completado
	if(xhttp.readyState === 4) { //si el estado ha sido completada la llamada

			//si la respuesta de la API es exitosa (200 Ok)
			if(xhttp.status === 200 ){ //el servido responde de forma correcta
				//se ejecuta el callback recibiendo como argumentos un objeto, como la respuesta de la API es un texto plano, el metodo JSON.parse tranformará este texto en un objeto.
                //El atributo devuelve un DOMString que contiene la  respuesta a la consulta como un texto o null si la consulta no tuvo exito o aun no ha sido completada.
				callback(null, JSON.parse(xhttp.responseText)); //dentro de xhttp.responseTex recibimos lo que entrega el servidor en texto y se hace la transformación en JSON
			
			//si la respuesta de la API no es exitosa se captura el error
			}else {
				//se inicializa un objeto de tipo Error donde se le envian como argumentos un mensaje de error y la URL de la API para conocer en dónde se produjo el error
				const error = new Error('Error' + urlApi);

				//se ejecuta el callback recibiendo como argumentos el error y null debido a que no se pudo obtener el objeto
				return callback(error,null); //es null porque no se está regresando ningún dato
			}
		} 	
	}
	 //el método .send() envia la petición al servidor
	xhttp.send();
}

//se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la cadena 'products' para acceder a la URL de la API deseada, y una función anónima que recibe 2 parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API).
fetchData(`${API}/products`, function(error1, data1){
	//se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el error
	if (error1) return console.error(error1); //si hay error, devuelve el error
	//se invoca nuevamente la función fetchData con el fin de acceder a un objeto puntual del arreglo data1, se envia como parámetros la url de la API apuntando al atributo del primer objeto de arreglo data1 y nuevamente una función anónima.
	fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
		//si en este punto se identifica un error se imprime en consola y se detiene el proceso
		if (error2) return console.error(error2);  //valida el error 2
		//se usa Optional chaining '?.' que es una forma segura de acceder a las propiedades de los objetos anidados, incluso si no existe una propiedad intermedia:
		//Se invoca nuevamente la funcion fetchData con el fin de acceder a la categoria, se envían como parametros la url de la API con la concatenación de 'Categories' y el atributo Id de categoria del objeto data2 de la función anterior
        //en este caso puntual se hace uso de Optional Caining el cual hace una evalucación de las propiedades de un objeto y en vez de arrojar un error devuelve undefined en caso que la propiedad no exista o sea null.
        //igual que las anteriores e envia una funcion anonima con 2 argumentos, un objeto Error y un objeto de datos
		fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
			//se valida si existe error, en caso de que exista se detiene el proceso y se imprime el error
			if (error3) return console.error(error3); //evitar el callback hell
			//Se imprime el objeto en la posición 1 del arreglo de los objetos obtenidos en el metodo invocado inicialmente
			console.log(data1[0]); 
			//Se imprime el titulo del objeto que se consultó en la seguna invocación de la función
			console.log(data2.title);
			//Se imprime el nombre de la categoria a la que pertenece el objeto que se consultó en la seguna invocación del método.
			console.log(data3.name);
		});
	});
});