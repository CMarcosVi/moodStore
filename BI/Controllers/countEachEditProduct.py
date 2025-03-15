import json
import pandas as pd

# Função para contar quantas vezes cada produto teve o tipo 'edit'
def contar_ocorrencias_edit(df):
    """
    Função para contar quantas vezes cada produto teve o tipo 'edit'.
    
    :param df: DataFrame contendo os dados
    :return: DataFrame com a contagem de ocorrências do tipo 'edit' por produto
    """
    # Filtra os dados para obter apenas os tipos 'edit'
    df_edit = df[df['type'] == 'edit']
    
    # Conta as ocorrências de 'edit' por id_product
    ocorrencias = df_edit.groupby('id_product').size().reset_index(name='count')
    
    return ocorrencias

# Função para calcular as ocorrências do tipo 'edit' para cada produto
def calcular_ocorrencias_edit():
    # Caminho do arquivo JSON
    json_file_path = "../Analytics/analytics.json"

    # Lê o arquivo JSON usando pandas
    try:
        # Lê o arquivo JSON e converte para DataFrame
        read_json = pd.read_json(json_file_path)

        # Obtém a contagem de ocorrências do tipo 'edit' por produto
        ocorrencias_edit = contar_ocorrencias_edit(read_json)

        # Exibindo as ocorrências de 'edit' para cada produto
        print("Contagem de ocorrências do tipo 'edit' por produto:")
        print(ocorrencias_edit)

        # Retornando o DataFrame com a contagem
        return ocorrencias_edit

    except ValueError as e:
        print(f"Erro ao ler o arquivo JSON: {e}")
    except FileNotFoundError:
        print(f"O arquivo '{json_file_path}' não foi encontrado.")

# Chamando a função principal e pegando as ocorrências do tipo 'edit' por produto
ocorrencias_edit = calcular_ocorrencias_edit()

# Exibindo as ocorrências de 'edit'
print("\nContagem de ocorrências do tipo 'edit' por produto:")
print(ocorrencias_edit)
