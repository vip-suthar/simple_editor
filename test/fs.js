const input = document.getElementById('input');
const buttonLoad = document.getElementById('loadFile');
var fileHandle;
buttonLoad.onclick = async ()=>{
    [fileHandle] = await window.showOpenFilePicker();
    let file = await fileHandle.getFile();
    // let contents = await file.text();
    let result = await file.text()
    input.value = result;
}
const saveBtn = document.getElementById('saveFile');
saveBtn.onclick = async ()=>{
    fileHandle = await getNewFileHandler();
    let writable = await fileHandle.createWritable();
    const response = await fetch('./indexdb.js');
    await response.body.pipeTo(writable);
}

async function getNewFileHandler() {
    const options = {
        suggestedName : 'Untitled',
        types : [{
                description: 'Text Files',
                accept : { 'text/plain':['.txt'] }
            }]
    };
    const handle = await window.showSaveFilePicker(options);
    return handle;
}
const dirBtn = document.getElementById('dir');
dirBtn.onclick = async ()=>{
    const dirHandle = await window.showDirectoryPicker();
    console.log(dirHandle);
    for await (const entry of dirHandle.values()) {
        console.log(entry.kind, entry.name)
    }
}