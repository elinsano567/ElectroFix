// ===============================
// CARRITO DE COMPRAS
// ===============================
let carrito = [];

window.agregarCarrito = function (nombre, precio) {
    const precioNumerico = Number(precio);
    if (!nombre || !Number.isFinite(precioNumerico) || precioNumerico < 0) {
        alert("No se pudo agregar este producto. Inténtalo nuevamente.");
        return;
    }
    const existente = carrito.find(producto => producto.nombre === nombre);
    if (existente) existente.cantidad += 1;
    else carrito.push({ nombre: nombre, precio: precioNumerico, cantidad: 1 });
    actualizarCarrito();
};

function actualizarCarrito() {
    const cantidadElemento = document.getElementById("cantidad");
    const totalElemento = document.getElementById("total");
    const lista = document.getElementById("listaCarrito");
    const cantidadTotal = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
    const total = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

    if (cantidadElemento) cantidadElemento.textContent = cantidadTotal;
    if (totalElemento) totalElemento.textContent = total.toFixed(2);
    if (!lista) return;

    lista.replaceChildren();
    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "cart-empty";
        mensaje.textContent = "Tu carrito está vacío. Agrega productos desde la tienda.";
        lista.appendChild(mensaje);
        return;
    }

    carrito.forEach((producto, indice) => {
        const fila = document.createElement("div");
        fila.className = "cart-item";
        const informacion = document.createElement("div");
        informacion.className = "cart-item-info";
        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;
        const detalle = document.createElement("span");
        detalle.textContent = "$" + producto.precio.toFixed(2) + " c/u · Cantidad: " + producto.cantidad;
        informacion.append(nombre, detalle);

        const subtotal = document.createElement("strong");
        subtotal.className = "cart-subtotal";
        subtotal.textContent = "$" + (producto.precio * producto.cantidad).toFixed(2);

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "cart-remove";
        eliminar.textContent = "Eliminar";
        eliminar.setAttribute("aria-label", "Eliminar " + producto.nombre);
        eliminar.addEventListener("click", function () {
            carrito.splice(indice, 1);
            actualizarCarrito();
        });
        fila.append(informacion, subtotal, eliminar);
        lista.appendChild(fila);
    });
}

window.vaciarCarrito = function () {
    carrito = [];
    actualizarCarrito();
};
actualizarCarrito();

// ===============================
// FUNCIONES GENERALES DE ELECTROFIX
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    // MENÚ PARA CELULARES
    window.mostrarMenu = function () {
        const nav = document.querySelector("nav");
        if (!nav) return;

        if (nav.style.display === "flex") {
            nav.style.display = "none";
        } else {
            nav.style.display = "flex";
            nav.style.flexDirection = "column";
            nav.style.position = "absolute";
            nav.style.top = "75px";
            nav.style.right = "0";
            nav.style.background = "white";
            nav.style.padding = "25px";
            nav.style.width = "220px";
            nav.style.boxShadow = "0 10px 25px rgba(0,0,0,.1)";
        }
    };

    // MODAL DE TUTORIALES
    window.mostrarTutorial = function (titulo, texto) {
        const modalTitulo = document.getElementById("modalTitulo");
        const modalTexto = document.getElementById("modalTexto");
        const modal = document.getElementById("modal");

        if (modalTitulo) modalTitulo.textContent = titulo;
        if (modalTexto) modalTexto.textContent = texto;
        if (modal) modal.style.display = "flex";
    };

    window.cerrarTutorial = function () {
        const modal = document.getElementById("modal");
        if (modal) modal.style.display = "none";
    };

    // CERRAR MODAL AL HACER CLIC FUERA
    window.addEventListener("click", function (event) {
        const modal = document.getElementById("modal");
        if (modal && event.target === modal) modal.style.display = "none";
    });

    // VISOR: ampliar las imágenes de los productos al hacer clic
    document.querySelectorAll(".product-image img").forEach(function (imagen) {
        imagen.classList.add("imagen-ampliable");
        imagen.setAttribute("tabindex", "0");
        imagen.setAttribute("role", "button");
        imagen.setAttribute("aria-label", "Ampliar imagen: " + (imagen.alt || "producto"));
        imagen.addEventListener("click", function () {
            const visor = document.getElementById("visorProducto");
            const ampliada = document.getElementById("imagenAmpliada");
            const nombre = document.getElementById("nombreImagenProducto");
            if (!visor || !ampliada) return;
            ampliada.src = imagen.src;
            ampliada.alt = imagen.alt;
            if (nombre) nombre.textContent = imagen.closest(".product")?.querySelector("h3")?.textContent || imagen.alt;
            visor.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
        imagen.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                imagen.click();
            }
        });
    });

    window.cerrarImagenProducto = function (event, forzar) {
        const visor = document.getElementById("visorProducto");
        if (!visor) return;
        if (forzar || event.target === visor) {
            visor.style.display = "none";
            document.body.style.overflow = "";
        }
    };

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") window.cerrarImagenProducto({ target: document.getElementById("visorProducto") });
    });

    // BUSCADOR DE TUTORIALES
    window.buscarTutorial = function () {
        const buscador = document.getElementById("buscador");
        if (!buscador) return;

        const texto = buscador.value.toLowerCase();
        document.querySelectorAll(".tutorial").forEach(function (tutorial) {
            tutorial.style.display = tutorial.textContent.toLowerCase().includes(texto) ? "block" : "none";
        });
    };

    // FORMULARIO DE CONTACTO
    window.enviarFormulario = function (event) {
        event.preventDefault();

        const nombreElemento = document.getElementById("nombre");
        if (!nombreElemento) return;

        alert("Gracias " + nombreElemento.value + ". Tu mensaje ha sido enviado correctamente.");

        const formulario = document.querySelector("#contacto form");
        if (formulario) formulario.reset();
    };

    // CERRAR MENÚ AL SELECCIONAR
    document.querySelectorAll("nav a").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            if (window.innerWidth <= 900) {
                const nav = document.querySelector("nav");
                if (nav) nav.style.display = "none";
            }
        });
    });
});
