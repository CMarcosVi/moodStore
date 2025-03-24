# main.py

import os
import json
import asyncio
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
import threading

from Models.models import Product, Person
from data_handler.data_handler import load_data, save_data
from scheduler.scheduler import schedule_report_generation

# Instanciando a API
app = FastAPI()

# Permitindo CORS para o domínio 'http://localhost:3000'
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Caminho para armazenar os dados no arquivo JSON dentro da pasta Analytics
json_file_path_product = "Analytics/analytics.json"  # Arquivo para os produtos
json_file_path_person = "Analytics/personAnalytics.json"  # Arquivo para as pessoas

# Definir um nome para a chave de API
API_KEY = "7f75e2d76e5e0afVae77b13b064bab57b3b690b3a0c051bce72434ca50186552"  # Altere com sua chave segura
API_KEY_NAME = "X-API-Key"

# Definindo a dependência para o cabeçalho da chave de API
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

# Função para verificar a chave de API
def verify_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key

# Endpoint para receber os dados do produto
@app.post("/analytics")
async def create_product(product: Product):
    # Se o campo 'create_at' não for fornecido, pode-se definir a data atual
    if not product.create_at:
        product.create_at = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    
    # Carrega os dados existentes do arquivo de produtos
    data = load_data(json_file_path_product)

    # Adiciona o novo produto
    data.append(product.model_dump())

    # Salva os dados atualizados no arquivo de produtos
    save_data(data, json_file_path_product)

    return {"message": "Produto adicionado com sucesso", "product": product}

# Endpoint para receber os dados da pessoa
@app.post("/analyticsPerson")
async def create_person(person: Person):
    # Se o campo 'create_at' não for fornecido, pode-se definir a data atual
    if not person.create_at:
        person.create_at = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    
    # Carrega os dados existentes do arquivo de pessoas
    data = load_data(json_file_path_person)

    # Adiciona a nova pessoa
    data.append(person.model_dump())

    # Salva os dados atualizados no arquivo de pessoas
    save_data(data, json_file_path_person)

    return {"message": "Pessoa adicionada com sucesso", "person": person}










# Executando o agendador em segundo plano
def start_scheduler():
    thread = threading.Thread(target=schedule_report_generation)
    thread.daemon = True  # Torna o thread um daemon para ser encerrado quando o processo principal for encerrado
    thread.start()

# Iniciar o agendador antes de iniciar o servidor FastAPI
start_scheduler()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5900)
