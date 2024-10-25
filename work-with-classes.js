/*
* Нужно создать новый класс MasterProduct, который будет наследоваться от класса Product. Класс MasterProduct должен расширяться новыми методами:

добавить в сравнение;
добавить в вишлист;
удвалить из сравнения;
обновить атрибуты товара;
удалить из вишлиста.

А также должен расширять существующие методы increaseQty и decreaseQty таким образом, чтобы в методе increaseQty была проверка на превышение доступного кол-ва товара, а в методе decreaseQty нельзя указать товара меньше 1.
Класс должен расширяться MasterProduct новыми свойствами:

attributes - массив с обхектами атрибутов товара;
pickupDate - ближайшая дата самовывоза;
deliveryDate - ближайшая дата доставки;
price - цена товара;
specialPrice - цена товара со скидкой;
economy - экономия

При этом, для свойства specialPrice нужно добавить сеттер, который будет высчитывать спецтальную цену на основе переданной скидки.
Совйство economy должно образовываться путем вычисления price - specialPrice.
Свойство deliveryDate должно считаться автоматически - + 10 дней от текущей даты.
Свойство pickupDate - должно считаться следующим образом - Если сейчас больше 18 часов, то самовывоз завтра. В противном случае дата самовывоза сегодня.
Свойства id, sku, rank из родительского класса сделать приватными. К sku и rank сделать доступы через геттеры.
* */

class Product {
    constructor(id, title, sku, qty, rank, revews) {
        this.id = id
        this.title = title
        this.sku = sku
        this.qty = qty
        this.rank = rank
        this.reviews = reviews
    }

    addToCart() {
        fetch('Some url', {
            body: JSON.stringify({
                'qty': this.qty
            })
        })
    }

    increaseQty(qty) {
        return qty + 1
    }

    decreaseQty(qty) {
        return qty - 1
    }
}

// Имитации вишлиста и сравнения
const addToWishlist = (id) => console.log(`Product ${id} was added in wishlist`)
const removeFromWishlist = (id) => console.log(`Product ${id} was removed from wishlist`)
const addToCompare = (id) => console.log(`Product ${id} was added in compare`)
const removeFromCompare = (id) => console.log(`Product ${id} was added from compare`)

// Имитация конфига с доставками
const shippingEstimates = {
    delivery: {
        periodDays: 10
    },
    pickup: {
        availableOffset: '18:00',
        periodDays: 1
    }
}

class MasterProduct extends Product {
    constructor(...args) {
        super(args);

        const {
            // новое поле для проверки доступности товара,
            // в задании написано, что для decreaseQty логика такова, что мы не можем указать кол-во товара меньше 1,
            // но я сделала проверку на 0, т.к. товара может вообще не быть в наличии, и maxQty для него тоже будет 0
            maxQty = 0,
            price,
            discount = 0,
            attributes = []
        } = args;

        this._maxQty = maxQty;
        this._price = price;
        this._specialPrice = this._getSpecialPrice(price, discount);

        this._id = this.id;
        delete this.id;
        this._sku = this.sku;
        delete this.sku;
        this._rank = this.rank;
        delete this.rank;

        // Сделала приватным, потому что если мы добавляем проверки в increaseQty и decreaseQty, полагаю что и qty должны закрыть от свободного редактирования
        this._qty = this.qty;
        delete this.qty;

        this.attributes = attributes;
    }

    get id() {
        return this._id;
    }

    get rank() {
        return this._rank;
    }

    get sku() {
        return this._sku;
    }

    get qty() {
        return this._qty;
    }

    set qty(newQty) {
        this._qty = this._getValidQty(newQty);
    }

    // На мой взгляд странная логика, ведь сеттер используется как obj.specialPrice = <какое-то значение>,
    // и выглядит довольно неочевидно, что <какое-то значение> это размер скидки, а не сама specialPrice
    set specialPrice(discount) {
        this._specialPrice = this._getSpecialPrice(this._price, discount);
    }

    get specialPrice() {
        return this._specialPrice;
    }

    get economy() {
        return this._price - this._specialPrice;
    }

    get deliveryDate() {
        const date = new Date();
        date.setDate(date.getDate() + shippingEstimates.delivery.periodDays);

        return date;
    }

    get pickupDate() {
        const [hours, minutes] = shippingEstimates.pickup.availableOffset.split(':');
        const date = new Date();
        const notTodayTime = new Date(date);
        notTodayTime.setHours(hours);
        notTodayTime.setMinutes(minutes);

        if (notTodayTime <= date) {
            date.setDate(date.getDate() + shippingEstimates.pickup.periodDays);
        }

        return date;
    }

    _getSpecialPrice(price, discount = 0) {
        const specialPrice = price - discount;

        if (specialPrice <= 0) {
            console.warn('Скидка не может быть больше или равна цене товара');
        }

        return specialPrice > 0 ? specialPrice : price;
    }

    _getValidQty(newQty) {
        return (newQty > this._maxQty && this._maxQty) || (newQty < 0 && 0) || newQty;
    }

    increaseQty(qty) {
        return this._getValidQty(super.increaseQty(qty));
    }

    decreaseQty(qty) {
        return this._getValidQty(super.decreaseQty(qty));
    }

    addToWishlist() {
        addToWishlist(this.id)
    }

    removeFromWishlist() {
        removeFromWishlist(this.id)
    }

    addToCompare() {
        addToCompare(this.id)
    }

    removeFromCompare() {
        removeFromCompare(this.id)
    }

    updateAttribute(attrKey, attrValue) {
        const attrIndex = this.attributes.findIndex(({ key }) => attrKey === key);

        if (attrIndex === -1) {
            console.warn(`Аттрибут ${attrKey} не найден`)
            return;
        }

        this.attributes[attrIndex] = attrValue;
    }
}
