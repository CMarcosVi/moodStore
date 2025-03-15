import json
from collections import defaultdict
from datetime import datetime
from pandas import pd

# Caminho para o arquivo JSON
json_file_path = "analytics_data.json"

# Função para carregar os dados do arquivo JSON
def load_data():
    try:
        with open(json_file_path, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Erro ao carregar dados: {e}")
        return []

# Função para separar os dados por tipo (create, delete, edit)
def separate_types(data):
    types_count = defaultdict(int)  # Contador para cada tipo
    separated_data = {
        "create": [],
        "delete": [],
        "edit": []
    }

    # Dicionário para armazenar o último edit de cada id_product
    latest_edits = {}

    for item in data:
        message_type = item.get('type')

        if message_type in separated_data:
            separated_data[message_type].append(item)
            types_count[message_type] += 1

            # Processando o último edit para cada id_product
            if message_type == "edit":
                id_product = item.get('id_product')
                created_at = datetime.strptime(item.get('created_at'), "%Y-%m-%d %H:%M:%S")

                # Se já existe um edit anterior para este id_product, comparamos pela data
                if id_product not in latest_edits or latest_edits[id_product]['created_at'] < created_at:
                    latest_edits[id_product] = {
                        "name": item.get('name'),
                        "quantity": item.get('quantity'),
                        "created_at": created_at
                    }

    return separated_data, types_count, latest_edits

# Função para calcular a quantidade total de produtos, considerando "create" e últimos "edit"
def calculate_total_quantity(data, latest_edits):
    total_quantity = 0

    # Contar as quantidades dos "create"
    for item in data.get("create", []):
        total_quantity += item.get("quantity", 0)

    # Somar as quantidades dos últimos "edit"
    for id_product, edit in latest_edits.items():
        total_quantity += edit['quantity']

    return total_quantity

def totalidade_request():
       
       analitycs = pd.read_json("analytics_data.json")
       num_objetos = len(analitycs)
       num_registros = num_objetos
       return num_registros

def total_de_requisicao():
    pd.read_json("analytics_data.json")
    creates = len(analitycs[analitycs['type'] == 'create'])
    edit = len(analitycs[analitycs['type'] == 'edit'])
    delete = len(analitycs[analitycs['type'] == 'delete'])
    totality = creates+edit+delete

    return creates,edit,delete,totality

# Função principal para processar os dados
def process_data():
    # Carregar dados
    data = load_data()

    # Separar os dados por tipo
    separated_data, types_count, latest_edits = separate_types(data)

    # Exibir as contagens de cada tipo
    print(f"Contagem de tipos: {dict(types_count)}")

    # Exibir os dados separados por tipo
    for message_type, items in separated_data.items():
        print(f"\nDados de tipo '{message_type}':")
        for item in items:
            print(json.dumps(item, indent=4))  # Exibe cada item formatado

    # Calcular a quantidade total de produtos
    total_quantity = calculate_total_quantity(separated_data, latest_edits)
    print(f"\nQuantidade total de produtos (considerando últimos edits): {total_quantity}")

    # Variáveis finais
    create_count = types_count.get('create', 0)
    delete_count = types_count.get('delete', 0)
    edit_count = types_count.get('edit', 0)

    # Variáveis para os produtos editados
    edited_products = latest_edits

    return {
        "create_count": create_count,
        "delete_count": delete_count,
        "edit_count": edit_count,
        "edited_products": edited_products,
        "total_quantity": total_quantity
    }

# Executando a função principal
if __name__ == "__main__":
    result = process_data()
    # Exibindo as variáveis finais
    print("\nValores Finais:")
    print(f"Contagem de 'create': {result['create_count']}")
    print(f"Contagem de 'delete': {result['delete_count']}")
    print(f"Contagem de 'edit': {result['edit_count']}")
    print(f"Produtos editados (último edit de cada id_product): {json.dumps(result['edited_products'], indent=4)}")
    print(f"Quantidade total de produtos: {result['total_quantity']}")
