


export const data = [
    {name:"Kawasaki Ninja", id:"motor-bike", maxPeople: 1, price: 109, minDays:1, maxDays:5, fuel:3.7, image:"./images/motorbike.jpg", features:"Off Road capability, with helmet included"},
    {name:"Audi RS4", id: "small-car", maxPeople: 2, price: 129, minDays:1, maxDays:10, fuel:8.5, image:"./images/small-car.jpg", features:"2.0L turbo engine with active cruise control"},
    {name:"2013 Toyota Hilux", id:"large-car", maxPeople: 5, price: 144, minDays:3, maxDays:10,fuel:9.7, image:"./images/large-car.jpg", features:"4WD, Leather heated seats, active cruise control and powered sunroof"},
    {name:"2016 Trail Apache 700", id:"motor-home", maxPeople:6, price: 200, minDays:2, maxDays:15, fuel:17, image:"./images/motorhome.jpg", features:"1 full size ensuite, with kitchen, shower and lounge"}
]

var options= {
    types:['(cities)'],
    componentRestrictions: {country: "nz"}
};

export const autoCompletePickup= new google.maps.places.Autocomplete((document.getElementById("pickUpLocation")), options);
export const autoCompleteDropOff=new google.maps.places.Autocomplete((document.getElementById("dropOffLocation")), options);


export var cities = ['Auckland','ChristChurch','Wellington','Hamilton',"Tauranga", "Dunedin", "Palmerston North"];
export const defaultLocation = {lat:-36.848461, lng:174.763336};

export var directionsService = new google.maps.DirectionsService();
export var directionsDisplay = new google.maps.DirectionsRenderer();


export const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    allowTouchMove: false,
    speed: 600,
    allowSlidePrev: false


    

  

  });

export const mapOptions={
    center: defaultLocation,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    fullscreenControl: false,
    mapTypeControl: false,
    keyboardShortcuts: false
};

export var config = {
    enableTime: false,
    altInput: true,
    altFormat:("F j, Y"),
    minDate:"today",
    maxDate:""
}

export function initMap(){
    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    directionsDisplay.setMap(map);
}

$("#pickUpDate").flatpickr(config);
$("#dropOffDate").flatpickr(config);