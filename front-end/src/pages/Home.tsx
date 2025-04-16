import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";


interface Product {
  id: string;
  name: string;
  quantity: number;
  id_product: number;
  price_for_unit: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post("http://localhost:3000/products/RequestAllProducts", {});
        setProducts(response.data.value);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <section className="homeSection">
      <h2>Produtos</h2>
      <div>
        <Link to="createItem">
        </Link>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div><h4></h4>{product.name}</div>
            <div><h4></h4>{product.quantity}</div>
            <div><h4></h4>{product.id_product}</div>
            <div><h4></h4>R$ {product.price_for_unit.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
