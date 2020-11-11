----- Vaultex tech test -----

-----To run-----

Inside the run.js file you will need to insert your order in the specified area. The order must be formatted as an array with mutilple order lines. 

A single order line must be formatted with the first item being a string and the second a number. The first order line may start with the word 'cassettes' to specify the number of cassettes you wish to order. 

Once you have inputted the order, to run the program you will need to write in the terminal "npm start".



-----Tests-----

I have used mocha and chai as testing libraries in the development of this tech test.

There are 35 test that make up the spec file for this program.

To run the tests;
- in the terminal type "npm i", to install the testing libraries
- once installed, in the terminal type "npm t", to run the tests



-----Functions-----

When you run the code it triggers the run.js file to create a new instance of the "Program" class.

For our example we will give the program the order;

[
    ['cassettes', 4],
    ['5', 10000],
    ['10', 20000],
    ['20', 40000],
    ['50', 100000]
]

--------------------

The Program class is constructed with value 'order' set to the inital input and the value of 'cassettes' to an empty array. It then immediately runs the orderChecker function.

OrderChecker starts by creating a new instance of the "ErrorHandler" class which is initialised with a value of isValid set to true, errorMessage given the value of ['Error'] and immediately checks for three things.

OrderLengthChecker ensures the order given is not greater than 5 items long or less than 1 value long. If it does not meet these conditions it will set isValid to false and display the a correlating error message.

OrderTypeChecker ensures the order is given as an array and will set isValid to false and display the a correlating error message if it is not.

OrderLineChecker starts by ensuring that for each order line, the first item is in the format of a string and the second in the format of a number. It then checks to ensure that the "cassette" line does not appear more than once. If it does not meet these conditions it will set isValid to false and display the a correlating error message.

OrderChecker then confirms that all these checks have come back valid and runs the cassetteValidator.

CassetteValidator checks to see if a number of cassettes is specified, if it is then the value of NumberOfCassettes will be assigned the number of cassettes requested, otherwise this will be set to the maxCassettes value of 4. It will also change the value of cassettes to the order lines. 

-------------------- 

example; 

-order is set to the given value

-the order length is within the error handlers perameters so isvalid remains true
 
-the order is an array so isvalid remains true

-the first item of each line is a string and the second a number, the cassette line only shows up once so isvalid remains true

-numberOfCassettes is given the requested value of four

-cassettes is given the value [
    ['5', 10000],
    ['10', 20000],
    ['20', 40000],
    ['50', 100000]
]
-------------------- 

The orderchecker will then create a new instance of the CassetteChecker class.

CassetteChecker is constructed with the order set to the value of the order lines, the value of errorHandler is set to the errorHandler class, the number of cassettes is passed in as is the cassette capactiy of 2000. A cassetteCounter is also created with the value of zero and finally the function orderLineChecker is run.

OrderLineChecker loops through each individual order line and adds the return value of isCassetteValueValid to the cassetteCounter.

IsCassetteValueValid divides the total amount requested by the note type requested modulus the cassetteCapacity of 2000 and checks that the return value is zero. This ensures that the requested amount will completely fill the requested cassettes. It finally takes the total amount requested and divides it by the note type requested and then divides this value by 2000. This is to see how many cassettes will be filled with this note type. If it does not meet these conditions it will set isValid to false and display the a correlating error message. 

OrderLineChecker then runs the cassetteCounterCheck which ensures that the number of cassettes inputted is the same as the requested number of cassettes. If it does not meet these conditions it will set isValid to false and display the a correlating error message. 

Finally if isValid is still set to true on the errorHandler you will be met with a message confiming the order.

-------------------- 

example; 

-order is set to all values after the cassette line

-the error handler is set to the value of errorHandler

-the number of cassettes is set to 4 as requested

-the cassetteCapacity is set to 2000

-the cassetteCounter is set to 0

-orderLineChecker goes through each order and confirms that in this instance each line requests only one cassette

-the number of cassette values inputted is 4 which equals the number of requested cassettes

-the order is completed without issue and the user is met with the message
['valid', 'order valid, send for packing']

-------------------- 

