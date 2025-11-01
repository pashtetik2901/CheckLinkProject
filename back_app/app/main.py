from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from manager.file_reader import Manager
from pydantic import BaseModel
import uvicorn


class LinkData(BaseModel):
    name: str
    link: str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {"status": "Server is working"}


@app.post("/add_link")
async def add_link_endpoint(new_link: LinkData):
    Manager.write_new_link(new_link.model_dump())
    return {"message": "New link added successfully"}


@app.delete("/delete_linl/{link_id}")
async def delete_link_endpoint(link_id: str):
    Manager.delete_link(link_id)
    return {"message": "Link deleted successfully"}


@app.get("/get_links")
async def get_links_endpoint():
    data = Manager.read_file()
    return data
