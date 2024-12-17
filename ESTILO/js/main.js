




async function cargarProductosDesdeGoogleSheets() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7SAlwFzHid3f8eFdy9sWxQ0ODQXfZcKChxDh4StatB9NEuCKtILjvCFwWRstBTgQ-wZrDt-ACRpKo/pubhtml?gid=0&single=true";

    try {
        const response = await fetch(url);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const table = doc.querySelector("table");

        if (!table) {
            console.error("No se encontró una tabla en el enlace proporcionado.");
            return;
        }

        const rows = table.querySelectorAll("tr");
        const productos = [];
        rows.forEach((row, index) => {
            if (index === 0) return;

            const cells = row.querySelectorAll("td");
            const producto = {
                nombre: cells[0]?.innerText.trim(),
                precio: parseFloat(cells[1]?.innerText.trim() || "0"),
                img: cells[2]?.innerText.trim(),
                descripcion: cells[3]?.innerText.trim(),
                tipo:cells[4]?.innerText.trim(),
            };
            productos.push(producto);
        });

        mostrarElectronicos(productos);
        mostrarBaterias(productos);
    } catch (error) {
        console.error("Error al cargar los productos desde Google Sheets:", error);
    }
}

function mostrarBaterias(productos) {
    const contenedorProductos = document.getElementById("baterias");
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        if (producto.tipo == 'bateria'){
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h5>${producto.nombre}</h5>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p id="descripcion-producto"><strong>Descripción:</strong> ${producto.descripcion}</p>
            <button class="agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Añadir al carrito</button>
        `;
        contenedorProductos.appendChild(div);
        }
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

function mostrarElectronicos(productos) {
    const contenedorProductos = document.getElementById("electronicos");
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        if (producto.tipo == 'electronico'){
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h5>${producto.nombre}</h5>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p id="descripcion-producto"><strong>Descripción:</strong> ${producto.descripcion}</p>
            <button class="agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Añadir al carrito</button>
        `;
        contenedorProductos.appendChild(div);
        }
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

const carrito = [];
const listaCarrito = document.getElementById("listaCarrito");
const totalDisplay = document.getElementById("totalDisplay");
const cantidadCarrito = document.getElementById("cantidadCarrito");

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
        li.classList.add("item-carrito");
        li.innerHTML = `
            <div class="producto">
                <h5>${item.nombre}</h5>
                <p>${item.cantidad} x $${item.precio.toFixed(2)}</p>
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
    const numero = "+593993898590";
    let mensaje = "Carrito de compras:\n\n";
    carrito.forEach(item => {
        mensaje += `${item.nombre} - ${item.cantidad} x $${item.precio.toFixed(2)}\n`;
    });
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

cargarProductosDesdeGoogleSheets();

