
const productos = [
{ id: 1, nombre: " 9pm", precio: 67000 , categoria: " Dulce ", imagen: "./assets/9PM.jpeg"},
{ id: 2, nombre: "Khamrah", precio: 70000 , categoria: "Dulce", imagen: " ./assets/2.jpeg"},
{ id: 3, nombre: "Yara Moi", precio: 75000, categoria: "Frutal", imagen: "./assets/Yara Moi.jpeg" },
{ id: 4, nombre: 'Hawas', precio: 89000, categoria: 'Citrico', imagen: './assets/hAWAS.jpeg' },
{ id: 5, nombre: 'Yara Tous', precio: 76000, categoria: 'Dulce', imagen: './assets/Yara Tous.jpeg' },
{ id: 6, nombre: 'Honor & Glory', precio: 79000, categoria: 'Citrico', imagen: './assets/Honor & Glory.jpeg' },
{ id: 7, nombre: 'Yara Candy', precio: 80000, categoria: 'Dulce', imagen: './assets/Yara Candy.jpg' },
{ id: 8, nombre: 'Amerat', precio: 65000, categoria: 'Tropical', imagen: './assets/Amerat.jpeg'},
{ id: 9, nombre: 'Asad Bourbon', precio: 65000, categoria: 'Cafeinado', imagen: './assets/5.jpeg'},
{ id: 10, nombre: 'Bharara King', precio: 110000, categoria:"Dulce", imagen:'./assets/4.jpeg'},
{ id: 11, nombre: 'Asad Masculino', precio: 60000, categoria: 'Amargo', imagen:'./assets/2.2.jpeg'},
{ id: 12, nombre: 'Club De Nuit Intense', precio: 120000, categoria: 'Dulce', imagen: './assets/1.jpeg'}

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
if (carrito.length === 0) {
    Swal.fire({
    icon: 'warning',
    title: 'Carrito vacío',
    text: 'Agregá algún producto antes de finalizar la compra',
    });
    return;
}

Swal.fire({
    title: 'Datos de la tarjeta 💳',
    html: `
    <input id="nombre-tarjeta" class="swal2-input" placeholder="Nombre en la tarjeta">
    <input id="numero-tarjeta" class="swal2-input" placeholder="Número de tarjeta (16 dígitos)">
    <input id="vencimiento" class="swal2-input" placeholder="MM/AA">
    <input id="cvv" class="swal2-input" placeholder="CVV">
    `,
    confirmButtonText: 'Pagar $' + compra,
    focusConfirm: false,
    preConfirm: () => {
    const nombre = document.getElementById('nombre-tarjeta').value;
    const numero = document.getElementById('numero-tarjeta').value;
    const vencimiento = document.getElementById('vencimiento').value;
    const cvv = document.getElementById('cvv').value;

    if (!nombre || !numero || !vencimiento || !cvv) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
    }

    if (numero.length !== 16 || isNaN(numero)) {
        Swal.showValidationMessage('Número de tarjeta inválido');
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        Swal.showValidationMessage('CVV inválido');
    }

    return { nombreTarjeta: nombre, numero };
    }
}).then((result) => {
    if (result.isConfirmed) {
    
    Swal.fire({
    icon: 'success',
    title: `¡Gracias, ${result.value.nombreTarjeta}!`,
    text: `Tu compra de $${compra} fue aprobada.`,
    confirmButtonColor: '#28a745'
});

    

    carrito.length = 0;
    actualizarCarrito();
    }
  });



document.getElementById("total").innerText = "Total: $0";
document.getElementById("lista").innerHTML = ""; 


});



document.getElementById("botonVaciar").addEventListener("click", () => {
    carrito.length = 0; 
    actualizarCarrito();
    document.getElementById("lista").innerHTML = "";
});




let carrito = [];











