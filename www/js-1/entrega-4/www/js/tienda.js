"use strict";

const itemNames = ["Camisa", "Pantalon", "Calcetines"];
const itemPrices = [13, 27, 100];

class Item {
  itemList = [];
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  getItemList(names, price) {
    return names.map((names, index) => {
      return (this.itemList = { name: names, price: price[index] });
    });
  }
}

const itemList = new Item(itemNames, itemPrices);
const myCatalogue = itemList.getItemList(itemNames, itemPrices);
console.log(`El catálogo de la tienda es:`, myCatalogue);

class CartItem {
  constructor(item, ammount) {
    this.item = item;
    this.ammount = ammount;
  }
}

class User {
  cart = [];
  constructor(name) {
    this.name = name;
  }

  addToCart(itemList) {
    for (let i = 0; i < itemList.length; i++) {
      const ammount = Math.round(Math.random() * 5);
      this.cart.push(new CartItem(itemList[i], ammount));
    }
    return this.cart;
  }
}

const myUser = new User("Berto");
myUser.addToCart(myCatalogue);
const myCart = myUser.cart;
console.log(`El carrito de la compra contiene: `, myCart);

class Shop {
  total = [];
  toPay;
  checkout(cart) {
    for (let i = 0; i < cart.length; i++) {
      this.total.push(cart[i].item.price * cart[i].ammount);
    }
    this.toPay = this.total.reduce((currentValue, accumulator) => {
      return currentValue + accumulator;
    });
    return this.toPay;
  }
}

const myShop = new Shop();

console.log(`El total a pagar es de ${myShop.checkout(myCart)} €`);
