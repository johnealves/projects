function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCustomPriceElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  return e;
}

function addProductItem(section) {
  const items = document.querySelector('.items');
  items.appendChild(section);
}

function createProductItemElement({ sku, name, saleprice, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomPriceElement('span', 'item__price', saleprice));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  addProductItem(section);
}

function searchImageByID(id) {
  return fetch(`https://api.mercadolibre.com/items/${id}`)
  .then(response => response.json())
  .then(object => object.pictures[0].secure_url)
  .catch(error => window.alert(error));
}

function searchElements(element = 'nootbook') {
  const items = document.querySelector('.items');
  items.innerHTML = ' ';
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${element}`)
  .then(response => response.json())
  .then(object => object.results)
  .then((array) => {
    array.forEach(async (object) => {
      const { id: sku, title: name, price: saleprice } = object;
      const image = await searchImageByID(sku)
      createProductItemElement({ sku, name, saleprice, image });
    });
  })
  .catch(error => window.alert(error));
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function saveCart() {
  const listItem = document.getElementsByClassName('cart__item');
  let contador = 0;
  if (listItem.length === 0) {
    localStorage.removeItem('contador');
  }
  if (listItem.length > 0) {
    Object.values(listItem).forEach((value, index) => {
      localStorage.setItem(`itemCart${index}`, value.innerHTML);
      localStorage.setItem(`itemCartID${index}`, value.id);
      contador += 1;
      localStorage.setItem('contador', contador);
    });
  }
}

async function searchPriceByID(id) {
  return fetch(`https://api.mercadolibre.com/items/${id}`)
  .then(response => response.json())
  .then(object => object.price)
  .catch(error => window.alert(error));
}

// async function getPrice(item) {
//   const price = await searchPriceByID(item);
//   return price;
// }

function sumPrices() {
  const items = document.querySelectorAll('.cart__item');
  const ids = [];
  for (let index = 0; index < items.length; index += 1) {
    ids.push(items[index].id);
  }
  const labelPrice = document.querySelector('.total-price');
  if (items.length === 0) {
    labelPrice.innerHTML = '0,00';
  } else {
    let totalPrice = 0;
    ids.forEach(async (value) => {
      const price = await searchPriceByID(value);
      totalPrice += price;
      labelPrice.innerHTML = `TOTAL ${totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    });
  }
}

function cartItemClickListener(event) {
  const cartList = document.querySelector('.cart__items');
  cartList.removeChild(event.target);
  saveCart();
  sumPrices();
}

function addCartItem(listItem) {
  const cartList = document.querySelector('.cart__items');
  cartList.appendChild(listItem);
  saveCart();
  sumPrices();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `${name} | Preço: R$ ${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

function searchElementesByID(id) {
  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then(response => response.json())
  .then((object) => {
    const { id: sku, title: name, price: salePrice } = object;
    const listItem = createCartItemElement({ sku, name, salePrice });
    addCartItem(listItem);
  })
  .catch(error => window.alert(error));
}

function captureID(e) {
  if (e.target.className === 'item__add') {
    const item = e.target.parentNode;
    const id = item.firstChild.innerText;
    searchElementesByID(id);
  }
}

function loadlocalStorage() {
  const cartList = document.querySelector('.cart__items');
  const cont = localStorage.getItem('contador');
  for (let index = 0; index < cont; index += 1) {
    const newLI = document.createElement('li');
    newLI.className = 'cart__item';
    newLI.innerHTML = localStorage.getItem(`itemCart${index}`);
    newLI.id = localStorage.getItem(`itemCartID${index}`);
    cartList.appendChild(newLI);
  }
  sumPrices();
}

function empytCart() {
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = ' ';
}

function setupEventListener() {
  const items = document.querySelector('.items');
  items.addEventListener('click', captureID);
  const cartList = document.querySelector('.cart__items');
  cartList.addEventListener('click', cartItemClickListener);
  const buttonEmpytCart = document.querySelector('.empty-cart');
  buttonEmpytCart.addEventListener('click', empytCart);
  const search = document.querySelector('#searchInput');
  search.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      searchElements(search.value);
    }
  })
  const searchButton = document.querySelector('#searchButton');
  searchButton.addEventListener('click', () => {
    searchElements(search.value);
  })
}


window.onload = function onload() {
  searchElements();
  setupEventListener();
  loadlocalStorage();
};
