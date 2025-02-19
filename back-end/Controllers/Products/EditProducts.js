import Product from "../../Models/Product";

const updateProduct = async (req, res) => {
    try {
        const { name, id_product ,quantidy } = req.body;
        const product = await Product.findByPk(req.params.id_product);
      
      if (product) {
        product.name = name || product.name;
        product.id_product = id_product || product.id_product;
        product.quantidy = quantidy || product.quantidy;

        await product.save();
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Produto não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o usuário', message: error.message });
    }
};

export default updateProduct;