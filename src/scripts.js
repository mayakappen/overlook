// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/beautifulBuilding.webp'
// import './images/cecil.jpeg'
// import './images/juniorSuite.jpeg'
// import './images/residentialSuite.jpeg'
// import './images/singleRoom.jpeg'
// import './images/stayHere.jpeg'
// import './images/suite.jpeg'
import roomImages from './images/imagesCollection.js'
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
        getBookingData(customer)
        console.log('customer: ', customer)
    })
}

window.addEventListener('load', getPromises);

let dashboardView = document.getElementById('dashboard-view')
let bookingCards = document.querySelectorAll('.booking');
let currentBooking = document.getElementById('current-booking')
let formerBookings = document.querySelectorAll('.formerBooking')

function getBookingData(customer) {
    let bookingRoom = rooms.find(room => customer.bookings[0].roomNumber === room.number)
    console.log(bookingRoom)
    currentBooking.innerHTML += `<h4 class="title" id="current-booking-title"></h4>
    <p class="text" id="current-booking-text"></p>
    <img src="" class ="bookingPic" id="current-booking-pic" alt="current-booking-image"></img>`
}
