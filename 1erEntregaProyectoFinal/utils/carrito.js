class carrito {
    static carritoMap = []
    constructor(){
        console.log(carrito.carritoMap)
    }

    add(){
        const id = carrito.carritoMap.length + 1
        const carritoNuevo = {}
        carrito.carritoMap.push(carritoNuevo)
        return id
    }

    remove(id){
        id--
        const carritoIdx = carrito.carritoMap.findIndex(element => element.id === id)
        const delCarrito = carrito.carritoMap.splice(carritoIdx, 1)
        return delCarrito
    }

}