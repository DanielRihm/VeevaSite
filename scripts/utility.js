// reads in an array of rows and seperates out the columns and the items in each column
function parseCSV(str) {
    const array2D = [];
    for(r = 1; r < str.length; r++)
    {
        if (str[r] != "") {
            array2D.push(str[r].split(","));
        }
    }

    return array2D;
}

// sums up all of the integer values in the columns specified by index
function sumOfColumn(input, index) {
    var sum = 0;
    for (let i = 0; i < input[index].length; i++) {
        sum += parseInt(input[i][index]);
    }

    return sum;
}

/* takes in two arrays, one for the doctor data and one for product data;
 * finds if the total prescribed medication for that doctor is greater than
 * the current product data and updates product data accordingly
 * 
 * productData[i] is of the format {product:"product", count:num, name:"Doctor Name"}
 */
function findMaxPresciption(doctor, productData) {
    // start and end index
    const startIndex = 11;
    const endIndex = 16;

    // finds the doctors total prescription count
    var totalPrescription = rowSum(doctor, startIndex, endIndex);

    var productIndex = findProduct(productData, doctor[4]);
    if (productIndex != -1) {
        if (totalPrescription > productData[productIndex].count) {
            productData[productIndex].count = totalPrescription;
            productData[productIndex].name = doctor[1] + " " + doctor[2];
        }
    } else {
        productData.push({
            product:doctor[4],
            count:totalPrescription,
            name:doctor[1] + " " + doctor[2]
        });
    }
}

/*
 * Takes in an array of the top future doctors for a particular prescription
 * and the object for a new doctor and updates the array if the object is 
 * a new top future doctor for that product
 */
function findFutureTopDoctor(topDocs, newDoc) {
    var productIndex = findProduct(topDocs, newDoc.product);
    if (productIndex != -1) {
        if (newDoc.futureTotal > topDocs[productIndex].futureTotal) {
            topDocs[productIndex] = newDoc;
        }
    } else {
        topDocs.push(newDoc);
    }
}

/* takes in two arrays, one for the doctor data and one for storing the doctors in;
 * reads in the doctors new prescription data and predicts their future prescriptions
 * 
 * save the predictions to the given array of objects
 */
function predictDoctor(doctor) {
    // set this value equal to the number of months ahead you wish to predict
    const futureTime = 6;

    const startIndex = 5;
    const endIndex = 10;
    const dataPointCount = endIndex - startIndex + 1;
    const xValues = [1,2,3,4,5,6];

    var yValues = [];
    for (var i = startIndex; i <= endIndex; i++) {
        yValues.push(parseInt(doctor[i]));
    }

    var sumX = 0;
    var sumY = 0;
    var sumXTY = 0;
    var sumXX = 0;
    for (var i = 0; i < xValues.length; i++) {
        sumX += xValues[i];
        sumY += yValues[i];
        sumXTY += xValues[i] * yValues[i];
        sumXX += xValues[i] * xValues[i];
    }

    var slope = (dataPointCount * sumXTY - sumX * sumY) / (dataPointCount * sumXX - sumX * sumX);
    var offset = (sumY - slope * sumX) / dataPointCount;

    var futureValue = Math.round(slope * futureTime + offset);

    // find the total prescription for that doctor
    var totalPrescription = rowSum(doctor, 11, 16);
    
    // add the doctor to the futureDoctors array
    var futureDoc = {
        name:doctor[1] + " " + doctor[2],
        product:doctor[4],
        futureNRx:futureValue,
        currentTRx:totalPrescription,
        futureTotal:futureValue + totalPrescription
    };

    return futureDoc;
}

// finds if the given array contains the given product and returns the index of the product
// returns -1 if no product was found
function findProduct(array, product) {
    var productIndex = -1;
    var currentIndex = 0;
    while (currentIndex < array.length && productIndex == -1) {
        if (array[currentIndex].product == product) {
            productIndex = currentIndex;
        }
        currentIndex++;
    }

    return productIndex;
}

// finds the sum of the values between startIndex and endIndex
function rowSum(array, startIndex, endIndex) {
    var sum = 0;
    for (var i = startIndex; i < endIndex; i++) {
        sum += parseInt(array[i]);
    }

    return sum;
}