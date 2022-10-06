# server
Setup:

    python3 -m venv venv
    pyenv activate venv 
    pip3 install -r requirements.txt

Run the development server:

    uvicorn main:app --reload

When adding new packages:
    pip3 freeze > requirements.txt