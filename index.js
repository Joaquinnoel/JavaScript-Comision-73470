
const productos = [
{ id: 1, nombre: " 9pm", precio: 67000 },
{ id: 2, nombre: "Khamrah", precio: 70000 },
{ id: 3, nombre: "Yara", precio: 75000 }
];


let carrito = [];


function iniciarCarrito() {
alert(" Bienvenido al carrito de compras");

let seguirComprando = true;

while (seguirComprando) {
    let mensaje = "¿Qué deseas comprar?\n";
    for (let producto of productos) {
    mensaje += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    }
    mensaje += "0. Finalizar compra";

    let opcion = parseInt(prompt(mensaje));

    if (opcion === 0) {
    seguirComprando = false;
    } else {
    let seleccionado = productos.find(p => p.id === opcion);
    if (seleccionado) {
        carrito.push(seleccionado);
        alert(` ${seleccionado.nombre} fue añadido al carrito.`);
    } else {
        alert(" Opción no válida. Intenta de nuevo.");
    }
    }
}

mostrarResumen();
}

// 🔹 Función para mostrar el resumen de la compra
function mostrarResumen() {
if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
}

let resumen = "Tu carrito contiene:\n";
let total = 0;

for (let item of carrito) { 
    resumen += `- ${item.nombre} - $${item.precio}\n`;
    total += item.precio;
}

resumen += `\n Total a pagar: $${total}`;
alert(resumen);
}


iniciarCarrito();



