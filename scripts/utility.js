// reads in an array of rows and seperates out the columns and the items in each column
function parseCSV(str) {
    const array2D = [];
    for(r = 1; r < str.length; r++)
    {
        array2D[r-1] = str[r].split(",");
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
    var totalPrescription = 0;
    for (var i = startIndex; i < endIndex; i++) {
        totalPrescription += parseInt(doctor[i]);
    }

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