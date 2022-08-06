import chai from 'chai';
import Booking from "../src/classes/Booking.js"
const expect = chai.expect;
let booking
let newBooking 
let user
let room


describe('Booking', () => {
    beforeEach(() => {
        
        booking = {
            "id": "5fwrgu4i7k55hl6sz",
            "userID": 9,
            "date": "2022/04/22",
            "roomNumber": 15
        }
        newBooking = new Booking(booking)
        user = {
            "id": 9,
            "name": "Faustino Quitzon"
        }
        room = {
            "number": 15,
            "roomType": "residential suite",
            "bidet": false,
            "bedSize": "full",
            "numBeds": 1,
            "costPerNight": 294.56
        }
    

    });
    it('should be a function', () => {
        expect(Booking).to.be.a('function')
    });

    it.skip('should be an instantiate an instance of Booking', () => {
        expect(newBooking).to.be.an.instanceOf(Booking)
    });

    it.skip('should hold an id', () => {
        expect(newBooking.id).to.equal("5fwrgu4i7k55hl6sz")
    });
    it.skip("should have a userID", () => {
        expect(newBooking.userID).to.equal(9)
    });
    it.skip("should have a date", () => {
        expect(newBooking.date).to.equal("2022/04/22")
    });
    it.skip("should have a roomNumber", () => {
        expect(newBooking.roomNumber).to.equal(15)
    });
    it.skip("should have a cost", () => {
        newBooking.getCost(room)
        expect(newBooking.cost).to.equal(294.56)
    });
    it.skip("should have a user", () => {
        newBooking.getUser(user)
        expect(newBooking.user).to.equal("Faustino Quitzon")
    });
});