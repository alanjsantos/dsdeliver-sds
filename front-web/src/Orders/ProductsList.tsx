import ProductsCard from "./ProductCard";
import { Product } from "./types";
import { checkIsSelected } from './helpers';

// criando um parametro do componente
type Props = {
  products: Product[];
  selectedProducts: Product[]
  onSelectProduct: (product: Product) => void;
};

// renderizando a lista de produtos.
function ProductsList({ products, onSelectProduct, selectedProducts }: Props) {
  return (
    <div className="orders-list-container">
      <div className="orders-list-items">
        {products.map((product) => (
          <ProductsCard key={product.id} 
          product={product} 
          onSelectProduct = {onSelectProduct}
          //rederizando o produto selecionad em ProducList
          isSelected={checkIsSelected(selectedProducts, product)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
