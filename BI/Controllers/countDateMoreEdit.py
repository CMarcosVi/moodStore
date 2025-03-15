import json
import pandas as pd

# Função para encontrar o dia com mais edições
def dia_com_mais_edits(df):
    """
    Função para encontrar o dia com mais edições baseando-se no campo 'create_at'.
    
    :param df: DataFrame contendo os dados
    :return: O dia com mais edições
    """
    # Filtra os dados para obter apenas os tipos 'edit'
    df_edit = df[df['type'] == 'edit']
    
    # Converte a coluna 'create_at' para o formato de data, ignorando a hora
    df_edit.loc[:, 'create_at'] = pd.to_datetime(df_edit['create_at'], format='%d/%m/%Y, %H:%M:%S').dt.date
    
    # Conta as edições por dia
    edicoes_por_dia = df_edit['create_at'].value_counts().reset_index(name='edicoes')
    edicoes_por_dia.columns = ['dia', 'edicoes']
    
    # Formata a data para "YYYY-MM-DD"
    edicoes_por_dia['dia'] = pd.to_datetime(edicoes_por_dia['dia']).dt.strftime('%Y-%m-%d')
    
    # Encontra o dia com o maior número de edições
    dia_com_mais = edicoes_por_dia.loc[edicoes_por_dia['edicoes'].idxmax()]
    
    return dia_com_mais

# Função para calcular o dia com mais edições
def calcular_dia_com_mais_edits():
    # Caminho do arquivo JSON
    json_file_path = "../Analytics/analytics.json"

    # Lê o arquivo JSON usando pandas
    try:
        # Lê o arquivo JSON e converte para DataFrame
        read_json = pd.read_json(json_file_path)

        # Encontra o dia com mais edições
        dia_com_mais = dia_com_mais_edits(read_json)

        # Retornando o dia com mais edições
        return dia_com_mais

    except ValueError as e:
        print(f"Erro ao ler o arquivo JSON: {e}")
    except FileNotFoundError:
        print(f"O arquivo '{json_file_path}' não foi encontrado.")

# Chamando a função principal e pegando o dia com mais edições
dia_com_mais = calcular_dia_com_mais_edits()

# Exibindo o dia com mais edições
print(f"\nDia com mais edições: {dia_com_mais['dia']} com {dia_com_mais['edicoes']} edições.")
