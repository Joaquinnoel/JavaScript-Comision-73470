

let carrito = [];

fetch('productos.JSON')
.then(res => res.json())
.then(data => {
    productos = data;
    renderProductos(); 
});

function renderProductos (){
const contenedor1 = document.querySelector("#contenedor");
productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("cuadro");
    div.innerHTML = `
        <p> Nombre: ${producto.nombre}</p>
        <p> Precio: $${producto.precio.toLocaleString()}</p>
        <p> Categoria: ${producto.categoria}</p>
        <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
    `;

    const buttonAgregar = document.createElement("button");
    buttonAgregar.innerText = 'Agregar Producto';
    buttonAgregar.classList.add('carrito-Producto');
    buttonAgregar.addEventListener('click', () => {
        carrito.push({ ...producto });
        actualizarCarrito();
    });

    
    const buttonEliminar = document.createElement("button");
    buttonEliminar.innerText =' Eliminar Producto';
    buttonEliminar.classList.add('eliminar-btn');
    buttonEliminar.addEventListener('click', () => {
        const index = carrito.findIndex((p) => p.id === producto.id);
        if (index !== -1) {
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    });

    
    const botonesContainer = document.createElement("div");
    botonesContainer.classList.add("botones-producto");
    botonesContainer.appendChild(buttonAgregar);
    botonesContainer.appendChild(buttonEliminar);

    div.appendChild(botonesContainer);
    contenedor1.appendChild(div);
});
}



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

    
    localStorage.setItem("carrito", JSON.stringify(carrito));

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
const codigosDescuento = {
    "NOEL20": 20,
    "PRIMERACOMPRA": 15,
    "MEGADESCUENTO":50,
    "CLIENTEVIP": 30
};
Swal.fire({
    title: 'Datos de la tarjeta 💳',
    html: `
    <input id="nombre-tarjeta" class="swal2-input" placeholder="Nombre en la tarjeta">
    <input id="numero-tarjeta" class="swal2-input" placeholder="Número de tarjeta (16 dígitos)">
    <input id="vencimiento" class="swal2-input" placeholder="MM/AA">
    <input id="cvv" class="swal2-input" placeholder="CVV">
    <input id="descuento" class="swal2-input" placeholder="Código de descuento (opcional)">
    `,
    confirmButtonText: 'Pagar $' + compra,
    focusConfirm: false,
    didOpen: () => {
        const vencimientoInput = document.getElementById("vencimiento");
        const numeroTarjetaInput = document.getElementById("numero-tarjeta");


        vencimientoInput.addEventListener("input", () => {
            let value = vencimientoInput.value.replace(/\D/g, ''); 
            if (value.length >= 3) {
                vencimientoInput.value = value.slice(0, 2) + '/' + value.slice(2, 4);
            } else {
                vencimientoInput.value = value;
            }
        });

        numeroTarjetaInput.addEventListener("input", () => {
            let value = numeroTarjetaInput.value.replace(/\D/g, '');
            value = value.slice(0, 16);
            let formateado = '';
            for (let i = 0; i < value.length; i += 4) {
                if (i > 0) formateado += '-';
                formateado += value.substring(i, i + 4);
            }
            numeroTarjetaInput.value = formateado;
        });
    },
    preConfirm: () => {
    const nombre = document.getElementById('nombre-tarjeta').value;
    const numero = document.getElementById('numero-tarjeta').value;
    const vencimiento = document.getElementById('vencimiento').value;
    const cvv = document.getElementById('cvv').value;
    const codigo = document.getElementById('descuento').value.trim().toUpperCase();

    if (!nombre || !numero || !vencimiento || !cvv) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
    }

    const numeroLimpio = numero.replace(/\D/g, '');
    if(numeroLimpio.length !== 16 || isNaN(numeroLimpio)){
        swal.showValidationMessage('Número de tarjeta invalidó')
    }

    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
    Swal.showValidationMessage('Formato de vencimiento inválido (MM/AA)');
}


    if (cvv.length !== 3 || isNaN(cvv)) {
        Swal.showValidationMessage('CVV inválido');
    }

    return { nombreTarjeta: nombre, codigo };
    }
}).then((result) => {
    if (result.isConfirmed) {
        const codigoIngresado = result.value.codigo;
        const porcentajeDescuento = codigosDescuento[codigoIngresado] || 0;
        const descuentoAplicado = compra * (porcentajeDescuento / 100);
        const totalConDescuento = compra - descuentoAplicado;
    
    
    
    Swal.fire({
    icon: 'success',
    title: `¡Gracias, ${result.value.nombreTarjeta}!`,
    html:`
    <p>Tu compra fue Aprobada.</p>
    ${porcentajeDescuento > 0
        ?  `<p>Codigo <strong>${codigoIngresado}</strong> aplicado: ${porcentajeDescuento}% OFF</p>
            <p><strong>Total Final: $${totalConDescuento.toFixed(2)}</strong></p>`
        :  `<p>Total: $${compra}</p>`}
    `,
    confirmButtonColor: '#28a745'    


    
    
});

    

    carrito.length = 0;
    actualizarCarrito();
    }
  });






});



document.getElementById("botonVaciar").addEventListener("click", () => {
    swal.fire({
    title: "¿Estas seguro de Vaciar el carrito?",
    icon:"warning",
    showCancelButton:true,
    confirmButtonText: "Si, Vaciar"

    }).then(result => {
        if (result.isConfirmed){
            carrito.length = 0; 
            actualizarCarrito();

            document.getElementById("lista").innerHTML = "";
        }
    })
    
});








document.getElementById("ver-descuentos").addEventListener("click", () =>{
Toastify({
    text: "¡Descuento Exlusivo para vos aprovechalo!",
    duration:3000,
    gravity: "bottom",
    position: "right",
    style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        color: "#fff",
        fontWeight: "bold",
    }
    
}).showToast();

setTimeout(()=>{
    window.location.href = "descuentos.html";

},1500);

});



function copiarCodigo(codigo) {
    const inputTemp = document.createElement("input");
    inputTemp.value = codigo;
    document.body.appendChild(inputTemp);
    inputTemp.select();
    document.execCommand("copy");
    document.body.removeChild(inputTemp);

    Swal.fire({
        toast:true,
        position:'top-end',
        icon:'success',
        title:`Código Copiado: ${codigo}`,
        showConfirmButton: false,
        timer:2000,
        timerProgressBar: true

    });

    setTimeout(()=> {
        window.location.href = "index.html"
    }, 1000);
}


window.addEventListener("DOMContentLoaded", () => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
        carrito = JSON.parse(guardado);
        actualizarCarrito();
    }
});









