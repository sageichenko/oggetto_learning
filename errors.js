/*
* Task 1
* Написать метод, который будет принимать 2 числа и умножать их друг на друга.
* Если хоть один аргумент метода не число, то метод должен выбрасывать ошибку "Внимание! Один из аргументов метода не число" и на этом прерывать свое выполнение.
* Если передано больше двух аргументов, то метод должен выбрасывать предупреждение "Внимание! Передано больше указанного кол-ва аргументов", но продолжить свое выполнение.
* */

class CustomError extends Error {
    constructor(message = '') {
        super(message);
        this.name = this.constructor.name;
    }
}

class ArgumentTypeError extends CustomError {}
class ArgumentCountError extends CustomError {}

const multiply = (number1, number2) => {
    if ([...arguments].some((arg) => typeof arg !== 'number')) {
        throw new ArgumentTypeError('Внимание! Один из аргументов метода не число');
    }

    if (arguments.length > 2) {
        // Я не понял, как выбросить предупреждение, но продолжить выполнение,
        // т.к. после throw выполнение функции дальше не идет, поэтому оставила только console.warn
        console.warn('Внимание! Передано больше указанного кол-ва аргументов')
    }

    return number1 * number2;
}

/*
* Task 2
* Написать скрипт, который будет в try...catch..finally вызывать этот метод и ловить из него ошибки.
* Ошибки выводить ввиде alert, предупреждения выводить в консоли.
* */

const executeSomeHardMultiply = (...arguments) => {
    try {
        return multiply(...arguments);
    } catch (error) {
        if (error instanceof ArgumentCountError) {
            // Тут тоже не очень понятно, если мы попали в catch, значит выполнение прервалось,
            // получается нужно еще раз вызвать multiply с правильным количеством аргументов?
            // Сейчас мы в catch с ArgumentCountError не попадем, потому что внутри multiply не выбрасывается исключение
            console.warn(error.message)

            return multiply(arguments[0], arguments[1]);
        } else if (error instanceof ArgumentTypeError) {
            alert(error.message)
        }
    }
}
