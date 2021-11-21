# Demo Metropolitan Museum API

## Installation


Clone the repo: https://github.com/al77ex1/demo-metropolitan-museum-api

Install the dependencies:

```bash
yarn install
```

## Parameters in index.js file

```javascript
const EUROPEAN_PAINTINGS_ID = 11; 
const METMUSEUM_OBJECTS_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;
const REQUESTS_PER_SECOND = 75;
const ARTWORKS_COUNT = 100;
const COLORS = ['red', 'green', 'blue'];
```

## Commands

Running locally:

```bash
yarn dev
```

## Result 

See result in `result.json` file.

## Requirements

The Metropolitan Museum has a great API which allows you to get data about all the artwork
collections in their possession.
You are kindly asked to use this API to provide us with a list of images in the “European
drawings” department of the museum, and the dominant primary colour for each artwork.
The required output is a list of artworks in the specified category, and provide for every item:

● Object ID

● Image URL

● Dominant colour

● Dominant Primary colour (I.E. Red, Green, or Blue. For monochromatic images, use “None”)

The list can be in any format you prefer (CSV, JSON, XML, ETC).
Your submission should include a deliverable and runnable code. You can upload the source to
github/bitbucket or any other repository you wish. Or just zip it and send it to us. We should be
able to run it on our computers. Please provide a short readme file explaining how to run the
code.

Other requirements:

● Be nice to the The Met museum. They provide this API completely free and open. They
kindly request that you limit your requests rate to no more than 80 requests per second.
Please honour their request.

Tips:

● Do not reinvent the wheel. Use existing SDKs libraries as much as you can or want. You
are not expected to write code that extract colours from images.

● The met’s API is not perfect and you may get some unexpected results, such as objects
that do not have images. You should handle those edge cases.

● Be frugal: A sample of 100-200 artworks in the department is fine. No need to process
each and every item. Also notice that objects have small and large images, feel free to
only process the small ones.
Good luck. And most importantly, have fun!

