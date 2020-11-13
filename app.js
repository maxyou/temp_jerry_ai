
class rangeList {
    constructor() {
        this.rangeList = [];
      }
    

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {

        if(range[1]<=range[0]){
            return
        }

        console.log('add() range:' + JSON.stringify(range))
        console.log('add() range list:' + JSON.stringify(this.rangeList))
        /**
         * if new range starts inside a old range, extend new range's start as this old range's start
         * if new range ends inside a old range, extend new range's end as this old range's end
         * create a new range list from old range list
         *  1, bypass the one which starts in the area of new extended range
         *  2, insert the extended new range at proper place
         */
        if (this.rangeList.length === 0) {
            console.log('this.rangeList.length === 0')
            console.log('range:' + range)
            console.log('range list:' + this.rangeList)
            this.rangeList.push(range)
            console.log('after merge first one:' + JSON.stringify(this.rangeList))
            return
        }

        var j = 0
        for (var i = 0; i < this.rangeList.length; i++) {
            console.log('1-------' + i + '-------------')
            if (range[0] > this.rangeList[i][0] && range[0] <= this.rangeList[i][1]) {
                range[0] = this.rangeList[i][0]
                console.log('i--1:'+i)
                j = i
                break
            }
            console.log('i--2:'+i)
        }
        console.log('i--3:'+i)
        for (var i = j; i < this.rangeList.length; i++) {
            console.log('2-------' + i + '-------------')
            if (range[1] >= this.rangeList[i][0] && range[1] < this.rangeList[i][1]) {
                range[1] = this.rangeList[i][1]
                break
            }
        }
        console.log('extended range:' + range)

        // this.rangeList.filter(v=>v[0]>=range[0]&&v[0]<range[1])
        let rangeListNew = []
        let merged = false
        // console.log('extended range:' + range + '--------1')
        for (i = 0; i < this.rangeList.length; i++) {
            console.log('extended range:' + range + '--------for----1----i:' + i)
            // console.log('extended range:' + range + '--------for----1--1' + this.rangeList[i])
            // console.log('extended range:' + range + '--------for----1--2' + this.rangeList[i][0])
            if (this.rangeList[i][0] < range[0]) {
                rangeListNew.push(this.rangeList[i])
                console.log('push old-1:' + this.rangeList[i])
                continue
            }
            
            if (!merged) {
                rangeListNew.push(range)
                merged = true
                console.log('push new-1:' + range)
            }

            if (this.rangeList[i][0] >= range[0] && this.rangeList[i][1] <= range[1]) {

            } else {
                rangeListNew.push(this.rangeList[i])
                console.log('push old-2:' + this.rangeList[i])
            }
        }
        // console.log('extended range:' + range + '--------2')
        if (!merged) {
            rangeListNew.push(range)
            merged = true
            console.log('push new-2:' + range)
        }
        // console.log('extended range:' + range + '--------3')
        console.log('============new range list:' + JSON.stringify(rangeListNew))
        this.rangeList = rangeListNew

    }
    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
    */
    remove(range) {
        // TODO: implement this
        if(range[1]<=range[0]){
            return
        }
        /**
         * if old range is outside hole, import it
         * if old range is inside hole, bypass it
         * if old range cover hole, break up it, and import left two part
         * if part of old range is inside hole, cut it and import left
         */
        let rangeListNew = []
        // console.log('extended range:' + range + '--------1')
        for (var i = 0; i < this.rangeList.length; i++) {
            console.log('extended range:' + range + '--------for----1----i:' + i)

            
            if (this.rangeList[i][1] <= range[0] || this.rangeList[i][0] >= range[1]) {
                //if old range is outside hole, import it
                rangeListNew.push(this.rangeList[i])
                console.log('push old-1:' + this.rangeList[i])                
            }else if (this.rangeList[i][0] >= range[0] && this.rangeList[i][1] <= range[1]) {
                //if old range is inside hole, bypass it

            } else if(this.rangeList[i][0] < range[0] && this.rangeList[i][1] > range[1]){
                //if old range cover hole, break up it, and import left two part
                rangeListNew.push([this.rangeList[i][0], range[0]])
                rangeListNew.push([range[1], this.rangeList[i][1]])
                console.log('push old-2:' + this.rangeList[i])
            
            } else if(this.rangeList[i][0] > range[0]){
                //cut first half part
                rangeListNew.push([range[1], this.rangeList[i][1]])
            } else if(this.rangeList[i][1] < range[1]){
                rangeListNew.push([this.rangeList[i][0], range[0]])
            }else{
                console.log('should not be here')
            }
        }

        this.rangeList = rangeListNew
        console.log('============new range list:' + JSON.stringify(rangeListNew))
    }
    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        // TODO: implement this
        console.log('print()')
        var output = ''
        for (var i = 0; i < this.rangeList.length; i++) {
            
            output = output.concat(`[${this.rangeList[i][0]},${this.rangeList[i][1]}) `)

        }
        console.log(output)
    }
}
console.log('run....')
var t = new rangeList()
t.add([10, 50])
t.remove([21, 21])
t.remove([2, 15])
t.remove([45, 55])
t.remove([20, 25])
// t.remove([10, 22])
t.print()


// t.add([13, 14])
// t.add([5, 8])
// t.add([20, 23])
// t.add([4, 6])
//   t.add([2,4])
//   t.add([3,8])
//   t.add([7,12])  


// var arr = [];
// var elem = [1, 2, 3];
// var newArr = arr.concat([elem]);
// console.log(newArr); // => [0,[1,2,3]]