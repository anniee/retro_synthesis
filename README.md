# RetroSynthesis

A simple tool to visualize chemical reactions, i.e. retrosynthesis of target molecules used in COVID Moonshot drug discovery.


______

## Server Installation
This app uses a simple server implementation with FastAPI backend and React frontend.
To install dependencies:
1. Install the `conda` package/environment manager from
https://docs.conda.io/projects/conda/en/latest/user-guide/install/.  This is
necessary for the rdkit dependency (pip isn't currently supported - see
https://github.com/rdkit/rdkit/issues/1812).
2. Use `conda` to create a new environment: `conda create --name postera
python=3.8`
3. Activate the environment: `conda activate postera`
4. Install the python packages:
```
conda install --file conda-packages.txt
pip --no-cache-dir install -r requirements.txt
```
5. Install javascript dependencies:
- in frontend directory, call: `npm install`

## Run server
Inside of the conda environment, call the following in two separate terminals:
1. in the backend directory: `python main.py`
2. in the frontend directory: `npm run start`

## Misc

- replace the route contents of `backend/app/api.py` accordingly (e.g. your machine's local JSON file, CDN, etc.)