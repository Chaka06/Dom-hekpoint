document.addEventListener('DOMContentLoaded', function () {
    const openCartBtn = document.getElementById('open-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeModalBtn = cartModal.querySelector('.close');
    const itemList = document.getElementById('item-list');

    openCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    itemList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('decrease-btn')) {
            decreaseQuantity(target);
        } else if (target.classList.contains('increase-btn')) {
            increaseQuantity(target);
        } else if (target.classList.contains('delete-btn')) {
            deleteItem(target);
        }
        updateTotal();
    });

    function decreaseQuantity(button) {
        const quantityElem = button.nextElementSibling;
        let quantity = parseInt(quantityElem.textContent);
        if (quantity > 1) {
            quantityElem.textContent = --quantity;
        }
    }

    function increaseQuantity(button) {
        const quantityElem = button.previousElementSibling;
        let quantity = parseInt(quantityElem.textContent);
        quantityElem.textContent = ++quantity;
    }

    function deleteItem(button) {
        const item = button.parentElement;
        item.remove();
    }

    function updateTotal() {
        let total = 0;
        const items = itemList.querySelectorAll('li');
        items.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('FCFA', ''));
            total += quantity * price;
        });
        document.getElementById('total').textContent = `Total : ${total.toFixed(2)} FCFA`;
    }
});
