import pandas as pd

def processar_json(nome_arquivo):
    # Carregando os dados JSON em um DataFrame
    df = pd.read_json(nome_arquivo)

    # Calculando a soma dos salários por cargo
    soma_por_cargo = df.groupby('position')['wage'].sum()

    # Calculando a soma total de salários
    soma_total = df['wage'].sum()

    # Exibindo os resultados
    print("Soma dos salários por cargo:")
    print(soma_por_cargo)

    print(f"\nSoma total de todos os salários: R$ {soma_total:.2f}")

# Chamada da função com o nome do arquivo
processar_json('../../Analytics/personAnalytics.json')
