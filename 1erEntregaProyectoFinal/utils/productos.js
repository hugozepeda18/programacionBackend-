class Productos{
    static productosMap = []
    constructor(){
        console.log(Productos.productosMap)
    }

    add(prod){
        const id = Productos.productosMap.length + 1
        prod.id = id
        
        Productos.productosMap.push(prod)
        return prod
    }

    remove(id){
        const prodIdx = Productos.productosMap.findIndex(element => element.id === id)
        const delprod = Productos.productosMap.splice(prodIdx, 1) 
        
        return delprod
    }

    get(id){
        const prod = Productos.productosMap.find((elem) => elem.id === id)
        return prod
    }

    getAll(){
        return Productos.productosMap
    }

    update(id, newProd){
        let updated = false
        Productos.productosMap.forEach((elem, idx) => {
            if(elem.id === id){
                newProd.id = id
                Productos.productosMap[idx] = newProd
                updated = true
            }
            
        })
        if(updated){
            return newProd
        }
        return 0
    }

}

module.exports = new Productos()

const p = new Productos()

p.add({'q': 12})
console.log(p.get(1))
p.update(1, {
    "timestamp": Date.now(),
    "nombre": "Breaking Bad Season 1 DVD",
    "descripcion": "DVD",
    "codigo": "DVD-BB-1",
    "foto": "https://www.google.com/search?q=breaking+bad&tbm=isch&ved=2ahUKEwjJm_f-98j2AhXYF80KHR6BCooQ2-cCegQIABAA&oq=breaking+bad&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyBAgAEEMyCAgAEIAEELEDMggIABCABBCxAzIECAAQQzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIIxDvAxAnOggIABCxAxCDAToLCAAQgAQQsQMQgwE6BwgAELEDEEM6CggAELEDEIMBEEM6BggAEAoQGFCKBVjNFWCtFmgBcAB4AIABXIgB3AiSAQIxNJgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=kvQwYsmKFNivtAaegqrQCA&bih=937&biw=1680&client=firefox-b-d#imgrc=PSwcmLJcRjPU2M",
    "precio": 200,
    "stock": 50,
})
console.log(p.get(1))