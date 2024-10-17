let products = [];
let sales = [];

const productForm = document.getElementById('product-form');
const productList = document.getElementById('products');
const salesList = document.getElementById('sales-list');
const totalSales = document.getElementById('total-sales');

productForm.addEventListener('submit', addProduct);

function addProduct(e) {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);

    const product = { name, price, stock };
    products.push(product);

    displayProducts();
    productForm.reset();
}

function displayProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.name} - Precio: $${product.price.toFixed(2)} - Stock: ${product.stock}
            <button onclick="sellProduct(${index})">Vender</button>
        `;
        productList.appendChild(li);
    });
}

function sellProduct(index) {
    const product = products[index];
    if (product.stock > 0) {
        product.stock--;
        const sale = { name: product.name, price: product.price };
        sales.push(sale);
        updateSales();
        displayProducts();
    } else {
        alert('No hay stock disponible para este producto.');
    }
}

function updateSales() {
    salesList.innerHTML = '';
    let total = 0;
    sales.forEach(sale => {
        const li = document.createElement('li');
        li.textContent = `${sale.name} - $${sale.price.toFixed(2)}`;
        salesList.appendChild(li);
        total += sale.price;
    });
    totalSales.textContent = total.toFixed(2);
}

displayProducts();