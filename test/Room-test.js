import chai from 'chai';
import Booking from "../src/classes/Booking.js"
import Room from "../src/classes/Room.js"
const expect = chai.expect;
let booking 
let room
let user
let newCustomer
let newBooking
let newRoom
describe('Room', () => {
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
        newBooking = new Booking(booking)
        newRoom = new Room(room)
    })
    it('should be a function', () => {
        expect(Room).to.be.a('function')
    })
    it('should instantiate an instance of Room', () => {
        expect(newRoom).to.be.an.instanceOf(Room);
    })
    it('should have a number', () => {
        expect(newRoom.number).to.equal(15);
    })
    it('should have a room type', () => {
        expect(newRoom.roomType).to.equal("residential suite");
    })
    it('should specify bidet status', () => {
        expect(newRoom.bidet).to.equal(false);
    })
    it('should specify bed size', () => {
        expect(newRoom.bedSize).to.equal("full");
    })
    it('should specify cost per night', () => {
        expect(newRoom.costPerNight).to.equal(294.56);
    })
    it.skip('should keep track of bookings', () => {
       let booking = newCustomer.book(newRoom)
        expect(newBooking).to.equal(booking); 
        expect(newBooking).to.equal(newRoom.bookings[0]);
    })

})