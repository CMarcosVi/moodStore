import uvicorn
from fastapi import FastAPI
from Models.ProductModel import Product  # Corrigindo a importação
import json
import os

app = FastAPI()

# Caminho para armazenar os dados no arquivo JSON dentro da pasta Analytics
json_file_path = "Analytics/analytics.json"

# Função para carregar dados existentes no arquivo JSON
def load_data():
    try:
        if os.path.exists(json_file_path):
            with open(json_file_path, 'r') as file:
                return json.load(file)
        else:
            return []  # Se o arquivo não existir, inicializa uma lista vazia
    except Exception as e:
        print(f"Erro ao carregar dados: {e}")
        return []

# Função para salvar dados no arquivo JSON
def save_data(data):
    try:
        # Cria a pasta Analytics se ela não existir
        os.makedirs(os.path.dirname(json_file_path), exist_ok=True)
        
        with open(json_file_path, 'w') as file:
            json.dump(data, file, indent=4)
    except Exception as e:
        print(f"Erro ao salvar dados: {e}")

# Endpoint para receber todos os dados e apenas adicionar no JSON
@app.post("/analytics")
async def create_product(product: Product):
    data = load_data()

    # Adiciona o produto no arquivo JSON
    data.append(product.dict())
    save_data(data)

    return {"message": "Produto adicionado com sucesso", "product": product}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5900)  # Defina a porta aqui
    #http://127.0.0.1:5900
