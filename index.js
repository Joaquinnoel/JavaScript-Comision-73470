
const productos = [
{ id: 1, nombre: " 9pm", precio: 67000 , categoria: " Dulce ", imagen: "./assets/9PM.jpeg"},
{ id: 2, nombre: "Khamrah", precio: 70000 , categoria: "Dulce", imagen: " ./assets/2.jpeg"},
{ id: 3, nombre: "Yara Moi", precio: 75000, categoria: "Frutal", imagen: "./assets/Yara Moi.jpeg" },
{ id: 4, nombre: 'Hawas', precio: 89000, categoria: 'Citrico', imagen: './assets/hAWAS.jpeg' },
{ id: 5, nombre: 'Yara Tous', precio: 10000, categoria: 'Dulce', imagen: './assets/Yara Tous.jpeg' },
{ id: 6, nombre: 'Honor & Glory', precio: 79000, categoria: 'Citrico', imagen: './assets/Honor & Glory.jpeg' },
];

const contenedor1 = document.querySelector("#contenedor");
productos.forEach((producto)=> {
    const div = document.createElement("div")
    div.classList.add("cuadro");
    div.innerHTML = `
    <p> Nombre: ${producto.nombre}</p>
    <p> Precio: ${producto.precio}</p>
    <p> Categoria: ${producto.categoria}</p>
    <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
    
    `
    const button = document.createElement("button")
    button.innerText = 'Agregar Productos'

    button.addEventListener('click', ()=>{
        carrito.push({...producto})
        console.log(carrito)
        actualizarCarrito()
    })
    div.appendChild(button)
    contenedor1.appendChild(div)
})



function actualizarCarrito() {
    const total = carrito.reduce ((acc,producto) => acc + producto.precio, 0);
    document.getElementById("total").innerText = `total: $${total}`;

    const lista = document.getElementById("carrito-lista");
    lista.innerHTML = "";

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.innerText = producto.nombre
        lista.appendChild(li);

    });

}



const botonFinalizar = document.getElementById("botonCarro");

botonFinalizar.addEventListener("click", () => {
const compra = carrito.reduce((acc, producto) => acc + producto.precio, 0);
const mensaje = document.getElementById('mensaje-compra');
mensaje.innerHTML = `<strong>¡¡Gracias por tu compra!!</strong> <br> El total de tu compra es: $${compra}`;
mensaje.classList.remove('oculto');
mensaje.classList.add('visible');

carrito.length = 0; 

document.getElementById("total").innerText = "Total: $0";
document.getElementById("lista").innerHTML = ""; 


});

setTimeout(() => {
    mensaje.classList.add('fade-out');
    setTimeout(() => {
        mensaje.classList.add('oculto');
        mensaje.classList.remove('visible', 'fade-out');
    }, 500);
    
}, 3000);

document.getElementById("botonVaciar").addEventListener("click", () => {
    carrito.length = 0; 
    actualizarCarrito();
    document.getElementById("lista").innerHTML = "";
});




let carrito = [];











