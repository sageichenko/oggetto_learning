type CustomerType = {
  id: string;
  is_customer: boolean;
  first_name: string;
  last_name: string;
  loaylity_level: string;
  bonus_amount: number;
}

type ProductType = {
  id: number;
  sku: string;
  title: string;
  price: number;
  special_price?: number;
  discount?: number;
  qty: number;
}

type TotalsType = {
  shipping: string;
  discount?: string;
  subtotal: string
  total: string
}

type SessionType = {
  id: number;
  quote: string;
  customer?: CustomerType;
  products: ProductType[];
  totals: TotalsType;
}

const example: SessionType = {
  "id": 123478,
  "customer": {
    "id": "1256",
    "is_customer": true,
    "first_name": "John",
    "last_name": "Doe",
    "loaylity_level": "silver",
    "bonus_amount": 1345
  },
  "products": [
    {
      "id": 16987,
      "sku": "147258",
      "title": "Лента монтажная",
      "price": 258.03,
      "special_price": 150.20,
      "discount": 108,
      "qty": 2
    },
    {
      "id": 247987,
      "sku": "147259",
      "title": "Шуруп анкерный",
      "price": 70,
      "qty": 100
    },
    {
      "id": 33987,
      "sku": "9635887",
      "title": "Соковыжималка",
      "price": 10364.99,
      "special_price": 9000.00,
      "discount": 1364.99,
      "qty": 2
    }
  ],
  "quote": "123e1454ewq147",
  "totals": {
    "shipping": "768.95",
    "discount": "1472.99",
    "subtotal": "17881.05",
    "total": "17177.01"
  }
}
