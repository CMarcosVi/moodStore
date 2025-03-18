import json
import pandas as pd

# Função para encontrar o produto com a maior quantidade por tipo
def maior_quantidade_por_tipo(df, tipo):
    """
    Função para encontrar o produto com a maior quantidade para um tipo específico (edit, create, delete).
    
    :param df: DataFrame contendo os dados
    :param tipo: Tipo de operação (edit, create, delete)
    :return: Quantidade do produto com a maior quantidade para o tipo especificado
    """
    produto_maior_quantidade = df[df['type'] == tipo].nlargest(1, 'quantity')
    return produto_maior_quantidade['quantity'].iloc[0]  # Retorna apenas o valor da quantidade

# Função para calcular as somas das quantidades por tipo e encontrar o produto com maior quantidade
def calcular_somas_e_maior_quantidade():
    # Caminho do arquivo JSON
    json_file_path = "../Analytics/analytics.json"

    # Lê o arquivo JSON usando pandas
    try:
        # Lê o arquivo JSON e converte para DataFrame
        read_json = pd.read_json(json_file_path)

        # Encontrando o produto com maior quantidade para cada tipo
        maior_edit = maior_quantidade_por_tipo(read_json, 'edit')
        maior_create = maior_quantidade_por_tipo(read_json, 'create')
        maior_delete = maior_quantidade_por_tipo(read_json, 'delete')

        # Exibindo as quantidades
        print(f"Maior quantidade 'edit': {maior_edit}")
        print(f"Maior quantidade 'create': {maior_create}")
        print(f"Maior quantidade 'delete': {maior_delete}")

        # Retornando as quantidades
        return maior_edit, maior_create, maior_delete

    except ValueError as e:
        print(f"Erro ao ler o arquivo JSON: {e}")
    except FileNotFoundError:
        print(f"O arquivo '{json_file_path}' não foi encontrado.")

