import {data, config, swiper, initMap, directionsService, directionsDisplay} from "./data.js";
import { bookingPage, mapDetails } from "./element.js";

$("#start").on("click",function(){
    swiper.slideNext();
    });

$("#resubmit, #cancel, #return").click(()=>{
    swiper.allowSlidePrev = true;
    swiper.slideTo(0,2000, true);
    setTimeout(function() { location.reload(); }, 2000);
    });


const fuelPrice = 2.45;
let pickUpDate;
let dropOffDate;
let pickUpLocation;
let dropOffLocation;
let amountOfPeople;
let litresPer100;
let lengthOfHire;

$("#confirmLocation").click(()=>{
    pickUpLocation =($("#pickUpLocation").val()); 
    dropOffLocation =($("#dropOffLocation").val());
    if (pickUpLocation.search(/, New Zealand/) !== -1 && dropOffLocation.search(/, New Zealand/) !== -1 ){
        swiper.slideNext();
    } else{
        $(".location-error").css("display", "block");
    }})

$("#confirm-people").click(()=>{
    amountOfPeople = $("#people").val();
    if (amountOfPeople > 0 && amountOfPeople < 7){
        pickUpLocation =$("#pickUpLocation").val(); 
        dropOffLocation =$("#dropOffLocation").val(); 
        swiper.slideNext();
        

   
    } else{
        $(".people-error").css("display","block")
    }

    })


    $("#pickUpDate").on("change",(event)=>{
        let date = event.target.value;
        config.minDate = date;
        if (amountOfPeople ==="1"){
            config.minDate = new Date(date).fp_incr(1)
            config.maxDate = new Date(date).fp_incr(11)
            $("#dropOffDate").flatpickr(config);
        } 

        if (amountOfPeople ==="2"){
            config.minDate = new Date(date).fp_incr(1)
            config.maxDate = new Date(date).fp_incr(16)
            $("#dropOffDate").flatpickr(config);
        }
        
        if(amountOfPeople !== "1" && amountOfPeople !== "2"){
            config.minDate = new Date(date).fp_incr(4)
            config.maxDate = new Date(date).fp_incr(16)
            $("#dropOffDate").flatpickr(config);
        }
        pickUpDate = date;
    });
    
    $("#dropOffDate").on("change", (event)=>{
        dropOffDate = event.target.value;
    });


$("#search").on("click",()=>{
    if (pickUpDate!==undefined && dropOffDate!==undefined){
        lengthOfHire = Math.ceil(new Date(dropOffDate).getTime() - new Date(pickUpDate).getTime()) / (1000 * 3600 * 24);
        search(lengthOfHire);
     } else{
        $(".dates-error").css("display", "block")
    }
    
   
    
    
   
});

$(".select").click((event)=>{
    let id = event.target.id;
    calcRoute(pickUpLocation, dropOffLocation);
    litresPer100 = data[id -1 ].fuel;
    selectVehicle(dropOffDate, pickUpDate, id);
    
    });




function search(days){
    data.forEach(item => {
        if(amountOfPeople < 2 && item.id ==="motor-home"){
            return;
        }
      if(item.minDays  <= days && item.maxDays +1 >= days){
           if(item.maxPeople >= amountOfPeople){
            $(`#${item.id}`).css("opacity", "100%");
            $(`#${item.id}`).css("width", "180px");
            $(`.${item.id}-button`).css("display", "block");
            $(`#${item.id}-details`).css("display", "block");
            $(`#${item.id}-error`).css("display", "none");
           }
        }
        
    });
    swiper.slideNext();
    
    }



function selectVehicle(dropOffDate, pickUpDate, id){
    let dropOff = new Date(dropOffDate).toLocaleDateString();
    let pickUp =  new Date(pickUpDate).toLocaleDateString();
    let element = document.getElementById("booking-info");
    let finalPrice = data[id-1].price * lengthOfHire;
    let features = data[id-1].features;
    element.insertAdjacentHTML("afterbegin",(bookingPage(
        id,
        lengthOfHire,
        pickUp,
        dropOff,
        finalPrice,
        features)));

       



}





function calcRoute(pickUpLocation, dropOffLocation){
initMap();
var request = {origin: pickUpLocation, destination: dropOffLocation, travelMode: google.maps.TravelMode.DRIVING, unitSystem: google.maps.UnitSystem.METRIC}
directionsService.route(request, (result, status)=>{
    if (status !== "NOT_FOUND"){
        if (status === google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(result);
            let distance = parseInt(result.routes[0].legs[0].distance.text);
            let duration = result.routes[0].legs[0].duration.text;
            let fuelCost = Math.round((litresPer100 / 100) * (distance  * fuelPrice))
            pickUpLocation = pickUpLocation.slice(0,pickUpLocation.indexOf(","));
            dropOffLocation = dropOffLocation.slice(0,dropOffLocation.indexOf(",")) ;
            document.getElementById("booking-info2").insertAdjacentHTML("beforeend",mapDetails(pickUpLocation, dropOffLocation, distance, duration, fuelCost));
            $("#cancel").click(()=>{
                swiper.allowSlidePrev = true;
                swiper.slideTo(0,2000, true);
                setTimeout(function() { location.reload(); }, 1800);
            });
            $("#book").click(()=>{
                swiper.slideNext();
            }) 
            swiper.slideNext();
     } else{

        directionsDisplay.setDirections({routes:[]});
        map.setCenter(mylatng);
  
     }
       
    }
    
 
     
 
 
      
    });

   

   

    }




  

 
    
    

   











  

