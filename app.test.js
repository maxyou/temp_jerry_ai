const { TestScheduler } = require('jest')
// const RangeList = require('./app')

const su2m = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(su2m(1, 2)).toBe(3);
});

// TestScheduler('RangeList', ()=>{
//     expect()
// })