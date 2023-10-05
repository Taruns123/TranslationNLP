from fastapi import FastAPI
from pydantic import BaseModel
from eng_to_ger import translate_to_german
from de_to_eng import translate_to_english


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Text(BaseModel):
    text: str | None = None




@app.get("/")
def first_example():

    return {"GFG Example ": "FASTAPI"}


@app.post("/eng-to-de")
async def translateEngToDe(text:Text):
   translatedText  =  translate_to_german(str(text))
   return {"German":translatedText}


@app.post("/de-to-eng")
async def translateDeToEng(text:Text):
   translatedText  =  translate_to_english(str(text))
   return {"English":translatedText}