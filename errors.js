/*
* Task 1
* Написать метод, который будет принимать 2 числа и умножать их друг на друга.
* Если хоть один аргумент метода не число, то метод должен выбрасывать ошибку "Внимание! Один из аргументов метода не число" и на этом прерывать свое выполнение.
* Если передано больше двух аргументов, то метод должен выбрасывать предупреждение "Внимание! Передано больше указанного кол-ва аргументов", но продолжить свое выполнение.
* */

class ArgumentTypeError extends Error {}

function multiply(number1, number2) {
    if (arguments.length > 2) {
        console.warn('Внимание! Передано больше указанного кол-ва аргументов')
    }

    if ([...arguments].some((arg) => typeof arg !== 'number')) {
        throw new ArgumentTypeError('Внимание! Один из аргументов метода не число');
    }

    return number1 * number2;
}

/*
* Task 2
* Написать скрипт, который будет в try...catch..finally вызывать этот метод и ловить из него ошибки.
* Ошибки выводить ввиде alert, предупреждения выводить в консоли.
* */

function executeSomeHardMultiply (...arguments) {
    try {
        return multiply(...arguments);
    } catch (error) {
        if (error instanceof ArgumentTypeError) {
            alert(error.message)

            return;
        }

        throw error;
    }
}
