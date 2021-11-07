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
            var futureDoc = predictDoctor(columnData[i]);
            findFutureTopDoctor(docPredict, futureDoc);
        }

        //define data array
        var tabledata = [];
        for (var i = 0; i < docPredict.length; i++) {
            tabledata[i] = {
                id:i+1,
                name:docPredict[i].name,
                count:docPredict[i].futureTotal,
                product:docPredict[i].product
            };
        }

        var table = new Tabulator("#FutureTopDocTable", {
            data:tabledata,           //load row data from array
            layout:"fitColumns",      //fit columns to width of table
            responsiveLayout:"hide",  //hide columns that dont fit on the table
            addRowPos:"top",          //when adding a new row, add it to the top of the table
            history:true,             //allow undo and redo actions on the table
            pagination:"local",       //paginate the data
            paginationSize:7,         //allow 7 rows per page of data
            movableColumns:true,      //allow column order to be changed
            resizableRows:true,       //allow row order to be changed
            initialSort:[             //set the initial sort order of the data
                {column:"name", dir:"asc"},
            ],
            columns:[                 //define the table columns
                {title:"Doctor", field:"name", editor:"input"},
                {title:"Predicted Total Prescriptions", field:"count", editor:"input"},
                {title:"Product", field:"product", editor:"input"}
            ],
        });
    });
});
