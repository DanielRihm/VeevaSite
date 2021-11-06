$(function () {
    $.get('/Prescriber_Data.csv', function (data) {
        var input = data.split('\n');

        var columnData = parseCSV(input);

        console.table(columnData);
        console.log(columnData[0].length);

        const newStart = 5;
        const newEnd = 10;
        const totalStart = 11;
        const totalEnd = 16;

        var xData = [1,2,3,4,5,6];
        var yNewData = [];
        var yTotalData = [];
        
        for (var i = newStart; i <= newEnd; i++) {
            yNewData[i-newStart] = sumOfColumn(columnData, i);
        }

        for (var i = totalStart; i <= totalEnd; i++) {
            yTotalData[i-totalStart] = sumOfColumn(columnData, i);
        }

        console.table(yNewData);
        console.table(yTotalData);

        var trace1 = [{
            x: xData,
            y: yNewData,
            mode: 'lines+markers',
            type: 'scatter'
        }];

        var trace2 = [{
            x: xData,
            y: yTotalData,
            mode: 'lines+markers',
            type: 'scatter'
        }];

        var data = [trace1, trace2];

        var layout = {font: {size: 18}};
        var config = {responsive: true};
        TESTER = document.getElementById('test');
        Plotly.newPlot(TESTER, trace1, layout, config);
        });
});

function parseCSV(testArray) {
    var outArray = [
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [2,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [3,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [4,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [5,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [6,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [7,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [8,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [9,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [10,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [11,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [12,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [13,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [14,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [15,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [16,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [17,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [18,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    ];
    return outArray;
}

function sumOfColumn(input, index) {
    var sum = 0;
    for (let i = 0; i < input[index].length; i++) {
        sum += input[index][i];
    }

    return sum;
}