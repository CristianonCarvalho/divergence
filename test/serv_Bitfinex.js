
const chai = require('chai'),
    should = chai.should,
    expect = chai.expect,
    assert = chai.assert,
    deep = chai.deep;

const chaiAsPromised = require('chai-as-promised');
// calling should bef, solved chaiaspromised bug
chai.should();
chai.use(chaiAsPromised);

const bitfinex = require('../src/bitfinexData.js');

describe('Bitfinex tests', function () {
    const timeFrames = ['1h', '2h'];
    const pairs = ['EOSUSD', 'ZRXUSD'];
    const apiUrl = 'Dummy';
    let bitfinexService = bitfinex(timeFrames, pairs, apiUrl);    
    it('createBitfinexSubscriptions should return resolved promise', function() {
        return assert.isFulfilled(bitfinexService.createBitfinexSubscriptions(), 'resolved');
    });
    it('createBitfinexSubscriptions Should return matrix of timeFrame and Pair', function () {
        var expectedResults = [
            {channel: 'candles', event: 'subscribe', key: 'trade:1h:tEOSUSD'},
            {channel: 'candles', event: 'subscribe', key: 'trade:1h:tZRXUSD'},
            {channel: 'candles', event: 'subscribe', key: 'trade:2h:tEOSUSD'},
            {channel: 'candles', event: 'subscribe', key: 'trade:2h:tZRXUSD'}];            
        return bitfinexService.createBitfinexSubscriptions().should.eventually.deep.equal(expectedResults);
    });
});
