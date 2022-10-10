import json
import os
from serpapi import GoogleSearch
from app.schemas.recipe import SearchResults

SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

def recipe_crawl(search_params: str):
    params = {
    "api_key": SERPAPI_API_KEY,
    "engine": "google",
    "q": f'{search_params} recipe',
    "gl": "us",
    "hl": "en"
    }

    # search = GoogleSearch(params)
    # results = search.get_dict()['recipes_results']
    results =  [{'title': 'Quick and Easy French Toast', 'link': 'https://www.mccormick.com/recipes/breakfast-brunch/quick-and-easy-french-toast', 'source': 'McCormick', 'rating': 4.3, 'reviews': 325, 'total_time': '10 min', 'ingredients': ['Cinnamon', 'egg', 'vanilla extract'], 'thumbnail': 'https://serpapi.com/searches/63443a62edb034afa905a46a/images/787046d0afab516802e2542b4a53f84cec33fd8a0522c4ebf4362d9bc20c2ed9.jpeg'}, {'title': 'French Toast', 'link': 'https://www.foodnetwork.com/recipes/robert-irvine/french-toast-recipe-1951408', 'source': 'Food Network', 'rating': 4.6, 'reviews': 918, 'total_time': '30 min', 'ingredients': ['Maple syrup', 'white bread', 'butter', 'cinnamon', 'eggs'], 'thumbnail': 'https://serpapi.com/searches/63443a62edb034afa905a46a/images/787046d0afab516802e2542b4a53f84ce3c2d563a9400cef23f222502a5a2403.jpeg'}, {'title': 'French Toast', 'link': 'https://www.allrecipes.com/recipe/7016/french-toast-i/', 'source': 'Allrecipes', 'rating': 4.6, 'reviews': 2000, 'total_time': '15 min', 'ingredients': ['Cinnamon', 'eggs', 'vanilla extract'], 'thumbnail': 'https://serpapi.com/searches/63443a62edb034afa905a46a/images/787046d0afab516802e2542b4a53f84c76f136b59dbe7f49e7d5f30efbe44529.jpeg'}]

    return results