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

// Elementos DOM de Café
const container = document.getElementById("cards-container");
const detalleContainer = document.getElementById("detalle-container");
const navHome = document.getElementById("nav-home");

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

  const botonesVerMas = container.querySelectorAll(".btn-ver-mas");
  botonesVerMas.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      mostrarDetalle(id);
    });
  });
}

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
  window.scrollTo({ top: 0, behavior: "smooth" });

  document.getElementById("btn-volver").addEventListener("click", regresarInicio);
}

function regresarInicio() {
  detalleContainer.style.display = "none";
  container.style.display = ""; 
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Variables para paginación de Pokémon
let pokemonOffset = 0;
const pokemonLimit = 12;

async function fetchPokemons() {
  const pokemonContainer = document.getElementById('pokemon-container');
  if (!pokemonContainer) return;

  try {
    if (pokemonOffset === 0) {
      pokemonContainer.innerHTML = '<p>Cargando Pokémon...</p>';
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${pokemonOffset}`);
    const data = await response.json();

    if (pokemonOffset === 0) {
      pokemonContainer.innerHTML = '';
    }

    for (const pokemon of data.results) {
      const resDetail = await fetch(pokemon.url);
      const pokeData = await resDetail.json();

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
        <div class="card-body">
          <h3>${pokeData.name.toUpperCase()}</h3>
          <button class="btn-ver-mas" onclick="showPokemonDetails('${pokemon.url}')">Ver más</button>
        </div>
      `;
      pokemonContainer.appendChild(card);
    }

    pokemonOffset += pokemonLimit;

  } catch (error) {
    console.error('Error al obtener Pokémon:', error);
    pokemonContainer.innerHTML = '<p>No se pudieron cargar los Pokémon. Verifica tu conexión a internet.</p>';
  }
}

async function showPokemonDetails(url) {
  const modal = document.getElementById('pokemon-modal');
  const modalDetails = document.getElementById('modal-details');

  try {
    const response = await fetch(url);
    const data = await response.json();

    const types = data.types.map(t => t.type.name).join(', ');
    const abilities = data.abilities.map(a => a.ability.name).join(', ');

    modalDetails.innerHTML = `
      <h2>${data.name.toUpperCase()} (#${data.id})</h2>
      <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" alt="${data.name}">
      <p><strong>Altura:</strong> ${(data.height / 10)} m</p>
      <p><strong>Peso:</strong> ${(data.weight / 10)} kg</p>
      <p><strong>Tipos:</strong> ${types}</p>
      <p><strong>Habilidades:</strong> ${abilities}</p>
    `;

    modal.classList.remove('hidden');
  } catch (error) {
    console.error('Error al obtener detalle del Pokémon:', error);
  }
}

// ==========================================
// LÓGICA DE INSTALACIÓN Y DETECCIÓN DE PWA
// ==========================================
let deferredPrompt = null;

function checkAppInstalled() {
  const btnInstalar = document.getElementById('btn-instalar');
  const installedMsg = document.getElementById('installed-msg');

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone === true;
  const wasInstalledBefore = localStorage.getItem('pwaInstalled') === 'true';

  if (isStandalone || wasInstalledBefore) {
    if (btnInstalar) btnInstalar.classList.add('hidden');
    if (installedMsg) installedMsg.classList.remove('hidden');
    return true;
  }
  return false;
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btnInstalar = document.getElementById('btn-instalar');
  const installedMsg = document.getElementById('installed-msg');

  if (!checkAppInstalled() && btnInstalar) {
    btnInstalar.classList.remove('hidden');
    if (installedMsg) installedMsg.classList.add('hidden');
  }
});

// Inicialización general al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  checkAppInstalled();
  renderCards();

  const btnInstalar = document.getElementById('btn-instalar');
  const installedMsg = document.getElementById('installed-msg');

  if (btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
      if (!deferredPrompt) {
        alert('Para instalar esta app:\n- En Android/Chrome: Toca los 3 puntos arriba a la derecha y selecciona "Instalar aplicación".\n- En iPhone/Safari: Toca el botón "Compartir" y selecciona "Agregar al inicio".');
        return;
      }

      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        localStorage.setItem('pwaInstalled', 'true');
        btnInstalar.classList.add('hidden');
        if (installedMsg) installedMsg.classList.remove('hidden');
      }
      deferredPrompt = null;
    });
  }

  if (navHome) {
    navHome.addEventListener("click", () => {
      regresarInicio();
      document.getElementById('section-cafe').style.display = 'block';
      document.getElementById('section-pokemon').style.display = 'none';
      document.getElementById('tab-cafe').classList.add('active-tab');
      document.getElementById('tab-pokemon').classList.remove('active-tab');
    });
  }

  const tabCafe = document.getElementById('tab-cafe');
  const tabPokemon = document.getElementById('tab-pokemon');
  const sectionCafe = document.getElementById('section-cafe');
  const sectionPokemon = document.getElementById('section-pokemon');

  if (tabCafe && tabPokemon) {
    tabCafe.addEventListener('click', () => {
      sectionCafe.style.display = 'block';
      sectionPokemon.style.display = 'none';
      tabCafe.classList.add('active-tab');
      tabPokemon.classList.remove('active-tab');
    });

    tabPokemon.addEventListener('click', () => {
      sectionCafe.style.display = 'none';
      sectionPokemon.style.display = 'block';
      tabPokemon.classList.add('active-tab');
      tabCafe.classList.remove('active-tab');
      
      const pokemonContainer = document.getElementById('pokemon-container');
      if (pokemonContainer && pokemonContainer.children.length === 0) {
        fetchPokemons();
      }
    });
  }

  const btnCargarMas = document.getElementById('btn-cargar-mas');
  if (btnCargarMas) {
    btnCargarMas.addEventListener('click', () => {
      fetchPokemons();
    });
  }

  const modal = document.getElementById('pokemon-modal');
  const closeBtn = document.getElementById('close-modal');
  
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
});

window.addEventListener('appinstalled', () => {
  localStorage.setItem('pwaInstalled', 'true');
  const btnInstalar = document.getElementById('btn-instalar');
  const installedMsg = document.getElementById('installed-msg');

  if (btnInstalar) btnInstalar.classList.add('hidden');
  if (installedMsg) installedMsg.classList.remove('hidden');
  deferredPrompt = null;
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