import { useForm } from "react-hook-form";

interface FormValue {
  name: string;
  quantity: number;
  id_product: number;
  price_for_unit: number;
}

const CreateItem = () => {
  const { register, handleSubmit } = useForm<FormValue>();

  const onSubmit = (data: FormValue) => {
    console.log("Item enviado:", data);
  };

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Criar novo item</h2>
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
          <label>ID do Produto:</label>
          <input type="number" {...register("id_product")} required />
        </div>

        <div>
          <label>Preço por unidade:</label>
          <input type="number" step="0.01" {...register("price_for_unit")} required />
        </div>

        <button type="submit">Cadastrar Item</button>
      </form>
    </section>
  );
};

export default CreateItem;
