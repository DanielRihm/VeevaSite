$(function () {
    $.get('/Prescriber_Data.csv', function (data) {
        // create input seperated by line
        var input = data.split('\r\n');

        // create table of all of the data seperated out
        var columnData = parseCSV(input);

        // create array of doctor prescription predictions
        var docPredict = [];

        // populate array with data
        for (var i = 0; i < columnData.length; i++) {
            predictDoctor(columnData[i], docPredict);
        }
    });
});
