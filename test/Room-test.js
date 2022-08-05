import chai from 'chai';
import Booking from "../src/classes/Booking"
const expect = chai.expect;
let user, newCustomer, booking, newBooking, room, newRoom
describe('Customer', () => {
    beforeEach(() => {
        booking = {
            "id": "5fwrgu4i7k55hl6sz",
            "userID": 9,
            "date": "2022/04/22",
            "roomNumber": 15,
        }
        room = {
            "number": 15,
            "roomType": "residential suite",
            "bidet": false,
            "bedSize": "full",
            "numBeds": 1,
            "costPerNight": 294.56
        }
        user = {
            "id": 9,
            "name": "Faustino Quitzon"
        }
        newCustomer = new Customer(user)
        newBooking = new Booking(booking)
        newRoom = new Room(room)
    })
    it('should be a function', () => {
        expect(Room).to.be.a('function')
    })
    it('should instantiate an instance of Room', () => {
        expect(newRoom).to.be.an.instanceOf(Room)
    })

})