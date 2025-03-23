# models.py

from pydantic import BaseModel

# Classe Product - define a estrutura de dados do produto
class Product(BaseModel):
    type: str
    name: str = None  # Tornando 'name' opcional
    id_product: int
    quantity: int = None  # Tornando 'quantity' opcional
    create_at: str = None  # Tornando 'create_at' opcional

# Classe Person - define a estrutura de dados da pessoa
class Person(BaseModel):
    type: str
    name: str
    id_product: int
    wage: float
    position: str
    create_at: str = None  # Tornando 'create_at' opcional
