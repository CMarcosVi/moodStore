import pandas as pd

def processar_json(nome_arquivo):
    # Carregando os dados JSON em um DataFrame
    df = pd.read_json(nome_arquivo)
    
    # Contando a quantidade total de objetos no JSON
    quantidade_total = len(df)

    # Contando a quantidade de cada tipo de 'position'
    quantidade_positions = df['position'].value_counts()

    # Exibindo os resultados
    print(f"Quantidade total de objetos no JSON: {quantidade_total}")
    
    print("\nQuantidade de cada tipo de position:")
    print(quantidade_positions)

# Chamada da função com o nome do arquivo
processar_json('../Analytics/personAnalytics.json')
