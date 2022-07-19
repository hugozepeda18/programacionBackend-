class productDto{
    constructor(productoData){
        this.nombre = productoData.nombre
        this.id = productoData.id
        this.precio = productoData.precio
        this.descripcion = productoData.descripcion
        this.codigo = productoData.codigo
        this.url = productoData.url
        this.stock = productoData.stock
        this.shoppingCar = productoData.shoppingCar
    }
}

export default productDto 