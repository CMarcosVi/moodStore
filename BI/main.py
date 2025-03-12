from fastapi import FastAPI, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import asyncio
from aiokafka import AIOKafkaConsumer
from datetime import datetime

# Instanciando a API
app = FastAPI()

# Permitindo CORS para o domínio 'http://localhost:3000' (ou altere conforme necessário)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Caminho para armazenar os dados no arquivo JSON dentro da pasta Analytics
json_file_path = "Analytics/analytics.json"

# Definir um nome para a chave de API
API_KEY = "7f75e2d76e5e0afVae77b13b064bab57b3b690b3a0c051bce72434ca50186552"  # Altere com sua chave segura
API_KEY_NAME = "X-API-Key"

# Definindo a dependência para o cabeçalho da chave de API
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

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

# Função para verificar a chave de API
def verify_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key

# Função para consumir mensagens do Kafka
async def consume_messages():
    consumer = AIOKafkaConsumer(
        'product-events',  # Tópico Kafka
        bootstrap_servers='localhost:9092',  # Broker Kafka
        group_id='analytics-group'  # Grupo de consumidores
    )
    
    # Conectar o consumidor
    await consumer.start()
    
    try:
        async for message in consumer:
            # Aqui você pode processar a mensagem que chegou
            product_data = json.loads(message.value.decode('utf-8'))
            print(f"Mensagem recebida do Kafka: {product_data}")

            # Carregar dados existentes
            data = load_data()

            # Adiciona o novo produto no arquivo JSON
            data.append(product_data)

            # Salvar os dados de volta no arquivo JSON
            save_data(data)

    finally:
        # Fechar o consumidor após terminar
        await consumer.stop()

# Rota inicial para verificar a aplicação
@app.get("/")
async def root():
    return {"message": "API de Análise está funcionando!"}

# Função principal de inicialização para iniciar o consumo de mensagens Kafka
if __name__ == "__main__":
    import uvicorn
    loop = asyncio.get_event_loop()
    
    # Inicia o consumidor Kafka
    loop.create_task(consume_messages())
    
    uvicorn.run(app, host="127.0.0.1", port=5900)
