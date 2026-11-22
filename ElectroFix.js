// ===============================
// CARRITO DE COMPRAS
// Se declara fuera de DOMContentLoaded para que los botones
// del HTML puedan acceder siempre a estas funciones.
// ===============================
let carrito = [];

window.agregarCarrito = function (nombre, precio) {
    const precioNumerico = Number(precio);

    if (!nombre || !Number.isFinite(precioNumerico) || precioNumerico < 0) {
        console.error("No se pudo agregar el producto: datos inválidos.", { nombre, precio });
        alert("No se pudo agregar este producto. Inténtalo nuevamente.");
        return;
    }

    carrito.push({ nombre: nombre, precio: precioNumerico });
    actualizarCarrito();
    alert(nombre + " fue agregado al carrito.");
};

function actualizarCarrito() {
    const cantidad = document.getElementById("cantidad");
    const totalElemento = document.getElementById("total");

    if (cantidad) cantidad.textContent = carrito.length;

    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
    if (totalElemento) totalElemento.textContent = total.toFixed(2);
}

window.vaciarCarrito = function () {
    carrito = [];
    actualizarCarrito();
    alert("El carrito ha sido vaciado.");
};

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
