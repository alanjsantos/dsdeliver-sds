import axios from "axios";
import { OrderPayLoad } from './Orders/types';

const API_URL = 'http://localhost:8080';
const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;

//API para fornecer a rota de produtos
export function fetchProducts() {
    return axios(`${API_URL}/products`)
}

// API para se comunicar com o MapBox
export function fetchLocalMapBox(local: string) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)
}

//Salvando um pedido
export function saveOrder(payload: OrderPayLoad) {
    return axios.post(`${API_URL}/orders`, payload);
}