import chai from 'chai';
import Booking from "../src/classes/Booking"
const expect = chai.expect;
let user 
let newCustomer 
let booking  
let newBooking 
let room 
let newRoom
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
    it.skip('should be a function', () => {
        expect(Room).to.be.a('function')
    })
    it.skip('should instantiate an instance of Room', () => {
        expect(newRoom).to.be.an.instanceOf(Room);
    })
    it.skip('should have a number', () => {
        expect(newRoom.number).to.equal(15);
    })
    it.skip('should have a room type', () => {
        expect(newRoom.roomType).to.equal("residential suite");
    })
    it.skip('should specify bidet status', () => {
        expect(newRoom.bidet).to.equal(false);
    })
    it.skip('should specify bed size', () => {
        expect(newRoom.bedSize).to.equal("full");
    })
    it.skip('should specify cost per night', () => {
        expect(newRoom.costPerNight).to.equal(294.56);
    })
    it.skip('should keep track of bookings', () => {
       let booking = newCustomer.book(newRoom)
        expect(newBooking).to.equal(booking); 
        expect(newBooking).to.equal(newRoom.bookings[0]);
    })

})