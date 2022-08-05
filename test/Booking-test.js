import chai from 'chai';
const expect = chai.expect;

describe('Booking', function () {
    it('should be a class', function () {
        expect(Booking).to.be.a(Class)
    });

    it.skip('should be an instantiate an instance of Booking', function() {
        expect(newBooking).to.be.an.instanceOf(Booking)
    });

    it.skip('should hold an id', function() {
        expect(newBooking.id).to.equal("5fwrgu4i7k55hl6sz")
    })
    it.skip("should have a userID", function () {
        expect(newBooking.userID).to.equal(9)
    })
    it.skip("should have a date", function () {
        expect(newBooking.date).to.equal("2022/04/22")
    })
    it.skip("should have a roomNumber", function() {
        expect(newBooking.roomNumber).to.equal(15)
    })
    it.skip("should have a cost", function() {
        newBooking.getCost(rooms)
        expect(newBooking.cost).to.equal(294.56)
    })
    it.skip("should have a user", function() {
        newBooking.getUser(users)
        expect(newBooking.user).to.equal("Faustino Quitzon")
    })
})