const productos2 = [
    { 
        nombre: "LOVELEDI - 15000 mAh", 
        precio: 29.99, 
        img: "https://m.media-amazon.com/images/I/61EUFa99OtL._AC_UF1000,1000_QL80_FMwebp_.jpg", 
        descripcion: "Batería externa de alta capacidad, ideal para cargar varios dispositivos a la vez."
    },
    { 
        nombre: "JIGA - 30000 mAh", 
        precio: 34.99, 
        img: "https://m.media-amazon.com/images/I/61YbQo+JqJL._AC_SX569_.jpg", 
        descripcion: "Cargador portátil con capacidad de 30000 mAh, compatible con smartphones y tablets."
    },
    { 
        nombre: "TOZO - 20000 mAh", 
        precio: 29.99, 
        img: "https://m.media-amazon.com/images/I/61VU+ZfA3kL._AC_SX679_.jpg", 
        descripcion: "Powerbank ultradelgado con carga rápida, diseño compacto y liviano de 20000 mAh. "
    },
    { 
        nombre: "INIU - 20000 mAh",  
        precio: 49.99, 
        img: "https://m.media-amazon.com/images/I/51aZGPrKBbL._AC_SX679_.jpg", 
        descripcion: "Cargador portátil premium, diseño elegante y alta capacidad para dispositivos de alta carga."
    },
    {
        nombre: "Ruedas omnidireccionales",  
        precio: 12, 
        img: "https://avelectronics.cc/wp-content/uploads/2021/12/ma006-1.jpg", 
        descripcion:"Par De Ruedas Llantas Omnidireccionales 60mm"
    },
];

const productos = [
    {
        nombre: "Ruedas omnidireccionales",  
        precio: 12, 
        img: "https://avelectronics.cc/wp-content/uploads/2021/12/ma006-1.jpg", 
        descripcion:"Par De Ruedas Llantas Omnidireccionales 60mm"
    },
    {
        nombre: "ESP32-CAM",  
        precio: 12, 
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_894956-MEC54959362481_042023-F.webp", 
        descripcion:"ESP32-CAM ESP32-CAM-MB MICRO USB ESP32 Serial to WiFi ESP32 CAM Development Board CH340 CH340G 5V Bluetooth+OV2640 Camera"
    },
    {
        nombre: "SG90 Servo motor micro 9g 360",  
        precio: 2, 
        img: "https://ae-pic-a1.aliexpress-media.com/kf/Seaafa79b597b4c668412b98af6a46b36l/2-5-10-20pcs-SG90-Servo-motor-micro-9g-180-360-degree-mount-SG90-kit-without.jpg_.webp", 
        descripcion:"SG90 Servo motor micro 9g 360 degree mount SG90 kit without metal gear pro RC Car Toy Airplane Arduino UNO DIY"
    },
    {
        nombre: "Moto reductor DC",  
        precio: 2, 
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_734121-MEC74251876976_022024-F.webp", 
        descripcion:"Mgsystem Motor Reductor Motorreductor Biaxial Arduino Robot"
    },

];

const carrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const carritoPanel = document.getElementById("carrito-panel");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const totalDisplay = document.getElementById("total");

function cargarProductos() {
    const contenedorProductos = document.getElementById("productos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h5>${producto.nombre}</h5>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <button class="agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Añadir al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });

    document.querySelectorAll(".agregar-carrito").forEach(btn => {
        btn.addEventListener("click", () => {
            const nombre = btn.dataset.nombre;
            const precio = parseFloat(btn.dataset.precio);
            agregarAlCarrito(nombre, precio);
            actualizarCarrito();
        });
    });
}

document.getElementById("carrito-icono").addEventListener("click", () => {
    carritoPanel.classList.toggle("mostrar");
});

function agregarAlCarrito(nombre, precio) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
}

function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("item-carrito"); // Clase para estilos específicos
        li.innerHTML = `
            <div class="producto">
                <h5>${item.nombre}</h5><p1>${item.cantidad} x $${item.precio}</p1>
            </div>
            <div>
                <button class="aumentar" onclick="aumentarCantidad('${item.nombre}')">  Agregar</button>
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
    const numero = "+593963311000";
    let mensaje = "Carrito de compras:\n\n";
    carrito.forEach(item => {
        mensaje += `${item.nombre} - ${item.cantidad} x $${item.precio.toFixed(2)}\n`;
    });
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

cargarProductos();
