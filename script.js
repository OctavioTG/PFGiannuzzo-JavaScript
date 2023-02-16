async function peticion() {
  const resp = await fetch("./productos.json")
  const productosDB = await resp.json()
  miPrograma(productosDB)
}
peticion()

function miPrograma(productos) {
  let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []

let productBox = document.querySelector("#productBox");
let carritoBox = document.querySelector("#carritoBox");

renderProductos(productos);

function renderProductos(productos) {
  productBox.innerHTML = "";
  productos.forEach((producto) => {
    let productCard = document.createElement("div");
    productCard.classList.add("producto", "mt-3");

    productCard.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.edad}</p>
        <p>$${producto.precio}</p>
        <img class="img" src=${producto.img} />
        <button class="button d-block" id=${producto.id}>AGREGAR AL CARRITO</button>
        `;
    productBox.append(productCard);
    let boton = document.getElementById(producto.id);
    boton.onclick = add;
  });
}

function add(e) {
  let id = e.target.id;
  let productoSelec = productos.find((producto) => producto.id == id);
  if (carrito.includes(productoSelec)) {
    let productRepetido = carrito.indexOf(productoSelec);
    carrito[productRepetido].unidades++;
  } else (productoSelec.unidades = 1), carrito.push(productoSelec);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Toastify({
    text: "Producto Agregado",

    duration: 2000,
  }).showToast();
  renderCarrito();
}

function renderCarrito() {
  let totalCarrito = carrito.reduce(
    (acum, carrito) => acum + carrito.unidades * carrito.precio,
    0
  );
  carritoBox.innerHTML = `
    <p>Su Total es = $${totalCarrito}</p>
    `;
  carrito.forEach((producto) => {
    let carritoCard = document.createElement("div");
    carritoCard.classList.add("m-3");
    carritoCard.innerHTML += `
        <h5>${producto.nombre}</h5>
        <p>${producto.edad}</p>
        <p>Unidades:${producto.unidades}</p>
        `;
    carritoBox.appendChild(carritoCard);
  });
}
renderCarrito();

let comprar = document.getElementById("comprar");
comprar.addEventListener("click", finalizarCompra);

function finalizarCompra() {
  localStorage.removeItem("carrito");
  Swal.fire("Compra Exitosa", "Gracias por elegirnos", "success");
  carrito = [];
  renderCarrito();
}

let vaciar = document.getElementById("vaciar");
vaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  Toastify({
    text: "Productos Eliminados",
    duration: 2000,
  }).showToast();
  carrito = [];
  renderCarrito();
}

// Filtro
let buscador = document.querySelector("#buscador");
let btnBuscador = document.querySelector("#btnBuscador");

function filtrar() {
  let filtrado = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(buscador.value.toLowerCase())
  );
  renderProductos(filtrado);
}

btnBuscador.onclick = filtrar;

let perro = document.getElementById("perro");
perro.onclick = filtrarCategoria;
let gato = document.getElementById("gato");
gato.onclick = filtrarCategoria;
let adulto = document.getElementById("adulto");
adulto.onclick = filtrarEdad;
let cachorro = document.getElementById("cachorro");
cachorro.onclick = filtrarEdad;

function filtrarCategoria(e) {
  let btnCategoria = productos.filter(
    ({ categoria }) => categoria === e.target.id
  );
  renderProductos(btnCategoria);
}

function filtrarEdad(e) {
  let btnEdad = productos.filter(({ edad }) => edad === e.target.id);
  renderProductos(btnEdad);
}
}