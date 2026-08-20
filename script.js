const products = [
    {
        id: 1,
        name: "Sport Pro 6",
        category: "competicao",
        categoryName: "Competição",
        price: 349.90,
        description: "Modelo profissional para praticantes experientes."
    },
    {
        id: 2,
        name: "Training Flex",
        category: "treino",
        categoryName: "Treino",
        price: 249.90,
        description: "Equilíbrio entre controle, flexibilidade e precisão."
    },
    {
        id: 3,
        name: "Start Sport",
        category: "iniciante",
        categoryName: "Iniciante",
        price: 179.90,
        description: "Modelo desenvolvido para quem está começando."
    },
    {
        id: 4,
        name: "Precision X",
        category: "competicao",
        categoryName: "Competição",
        price: 429.90,
        description: "Construção premium para alto nível de performance."
    },
    {
        id: 5,
        name: "Training Carbon",
        category: "treino",
        categoryName: "Treino",
        price: 289.90,
        description: "Leve e equilibrado para sessões prolongadas."
    },
    {
        id: 6,
        name: "Sport Basic",
        category: "iniciante",
        categoryName: "Iniciante",
        price: 149.90,
        description: "Opção acessível para primeiros treinos."
    }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");

const cartButton = document.getElementById("cartButton");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");


// FORMATAÇÃO DE PREÇO

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// MOSTRAR PRODUTOS

function renderProducts(category = "todos") {

    const filteredProducts = category === "todos"
        ? products
        : products.filter(product => product.category === category);

    productsGrid.innerHTML = "";

    filteredProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <div class="fake-whip"></div>
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.categoryName}
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <span class="price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        Adicionar
                    </button>

                </div>

            </div>
        `;

        productsGrid.appendChild(card);
    });
}


// FILTRO

categoryFilter.addEventListener("change", () => {
    renderProducts(categoryFilter.value);
});


// ADICIONAR AO CARRINHO

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    openCart();
}


// ATUALIZAR CARRINHO

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        cart.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div>
                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${formatPrice(item.price)}
                        × ${item.quantity}
                    </p>
                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remover
                </button>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    const quantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const total = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCount.textContent = quantity;
    cartTotal.textContent = formatPrice(total);
}


// REMOVER PRODUTO

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCart();
}


// ABRIR CARRINHO

function openCart() {
    cart.classList.add("active");
    overlay.classList.add("active");
}


// FECHAR CARRINHO

function closeCartMenu() {
    cart.classList.remove("active");
    overlay.classList.remove("active");
}

cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartMenu);

overlay.addEventListener("click", closeCartMenu);


// FINALIZAR PEDIDO

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        `Pedido iniciado!\n\nTotal: ${formatPrice(total)}\n\n` +
        `Em uma loja real, aqui você poderia integrar ` +
        `Pix, cartão ou outro sistema de pagamento.`
    );
});


// FORMULÁRIO

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;

    formMessage.textContent =
        `Obrigado, ${name}! Sua mensagem foi enviada.`;

    contactForm.reset();
});


// INICIALIZAÇÃO

renderProducts();
updateCart();