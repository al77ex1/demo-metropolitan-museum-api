# Demo Metropolitan Museum API

## Installation


Clone the repo: https://github.com/al77ex1/demo-metropolitan-museum-api

Install the dependencies:

```bash
yarn install
```

## Parameters in index.js file

```javascript
const europeanPaintingsID = 11; 
const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;
const params = { departmentIds: europeanPaintingsID };
const delay = 1000;
const artworksCount = 100;
const colors = ['red', 'green', 'blue'];
```

## Commands

Running locally:

```bash
yarn dev
```

## Result 

See result in `result.json` file.
