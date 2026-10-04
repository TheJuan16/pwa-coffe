
const productos = [
  { 
    id: 1, 
    titulo: "Café Exprés", 
    img: "img/cafe2.jpg", 
    descripcion: "Un café concentrado de sabor intenso y cuerpo denso. Se obtiene haciendo pasar agua caliente a alta presión a través de grano molido muy fino.",
    precio: "$35 MXN",
    origen: "Veracruz, México",
    notas: "Tostado oscuro, notas de chocolate amargo y frutos secos."
  },
  { 
    id: 2, 
    titulo: "Café Americano", 
    img: "img/cafe3.jpg", 
    descripcion: "Preparado al diluir un shot de espresso con agua caliente, conservando el aroma característico pero con un sabor más suave.",
    precio: "$40 MXN",
    origen: "Oaxaca, México",
    notas: "Cuerpo ligero, acidez equilibrada y toque sutil a nuez."
  },
  { 
    id: 3, 
    titulo: "Cappuccino", 
    img: "img/cafe4.jpg", 
    descripcion: "La combinación perfecta de tres partes iguales: espresso, leche al vapor y abundante espuma de leche aterciopelada.",
    precio: "$55 MXN",
    origen: "Chiapas, México",
    notas: "Cremoso, dulce natural de la leche con retrogusto a cacao."
  },
  { 
    id: 4, 
    titulo: "Café Latte", 
    img: "img/cafe5.png", 
    descripcion: "Bebida suave y cremosa donde la leche al vapor es la protagonista, combinada suavemente con una dosis de espresso.",
    precio: "$50 MXN",
    origen: "Puebla, México",
    notas: "Textura sedosa, sabor lácteo dominante con notas suaves de café."
  },
  { 
    id: 5, 
    titulo: "Café Mocha", 
    img: "img/cafe6.jpg", 
    descripcion: "Una variante dulce del latte que combina espresso, jarabe de chocolate artesanal, leche vaporizada y crema batida.",
    precio: "$60 MXN",
    origen: "Oaxaca, México",
    notas: "Sabor dulce e intenso a cacao con un toque reconfortante de café."
  },
  { 
    id: 6, 
    titulo: "Café Helado", 
    img: "img/cafe 7.jpg", 
    descripcion: "Café concentrado servido sobre una cama de cubos de hielo, perfecto para días calurosos.",
    precio: "$48 MXN",
    origen: "Veracruz, México",
    notas: "Refrescante, ligero y con amargor equilibrado."
  },
  { 
    id: 7, 
    titulo: "Caramel Macchiato", 
    img: "img/cafe8.jpg", 
    descripcion: "Leche al vapor manchada con un shot de espresso y decorada en la parte superior con un rejilla de caramelo dulce.",
    precio: "$65 MXN",
    origen: "Chiapas, México",
    notas: "Aroma a vainilla, cuerpo cremoso y final dulce de caramelo."
  },
  { 
    id: 8, 
    titulo: "Café Irlandés", 
    img: "img/cafe9.jpg", 
    descripcion: "Una legendaria bebida caliente compuesta de café, whisky, azúcar morena y una capa superior de crema batida.",
    precio: "$80 MXN",
    origen: "Mezcla Especial",
    notas: "Sabor licoroso, cálido, contraste entre frío y caliente."
  },
  { 
    id: 9, 
    titulo: "Frappé", 
    img: "img/cafe10.jpg", 
    descripcion: "Bebida helada y batida a alta velocidad con hielo picado, leche y una base de espresso cremoso.",
    precio: "$58 MXN",
    origen: "Puebla, México",
    notas: "Textura estilo granizado, dulce y sumamente refrescante."
  },
  { 
    id: 10, 
    titulo: "Café Especial", 
    img: "img/cofi.jpg", 
    descripcion: "Selección exclusiva de la casa procesada con método artesanal y granos cosechados a más de 1,400 metros de altura.",
    precio: "$70 MXN",
    origen: "Pluma Hidalgo, Oaxaca",
    notas: "Notas florales, acidez brillante y aroma a caramelo tostado."
  }
];

// Selección de elementos del DOM
const container = document.getElementById("cards-container");
const detalleContainer = document.getElementById("detalle-container");
const navHome = document.getElementById("nav-home");

// Renderizar las tarjetas dinámicamente
function renderCards() {
  if (!container) return;

  let cardsHTML = "";

  productos.forEach((producto) => {
    cardsHTML += `
      <div class="card">
        <img src="${producto.img}" alt="${producto.titulo}">
        <div class="card-body">
          <h3>${producto.titulo}</h3>
          <button class="btn-ver-mas" data-id="${producto.id}">Ver más</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = cardsHTML;

  // Asignar los eventos de clic a cada botón "Ver más"
  const botonesVerMas = container.querySelectorAll(".btn-ver-mas");
  botonesVerMas.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      mostrarDetalle(id);
    });
  });
}

// Función para mostrar los detalles de un café en particular
function mostrarDetalle(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  detalleContainer.innerHTML = `
    <div class="detalle-card">
      <button id="btn-volver" class="btn-volver">
        &#8592; Regresar al menú
      </button>

      <img src="${producto.img}" alt="${producto.titulo}">
      <h2>${producto.titulo}</h2>
      <p class="detalle-precio"><strong>Precio:</strong> ${producto.precio}</p>
      <p class="detalle-origen"><strong>Origen:</strong> ${producto.origen}</p>
      <p class="detalle-descripcion">${producto.descripcion}</p>
      <p class="detalle-notas"><strong>Perfil de sabor:</strong> ${producto.notas}</p>
    </div>
  `;

 
  container.style.display = "none";
  detalleContainer.style.display = "block";

  // Volver la pantalla arriba
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Evento para el botón de regresar
  document.getElementById("btn-volver").addEventListener("click", regresarInicio);
}

function regresarInicio() {
  detalleContainer.style.display = "none";
  container.style.display = ""; // Restablece al CSS original (display: grid)
  window.scrollTo({ top: 0, behavior: "smooth" });
}


document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  if (navHome) {
    navHome.addEventListener("click", regresarInicio);
  }
});

// Registro del Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceworker.js")
      .then((reg) => console.log("Service Worker registrado con éxito:", reg.scope))
      .catch((err) => console.error("Error al registrar el Service Worker:", err));
  });
}