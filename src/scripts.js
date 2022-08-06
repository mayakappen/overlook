// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import Booking from '../src/classes/Booking.js'

let fetchData = (data) => {
    return fetch(`http://localhost:3001/api/v1/${data}`)
        .then(rsp => rsp.json())
        .catch(error => console.log(error))
};

let customers;
let bookings;
let rooms;
let customer;
let booking;
let room;

function getPromises() {
    Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
        customers = data[0].customers;
        console.log('customers: ', customers);
        bookings = data[1].bookings;
        console.log('bookings: ', bookings);
        rooms = data[2].rooms;
        console.log('rooms: ', rooms);
        booking = new Booking(bookings[0]);
    })
}

window.addEventListener('load', getPromises);