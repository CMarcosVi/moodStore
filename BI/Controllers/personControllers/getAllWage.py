import json

def processar_json(nome_arquivo):
    # Abrindo o arquivo JSON
    with open(nome_arquivo, 'r') as f:
        dados = json.load(f)

    # Inicializando um dicionário para armazenar a soma dos salários por cargo
    salarios_por_cargo = {}
    soma_total = 0

    # Iterando sobre os dados para calcular as somas
    for colaborador in dados:
        cargo = colaborador['position']
        salario = colaborador['wage']
        
        # Acumulando o salário por cargo
        if cargo in salarios_por_cargo:
            salarios_por_cargo[cargo] += salario
        else:
            salarios_por_cargo[cargo] = salario
        
        # Acumulando a soma total dos salários
        soma_total += salario

    # Retornando os resultados
    return salarios_por_cargo, soma_total

# Chamada da função com o nome do arquivo
# processar_json('../../Analytics/personAnalytics.json') # Esta linha não será necessária no relatoryGenerator.py
