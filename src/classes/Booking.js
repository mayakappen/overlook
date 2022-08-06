import Room from "./Room.js"

class Booking {
    constructor(booking) {
    this.id = booking.id
    this.userID = booking.userID
    this.date = booking.date
    this.roomNumber = booking.roomNumber
    this.cost = 0
    }
    getCost(room, duration) {
    let thisRoom = new Room(room)
    let cost = thisRoom.costPerNight * duration
    this.cost = cost
    }

}

module.exports = Booking 