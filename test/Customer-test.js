import chai from 'chai';
import Booking from "../src/classes/Booking"
import Customer from "../src/classes/Customer"
import Room from "../src/classes/Room"
const expect = chai.expect;
let bookings;
let rooms;
let booking;
let room;
let user;
let newBooking;
let newRoom;
let newCustomer;

describe('Customer', () => {
    beforeEach(() => {
        bookings = [{
            "id": "5fwrgu4i7k55hl6sz",
            "userID": 9,
            "date": "2022/04/22",
            "roomNumber": 15,

        },
            {
                "id": "5fwrgu4i7k55hl6t5",
                "userID": 43,
                "date": "2022/01/24",
                "roomNumber": 24,

            },
            {
                "id": "5fwrgu4i7k55hl6t6",
                "userID": 13,
                "date": "2022/01/10",
                "roomNumber": 12,

            },
            {
                "id": "5fwrgu4i7k55hl6t7",
                "userID": 20,
                "date": "2022/02/16",
                "roomNumber": 7,

            },
            {
                "id": "5fwrgu4i7k55hl6t8",
                "userID": 1,
                "date": "2022/02/05",
                "roomNumber": 12,

            }]

        rooms = [{
            "number": 7,
            "roomType": "single room",
            "bidet": false,
            "bedSize": "queen",
            "numBeds": 2,
            "costPerNight": 231.46
        },
            {
                "number": 8,
                "roomType": "junior suite",
                "bidet": false,
                "bedSize": "king",
                "numBeds": 1,
                "costPerNight": 261.26
            },
            {
                "number": 9,
                "roomType": "single room",
                "bidet": true,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 200.39
            },
            {
                "number": 10,
                "roomType": "suite",
                "bidet": false,
                "bedSize": "twin",
                "numBeds": 1,
                "costPerNight": 497.64
            },
            {
                "number": 11,
                "roomType": "single room",
                "bidet": true,
                "bedSize": "twin",
                "numBeds": 2,
                "costPerNight": 207.24
            },
            {
                "number": 12,
                "roomType": "single room",
                "bidet": false,
                "bedSize": "twin",
                "numBeds": 2,
                "costPerNight": 172.09
            },
            {
                "number": 13,
                "roomType": "single room",
                "bidet": false,
                "bedSize": "queen",
                "numBeds": 2,
                "costPerNight": 423.92
            },
            {
                "number": 14,
                "roomType": "residential suite",
                "bidet": false,
                "bedSize": "twin",
                "numBeds": 1,
                "costPerNight": 457.88
            },
            {
                "number": 15,
                "roomType": "residential suite",
                "bidet": false,
                "bedSize": "full",
                "numBeds": 1,
                "costPerNight": 294.56
            }]
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
        newCustomer = new Customer(user)
})
    it('should be a function', () => {
        expect(Customer).to.be.a('function');
    })
    it('should creat an instance of Customer', () => {
        expect(newCustomer).to.be.an.instanceof(Customer);
    })
    it('should have an id', () => {
        expect(newCustomer.id).to.equal(9);
    })
    it('should have a name', () => {
        expect(newCustomer.name).to.equal('Faustino Quitzon');
    })
    it('should be able to check previous bookings',() => {
        newCustomer.getPrevBookings(bookings)
        expect(newCustomer.bookings).to.deep.equal([{"id": "5fwrgu4i7k55hl6sz",
            "userID": 9,
            "date": "2022/04/22",
            "roomNumber": 15}])
        })
    it.skip('should calculate total spent', () => {
        newCustomer.getTotalSpent(rooms);
        expect(newCustomer.totalSpent).to.equal(294.56)
    })
})

