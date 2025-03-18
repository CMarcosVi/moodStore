import os
import json
import asyncio
import subprocess
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from pydantic import BaseModel
import sys
import threading

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

# Função para carregar os dados do arquivo JSON
def load_data(file_path):
    if not os.path.exists(file_path):
        return []  # Se o arquivo não existir, retorna uma lista vazia

    with open(file_path, "r") as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return []  # Se o arquivo estiver vazio ou corrompido, retorna uma lista vazia

# Função para salvar os dados no arquivo JSON
def save_data(data, file_path):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

# Classe Product - define a estrutura de dados do produto
class Product(BaseModel):
    type: str
    name: str = None  # Tornando 'name' opcional
    id_product: int
    quantity: int = None  # Tornando 'quantity' opcional
    create_at: str = None  # Tornando 'create_at' opcional

# Classe Person - define a estrutura de dados da pessoa
class Person(BaseModel):
    type: str
    name: str
    id_product: int
    wage: float
    position: str
    create_at: str = None  # Tornando 'create_at' opcional

# Endpoint para receber os dados do produto
@app.post("/analytics")
async def create_product(product: Product):
    # Se o campo 'create_at' não for fornecido, pode-se definir a data atual
    if not product.create_at:
        product.create_at = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    
    # Carrega os dados existentes do arquivo de produtos
    data = load_data(json_file_path_product)

    # Adiciona o novo produto
    data.append(product.dict())

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
    data.append(person.dict())

    # Salva os dados atualizados no arquivo de pessoas
    save_data(data, json_file_path_person)

    return {"message": "Pessoa adicionada com sucesso", "person": person}

# Função para executar o script relatoryGenerator.py
def run_report_script():
    try:
        # Executa o script relatoryGenerator.py
        subprocess.run(["python", "Controllers/personControllers/relatoryGenerator/relatoryGenerator.py"], check=True)
        print("Relatório gerado com sucesso!")
    except subprocess.CalledProcessError as e:
        print(f"Erro ao gerar o relatório: {e}")

# Função para agendar a execução do script relatoryGenerator.py a cada 30 dias
def schedule_report_generation():
    scheduler = BackgroundScheduler()

    # Agendar a execução a cada 30 dias (em segundos)
    scheduler.add_job(run_report_script, IntervalTrigger(days=30), id='generate_report', replace_existing=True)

    # Iniciar o agendador
    scheduler.start()

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
