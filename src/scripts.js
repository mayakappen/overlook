// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
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
let roomFilter;

function getPromises() {
    Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
        customers = data[0].customers;
        customer = new Customer(customers[Math.floor(Math.random() * customers.length)]);
        bookings = data[1].bookings;
        customer.getPrevBookings(bookings)
        rooms = data[2].rooms;
        customer.getTotalSpent(rooms);
        getBookingData(customer)
        console.log('customer: ', customer)
    })
}


const calendarView = document.querySelector('.calendar')
const dashboardView = document.getElementById('dashboard-view')
let bookingCards = document.querySelectorAll('.booking');
const currentBooking = document.getElementById('current-booking')
const totalSpent = document.getElementById('totalSpent')
const formerBookings = document.querySelectorAll('.formerBooking')
const sidebar = document.querySelector('.sidebar')
const calendar = document.querySelector('.date')
const roomTypes = document.getElementById('roomTypes')
const calendarButton = document.getElementById('checkAvailabilities')
let bookButtons = document.querySelectorAll('.book-button')
const potentialBookings = document.querySelector('.potential-bookings')
const body = document.body

window.addEventListener('load', getPromises);
calendarButton.addEventListener('click', checkDates)
potentialBookings.addEventListener('click', bookRoom)


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
    let availabilities = []
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
            availabilities.push(room)
        }
        console.log("available rooms", availabilities)
    })
    roomFilter =  availabilities.filter((room) => {
        if (roomTypes.value === 'any') {
            return room
        }
        else if (roomTypes.value === room.roomType) {
            return room
        }
    })
    let pic
    roomFilter.forEach((availability) => {
    pic = roomImages[Math.floor(Math.random() * roomImages.length)]
    let potentialBooking = document.createElement('div')
    potentialBooking.classList.add('potential-booking')
    potentialBooking.setAttribute('id', availability.number.toString())
    let bidetStatus
    if (potentialBooking.bidet === false) {
        bidetStatus = "no bidet"
    } else {
        bidetStatus = "has a bidet"
    }
    potentialBookings.innerHTML += `
    <h4 class="title" id="potentialBookingTitle">Room ${availability.number} on ${date}</h4>
    <p class="text" id="potentialBookingRoom">${availability.roomType}</p>
    <p class="text" id="potentialBookingBeds> ${availability.numBeds} ${availability.bedSize} beds</p>
    <p class="text" id="potentialBooking-cost">$${availability.costPerNight}/night</p>
    <p class="text" id="potentialBooking-bidet">${bidetStatus}</p>
    <img src=${pic} class ="bookingPic" alt="potential-booking-image" width=100 height=auto>
    <button class="book-button" id ="${availability.number}">Book!</button>
 `
potentialBookings.append(potentialBooking)
})

}

function bookRoom(event) {
event.preventDefault()
    if (event.target.classList.contains('book-button')) {
        console.log(event.target.id)
        postRoom(event.target.id)
    }
}

function postRoom(id) {
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userID: customer.id, date: calendar.value.split('-').join('/'), roomNumber: parseInt(id)})
    })
        .then(resp => resp.json())
        .catch(error => console.log(error))
}




