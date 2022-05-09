# NIR Spectroscopy V1

This project was bootstrapped with [Create React App] and uses py installer to install respective API's

Install latest nodejs and npm in your system.


## Available Scripts

In the project directory, you can run:

### `npm start` to run the project

Runs the app in the development mode within a local ElectronJS window.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This will also start the FastAPI server running on [http://localhost:8000](http://localhost:8000), allowing for access to a Python API. By default, the API requires a shared `SECRET_KEY` which is randomly generated when the server is started.

Its always good if we use virtual environment while developing python modules

Note that Python >3.6 and Python dependencies specified in `requirements.txt` are required for development.

The page will reload if you make edits.\
You will also see any lint errors in the console.




### `npm i`

By running the above command, It installs all the dependencied required for the project 

### `npm run build_win`

Package and build a ready for distribution application for Windows.

Note that FastAPI and Uvicorn are also packaged up within the installer.
It is highly recommended to perform the build within a project virtual environment to minimise build size.


