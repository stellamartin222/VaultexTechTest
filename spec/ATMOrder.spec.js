const { expect } = require('chai');
const Program = require('../Program')

describe('ATMOrderChecker', () => {
    let input = [
        ['cassettes', 4],
        ['5', 10000],
        ['10', 20000],
        ['20', 40000],
        ['50', 100000]
    ]
    describe('program', () => {
        it('Will create an itteration of the program class when ran', () => {
            const program = new Program(input);
            expect(program).to.be.an("Object")
        });
        it('The program will be constructed with the correct input', () => {
            const program = new Program(input);
            expect(program.input).to.equal(input)
        });
        describe('cassetteValidator', () => {
            it('Cassette validator will set the number of cassettes to the correct number', () => {
                const program = new Program([
                    ['cassettes', 1],
                    ['5', 10000]
                ]);
                expect(program.numberOfCassettes).to.equal(1)
            });
            it('Cassette validator will set the number of cassettes to 4 if not given a number', () => {
                const program = new Program([
                    ['5', 40000]
                ]);
                expect(program.numberOfCassettes).to.equal(4)
            });
            it('Cassette validator will set the value of cassettes to the correct part of the input', () => {
                const program = new Program(input);
                expect(program.cassettes).to.eql([
                    ['5', 10000],
                    ['10', 20000],
                    ['20', 40000],
                    ['50', 100000]
                ])
            });
            it('Cassette validator will set the value of cassettes to the correct part of the input', () => {
                const program = new Program([
                    ['cassettes', 1],
                    ['5', 10000]
                ]);
                expect(program.cassettes).to.eql([
                    ['5', 10000]
                ])
            });
        });
    });
    describe('CassetteChecker', () => {
        it('CassetteChecker will be constructed with the order set to the right value', () => {
            const program = new Program(input);
            expect(program.cassetteChecker.order).to.eql([
                ['5', 10000],
                ['10', 20000],
                ['20', 40000],
                ['50', 100000]
            ])
        });
        it('CassetteChecker will be constructed with the number of cassetes set to the right value', () => {
            const program = new Program(input);
            expect(program.cassetteChecker.numberOfCassettes).to.eql(4)
        });
        it('CassetteChecker will be constructed with the errorHandler', () => {
            const program = new Program(input);
            expect(program.cassetteChecker.errorHandler).to.be.an("Object")
        });
        it('CassetteChecker will be constructed with the cassete capacity set to the right value', () => {
            const program = new Program(input);
            expect(program.cassetteChecker.cassetteCapacity).to.eql(2000)
        });
        it('CassetteChecker will be constructed with a casetteCounter', () => {
            const program = new Program(input);
            expect(program.cassetteChecker.cassetteCounter).to.be.an("Number")
        });

        describe('OrderLineChecker', () => {
            it('Will increment the cassetteCounter as it loops throught the order', () => {
                const program = new Program(input);
                expect(program.cassetteChecker.cassetteCounter).to.eql(4)
            });
            it('Will set the orderStatus to complete when the program has finished running', () => {
                const program = new Program(input);
                expect(program.cassetteChecker.orderStatus).to.eql('Complete')
            });
        });
    });

    describe('ErrorHandler', () => {
        it('ErrorHandler will be constructed with the value of isValid set to true', () => {
            const program = new Program(input);
            expect(program.errorHandler.isValid).to.eql(true)
        });
        it('ErrorHandler will be constructed with the value of errorMessage to ["Error"]', () => {
            const program = new Program(input);
            expect(program.errorHandler.errorMessage).to.eql(["Error"])
        });

        describe('orderLengthChecker', () => {
            it('Will update the value of isValid when the order is too long', () => {
                const program = new Program([['5', 10000],
                ['10', 20000],
                ['20', 40000],
                ['50', 100000],
                ['5', 10000],
                ['10', 20000],
                ['20', 40000],
                ['50', 100000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the order is too long', () => {
                const program = new Program([['5', 10000],
                ['10', 20000],
                ['20', 40000],
                ['50', 100000],
                ['5', 10000],
                ['10', 20000],
                ['20', 40000],
                ['50', 100000]]);
            expect(program.errorHandler.errorMessage).to.eql(["Error", 'Too many values given.'])
            });
            it('Will update the value of isValid when the order is too short', () => {
                const program = new Program([]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the order is too short', () => {
                const program = new Program([]);
                expect(program.errorHandler.errorMessage).to.eql(["Error", 'No values given.'])
            });
        });
        describe('orderTypeChecker', () => {
            it('Will update the value of isValid when the order is not given as an array', () => {
                const program = new Program('hi');
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the order is not given as an array', () => {
                const program = new Program('hi');
                expect(program.errorHandler.errorMessage[1]).to.eql('Order must be given as an array.')
            });
        });
        describe('orderLineChecker', () => {
            it('Will update the value of isValid when the first item of the order is not given as a string', () => {
                const program = new Program([['cassettes', 1],
                [5, 10000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the first item of the order is not given as a string', () => {
                const program = new Program([['cassettes', 1],
                [5, 10000]]);
                expect(program.errorHandler.errorMessage[1]).to.eql('Each order line must be formatted as a string followed by a number.')
            });
            it('Will update the value of isValid when the second item of the order is not given as a number', () => {
                const program = new Program([['cassettes', '1'],
                ['5', 10000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the second item of the order is not given as a number', () => {
                const program = new Program([['cassettes', '1'],
                ['5', 10000]]);
                expect(program.errorHandler.errorMessage[1]).to.eql('Each order line must be formatted as a string followed by a number.')
            });
            it('Will update the value of isValid when the note requested is invalid', () => {
                const program = new Program([['cassettes', 1],
                ['7', 10000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the note requested is invalid', () => {
                const program = new Program([
                    ['cassettes', 1],
                    ['7', 10000]]);
                expect(program.errorHandler.errorMessage[1]).to.eql('The first item in the order line must be on of; 5, 10, 20, 50 or cassettes.')
            });
            it('Will update the value of isValid when the order has multiple cassette lines', () => {
                const program = new Program([['cassettes', 1],
                ['cassettes', 1],
                ['5', 10000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the order has multiple cassette lines', () => {
                const program = new Program([['cassettes', 1],
                ['cassettes', 1],
                ['5', 10000]]);
                console.log(program.errorHandler.errorMessage)
                expect(program.errorHandler.errorMessage[1]).to.eql('Cannot order cassette more than once.')
            });
        });
        describe('isCassetteValueValid', () => {
            it('Will update the value of isValid when the order does not fill a cassette', () => {
                const program = new Program([['cassettes', 1],
                ['5', 5000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the order does not fill a cassette', () => {
                const program = new Program([['cassettes', 1],
                ['5', 5000]]);
                console.log(program.errorHandler.errorMessage)
                expect(program.errorHandler.errorMessage[1]).to.eql('Notes requested must fill a cassette.')
            });
        });
        describe('cassetteCounterCheck', () => {
            it('Will update the value of isValid when the number of cassettes is greater than requested', () => {
                const program = new Program([['cassettes', 1],
                ['5', 20000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the number of cassettes is greater than requested', () => {
                const program = new Program([['cassettes', 1],
                ['5', 20000]]);
                console.log(program.errorHandler.errorMessage)
                expect(program.errorHandler.errorMessage[1]).to.eql('Number of Cassettes cannot be over 4 cassettes maximum and must equal the requested ammount.')
            });
            it('Will update the value of isValid when the number of cassettes is less than requested', () => {
                const program = new Program([['cassettes', 2],
                ['5', 10000]]);
                expect(program.errorHandler.isValid).to.eql(false)
            });
            it('Will update the value of errorMessage when the number of cassettes is less than requested', () => {
                const program = new Program([['cassettes', 2],
                ['5', 10000]]);
                console.log(program.errorHandler.errorMessage)
                expect(program.errorHandler.errorMessage[1]).to.eql('Number of Cassettes cannot be over 4 cassettes maximum and must equal the requested ammount.')
            });
        });
    });
});