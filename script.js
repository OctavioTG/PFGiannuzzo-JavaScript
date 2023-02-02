let productos = [
    {id: 1, nombre: "KEN-L", categoria: "perro", precio: 7000, img:"./imgs/kenL.png"},
    {id: 3, nombre: "EXCELENT", categoria: "perro", precio: 9500, img:"./imgs/excellent.png"},
    {id: 4, nombre: "CAT-CHOW", categoria: "gato", precio: 8000, img:"./imgs/catChow.png"},
    {id: 2, nombre: "GATI", categoria: "gato", precio: 6500, img:"./imgs/gati.png"},
]

let productBox = document.querySelector("#productBox")
let carritoBox = document.querySelector("#carritoBox")

let carrito = []
if (localStorage.getItem("carrito")) {
    let carritoEnJSON = localStorage.getItem("carrito")
    carrito = JSON.parse(carritoEnJSON)}

function renderProductos() {
    productos.forEach(producto => {
        let productCard = document.createElement("div")
        productCard.classList.add("producto")
        
        productCard.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <img class="img" src=${producto.img} />
        <button class="button" id=${producto.id}>AGREGAR AL CARRITO</button>
        `
        productBox.append(productCard)
        let boton = document.getElementById(producto.id)
        boton.onclick = add
    })
}
renderProductos()

function add(e) {
    let id = e.target.id
    let productoSelec = productos.find(producto => producto.id == id)
    if(carrito.includes(productoSelec)){
        let productRepetido = carrito.indexOf(productoSelec)
        carrito[productRepetido].unidades++
    }else(
        productoSelec.unidades = 1,
        carrito.push(productoSelec)
    )
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()
}

function renderCarrito() {
    let totalCarrito = carrito.reduce((acum, carrito) => acum + carrito.unidades * carrito.precio, 0)
    carritoBox.innerHTML = `
    <h2 class="m-3">Carrito:</h2>
    <p>Su Total es = $${totalCarrito}</p>
    `
    carrito.forEach(producto => {
        let carritoCard = document.createElement("div")
        carritoCard.classList.add("m-3")
        carritoCard.innerHTML +=`
        <h5>${producto.nombre}</h5>
        <p>Unidades:${producto.unidades}</p>
        `
        carritoBox.appendChild(carritoCard)
    })

}

let comprar = document.getElementById("comprar")
comprar.addEventListener("click", finalizarCompra)

function finalizarCompra() {
    localStorage.removeItem("carrito")
    carrito = []
    renderCarrito()
}

console.log(carrito);