async function loadFile(file) {
    let text = await file.text();
    console.log(text);
    sessionStorage.setItem("csvInput", text);
}
