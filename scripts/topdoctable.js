var data = sessionStorage.getItem("csvInput");

// create input seperated by line
var input = data.split('\n');

// create table of all of the data seperated out
var columnData = parseCSV(input);

// declare maximum object array for the products
var maxProduct = [];

// find the max products
for (var i = 0; i < columnData.length; i++) {
    findMaxPresciption(columnData[i],maxProduct);
}

//define data array
var tabledata = [];
for (var i = 0; i < maxProduct.length; i++) {
    tabledata[i] = {
        id:i+1,
        product:maxProduct[i].product,
        count:maxProduct[i].count,
        name:maxProduct[i].name
    };
}

var table = new Tabulator("#TopDocTable", {
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
        {title:"Total Prescribed", field:"count", editor:"input"},
        {title:"Product", field:"product", editor:"input"}
    ],
});
