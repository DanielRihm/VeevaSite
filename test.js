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