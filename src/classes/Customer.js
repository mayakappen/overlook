const Booking = require("./Booking")
const Room = require("./Room")
class Customer {
    constructor(customer) {
    this.id = customer.id
    this.name = customer.name
    this.bookings = []
    this.totalSpent = 0
    }
    book(room) {
    const newRoom = new Room(room)
    const date = new Date()
    const  dateDay = date.getUTCDate()
    const  dateMonth = date.getUTCMonth()
    const dateYear = date.getUTCFullYear()
    const bookingDate = dateYear + "/" + dateMonth + "/" + dateDay
     newRoom.date = bookingDate
       this.bookings.push(newRoom)
       this.totalSpent += room.costPerNight
    }
}


module.exports = Customer