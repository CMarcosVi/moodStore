# data_handler.py

import os
import json

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
