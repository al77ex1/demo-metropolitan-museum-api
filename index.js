import axios from 'axios';
import { getColorFromURL } from 'color-thief-node';
import fs from 'fs';

// Parameters
const europeanPaintingsID = 11; 
const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;
const params = { departmentIds: europeanPaintingsID };
const delay = 15;
const amountElements = 100;

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
  if (indexOfPrimaryColor === 0) return 'red';
  if (indexOfPrimaryColor === 1) return 'green';
  if (indexOfPrimaryColor === 2) return 'blue';
}


/**
 * Get every object by id
 * @param {array} objectIDs
 * @returns {array} 
 */
async function getObjects( objectIDs ) {

  const result = [];
  for (const id of objectIDs) {

    await new Promise(resolve => setTimeout(resolve, delay));
    const object = await axios.get(`${url}/${id}`);

    // Collect data to result array
    if (object.data.primaryImageSmall.length) {
      const dominantColor = await getColorFromURL(object.data.primaryImageSmall);
      result.push({ 
        objectID: id, 
        primaryImageSmall: object.data.primaryImageSmall,
        dominantColor,
        primaryColor: getPrimaryColor(dominantColor)
      });
    }

      console.log(`Object processed. ID: ${id}`);
  }
  return result;
}


(async () => {
  try {

    // Get objects by department
    const departamentObjects = await axios.get(url, { params });

    // Short IDs for the first 100 id
    const objectIDs = departamentObjects.data.objectIDs.slice(0, amountElements);

    // Get every object by id
    const result = await getObjects(objectIDs);

    // Write result
    fs.writeFile('result.json', JSON.stringify(result), function (err) {
      if (err) return console.log(err);
      console.log('See file: result.json');
    });

  } catch (error) {
    console.log(error); // this is the main part. Use the response property from the error object
  }
})();
