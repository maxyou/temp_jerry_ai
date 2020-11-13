const RangeList = require('./app')

test('object assignment', () => {

    const data = new RangeList()

    data.add([1, 5])
    expect(data).toEqual({ rangeList: [[1, 5]] })

    data.add([10, 20])
    expect(data).toEqual({ rangeList: [[1, 5], [10, 20]] })

    data.add([20, 20])
    expect(data).toEqual({ rangeList: [[1, 5], [10, 20]] })

    data.add([20, 21])
    expect(data).toEqual({ rangeList: [[1, 5], [10, 21]] })

    data.add([2, 4])
    expect(data).toEqual({ rangeList: [[1, 5], [10, 21]] }) //

    data.add([3, 8])
    expect(data).toEqual({ rangeList: [[1, 8], [10, 21]] })

    data.remove([10, 10])
    expect(data).toEqual({ rangeList: [[1, 8], [10, 21]] })

    data.remove([10, 11])
    expect(data).toEqual({ rangeList: [[1, 8], [11, 21]] })

    data.remove([15, 17])
    expect(data).toEqual({ rangeList: [[1, 8], [11, 15], [17, 21]] })
    expect(data.print()).toBe('[1, 8) [11, 15) [17, 21) ')

    data.remove([3, 19])
    expect(data).toEqual({ rangeList: [[1, 3], [19, 21]] })

});