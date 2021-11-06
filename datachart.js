$(function () {
    $.get('/Prescriber_Data.csv', function (data) {
        // create input seperated by line
        var input = data.split('\r\n');

        // create table of all of the data seperated out
        var columnData = parseCSV(input);

        // initialize constants
        const newStart = 5;
        const newEnd = 10;
        const totalStart = 11;
        const totalEnd = 16;

        // declare the x and y data
        var xData = [1,2,3,4,5,6];
        var yNewData = [];
        var yTotalData = [];
        
        // finds the y data for each x coordinate
        for (var i = newStart; i <= newEnd; i++) {
            yNewData[i-newStart] = sumOfColumn(columnData, i);
        }

        for (var i = totalStart; i <= totalEnd; i++) {
            yTotalData[i-totalStart] = sumOfColumn(columnData, i);
        }

        // creates the line traces
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

        // creates the cumulative graph data
        var data = [trace1, trace2];

        // makes the plot
        var layout = {font: {size: 18}};
        var config = {responsive: true};
        TESTER = document.getElementById('test');
        Plotly.newPlot(TESTER, data, layout, config);
        });
});
