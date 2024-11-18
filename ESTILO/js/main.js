const carrito = [];
const carritoPanel = document.getElementById("carrito-panel");
const listaCarrito = document.getElementById("lista-carrito");
const totalDisplay = document.getElementById("total");
const cantidadCarrito = document.getElementById("cantidad-carrito");

document.querySelectorAll(".agregar-carrito").forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);
        agregarAlCarrito(nombre, precio);
        actualizarCarrito();
    });
});

document.getElementById("carrito-icono").addEventListener("click", () => {
    carritoPanel.classList.toggle("mostrar");
});

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
}

function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("item-carrito");
        li.innerHTML = `
            <div class="producto">
                <h5>${item.nombre}</h5><p>${item.cantidad} x $${item.precio}</p>
            </div>
            <div>
                <button class="aumentar" onclick="aumentarCantidad('${item.nombre}')">Agregar</button>
                <button class="eliminar" onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    cantidadCarrito.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

function aumentarCantidad(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad++;
    }
    actualizarCarrito();
}

function eliminarDelCarrito(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito.splice(carrito.indexOf(producto), 1);
    }
    actualizarCarrito();
}

function enviarWhatsApp() {
    const numero = "+593963311000"; // Número de WhatsApp
    let mensaje = `Hola! Aquí está tu carrito:\n\n`;
    carrito.forEach(item => {
        mensaje += `${item.nombre} - ${item.cantidad} x $${item.precio}\n`;
    });
    mensaje += `\nTotal: $${totalDisplay.textContent.split(' ')[1]}`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
}
