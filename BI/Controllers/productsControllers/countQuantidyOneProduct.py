import json
import pandas as pd

# Função para encontrar o id_product do produto com a maior quantidade de "edit"
def id_produto_com_maior_quantidade_edit(df):
    """
    Função para encontrar o id_product do produto com a maior quantidade no tipo 'edit'.
    
    :param df: DataFrame contendo os dados
    :return: id_product do produto com a maior quantidade de "edit"
    """
    # Filtra os dados pelo tipo 'edit' e encontra o produto com a maior quantidade
    produto_maior_edit = df[df['type'] == 'edit'].nlargest(1, 'quantity')
    return produto_maior_edit['id_product'].iloc[0]  # Retorna o id_product do produto com maior quantidade

# Função para calcular e obter o id_product com a maior quantidade "edit"
def calcular_id_produto_maior_edit():
    # Caminho do arquivo JSON
    json_file_path = "../Analytics/analytics.json"

    # Lê o arquivo JSON usando pandas
    try:
        # Lê o arquivo JSON e converte para DataFrame
        read_json = pd.read_json(json_file_path)

        # Obtém o id_product do produto com maior quantidade no tipo 'edit'
        id_produto_edit = id_produto_com_maior_quantidade_edit(read_json)

        # Exibindo o id_product do produto com maior quantidade "edit"
        print(f"ID do produto com maior quantidade 'edit': {id_produto_edit}")

        # Retornando o id_product
        return id_produto_edit

    except ValueError as e:
        print(f"Erro ao ler o arquivo JSON: {e}")
    except FileNotFoundError:
        print(f"O arquivo '{json_file_path}' não foi encontrado.")

