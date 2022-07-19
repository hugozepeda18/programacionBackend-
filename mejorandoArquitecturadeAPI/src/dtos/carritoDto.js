class carritoDto{
    constructor(carritoData){
        this.id = carritoData.id
        this.products = [] 

        carritoData.products.forEach(prod => {
            this.products.push(
                {
                    'nombre': prod['nombre'],
                    'id': prod['id'],
                    'precio': prod['precio'],
                    'descripcion': prod['descripcion'],
                    'codigo': prod['codigo'],
                    'url': prod['url'],
                    'stock': prod['stock']
                }
            )
        })


    }
}


export default carritoDto 