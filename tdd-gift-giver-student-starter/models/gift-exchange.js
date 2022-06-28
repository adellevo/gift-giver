const {BadRequestError} = require('../utils/errors.js');
const {NotFoundError} = require('../utils/errors.js');

class GiftExchange {
    constructor() {
      this.super();
    }

    static pairs(names) {
      if (names.length % 2 == 1) {
        throw new BadRequestError("Can't pair names with odd array length")
      }
      let finalLength = names.length/2
      let temp = names;
      let finalArr = [];
      while (finalArr.length < finalLength) {
        let min1 = 0
        let mid = temp.length/2
        let max2 = temp.length
        let index1 = Math.floor(Math.random() * (mid - min1) + min1);
        let index2 = Math.floor(Math.random() * (max2 - mid) + mid);
        finalArr.push([temp[index1], temp[index2]])
        temp.splice(index1, 1);
        temp.splice(index2-1, 1);
      }
      
      return finalArr;
    }

    static traditional(names) {
      if (names.length % 2 == 1) {
        throw new BadRequestError("Can't pair names with odd array length")
      }

      if (names.length == 0) {
        throw new BadRequestError("Can't pair names with empty array")
      }

      let temp = names;
      let pairMap = new Map();
      let i = 0;
      while (temp.length > 0) {
        let min = 1
        let max = temp.length
        let randomIndex = Math.floor(Math.random() * (max - min) + min);

        pairMap.set(i, `${temp[i]} is giving a gift to ${temp[randomIndex]}`);
        pairMap.set((names.indexOf(temp[randomIndex])), `${temp[randomIndex]} is giving a gift to ${temp[i]}`);
        temp.splice(randomIndex, 1);
        temp.splice(0,1);
        i += 1
      }

      let finalArr = []
      for (let value of pairMap.values()){
        finalArr.push(value);
      }

      return finalArr;
    }
}

module.exports = GiftExchange