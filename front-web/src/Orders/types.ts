export type Product =  {
        id: number
        name: string
        description: string
        price: number
        imageUri: string
}

export type OderLocationData = {
        latitude: number;
        longitude: number;
        address: string;
}
//Lista de Produtos que está dentor dos Pedidos.
type ProductId = {
        id: number
}

//O & comercial indica um merge dos atributos ja exisnte de um outro PayLoad OrderLocationData
export type OrderPayLoad = {
        products: ProductId[];      
} & OderLocationData;