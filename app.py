from fastapi import FastAPI

app = FastAPI(title="AIClipper")


@app.get("/")
def home():
    return {
        "message": "AIClipper is running!"
    }
  
