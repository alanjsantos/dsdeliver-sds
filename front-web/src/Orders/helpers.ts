import { Product } from "./types";

//Funcao externa para verificar se o produto foi selecionado ou nao
export function checkIsSelected(selectedProducts: Product[], product: Product) {
    return selectedProducts.some(item => item.id === product.id);
}

//formatando preço: (passando como parametro product.price) em ProductCards
export function formatPrice(price: number) {
    //criando uma constante recebdno uma API NumverFromat
   const formatter = new Intl.NumberFormat("pt-BR", {
     style: "currency",
     currency: "BRL",
     minimumFractionDigits: 2,
   });
 
   return formatter.format(price);
 }