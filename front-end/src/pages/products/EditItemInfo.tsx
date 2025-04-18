import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface FormValue {
  name: string;
  quantity: number;
  price_for_unit: number;
}

const EditItem = () => {
  const { id_product } = useParams();
  const { register, handleSubmit } = useForm<FormValue>();
  const [productExists, setProductExists] = useState<boolean | null>(null);

  useEffect(() => {
    const verificarProduto = async () => {
      if (!id_product) {
        console.warn("⚠️ ID do produto não encontrado na URL.");
        setProductExists(false);
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:3000/products/RequestProduct", {
          id_product: Number(id_product),
        });
  
        console.log("📦 Resposta do backend:", response.data);
  
        // Verifique se o backend retornou algo diretamente
        const produto = response.data?.value || response.data;
  
        if (produto && typeof produto === "object") {
          console.log("✅ Produto encontrado:", produto);
          setProductExists(true);
        } else {
          console.warn("❌ Produto não encontrado (objeto vazio ou inválido).");
          setProductExists(false);
        }
      } catch (error) {
        console.error("❌ Erro ao verificar o produto:", error);
        setProductExists(false);
      }
    };
  
    verificarProduto();
  }, [id_product]);
  

  const onSubmit = async (data: FormValue) => {
    try {
      await axios.put("http://localhost:3000/products/EditProduct", data);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao atualizar produto:", error);
      alert("Erro ao salvar alterações.");
    }
  };

  if (productExists === null) return <p>🔄 Verificando produto...</p>;

  if (!productExists) return <p>❌ Produto não encontrado. Verifique o ID na URL.</p>;

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Editando Produto</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input type="text" {...register("name")} required />
        </div>

        <div>
          <label>Quantidade:</label>
          <input type="number" {...register("quantity")} required />
        </div>

        <div>
          <label>Preço por unidade:</label>
          <input type="number" step="0.01" {...register("price_for_unit")} required />
        </div>

        <div>
          <label>ID do Produto:</label>
          <input type="text" value={id_product} disabled />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </section>
  );
};

export default EditItem;
