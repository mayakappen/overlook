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
       let booking = new Booking(room)
       this.bookings.push(booking)
       this.totalSpent += room.costPerNight
    }
}


module.exports = Customer