# main.py
from fastapi import FastAPI
from pydantic import BaseModel

# Criação da instância do FastAPI
class product(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

class user(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

class team(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None


app = FastAPI()
# uvicorn main:app --reload  (iniciar api)

# Definindo um endpoint simples para a raiz
@app.post("/recoverValueProducts")
def recover_products(product: product):
    product_dict = product.model_dump()
    product_dict["status"] = "Processed"

    return {"processed_data": product_dict}

@app.post("/recoverValueUsers")
def recover_users(users: user):
    users_dict = product.model_dump()
    users_dict["status"] = "Processed"

    return {"processed_data": users_dict}

@app.post("/recoverValueTeams")
def recover_teams(team: team):
    team_dict = product.model_dump()
    team_dict["status"] = "Processed"

    return {"processed_data": team_dict}