module.exports = class RangeList {

    constructor() {
        this.rangeList = []
    }

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     * 
     * steps:
     *  1, if new range starts inside a old range, extend new range's start as this old range's start point
     *  2, if new range ends inside a old range, extend new range's end as this old range's end point
     *      by above two steps, all involved old range are included in new extended range
     *  3, create a new range list from old range list, but:
     *      3.1, bypass the one which starts in the area of new extended range
     *      3.2, insert the extended new range at proper place
     */
    add(range) {

        if (range[1] <= range[0]) {
            return
        }

        if (this.rangeList.length === 0) {
            this.rangeList.push(range)
            return
        }

        var j = 0 //the range of area across
        for (var i = 0; i < this.rangeList.length; i++) {
            if (range[0] > this.rangeList[i][0] && range[0] <= this.rangeList[i][1]) {
                range[0] = this.rangeList[i][0]
                j = i
                // console.log('find across area at:' + i)
                break
            }
        }
        for (var i = j; i < this.rangeList.length; i++) {
            if (range[1] >= this.rangeList[i][0] && range[1] < this.rangeList[i][1]) {
                range[1] = this.rangeList[i][1]
                break
            }
        }

        let rangeListNew = []
        let merged = false //if new extended range merged
        for (i = 0; i < this.rangeList.length; i++) {
            if (this.rangeList[i][0] < range[0]) {
                rangeListNew.push(this.rangeList[i])
                // console.log('push old-1:' + this.rangeList[i])
                continue
            }

            if (!merged) {
                rangeListNew.push(range)
                merged = true
                // console.log('push new-1:' + range)
            }

            if (this.rangeList[i][0] >= range[0] && this.rangeList[i][1] <= range[1]) {

            } else {
                rangeListNew.push(this.rangeList[i])
                // console.log('push old-2:' + this.rangeList[i])
            }
        }
        
        if (!merged) { //new range beyond all old range, so no chance import before
            rangeListNew.push(range)
            merged = true
            // console.log('push new-2:' + range)
        }
        this.rangeList = rangeListNew
    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     * 
     * if old range is outside hole, import it
     * if old range is inside hole, bypass it
     * if old range cover hole, break it, and import the left two part
     * if part of old range is inside hole, cut it and import the left
    */
    remove(range) {
        if (range[1] <= range[0]) {
            return
        }

        let rangeListNew = []
        for (var i = 0; i < this.rangeList.length; i++) {
            if (this.rangeList[i][1] <= range[0] || this.rangeList[i][0] >= range[1]) {
                //if old range is outside hole, import it
                rangeListNew.push(this.rangeList[i])
                // console.log('push old-1:' + this.rangeList[i])                
            } else if (this.rangeList[i][0] >= range[0] && this.rangeList[i][1] <= range[1]) {
                //if old range is inside hole, bypass it
            } else if (this.rangeList[i][0] < range[0] && this.rangeList[i][1] > range[1]) {
                //if old range cover hole, break it, and import the left two part
                rangeListNew.push([this.rangeList[i][0], range[0]])
                rangeListNew.push([range[1], this.rangeList[i][1]])
                // console.log('push old-2:' + this.rangeList[i])
            } else if (this.rangeList[i][0] >= range[0]) {
                //cut first half part
                rangeListNew.push([range[1], this.rangeList[i][1]])
            } else if (this.rangeList[i][1] <= range[1]) {
                //cut second half part
                rangeListNew.push([this.rangeList[i][0], range[0]])
            } else {
                console.log('should not be here')
                console.log(this.rangeList[i])
                console.log(range)
            }
        }

        this.rangeList = rangeListNew
        // console.log('new range list:' + JSON.stringify(rangeListNew))
    }

    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        // console.log('print()')
        var output = ''
        for (var i = 0; i < this.rangeList.length; i++) {
            output = output.concat(`[${this.rangeList[i][0]},${this.rangeList[i][1]}) `)
        }
        console.log(output)
    }
}
