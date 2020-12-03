
var key="Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ4R3VPSVdNTGMyQlIwekZYY01TZE1vTFBlNWRrbzhoZEhtN25jSEpxbWNWdUJBN2lIeCIsImp0aSI6ImE5ZTIzNjhiZmIwNzFhNzFiNjZiYzA1N2UwNDVkMzIyNjQzZDQzMjY2ZDQ5OTNiYzM3MjI0NjBhMmE2N2M1YmU4N2E5MDJiY2NmMTllNmRkIiwiaWF0IjoxNjA1ODI1MDU1LCJuYmYiOjE2MDU4MjUwNTUsImV4cCI6MTYwNTgyODY1NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.t7k_4bdt4RHW8G5KIuR552ys1AO2Hkr5D-q4qKabTGdcBM1grGk3FwOx9vQ7i-gmOhtd8bq59ltu7kh6FolYwQTsu3pVq6shX8QNJHTHdsd2LisVINWTCM8DsA5xsnJE2mahenHJ7adfREh9pD7GO9WweNeQGom3JrbK9zb3ZPww_tGuQJv10UY41PWjJg8fw_UaY35EhkszA-mn5G81kONLMN-w2fROBfSauor7MZC9B5rv14JwxwTeBQUqxzio0CBkFT_YD4-OSiXZnRZ8F5hQWtfHWqRBCVnFKZS7Jmg2gkxULYLOCCsxE7kK1OVrt7TuBKF3R0-NmANNcJc-VQ";

var url="curl -H ";
 const location = $("#location").val().trim();
 const animal = $("#animal").val();
const gender = $("#gender").val();
const age = $("#selectAge").val();
const size = $("#selectSize").val();

$("#button").on("click", function() {
   url +=key;
  url += "https://api.petfinder.com/v2/animals";
 console.log(url);
  $.ajax({
    method: "GET",
    
    dataType: "json",
          data: {
        zipcode: location,
        animal: animal,
        gender: gender,
        age: age,
        size: size
      }.then(function (data) {

      for (var i = 0; i < data.length; i++) {
        var petIMGurl = "";
        if (data[i].primary_photo_cropped === null) {
          petIMGurl = 'https://via.placeholder.com/150/008ae6/FFF/?text=No+Photo+Available';
        } else {
          petIMGurl = data[i].primary_photo_cropped.small;
        }
        var petName = data[i].name;
        var petStatus = data[i].status;
        var petDistance = parseInt(data[i].distance);
        var newPetDistance = petDistance.toFixed(1);
        var petGender = data[i].gender;
        var petBreed = data[i].breeds.primary;
        var petMixed = data[i].breeds.mixed;
        var petWebLink = data[i].url;
        var petAge = data[i].age;
        var petSize = data[i].size;

        var petMix = "";
        if (petMixed === true) {
          petMix = "Yes";
        } else if (petMixed === false) {
          petMix = "Nope";
        } else { petMix = "Not sure" }

        var newPetCard = $(`<div class='card pet-card h-100' id='pet-card-${[i]}'>`);
        var newPetPic = $(`<img class='card-img-top img-thumbnail rounded mx-auto d-block' id='pet-pic-${[i]}'>`);
        newPetPic.attr("src", petIMGurl);

        var newPetCardBody = $(`<div class='card-body pet-${[i]} pet-card-body'>`);

        newPetCardBody.append(`
        <h5 class="card-title">Hello! I'm ${petName}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Status: ${petStatus}</li>
        <li class="list-group-item">Distance: ${newPetDistance} miles away</li>
        <li class="list-group-item">Gender: ${petGender}</li>
        <li class="list-group-item">Breed: ${petBreed}</li>
        <li class="list-group-item">Mixed Breed? ${petMix}</li>
      </ul>
      <div class="card-body m-auto">
        <a href="${petWebLink}" class="card-link"><button type="button" class="btn btn-outline-warning btn-sm">ADOPT INFO!</button></a>
        <button type="button" class="btn btn-outline-danger btn-sm" data-name="${petName}" data-age="${petAge}" data-gender="${petGender}" data-breed="${petBreed}" data-size="${petSize}" data-url="${petWebLink}" data-img="${petIMGurl}">&hearts;</button>
      </div>
        `);

        newPetCard.append(newPetPic);
        newPetCard.append(newPetCardBody);
        $(".animalBox").append(newPetCard);
      }
    })
  });