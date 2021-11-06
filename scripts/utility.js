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

function sumOfColumn(input, index) {
    var sum = 0;
    for (let i = 0; i < input[index].length; i++) {
        sum += parseInt(input[i][index]);
    }

    return sum;
}
