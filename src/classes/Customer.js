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
    getPrevBookings(bookings){
    let prevBookings = bookings.filter((booking) => 
    this.id === parseInt(booking.userID))
    prevBookings.forEach(booking => this.bookings.push(booking))
}
    getTotalSpent(rooms) {
    let roomz
    this.bookings.forEach((booking) => {
    roomz = rooms.find((room) => room.number === booking.roomNumber)
    this.totalSpent += roomz.costPerNight
    })
    return this.totalSpent
    }
}


module.exports = Customer