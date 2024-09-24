# Textual Report Generation from Chest Radiographs - Frontend

This repository contains the frontend for the project **Textual Report Generation from Chest Radiographs using Deep Learning**, which is based on the Indiana Chest X-ray Dataset. The frontend is built using **Next.js**, while the backend handles **sign-in** and **login** functionality using **Node.js**.

The machine learning model for generating reports is present in a separate repository:  
[Textual Report Generation from Chest X-rays - Indiana Dataset](https://github.com/SaadSubhaniTheProgrammerVersion/Textual-Report-Generation-from-Chest-X-rays-Indiana-Dataset).

## Project Structure

- **Frontend**: Built with **Next.js** to provide a user-friendly interface.
- **Backend**: Node.js-based backend for handling authentication (sign-in and login).
- **Model**: The machine learning model that generates textual reports from X-ray images is in the linked repository. This model is served via a Flask server.

## Running the Flask Server

The Flask server, which is responsible for interfacing with the model, is located in the backend repository. You can start it by running `app.py` in the other repository:

