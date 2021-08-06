import axios from 'axios';
import { getColorFromURL } from 'color-thief-node';
import fs from 'fs';

// Parameters
const europeanPaintingsID = 11; 
const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;
const params = { departmentIds: europeanPaintingsID };
const delay = 1000;
const artworksCount = 100;
const colors = ['red', 'green', 'blue'];

/**
 * Get primary color
 * @param {array} dominantColor
 * @returns {string} color name
 */
function getPrimaryColor( dominantColor ) {
  const indexOfPrimaryColor = dominantColor.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  // For monochrome image
  if (dominantColor[0] === dominantColor[1] && dominantColor[1] === dominantColor[2]) return 'none';

  // For color images
  return colors[indexOfPrimaryColor];
}


/**
 * Get every object by id
 * @param {array} objectIDs
 * @returns {array} 
 */
async function getObjects( objectIDs ) {

  const result = [];
  let objectCount = 0;

  // Write header
  fs.writeFile('result.csv', `"objectID";"primaryImageSmall";"dominantColor";"primaryColor"\n`, function (err) {
    if (err) throw err;
  });

  for (const id of objectIDs) {
    
    // Delay
    if (objectCount === 75) {
      await new Promise(resolve => setTimeout(resolve, delay));
      objectCount = 0;
    }

    const object = axios.get(`${url}/${id}`)
      .then(async function(object){

      // Collect data to result array
        if (object.data.primaryImageSmall.length) {
          const dominantColor = await getColorFromURL(object.data.primaryImageSmall);
          fs.appendFile('result.csv', 
            `"${id}";"${object.data.primaryImageSmall}";"${dominantColor.toString()}";"${getPrimaryColor(dominantColor)}"\n`, 
            function (err) {
              if (err) throw err;
          });
          console.log(`Object processed. ID: ${id}`);
        }

      });

    objectCount++;
  }
  return true;
}


(async () => {
  try {

    // Get objects by department
    const departamentObjects = await axios.get(url, { params });

    // Short IDs for the first 100 id
    const objectIDs = departamentObjects.data.objectIDs.slice(0, artworksCount);

    // Get every object by id
    await getObjects(objectIDs);

  } catch (error) {
    console.log(error); // this is the main part. Use the response property from the error object
  }
})();

