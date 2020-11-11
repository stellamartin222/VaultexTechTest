let CassetteChecker = require('./CassetteChecker');
let ErrorHandler = require('./ErrorHandler');

const maxCassettes = 4;
const cassetteCapacity = 2000;

class Program{
    constructor(order){
        this.order = order;
        this.cassettes = [];
        this.orderChecker();
    }

    orderChecker() {
        this.errorHandler = new ErrorHandler(this.order);
        if(this.errorHandler.isValid === true){
            this.cassetteValidator();
            this.cassetteChecker = new CassetteChecker(this.cassettes,this.errorHandler, this.numberOfCassettes, cassetteCapacity);
        } else {
            console.log(this.errorHandler.errorMessage);
        };
    };

    cassetteValidator() {
        if(this.order[0][0] == 'cassettes'){
            this.numberOfCassettes = this.order[0][1];
            this.cassettes = this.order.slice(1,5);
        } else {
            this.numberOfCassettes = maxCassettes;
            this.cassettes = this.order;
        };
    };
}

module.exports = Program;