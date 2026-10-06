javascript
// ===============================
// MENU PARA CELULARES
// ===============================

function mostrarMenu() {

    const nav = document.querySelector("nav");

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
}


// ===============================
// MODAL DE TUTORIALES
// ===============================

function mostrarTutorial(titulo, texto) {

    document.getElementById("modalTitulo").textContent = titulo;
    document.getElementById("modalTexto").textContent = texto;

    document.getElementById("modal").style.display = "flex";
}


function cerrarTutorial() {

    document.getElementById("modal").style.display = "none";
}


// Cerrar modal al hacer clic fuera

window.onclick = function(event) {

    const modal = document.getElementById("modal");

    if (event.target === modal) {
        modal.style.display = "none";
    }
};


// ===============================
// BUSCADOR DE TUTORIALES
// ===============================

function buscarTutorial() {

    const texto = document
        .getElementById("buscador")
        .value
        .toLowerCase();

    const tutoriales = document.querySelectorAll(".tutorial");

    tutoriales.forEach(function(tutorial) {

        const contenido = tutorial.textContent.toLowerCase();

        if (contenido.includes(texto)) {
            tutorial.style.display = "block";
        } else {
            tutorial.style.display = "none";
        }

    });
}


// ===============================
// CARRITO DE COMPRAS
// ===============================

let carrito = [];

function agregarCarrito(nombre, precio) {

    carrito.push({
        nombre: nombre,
        precio: precio
    });

    actualizarCarrito();

    alert(nombre + " fue agregado al carrito.");
}


function actualizarCarrito() {

    document.getElementById("cantidad").textContent =
        carrito.length;

    let total = 0;

    carrito.forEach(function(producto) {
        total += producto.precio;
    });

    document.getElementById("total").textContent =
        total.toFixed(2);
}


function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();

    alert("El carrito ha sido vaciado.");
}


// ===============================
// FORMULARIO DE CONTACTO
// ===============================

function enviarFormulario(event) {

    event.preventDefault();

    const nombre =
        document.getElementById("nombre").value;

    alert(
        "Gracias " +
        nombre +
        ". Tu mensaje ha sido enviado correctamente."
    );

    document.querySelector("form").reset();
}


// ===============================
// CERRAR MENÚ AL SELECCIONAR
// ===============================

const enlaces = document.querySelectorAll("nav a");

enlaces.forEach(function(enlace) {

    enlace.addEventListener("click", function() {

        if (window.innerWidth <= 900) {
            document.querySelector("nav").style.display = "none";
        }

    });

});
