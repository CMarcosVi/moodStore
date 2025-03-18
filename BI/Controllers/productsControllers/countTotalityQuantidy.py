import json
import pandas as pd

# Função para calcular as somas de cada tipo
def calcular_somas():
    # Caminho do arquivo JSON
    json_file_path = "../Analytics/analytics.json"

    # Lê o arquivo JSON usando pandas
    try:
        # Lê o arquivo JSON e converte para DataFrame
        read_json = pd.read_json(json_file_path)
        
        # Inicializando variáveis para armazenar as somas
        sum_edit = 0
        sum_create = 0
        sum_delete = 0
        
        # Somando as quantidades baseadas no tipo
        sum_edit = read_json[read_json['type'] == 'edit']['quantity'].sum()
        sum_create = read_json[read_json['type'] == 'create']['quantity'].sum()
        sum_delete = read_json[read_json['type'] == 'delete']['quantity'].sum()

        # Exibindo as somas
        print(f"{sum_edit} Produtos 'editados' ")
        print(f"{sum_create} Produtos 'criados' ")
        print(f"{sum_delete} Produtos 'deletados' ")

        # Retornando as somas
        return sum_edit, sum_create, sum_delete

    except ValueError as e:
        print(f"Erro ao ler o arquivo JSON: {e}")
    except FileNotFoundError:
        print(f"O arquivo '{json_file_path}' não foi encontrado.")


