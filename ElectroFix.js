// ===============================
// ESPERAR A QUE CARGUE EL HTML
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // MENU PARA CELULARES
    // ===============================

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


    // ===============================
    // MODAL DE TUTORIALES
    // ===============================

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

        if (modal) {
            modal.style.display = "none";
        }
    };


    // ===============================
    // CERRAR MODAL AL HACER CLIC FUERA
    // ===============================

    window.addEventListener("click", function (event) {

        const modal = document.getElementById("modal");

        if (modal && event.target === modal) {
            modal.style.display = "none";
        }
    });


    // ===============================
    // BUSCADOR DE TUTORIALES
    // ===============================

    window.buscarTutorial = function () {

        const buscador = document.getElementById("buscador");

        if (!buscador) return;

        const texto = buscador.value.toLowerCase();

        const tutoriales = document.querySelectorAll(".tutorial");

        tutoriales.forEach(function (tutorial) {

            const contenido = tutorial.textContent.toLowerCase();

            if (contenido.includes(texto)) {
                tutorial.style.display = "block";
            } else {
                tutorial.style.display = "none";
            }

        });
    };


    // ===============================
    // CARRITO DE COMPRAS
    // ===============================

    let carrito = [];


    window.agregarCarrito = function (nombre, precio) {

        carrito.push({
            nombre: nombre,
            precio: Number(precio)
        });

        actualizarCarrito();

        alert(nombre + " fue agregado al carrito.");
    };


    function actualizarCarrito() {

        const cantidad = document.getElementById("cantidad");
        const totalElemento = document.getElementById("total");

        if (cantidad) {
            cantidad.textContent = carrito.length;
        }

        let total = 0;

        carrito.forEach(function (producto) {
            total += producto.precio;
        });

        if (totalElemento) {
            totalElemento.textContent = total.toFixed(2);
        }
    }


    window.vaciarCarrito = function () {

        carrito = [];

        actualizarCarrito();

        alert("El carrito ha sido vaciado.");
    };


    // ===============================
    // FORMULARIO DE CONTACTO
    // ===============================

    window.enviarFormulario = function (event) {

        event.preventDefault();

        const nombreElemento = document.getElementById("nombre");

        if (!nombreElemento) return;

        const nombre = nombreElemento.value;

        alert(
            "Gracias " +
            nombre +
            ". Tu mensaje ha sido enviado correctamente."
        );

        const formulario = document.querySelector("form");

        if (formulario) {
            formulario.reset();
        }
    };


    // ===============================
    // CERRAR MENÚ AL SELECCIONAR
    // ===============================

    const enlaces = document.querySelectorAll("nav a");

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            if (window.innerWidth <= 900) {

                const nav = document.querySelector("nav");

                if (nav) {
                    nav.style.display = "none";
                }

            }

        });

    });

});
