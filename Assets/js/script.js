// Carrito funcional
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Botones agregar (en index y producto)
const botones = document.querySelectorAll(".agregar");
botones.forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.dataset.nombre;
        const precio = Number(btn.dataset.precio);

        const existente = carrito.find(p => p.nombre === nombre);

        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }

        actualizarCarrito();
        alert(`${nombre} agregado al carrito`);
    });
});

// Mostrar carrito en carrito.html
const lista = document.getElementById("carrito-lista");
const totalTexto = document.getElementById("total");
const vaciar = document.getElementById("vaciar");

if (lista) {
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} x${item.cantidad} — $${item.precio * item.cantidad}`;
        lista.appendChild(li);

        total += item.precio * item.cantidad;
    });

    totalTexto.textContent = `Total: $${total}`;

    vaciar.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        location.reload();
    });
}
