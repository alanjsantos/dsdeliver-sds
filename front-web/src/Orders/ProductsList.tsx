import ProductsCard from "./ProductCard";
import { Product } from "./types";

// criando um parametro do componente
type Props = {
  products: Product[];
};

// renderizando a lista de produtos.
function ProductsList({ products }: Props) {
  return (
    <div className="orders-list-container">
      <div className="orders-list-items">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
