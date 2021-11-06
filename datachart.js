$(function () {
    $.get('/Prescriber_Data.csv', function (data) {
        var input = data.split('\r\n');
        var columnData = parseCSV(input);

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

        var trace1 = {
            x: xData,
            y: yNewData,
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Total New Prescriptions'
        };

        var trace2 = {
            x: xData,
            y: yTotalData,
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Total Prescriptions'
        };

        var data = [trace1, trace2];

        var layout = {font: {size: 18}};
        var config = {responsive: true};
        TESTER = document.getElementById('test');
        Plotly.newPlot(TESTER, data, layout, config);
        });
});

function sumOfColumn(input, index) {
    var sum = 0;
    for (let i = 0; i < input[index].length; i++) {
        sum += parseInt(input[i][index]);
    }

    return sum;
}