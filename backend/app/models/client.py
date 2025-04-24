from typing import Optional

class ClientModel:
    def __init__(self, name: str, age: int, gender: str, id: Optional[str] = None):
        self.id = id
        self.name = name
        self.age = age
        self.gender = gender
