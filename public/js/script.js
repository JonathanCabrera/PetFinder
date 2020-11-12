//----------------------------------------function calls----------------------------------------
//fetchData("https://api.petfinder.com/v2/?apikey=xGuOIWMLc2BR0zFXcMSdMoLPe5dko8hdHm7ncHJqmcVuBA7iHx");

//----------------------------------------functions----------------------------------------

//use this function to retrieve data from an API
async function fetchData(url){
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}