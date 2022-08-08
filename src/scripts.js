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



let dashboardView = document.getElementById('dashboard-view')
let bookingCards = document.querySelectorAll('.booking');
let currentBooking = document.getElementById('current-booking')
let totalSpent = document.getElementById('totalSpent')
let formerBookings = document.querySelectorAll('.formerBooking')
let sidebar = document.querySelector('.sidebar')
let calendar = document.querySelector('.date')
let calendarButton = document.getElementById('checkAvailabilities')

window.addEventListener('load', getPromises);
calendarButton.addEventListener('click', checkDates)

function getBookingData(customer) {
    let pic
    totalSpent.innerHTML = `Total Spent: $${customer.totalSpent}`
    customer.bookings.forEach( booking => {
    pic = roomImages[Math.floor(Math.random() * roomImages.length)]
    sidebar.innerHTML += `
    <h4 class="title" id="former-booking-title">Room ${booking.roomNumber} on ${booking.date}</h4>
    <p class="text" id="former-booking-room">${booking.roomBooked.roomType}</p>
    <p class="text" id="former-booking-cost">$${booking.roomBooked.costPerNight}/night</p>
    <img src=${pic} class ="bookingPic" alt="former-booking-image" width=100 height=auto>
 `})
}

function checkDates() {
    let date = calendar.value.split('-').join('/');
    let availablities = []
    if (date.value === '') {
        homepage.innerHTML += `<h4>Select a Date</h4>`
    }
    let bookedRooms = bookings.filter((booking) => {
        if (booking.date.includes(date)) {
            return booking
        }
    }).map(booking => booking.roomNumber)
    console.log("booked rooms: ", bookedRooms)
    rooms.filter((room) => {
        if (!bookedRooms.includes(room.number)) {
            availablities.push(room)
        }
        console.log("available rooms", availablities)
    })
}
