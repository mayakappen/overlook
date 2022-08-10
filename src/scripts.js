// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import roomImages from './images/imagesCollection.js'
import Booking from './classes/Booking.js'
import Customer from './classes/Customer.js';
import Room from './classes/Room.js'

let customers;
let bookings;
let rooms;
let customer;
let booking;
let room;
let roomFilter;
let id;
let newDate
let fetchData = (data => {
    return fetch(`http://localhost:3001/api/v1/${data}`)
        .then(rsp => rsp.json())
        .catch(error => console.log(error))
});

function login(event) {
    event.preventDefault()
    let password = passwordField.value
    let username = userField.value
    console.log(username)
    id = username.slice(-2)
    console.log(password)
    if (password === 'overlook2021' && username + id && id <= 50) {
        loginView.classList.add('hidden')
        dashboardView.classList.remove('hidden')
       
        console.log(id)
        new Promise((resolve, reject) => {

            resolve(setTimeout(
                fetchData(`customers/${id}`).then(data => {
                    customer = new Customer(data)
                    customer.getPrevBookings(bookings)
                    customer.getTotalSpent(rooms)
                    getBookingData(customer)
                    console.log(customer)
                    return customer
                }), 100000))
            reject(err => alert(err))
        })
    }
    else {
        return alert('invalid username or password')
    }
}
function getPromises() {
    Promise.all([fetchData('bookings'), fetchData('rooms')]).then(data => {
        bookings = data[0].bookings;
        rooms = data[1].rooms;
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
        checkDates()
        console.log('customer: ', customer)
    })
}

const dashboardView = document.querySelector('.dashboard')
let sidebar = document.querySelector('.sidebar')
const calendar = document.querySelector('.date')
const roomTypes = document.getElementById('roomTypes')
const calendarButton = document.getElementById('checkAvailabilities')
let potentialBookings = document.querySelector('.potential-bookings')
let currentBookings = document.querySelector('.currentBookings')
let userField = document.getElementById('userName')
let passwordField = document.querySelector('.password')
const loginButton = document.getElementById('loginButton')
let loginView = document.querySelector('.login')

window.addEventListener('load', getPromises);
loginButton.addEventListener('click', login)
calendarButton.addEventListener('click', checkDates)

potentialBookings.addEventListener('click', bookRoom)

function randomPic(pics) {
let randomPic = pics[Math.floor(Math.random() * pics.length)]
return randomPic.toString()
}

function getBookingData(customer) {
    sidebar.innerHTML = ``
    currentBookings.innerHTML = ``
    const date = new Date()
    const dateDay = date.getUTCDate()
    const dateMonth = date.getUTCMonth() + 1
    const dateYear = date.getUTCFullYear()
    const currentDate = dateYear + "-" + dateMonth + "-" + dateDay
    sidebar.innerHTML = `<h4>Total Spent: $${customer.totalSpent}</h4>`
    let pic
    customer.bookings.forEach( booking => {
    
    pic = roomImages.find(image => image.Type === booking.roomBooked.roomType)
   booking.picture
   booking.picture = randomPic(pic.picture)
    
    console.log("pic ", booking.picture)
    let bookingDate = booking.date.split('/').join('-')
    let today = new Date(currentDate)
    let bookingDay = new Date(bookingDate)
    if( bookingDay < today) {
    sidebar.innerHTML += `
    <h4 class="title" id="formerBookingTitle" tabindex = "0">Room ${booking.roomNumber} on ${booking.date}</h4>
    <p class="text" id="formerBookingRoom">${booking.roomBooked.roomType}</p>
    <p class="text" id="formerBookingCost">$${booking.roomBooked.costPerNight}/night</p>
    <img src=${booking.picture} class ="bookingPic" width=100 height=auto alt = "What we consider to be a normal ${booking.roomBooked.roomType} with LOTS of ""character""">
 `}
else if(today <= bookingDay) {
  
    currentBookings.innerHTML +=
`    <h4 class="title" id="upcomingBookingTitle" tabindex = "0">Room ${booking.roomNumber} on ${booking.date}</h4>
    <p class="text" id="upcomingBookingRoom">${booking.roomBooked.roomType}</p>
    <p class="text" id="upcomingBookingCost">$${booking.roomBooked.costPerNight}/night</p>
    <img src=${booking.picture} class ="bookingPic" width="100" height=auto alt = "What we consider to be a normal ${booking.roomBooked.roomType} with LOTS of ""character""">`
        }
    })
}


function checkDates() {
getPromises()
   potentialBookings.innerHTML = ``
    let date = calendar.value.split('-')
    let calendarData = date.map((date) => parseInt(date))
    newDate = `${calendarData[0]}/${calendarData[1]}/${calendarData[2]}`
    let availabilities = []
    let pic
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
       alert('NO AVAILABILITIES, we are so sorry for the inconvenience!')
       getPromises()
    }
    else {
    roomFilter.forEach((availability) => {
    pic = roomImages.find((image) => image.Type === availability.roomType)
    availability.picture 
    availability.picture =randomPic(pic.picture)
    let bidetStatus
    if (availability.bidet === false) {
        bidetStatus = "no bidet"
    } else {
        bidetStatus = "has a bidet"
    }
    potentialBookings.innerHTML += `
    <h4 class="title" id="potentialBookingTitle" tabindex = "0">Room ${availability.number} on ${newDate}</h4>
    <p class="text" id="potentialBookingRoom">${availability.roomType}</p>
    <p class="text" id="potentialBookingBeds> ${availability.numBeds} ${availability.bedSize} beds</p>
    <p class="text" id="potentialBooking-cost">$${availability.costPerNight}/night</p>
    <p class="text" id="potentialBooking-bidet">${bidetStatus}</p>
    <img src=${availability.picture} class ="bookingPic" alt=alt = "What we consider to be a normal ${availability.roomType} with LOTS of ""character""" width=100 height=auto>
    <button class="book-button" id ="${availability.number}">Book!</button>
 `
})}
}

function bookRoom(event) {
event.preventDefault()
    if (event.target.classList.contains('book-button')) {
        console.log(event.target.id)
     postRoom(event.target.id)
     setTimeout(updatePromises(), 2000)
    }
}
function postRoom(id) {
    console.log(newDate)
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userID: customer.id, date: newDate, roomNumber: parseInt(id)})
    })
        .then(resp => resp.json())
        .catch(error => console.log(error))
}







