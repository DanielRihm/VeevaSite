var data = sessionStorage.getItem("csvInput");

//Array
var input = data.split('\n');
var columnData = parseCSV(input);

var sumTRx = [];

for (var i = 0; i < columnData.length; i++) {
    sumTRxPerMonth(columnData[i],sumTRx);
}

const xData = [1,2,3,4,5,6];
var data = [];

for (var i = 0; i < sumTRx.length; i++) {
    var yData = [
        sumTRx[i].countMonth1,
        sumTRx[i].countMonth2,
        sumTRx[i].countMonth3,
        sumTRx[i].countMonth4,
        sumTRx[i].countMonth5,
        sumTRx[i].countMonth6
    ];
    data[i] = {
        x: xData,
        y: yData,
        mode: "lines+markers",
        type: "scatter",
        name: sumTRx[i].product
    };
}

// makes the plot
var layout = {font: {size: 18}};
var config = {responsive: true};
TESTER = document.getElementById('ProductTrends');
Plotly.newPlot(TESTER, data, layout, config);