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
    for (let i = 0; i < input.length; i++) {
        sum += parseInt(input[i][index]);
    }

    return sum;
}

function parseStateColorData(stateData, range) {
    for (var i = 0; i < stateData.length; i++) {
        var rangeIndex = 1;
        while (stateData[i].color == -1 && rangeIndex - 1 < range.length) {
            if (stateData[i].TRx > range[rangeIndex-1] && stateData[i].TRx < range[rangeIndex]) {
                stateData[i].color = rangeIndex - 1;
            }
            rangeIndex++;
        }
    }
}

// sets state color data to a default -1
function addStateData(stateData, lineArray) {
    const startIndex = 11;
    const endIndex = 16;

    var totalPrescription = rowSum(lineArray, startIndex, endIndex);

    var stateIndex = findState(stateData, lineArray[3]);
    if (stateIndex != -1) {
        stateData[stateIndex].TRx += totalPrescription;
    } else {
        stateData.push({
            state:lineArray[3],
            TRx:totalPrescription,
            color:-1
        });
    }
}

function findState(stateData, state) {
    var stateIndex = -1;
    var currentIndex = 0;
    while (currentIndex < stateData.length && stateIndex == -1) {
        if (stateData[currentIndex].state == state) {
            stateIndex = currentIndex;
        }
        currentIndex++;
    }

    return stateIndex;
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

    if (futureValue < 0) {
        futureValue = 0;
    }

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

// takes an array for a product for a single doctor and adds that doctor's
// totals to the total sum for that product
function sumTRxPerMonth(doctor, sumTRx){
    var productIndex = findProduct(sumTRx, doctor[4]);
    if (productIndex != -1) {
        sumTRx[productIndex].countMonth1 += parseInt(doctor[11]);
        sumTRx[productIndex].countMonth2 += parseInt(doctor[12]);
        sumTRx[productIndex].countMonth3 += parseInt(doctor[13]);
        sumTRx[productIndex].countMonth4 += parseInt(doctor[14]);
        sumTRx[productIndex].countMonth5 += parseInt(doctor[15]);
        sumTRx[productIndex].countMonth6 += parseInt(doctor[16]);
    } else {
        sumTRx.push({
            product:doctor[4],
            countMonth1:parseInt(doctor[11]),
            countMonth2:parseInt(doctor[12]),
            countMonth3:parseInt(doctor[13]),
            countMonth4:parseInt(doctor[14]),
            countMonth5:parseInt(doctor[15]),
            countMonth6:parseInt(doctor[16])
        });
    }
}
