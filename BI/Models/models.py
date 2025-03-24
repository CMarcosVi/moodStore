from pydantic import BaseModel, field_validator

class Product(BaseModel):
    type: str
    name: str = None
    id_product: int
    quantity: int = None
    create_at: str = None

    @field_validator('quantity')
    def validate_quantity(cls, v):
        if v is not None and v < 0:
            raise ValueError('A quantidade não pode ser negativa')
        return v

class Person(BaseModel):
    type: str
    name: str
    id_product: int
    wage: float
    position: str
    create_at: str = None

    @field_validator('wage')
    def validate_wage(cls, v):
        if v <= 0:
            raise ValueError('O salário deve ser maior que zero')
        return v
