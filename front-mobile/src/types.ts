export type Order = {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    moment: string;
    status: string;
    total: 97.95;
    products: Product[];
}

export type Product = {
    id: number;
    name: string; 
    description: string;
    price: number;
    imageUri: string;
}