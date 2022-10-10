from typing import Any
from pydantic import BaseModel

class SearchParams(BaseModel):
    query: str

class SearchResults(BaseModel):
    title: str
    link: str
    source: str
    total_time: str
    ingredients: list
    thumbnail: str
