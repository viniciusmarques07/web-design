// ==========================================
// PRODUTOS
// ==========================================

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


// ==========================================
// ESTADO DO CARRINHO
// ==========================================

// Array que armazena os produtos do carrinho
let cart = [];


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");

const cartButton = document.getElementById("cartButton");

// IMPORTANTE:
// "cartPanel" é o elemento visual do carrinho.
// Não usamos mais "cart" aqui para evitar conflito.
const cartPanel = document.getElementById("cart");

const closeCartButton = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");


// ==========================================
// FORMATAÇÃO DE PREÇO
// ==========================================

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ==========================================
// RENDERIZAR PRODUTOS
// ==========================================

function renderProducts(category = "todos") {

    if (!productsGrid) {
        return;
    }

    const filteredProducts =
        category === "todos"
            ? products
            : products.filter(
                product => product.category === category
            );

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
                        data-product-id="${product.id}"
                    >
                        Adicionar
                    </button>

                </div>

            </div>
        `;

        // Evita onclick inline no HTML
        const addButton = card.querySelector(".add-button");

        addButton.addEventListener("click", () => {
            addToCart(product.id);
        });

        productsGrid.appendChild(card);
    });
}


// ==========================================
// FILTRO DE CATEGORIA
// ==========================================

if (categoryFilter) {

    categoryFilter.addEventListener("change", () => {

        renderProducts(categoryFilter.value);

    });

}


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function updateCart() {

    if (!cartItems) {
        return;
    }

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
                    <h4>${item.name}</h4>

                    <p>
                        ${formatPrice(item.price)}
                        × ${item.quantity}
                    </p>
                </div>

                <button
                    class="remove-item"
                    data-product-id="${item.id}"
                >
                    Remover
                </button>
            `;

            const removeButton =
                cartItem.querySelector(".remove-item");

            removeButton.addEventListener("click", () => {
                removeFromCart(item.id);
            });

            cartItems.appendChild(cartItem);
        });
    }


    // Quantidade total de produtos

    const quantity = cart.reduce(
        (total, item) => {
            return total + item.quantity;
        },
        0
    );


    // Valor total

    const total = cart.reduce(
        (total, item) => {
            return total + item.price * item.quantity;
        },
        0
    );


    if (cartCount) {
        cartCount.textContent = quantity;
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(total);
    }
}


// ==========================================
// REMOVER DO CARRINHO
// ==========================================

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    updateCart();
}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function openCart() {

    if (!cartPanel || !overlay) {
        return;
    }

    cartPanel.classList.add("active");

    overlay.classList.add("active");
}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function closeCart() {

    if (!cartPanel || !overlay) {
        return;
    }

    cartPanel.classList.remove("active");

    overlay.classList.remove("active");
}


// ==========================================
// EVENTOS DO CARRINHO
// ==========================================

if (cartButton) {

    cartButton.addEventListener("click", () => {
        openCart();
    });

}

if (closeCartButton) {

    closeCartButton.addEventListener("click", () => {
        closeCart();
    });

}

if (overlay) {

    overlay.addEventListener("click", () => {
        closeCart();
    });

}


// ==========================================
// FINALIZAR PEDIDO
// ==========================================

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Seu carrinho está vazio.");

            return;
        }


        const total = cart.reduce(
            (sum, item) => {
                return sum + item.price * item.quantity;
            },
            0
        );


        alert(
            "Pedido iniciado!\n\n" +
            "Total: " + formatPrice(total) + "\n\n" +
            "O próximo passo seria integrar " +
            "Pix, cartão ou outro sistema de pagamento."
        );

    });

}


// ==========================================
// FORMULÁRIO DE CONTATO
// ==========================================

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nameInput =
            document.getElementById("name");

        const name =
            nameInput ? nameInput.value.trim() : "";


        if (formMessage) {

            formMessage.textContent =
                `Obrigado, ${name}! Sua mensagem foi enviada.`;

        }


        contactForm.reset();

    });

}


// ==========================================
// FECHAR CARRINHO COM ESC
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeCart();
    }

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderProducts();

updateCart();