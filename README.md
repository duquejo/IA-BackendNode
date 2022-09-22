# IA OCR Service backend

[![node](https://img.shields.io/badge/node-v16.3.X-yellow.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-v8.3.X-red.svg)](https://www.npmjs.com/)
[![Serverless](https://img.shields.io/badge/serverless-v3.22.0-orange.svg)](https://www.serverless.com/)
[![Webpack](https://img.shields.io/badge/webpack-v5.74.0-green.svg)](https://webpack.js.org/)
[![Tesseract](https://img.shields.io/badge/tesseract-v3.0.2-white.svg)](https://tesseract.projectnaptha.com/)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=duquejo01_IA-BackendNode&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=duquejo01_IA-BackendNode)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node](https://nodejs.org)
* [NPM](https://www.npmjs.com/)

## Installation

* `git clone git@github.com:duquejo01/IA-BackendNode.git` this repository
* change into the new directory `cd IA-BackendNode`

## Dependencies

Run `npm install` to install project dependencies.

## Build

Run `npm run build` to build the project. The build artifact (a .zip file containing your package and its dependencies) will be stored in the `dist/` directory.

## Local development

Run `npm start` for local development orchestration using _Serverless framework_ and _Webpack_. Also you can run it though `http://localhost:8000/recognize` **POST** endpoint.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

## Getting unit test coverage

Run `npm run test:coverage` to execute the unit tests coverage via [Jest](https://jestjs.io/).

## Contributing

If you find this repo useful here's how you can help:

1. Send a Merge Request with your awesome new features and bug fixes
2. Wait for a Coronita :beer: you deserve it.