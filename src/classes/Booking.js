class Booking {
    constructor(room, customer, date) {
    console.log(customer)
    this.userID = customer.id
    this.date = date
    this.roomNumber = room.number
    }
}

module.exports = Booking 