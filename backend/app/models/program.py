from typing import Optional

class ProgramModel:
    def __init__(self, name: str, description: str, id: Optional[str] = None):
        self.id = id
        self.name = name
        self.description = description
