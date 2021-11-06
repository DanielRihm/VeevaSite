function parseCSV(str)
{
    const array2D = [1000][17];
    for(r = 0; r < 1001; r++)
    {
        const rowArray = str[r].split(",");
        for(c = 0; c < 17; c++)
        {
            array2D[c][r] = rowArray[c];
        }
    }
}