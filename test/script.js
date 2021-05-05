const input = document.getElementById('input');
const setBtn = document.getElementById('setbtn');
const getBtn = document.getElementById('getbtn');
const removeBtn = document.getElementById('removebtn');
const output = document.getElementById('output');
const localStorage = window.localStorage;

var hash = [];
setBtn.onclick = ()=>{
    let myuniqueId = checkDuplicate(uniqueID());
    console.log(myuniqueId);
    localStorage.setItem(myuniqueId, input.value);
    hash.push(myuniqueId);
    input.value = '';
}
for (const key in localStorage) {
    console.log(key + ':' + localStorage[key]);
}
getBtn.onclick = ()=>{
    hash.every((item)=>{
        output.innerHTML += item + ':' + localStorage.getItem(item) + '<br>';
        return true;
    })
}
// removeBtn.onclick = ()=>{
//     localStorage.removeItem('value');
// }

const uniqueID = ()=> Math.random().toString(36).slice(-4);

function checkDuplicate(id) {
    if (hash.includes(id)) checkDuplicate(uniqueID());
    return id;
}

const mutobs = new MutationObserver((e)=>{
    console.log("sfs")
})
mutobs.observe(input, {
    subtree: true,
    attributes : true, 
    childList : true
})