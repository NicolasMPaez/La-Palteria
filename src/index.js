const API = "https://platzi-avo.vercel.app";

// La variable appNode plasma esto en el HTML
const appNode = document.querySelector('#app')

//-------------------------------------
/* 2 forma le agregaremos el escuchador de eventos al   contenedor 
   de  nuestros elementos, a este patron se le conoce como delegacion
   de eventos estamos delegando a un solo nodo que es el padre
   de todos lo queremos escuchar que se encargue de manejar todos 
   los eventos de esa zona.
   
   Es importante este patron cuando manejamos
   una gran cantidad de escuchadores y es manejada por la mayoria
   de frameworks importantates
   
   Esto hara que cuando demos click en cualquier parte del elemento
   se ejecute la alerta esto lo podemos arreglar

   Utilizando un condicional en la que utilizamos el parametro
   de la funcion que devuele el evento y entonces accedemos a la
   propiedad target a nodeName y le decimos que solo cuando el evento
   se hubique en el h2 dispare la alerta
   
*/
// appNode.addEventListener('click', (event) => {
//     if(event.target.nodeName === 'H2'){

//         window.alert("Hola");

//     }
// });
// ------------------------------------------


// Intl (acronimo de internalizacion en ingles)
//1-- Dar formato a Fechas
//2-- Dar Formato a Monedas
const formatPrice = (price)=> {

    const newPrice = new window.Intl.NumberFormat('en-En', {
        style:"currency",
        currency: "USD",
    }).format(price);

    return newPrice
}


//web api
//Conectarnos al server
//Promise --> async/ await
window
.fetch(`${API}/api/avo`)
//procesar la respuesta y convertir en JSON
.then((respuesta)=> respuesta.json())
//JSO-->Data-->Renderizar info browser
.then((respuestaJson) => {
    const todosLosItems = [];
    respuestaJson.data.forEach((item) => {
        //Crear img
        const imagen = document.createElement("img");
        // URL de la imagen
        imagen.src = `${API}${item.image}`;
        //Cambiar estilos
        imagen.className = "imagen";

        //Crear titulo
        const title = document.createElement("h2");
        title.textContent = item.name;     
        //Cambiar estilos del titulo
        //Por Propiedad
           /* title.style*/
        //Como Objeto
           /*title.style.fontSize = "3rem";*/
        //Por clases de Tailwindcss
           /*title.className= "text-2xl text-red-600" <--separamos las clases que querramos con un espacio (las clases las sacamos de Tailwindcss.com)*/
        //Por Clases para nuestra hoja de css-- Este por buenas practicas
        title.className = "nombre-palta";

        /* 1 forma de hacer que al dar click se ejecute una alerta 
        
            Esto funciona pero hay que tener en cuenta que estamos
            agregando un eventListener por cada elemento que recibimos por
            parte de la API

            titulo.addEventListener('click', () => {

                window.alert("Hola");
            }) 
        */
    


        //crear precio
        const price = document.createElement("div");
        price.textContent = formatPrice(item.price);
        //Cambiar estilos
        price.className = "precio";  
        

        const container = document.createElement('div');
        container.className = "container";
        // container.appendChild(imagen);
        // container.appendChild(title);
        // container.appendChild(price);
        container.append(imagen, title, price);

        todosLosItems.push(container)
    });

    appNode.append(...todosLosItems);
});