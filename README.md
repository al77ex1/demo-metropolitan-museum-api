# Demo Metropolitan Museum API

## Installation


Clone the repo:

```bash
git clone --depth 1 https://github.com/al77ex1/demo-metropolitan-museum-api
cd demo-metropolitan-museum-api
```

Install the dependencies:

```bash
yarn install
```

## Parameters in index.ts file

```javascript
const europeanPaintingsID = 11;
const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;
const params = { departmentIds: europeanPaintingsID };
const delay = 15;
const amountElements = 100;
```

## Commands

Running locally:

```bash
yarn dev
```

## Result 

See result in `result.json` file.
