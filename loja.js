// carregar a página antes de executar o script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  //preparar botões para remover item do carrinho
  const removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
  }
  //preparar input de quantidade para atualizar preço
  const quantityInputs = document.getElementsByClassName('cart-item-quant')
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }
  //preparar botoes de adicionar ao carrinho
  const addToCartButtons = document.getElementsByClassName('shop-item-btn')
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }
  //preparar botão de finalizar compra
  const completePurchase = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
// remover item do carrinho
function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}
//mudar quantidade de itens
function quantityChanged(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}
//adicionar ao carrinho
function addToCartClicked(event) {
  let button = event.target
  let shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  let imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
  addItemToCart(title, price, imgSrc)
  updateCartTotal()
}
function addItemToCart(title, price, imgSrc) {
  let cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('Este item já foi adicionado ao carrinho')
      return
    }
  }
  let cartRowContent = `      
        <div class="cart-item cart-column">
        <img class="cart-item-img" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quant cart-column">
        <input class="cart-item-quant" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVER</button>
      </div>`
  cartRow.innerHTML = cartRowContent    
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-item-quant')[0].addEventListener('change', quantityChanged)
}
//finalizar compra
function purchaseClicked(event) {
  alert('Obrigado por comprar de nossa loja e apoiar o projeto Momoshiro!')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}
// atualizar total do carrinho
function updateCartTotal(){
  let cartItemContainer = document.getElementsByClassName('cart-items')[0]
  let cartRows = cartItemContainer.getElementsByClassName('cart-row')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('cart-price')[0]
    let quantityElement = cartRow.getElementsByClassName('cart-item-quant')[0]
    let price = parseFloat(priceElement.innerText.replace('R$', ''))
    let quantity = quantityElement.value
    total += (price * quantity)
  }
  total = (Math.round(total * 100) / 100).toFixed(2)
  document.getElementsByClassName('cart-total-price')[0].innerText = 'R$' + total
}
