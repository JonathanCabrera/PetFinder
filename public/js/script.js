//----------------------------------------function calls----------------------------------------


//----------------------------------------functions----------------------------------------

//use this function to retrieve data from an API
async function fetchData(url){
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}