import chai from 'chai';
import Booking from "../src/classes/Booking"
const expect = chai.expect;
let newCustomer, booking, room
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
})
    it.skip('should be a function', () => {
        expect(Customer).to.be.a('function');
    })
    it.skip('should creat an instance of Customer', () => {
        expect(newCustomer).to.be.an.instanceof(Customer);
    })
    it.skip('should have an id', () => {
        expect(newCustomer.id).to.equal(9);
    })
    it.skip('should have a name', () => {
        expect(newCustomer.name).to.equal('Faustino Quitzon');
    })
    it.skip('should be able to book a room',() => {
        newCustomer.book(room, 1);
        expect(newCustomer.bookings).to.deep.equal([{"id": "5fwrgu4i7k55hl6sz",
            "userID": 9,
            "date": "2022/04/22",
            "roomNumber": 15}])
        })
    it.skip('should calculate total spent', () => {
        newCustomer.book(room);
        expect(newCustomer.totalSpent).to.equal(294.56)
    })
})

