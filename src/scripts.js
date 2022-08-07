// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import Booking from './classes/Booking.js'
import Customer from './classes/Customer.js';
import Room from './classes/Room.js'

let fetchData = (data => {
    return fetch(`http://localhost:3001/api/v1/${data}`)
        .then(rsp => rsp.json())
        .catch(error => console.log(error))
});

let customers;
let bookings;
let rooms;
let customer;
let booking;
let room;

function getPromises() {
    Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
        customers = data[0].customers;
        let customer = new Customer(customers[Math.floor(Math.random() * customers.length)]);
        bookings = data[1].bookings;
        customer.getPrevBookings(bookings)
        rooms = data[2].rooms;
        customer.getTotalSpent(rooms);
        console.log('customer: ', customer);
    })
}

window.addEventListener('load', getPromises);