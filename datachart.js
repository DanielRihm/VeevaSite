$(function () {
    $.get('/Prescriber_Data.csv', function (data) {
        console.log(data);
        var input = data.split('\n');

        var data = [{
            x: [1, 2, 3, 4, 5, 6],
            y: [0, 10, 20, 30, 40, 50] }];
        var layout = {font: {size: 18}};
        var config = {responsive: true};
        TESTER = document.getElementById('test');
        Plotly.newPlot(TESTER, data, layout, config);
        });
});