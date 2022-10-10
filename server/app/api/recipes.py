import fastapi
from typing import List
from app.api.services.recipe_service import recipe_crawl
from app.schemas.recipe import SearchResults

recipe_router = fastapi.APIRouter()

@recipe_router.get("/search", response_model=List[SearchResults])
async def search_recipes(search_params: str):
    return recipe_crawl(search_params)