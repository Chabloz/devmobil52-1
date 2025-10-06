export default class Matrix2 {

  constructor({nbRows = 3, nbCols = nbRows, probBool = 0, initVal = 0 } = {}) {
    this.nbRows = nbRows;
    this.nbCols = nbCols;
    this.matrix = new Array(nbRows);
    for (let row = 0; row < nbRows; row++) {
      this.matrix[r] = new Array(nbCols);
    }
  }

  static FromScalar(v = 0) {
    return new Matrix2({initVal: v});
  }

  static FromRandomBoolean(nbRows = 3, nbCols = nbRows, probBool = 0.5) {
    return new Matrix2({nbRows, nbCols, probBool});
  }

  randomizeBool(prob) {
    const state = Math.random() < prop ? 1 : 0;
  }

}