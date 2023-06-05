import {data} from "./data.js";


export function bookingPage(id, days, start, finish, finalPrice){
   return `<img class="booking-image" src=${data[id-1].image} alt="">
   <div>
       <h1 class="vehicle-name">${data[id-1].name}</h1>
        <p><strong>Features</strong>: ${data[id-1].features}</p>
        <p><strong>Fuel efficiency</strong>: ${data[id-1].fuel}L/100km</p>
       <p><strong>Price</strong>: $${data[id-1].price} per day</p>
        

       <div>
           <br>
           <h4>Itinerary:</h4>
           <p>Length of hire: ${days} days</p>
           <ul>
               <li>Starting: ${start}</li>
               <li>Ending: ${finish}</li>
           </ul>
           <br>
           <h3>Total price: $${finalPrice}.00</h3>
       </div>

   </div>`
} 



export function mapDetails(pickUp, dropOff, distance, duration, fuelCost){
    return`<div class="map-results">
    <h3>${pickUp} to ${dropOff}</h3>
    <p>Distance: ${distance} km</p>
    <p>Drive time: ${duration}</p>
    <p>Estimated fuel cost: $${fuelCost}.00</p>
    <br>    
    <p>*Please confirm itinerary details are correct before proceeding</p>
</div>
<div class="booking-buttons">

    <button id="cancel">Cancel</button>
    <button id="book">Book now</button>
</div>`
}

