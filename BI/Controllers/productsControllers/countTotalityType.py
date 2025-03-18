import json
import pandas as pd

json_file_path = "../../Analytics/analytics.json"

# Até aqui tudo bem 
def countTotalityType():
    try:
        rj = pd.read_json(json_file_path)
        type_counts = rj['type'].value_counts()
        count_edit = type_counts.get('edit', 0)
        count_create = type_counts.get('create', 0)
        count_delete = type_counts.get('delete', 0)
        print(f"Contagem de 'edit': {count_edit}")
        print(f"Contagem de 'create': {count_create}")
        print(f"Contagem de 'delete': {count_delete}")
        return count_create,count_edit,count_delete

    except ValueError as e:
        print(f"Erro ao ler o arquivo JSON: {e}")
    except FileNotFoundError:
        print(f"O arquivo '{json_file_path}' não foi encontrado.")

countTotalityType()