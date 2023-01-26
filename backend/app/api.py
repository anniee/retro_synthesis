from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import rdkit.Chem as Chem
import rdkit.Chem.Draw

app = FastAPI()

# origins = [
#     "http://localhost:3000",
#     "localhost:3000",
# ]
origins = ["*"]
# If using VSCode + windows, try using your IP 
# instead (see frontent terminal)
#origins = [
#    "http://X.X.X.X:3000",
#    "X.X.X.X:3000"
#]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def make_routes(data):
    routesTreeArr = []

    def format_sources(sources):
        print('SOURCES?', sources)
        sourcesArr = []
        for source in sources:
            sourcesArr.append({"name": source})
        return sourcesArr

    for rxn in data:
        filtered = [mol_info for mol_info in rxn["molecules"] if mol_info['is_building_block'] == True]
        routesTreeArr.append({"name": rxn["reactions"][0]["target"], "children": format_sources(rxn["reactions"][0]["sources"]), "reaction": rxn["reactions"][0]["name"], "reactantInfo": filtered})
    return routesTreeArr


def draw_molecule(smiles: str):
    mol = Chem.MolFromSmiles(smiles)
    img = Chem.Draw.MolsToGridImage([mol], molsPerRow=1, useSVG=True)
    return img

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {
        "message": "Welcome to your app.",
    }

@app.get("/molecule/{smiles}", tags=["molecule"])
async def get_molecule(smiles: str) -> dict:
    molecule = draw_molecule(smiles)
    return {
        "data": molecule,
    }

@app.get("/routes", tags=["routes"])
async def get_routes() -> dict:

    # ideally, use local directory
    f = open("/Users/annevetto/code/webdev_interview_challenge-master/backend/app/routes.json")
    data = json.load(f)
    routes = make_routes(data)
    return {
        "data": routes
    }
