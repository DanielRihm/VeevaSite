// reads in an array of rows and seperates out the columns and the items in each column
function parseCSV(str)
{
    const array2D = [];
    for(r = 1; r < str.length; r++)
    {
        const rowArray = str[r].split(",");
        array2D[r-1] = rowArray;
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
