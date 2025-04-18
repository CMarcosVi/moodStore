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
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id_product: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este produto?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete("http://localhost:3000/products/DeleteProduct", {
        data: { id_product },
      });
  
      setProducts((prev) => prev.filter((p) => p.id_product !== id_product));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar produto. Verifique o console.");
    }
  };
  

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <section className="homeSection">
      <h2>Produtos</h2>
      <div>
        <Link to="/Product/CreateItem">Criar Novo Produto</Link>
      </div>
      <ul>
      {products.map((product) => (
        <li key={product.id}>
          <div><h4>Nome:</h4> {product.name}</div>
          <div><h4>Quantidade:</h4> {product.quantity}</div>
          <div><h4>ID Produto:</h4> {product.id_product}</div>
          <div><h4>Preço por unidade:</h4> R$ {product.price_for_unit.toFixed(2)}</div>

          <button onClick={() => handleDelete(product.id_product)}>🗑️ Excluir</button>

          <button onClick={() => navigate(`/Product/EditItem/${product.id_product}`)}>✏️ Editar</button>
        </li>
      ))}

      </ul>
    </section>
  );
};

export default Home;
