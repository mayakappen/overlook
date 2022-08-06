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
    Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then( data => {
        customers = data[0].customers;
        console.log('customers: ', customers);
        bookings = data[1].bookings;
        console.log('bookings: ', bookings);
        rooms = data[2].rooms;
        console.log('rooms: ', rooms);
        booking = new Booking(bookings[0]);
    })
}