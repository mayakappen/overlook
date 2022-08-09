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
let id;

function getPromises() {
    Promise.all([fetchData('bookings'), fetchData('rooms')]).then(data => {
        bookings = data[1].bookings;
        customer.getPrevBookings(bookings)
        rooms = data[2].rooms;
        customer.getTotalSpent(rooms);
        getBookingData(customer)
        console.log('customer: ', customer)
    })
}

function updatePromises() {
    Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
        sidebar.innerHTML = ` `
        potentialBookings.innerHTML = ` `
        currentBookings.innerHTML = ` `
        customers = data[0].customers
        bookings = data[1].bookings
        customer.bookings = []
        customer.getPrevBookings(bookings)
        rooms = data[2].rooms
        customer.totalSpent = 0
        customer.getTotalSpent(rooms)
        getBookingData(customer)
        console.log('customer: ', customer)
    })
}


const calendarView = document.querySelector('.calendar')
const dashboardView = document.querySelector('.dashboard')
let bookingCards = document.querySelectorAll('.booking');
const currentBooking = document.getElementById('current-booking')
let totalSpent = document.getElementById('totalSpent')
const formerBookings = document.querySelectorAll('.formerBooking')
let sidebar = document.querySelector('.sidebar')
const calendar = document.querySelector('.date')
const roomTypes = document.getElementById('roomTypes')
const calendarButton = document.getElementById('checkAvailabilities')
let bookButtons = document.querySelectorAll('.book-button')
let potentialBookings = document.querySelector('.potential-bookings')
let currentBookings = document.querySelector('.currentBookings')
let userField = document.getElementById('userName')
let passwordField = document.querySelector('.password')
const loginButton = document.getElementById('loginButton')
let loginView = document.querySelector('.login')
const body = document.body

// window.addEventListener('load', getPromises);
loginButton.addEventListener('click', login)
calendarButton.addEventListener('click', checkDates)
potentialBookings.addEventListener('click', bookRoom)


function getBookingData(customer) {
    sidebar.innerHTML = ``
    currentBookings.innerHTML = ``
    const date = new Date()
    const dateDay = date.getUTCDate()
    const dateMonth = date.getUTCMonth() + 1
    const dateYear = date.getUTCFullYear()
    const currentDate = dateYear + "-" + dateMonth + "-" + dateDay
    let pic
    sidebar.innerHTML = `<h4>Total Spent: $${customer.totalSpent}</h4>`
    customer.bookings.forEach( booking => {
    if (!booking.pic) {
    pic = roomImages[Math.floor(Math.random() * roomImages.length)]
    booking.pic = pic.toString()
    }
 
    let bookingDate = booking.date.split('/').join('-')
    let today = new Date(currentDate)
    console.log('current date: ', currentDate)
    let bookingDay = new Date(bookingDate)
    console.log('booking date: ', bookingDate)
    if( bookingDay < today) {
    sidebar.innerHTML += `
    <h4 class="title" id="formerBookingTitle" tabindex = "0">Room ${booking.roomNumber} on ${booking.date}</h4>
    <p class="text" id="formerBookingRoom">${booking.roomBooked.roomType}</p>
    <p class="text" id="formerBookingCost">$${booking.roomBooked.costPerNight}/night</p>
    <img src=${booking.pic} class ="bookingPic" alt="formerBookingImage" width=100 height=auto>
 `}
else if(today <= bookingDay) {
  
    currentBookings.innerHTML +=
`    <h4 class="title" id="upcomingBookingTitle" tabindex = "0">Room ${booking.roomNumber} on ${booking.date}</h4>
    <p class="text" id="upcomingBookingRoom">${booking.roomBooked.roomType}</p>
    <p class="text" id="upcomingBookingCost">$${booking.roomBooked.costPerNight}/night</p>
    <img src=${booking.pic} class ="bookingPic" alt="upcomingBookingImage" width=100 height = auto >`
}})
}

function checkDates() {
   potentialBookings.innerHTML = ``
    let date = calendar.value.split('-')
    let calendarData = date.map((date) => parseInt(date))
    let newDate = `${calendarData[0]}/${calendarData[1]}/${calendarData[2]}`
    console.log('weird calendar thing', newDate)
    console.log('calendar value: ', date) 
    let availabilities = []
    if (date.value === '') {
        dashboardView.innerHTML += `<h4>Select a Date</h4>`
    }
    let bookedRooms = bookings.filter((booking) => {
        if (booking.date === newDate) {
            return booking
        }
    }).map(booking => booking.roomNumber)
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
    if (roomFilter.length === 0) {
        dashboardView.innerHTML = `<h4>NO AVAILABILITIES</h4 <p>scheduled maintenance on our water system that day, we are so sorry for the inconvenience!</p>`
    }
    else {
    let pic
    roomFilter.forEach((availability) => {
    pic = roomImages[Math.floor(Math.random() * roomImages.length)].toString()
    // let potentialBooking = document.createElement('div')
    // potentialBooking.classList.add('potential-booking')
    // potentialBooking.setAttribute('id', availability.number.toString())
    let bidetStatus
    if (availability.bidet === false) {
        bidetStatus = "no bidet"
    } else {
        bidetStatus = "has a bidet"
    }
    potentialBookings.innerHTML += `
    <h4 class="title" id="potentialBookingTitle" tabindex = "0">Room ${availability.number} on ${date}</h4>
    <p class="text" id="potentialBookingRoom">${availability.roomType}</p>
    <p class="text" id="potentialBookingBeds> ${availability.numBeds} ${availability.bedSize} beds</p>
    <p class="text" id="potentialBooking-cost">$${availability.costPerNight}/night</p>
    <p class="text" id="potentialBooking-bidet">${bidetStatus}</p>
    <img src=${pic} class ="bookingPic" alt="potential-booking-image" width=100 height=auto>
    <button class="book-button" id ="${availability.number}">Book!</button>
 `
// potentialBookings.append(potentialBooking)
})}
}

function bookRoom(event) {
event.preventDefault()
    if (event.target.classList.contains('book-button')) {
        console.log(event.target.id)
    postRoom(event.target.id)
    updatePromises()
    checkDates()
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
let myPromise
function login(event) {
    event.preventDefault()
    let password = passwordField.value
    console.log(password)
    if (password === 'overlook2021') {
    loginView.classList.add('hidden')
    dashboardView.classList.remove('hidden')
    let username = userField.value
    console.log(username)
    id = username.slice(-2)
    console.log(id)
    myPromise = new Promise((resolve, reject) => {
            
            resolve( setTimeout(
                fetchData(`customers/${id}`).then(data => {
   
                    customer = new Customer(data)
                    console.log(customer)
                    return customer
                }), 100000))
            reject(err => alert(err))
            
    })

}

}






