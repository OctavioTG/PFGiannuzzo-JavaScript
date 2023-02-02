let productos = [
    {id: 1, nombre: "KEN-L", categoria: "perro", precio: 7000, img:"./imgs/kenL.png", unidades:1},
    {id: 3, nombre: "EXCELENT", categoria: "perro", precio: 9500, img:"./imgs/excellent.png", unidades:1},
    {id: 4, nombre: "CAT-CHOW", categoria: "gato", precio: 8000, img:"./imgs/catChow.png", unidades:1},
    {id: 2, nombre: "GATI", categoria: "gato", precio: 6500, img:"./imgs/gati.png", unidades:1},
]

let productBox = document.querySelector("#productBox")
let carritoBox = document.querySelector("#carritoBox")

let carrito = []
console.log(carrito)

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
        carrito.push(productoSelec)
    )
    renderCarrito()
}

function renderCarrito() {
    carritoBox.innerHTML = `<h2 class="m-3">Carrito:</h2>`
    carrito.forEach(producto => {
        let carritoCard = document.createElement("div")
        carritoCard.classList.add("carrito")
        carritoCard.innerHTML +=`
        <h3>${producto.nombre}</h3>
        <p>${producto.unidades}</p>
        <img class="img" src=${producto.img} />
        `
        carritoBox.appendChild(carritoCard)
    })
}

