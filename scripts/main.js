async function loadFile(file) {
    let text = await file.text();

    // testText is what the first line of the input file is expected to be
    const testText = "id,first_name,last_name,State,Product,NRx_Month_1,NRx_Month_2,NRx_Month_3,NRx_Month_4,NRx_Month_5,NRx_Month_6,TRx_Month_1,TRx_Month_2,TRx_Month_3,TRx_Month_4,TRx_Month_5,TRx_Month_6";
    
    var outputText = "";
    var firstLine = text.split('\n')[0];
    if (firstLine == testText) {
        outputText = "File successfully opened!";

        // only saves the data if it is correctly formatted.
        sessionStorage.setItem("csvInput", text);
    } else {
        outputText = "File is not correctly formatted.";
    }
    document.getElementById('output').textContent = outputText;
}
