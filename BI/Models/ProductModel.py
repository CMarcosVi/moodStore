from pydantic import BaseModel

# Criação da instância do FastAPI
class Product(BaseModel):
    type: str
    name: str = None
    quantity: int = None
    id_product: int
    created_at: str = None  

class Person(BaseModel):
    type: str
    name: str
    id_product: int
    wage: float
    position: str