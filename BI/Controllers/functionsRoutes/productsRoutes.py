import os
import json
import asyncio
import subprocess
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from pydantic import BaseModel
import sys
import threading

# Caminho para armazenar os dados no arquivo JSON dentro da pasta Analytics
json_file_path_product = "Analytics/analytics.json"  # Arquivo para os produtos

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
    id_product: int  # 'id_product' obrigatório neste endpoint
    quantity: int = None  # Tornando 'quantity' opcional
    create_at: str = None  # Tornando 'create_at' opcional
    
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
    scheduler.add_job(run_report_script, IntervalTrigger(seconds=2000), id='generate_report', replace_existing=True)

    # Iniciar o agendador
    scheduler.start()

# Executando o agendador em segundo plano
def start_scheduler():
    thread = threading.Thread(target=schedule_report_generation)
    thread.daemon = True  # Torna o thread um daemon para ser encerrado quando o processo principal for encerrado
    thread.start()

# Iniciar o agendador antes de iniciar o servidor FastAPI
start_scheduler()
