const request = (url, type, options={})=>{
   return new Promise((res, rej)=>{
        const xmlhttpreq = new XMLHttpRequest();
    xmlhttpreq.onreadystatechange = ()=>{
        if (xmlhttpreq.status == 200 && xmlhttpreq.readyState == 4) {
            res(xmlhttpreq.response);
        }  
    }
    xmlhttpreq.open(type, url, true);
    for (const key in options) {
        xmlhttpreq.setRequestHeader(key, options[key]);
    }
    xmlhttpreq.send();
   })
}

async function getData() {
    let result = await request(
        'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json',
        'GET'
    );
    console.log(result)
}
getData();