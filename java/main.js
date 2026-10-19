
// array de frutas:

const frutas = [
    {
        id: 1,
        nombre: "anana",
        precio: 101,
        imagen: "img/anana.jpg"

    },
    {
        id: 2,
        nombre: "arandano",
        precio: 102,
        imagen: "img/arandano.jpg"

    },
    {
        id: 3,
        nombre: "banana",
        precio: 103,
        imagen: "img/banana.jpg"

    },
    
    {
        id: 4,
        nombre: "frambuesa",
        precio: 104,
        imagen: "img/frambuesa.jpg"

    },
    {
        id: 5,
        nombre: "frutilla",
        precio: 105,
        imagen: "img/frutilla.jpg"

    },
    {
        id: 6,
        nombre: "kiwi",
        precio: 106,
        imagen: "img/kiwi.jpg"

    },
    {
        id: 7,
        nombre: "mandarina",
        precio: 107,
        imagen: "img/mandarina.jpg"

    },
    {
        id: 8,
        nombre: "manzana",
        precio: 108,
        imagen: "img/manzana.jpg"

    },
    {
        id: 9,
        nombre: "naranja",
        precio: 109,
        imagen: "img/naranja.jpg"

    },
    {
        id: 10,
        nombre: "pera",
        precio: 110,
        imagen: "img/pera.jpg"

    },
    {
        id: 11,
        nombre: "pomelo-amarillo",
        precio: 111,
        imagen: "img/pomelo-amarillo.jpg"

    },
    {
        id: 12,
        nombre: "pomelo-rojo",
        precio: 112,
        imagen: "img/pomelo-rojo.jpg"

    },
    {
        id: 13,
        nombre: "sandia",
        precio: 113,
        imagen: "img/sandia.jpg"

    },
    
]

let carrito = [];

function init() {
    cargarCarritoLocalStorage();
    imprimirDatosAlumno();
    mostrarProductos(frutas);
    activarFiltro();
    mostrarCarrito();
    
}

init();

// Datos del alumno
//===========================

function imprimirDatosAlumno() {
    const alumno = {
        dni: "47554844",
        nombre: "Valentin Nahuel",
        apellido: "Gonzalez Galban"
    };


console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

const contenedorAlumno = document.querySelector(".nombreAlumno");

contenedorAlumno.textContent = `${alumno.nombre} ${alumno.apellido}`;

}

//===========================================
//funcion para mostrar las frutas borrando el contenido de "contenedor-productos" para evitar duplicados
function mostrarProductos(arrayProductos) {
    const contenedorProductos = document.querySelector(".contenedor-productos");

    contenedorProductos.innerHTML = "";

    arrayProductos.forEach(function (fruta) {
        const card = document.createElement("div");

        card.classList.add("card-producto");

        card.innerHTML = ` 
            <img src="${fruta.imagen}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button class="boton-agregar" data-id="${fruta.id}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(card);

        const botonAgregar = card.querySelector(".boton-agregar")
        botonAgregar.addEventListener("click", function () {
            agregarAlCarrito(fruta.id);
        })
    });
}

//===============================================================
function activarFiltro() {
    const inputBusqueda = document.querySelector(".barra-busqueda");

    inputBusqueda.addEventListener("input", function () {
        const textoBuscado = inputBusqueda.value.toLowerCase();

        const frutasFiltradas = frutas.filter(function (fruta) {
            return fruta.nombre.toLowerCase().includes(textoBuscado);
        }) 
        
        mostrarProductos(frutasFiltradas);

    })

}


function agregarAlCarrito(idProducto) {
    const productoEncontrado = frutas.find(function (fruta) {
    const yaExiste = carrito.find(producto => producto.id === idProducto);
        if(yaExiste) {
            
            yaExiste.cantidad++;
        } else {
            carrito.push({ productoEncontrado, cantidad: 1});
            }

        return fruta.id === idProducto;
    })
    
    carrito.push(productoEncontrado);

    console.log(carrito);

    mostrarCarrito();
    guardarCarritoEnlocalStorage();

}

function eliminarProducto(indice){
    carrito.splice(indice,1);

    guardarCarritoEnlocalStorage();
    mostrarCarrito();

}

function mostrarCarrito(){
    const contenedorCarrito = document.querySelector("#items-carrito");

    contenedorCarrito.innerHTML = "";
     
       carrito.forEach(function (producto, indice) {
        const item = document.createElement("li");

        item.classList.add("bloque-item");
        
        item.innerHTML = ` 
        <p class="nombre-item">${producto.nombre} - $${producto.precio}</p>
        <button class= "boton-eliminar">Eliminar</button>
        `;

        contenedorCarrito.appendChild(item);
        const botonEliminar = item.querySelector(".boton-eliminar");

        botonEliminar.addEventListener("click", function(){
            eliminarProducto(indice);

        });
       });


}


function guardarCarritoEnlocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function cargarCarritoLocalStorage() {
   const carritoGuardado = localStorage.getItem("carrito")

   if(carritoGuardado) {// verifico si hay algo guardado
                //convierto el texto en array y lo asigno al carrito
    carrito = JSON.parse(carritoGuardado)

   }

}


