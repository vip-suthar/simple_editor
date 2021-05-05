const idb = indexedDB.open('vipdb', 1);
idb.onupgradeneeded = ()=>{
    let db = idb.result;
    if (!db.objectStoreNames.contains('books')) db.createObjectStore('books', {keyPath:'id'});
    
    console.log(db);
}
idb.onsuccess = ()=>{
    let db = idb.result;
    let transaction = db.transaction("books","readwrite");
    let books = transaction.objectStore("books");
    let book = {
        id : 1,
        name : 'book1',
        price : 200,
        created : Date.now()
    }
    let request = books.add(book);
    request.onsuccess=()=>{
        console.log("book added ", request);
    }
    request.onerror = ()=>{
        console.log("Error ", request.error);
    }
    let a;
    [a,b,c]=[1,2,3];
    console.log(a,b,c)
}
idb.onerror = (err)=>{
    console.log(err);
}
const deleteReq = indexedDB.deleteDatabase('vipdb');
//let db = idb.result;
//console.log(deleteReq);
//console.log(db)