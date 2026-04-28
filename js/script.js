function goOrder() {
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "order.html";
    }, 400);
}

function validateForm() {
    const payment = document.getElementById("payment").value;
    const dateInput = document.getElementById("date");
    const date = dateInput.value;
    const dateError = document.getElementById("dateError");

    dateError.textContent = "";

    console.log("DATE VALUE:", date);

    if (!payment) {
        alert("Please choose a payment method.");
        return false;
    }

    if (!date) {
        dateError.textContent = "Please select a date.";
        return false;
    }

    const year = Number(date.substring(0, 4));

    console.log("YEAR:", year);

    if (year < 1000 || year > 3000) {
        dateError.textContent = "Year must be between 1000 and 3000.";
        return false;
    }

    alert("Order submitted successfully!");
    return false; // TEMPORARY for testing
}

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.classList.contains("active-nav")) return;

        e.preventDefault();
        const href = this.getAttribute("href");

        document.documentElement.classList.add("fade-out-scroll");
        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = href;
        }, 550);
    });
});

const footer = document.getElementById("siteFooter");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isBottom = scrollTop + windowHeight >= documentHeight - 10;

    if (isBottom) {
        footer.classList.add("active");
    } else {
        footer.classList.remove("active");
    }
});

document.querySelectorAll(".custom-dropdown").forEach(dropdown => {
    const selected = dropdown.querySelector(".dropdown-selected");
    const options = dropdown.querySelectorAll(".dropdown-option");

    selected.addEventListener("click", () => {
        document.querySelectorAll(".custom-dropdown").forEach(d => {
            if (d !== dropdown) {
                d.classList.remove("active");
            }
        });

        dropdown.classList.toggle("active");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            const text = option.innerText;
            const value = option.dataset.value;

            selected.innerHTML = `
                ${text}
                <span class="dropdown-arrow">⌄</span>
            `;

            dropdown.classList.remove("active");

            if (dropdown.id === "productDropdown") {
                updateSummary(value);
            }
        });
    });
});

document.addEventListener("click", (e) => {
    document.querySelectorAll(".custom-dropdown").forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
});

function animateContainerHeight(container, callback) {
    const startHeight = container.offsetHeight;

    callback();

    const endHeight = container.scrollHeight;

    container.style.height = startHeight + "px";

    requestAnimationFrame(() => {
        container.style.height = endHeight + "px";
    });

    const onTransitionEnd = () => {
        container.style.height = "auto";
        container.removeEventListener("transitionend", onTransitionEnd);
    };

    container.addEventListener("transitionend", onTransitionEnd);
}


function updateAddons() {
    const additionalBox = document.getElementById("additionalPurchases");
    const totalPrice = document.getElementById("totalPrice");

    const startHeight = additionalBox.offsetHeight;

    let basePrice = parseInt(
        document.getElementById("summaryPrice").innerText.replace("$", "")
    );

    const addons = [
        { checkbox: "addon1", id: "addon-blue", name: "Anti Blue Light", price: 15 },
        { checkbox: "addon2", id: "addon-uv", name: "UV Protection", price: 20 },
        { checkbox: "addon3", id: "addon-reflect", name: "Anti-Reflective", price: 10 },
        { checkbox: "addon4", id: "addon-photo", name: "Photochromic", price: 25 }
    ];

    let totalExtra = 0;
    let removedSomething = false;

    addons.forEach(addon => {
        const checked = document.getElementById(addon.checkbox).checked;
        const existing = document.getElementById(addon.id);

        if (checked) {
            totalExtra += addon.price;

            if (!existing) {
                const row = document.createElement("div");
                row.className = "addon-row animate-in";
                row.id = addon.id;

                row.innerHTML = `
                    <span>${addon.name}</span>
                    <span>$${addon.price}</span>
                `;

                additionalBox.appendChild(row);

                requestAnimationFrame(() => {
                    row.classList.remove("animate-in");
                    row.classList.add("show");
                });
            }
        } else if (existing) {
            removedSomething = true;

            existing.classList.remove("show");
            existing.classList.add("animate-out");

            setTimeout(() => {
                existing.remove();
                animateHeight();
            }, 300);
        }
    });

    totalPrice.innerText = `$${basePrice + totalExtra}`;

    if (!removedSomething) {
        animateHeight();
    }

    function animateHeight() {
        const endHeight = additionalBox.scrollHeight;

        additionalBox.style.height = startHeight + "px";

        requestAnimationFrame(() => {
            additionalBox.style.height = endHeight + "px";
        });

        setTimeout(() => {
            additionalBox.style.height = "auto";
        }, 350);
    }
}

const addon1 = document.getElementById("addon1");
const addon2 = document.getElementById("addon2");
const addon3 = document.getElementById("addon3");
const addon4 = document.getElementById("addon4");

if (addon1) addon1.addEventListener("change", updateAddons);
if (addon2) addon2.addEventListener("change", updateAddons);
if (addon3) addon3.addEventListener("change", updateAddons);
if (addon4) addon4.addEventListener("change", updateAddons);

const revealCards = document.querySelectorAll(".reveal-card");

if (revealCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("show");
                    }, index * 180);
                });
            }
        });
    }, {
        threshold: 0.05
    });

    revealCards.forEach(card => {
        observer.observe(card);
    });
}

const revealWhy = document.querySelectorAll(".reveal-why");

if (revealWhy.length > 0) {
    const whyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealWhy.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("show");
                    }, index * 180);
                });
            }
        });
    }, {
        threshold: 0.15
    });

    revealWhy.forEach(card => {
        whyObserver.observe(card);
    });
}

const addonDescriptions = {
    addon1: "Reduces eye strain from screens.",
    addon2: "Protects your eyes from harmful UV rays.",
    addon3: "Removes glare and reflections on lenses.",
    addon4: "Automatically darkens under sunlight."
};

const fixedNotice = document.getElementById("addonFixedNotice");

if (fixedNotice) {
    document.querySelectorAll(".custom-check").forEach(box => {
        const input = box.querySelector("input");
        const label = box.querySelector(".tooltip-text-label");

        box.addEventListener("mouseenter", () => {
            fixedNotice.innerHTML = `
                <strong>${label.innerText}</strong>
                <span>${addonDescriptions[input.id]}</span>
                `;
            fixedNotice.classList.add("show");
        });

        box.addEventListener("mouseleave", () => {
            fixedNotice.classList.remove("show");
        });
    });
}

function renderFeaturedProducts() {
    const container = document.getElementById("featuredproducts");

    if (!container) return;

    container.innerHTML = "";

    products.slice(0, 4).forEach((product, index) => {
        container.innerHTML += `
            <a href="product.html#product-${index}" class="featured-link">
                <div class="card reveal-card">
                    <div class="image-box">
                        <img src="${product.image}" alt="${product.name}">
                    </div>

                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <p class="product-price">$${product.price}</p>
                </div>
            </a>
        `;
    });
}

function observeRevealCards() {
    const revealCards = document.querySelectorAll(".reveal-card");

    if (revealCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("show");
                        }, index * 180);
                    });
                }
            });
        }, {
            threshold: 0.05
        });

        revealCards.forEach(card => {
            observer.observe(card);
        });
    }
}

function renderAllProducts() {
    const container = document.getElementById("allproducts");

    if (!container) return;

    container.innerHTML = "";

    products.forEach((product, index) => {
        container.innerHTML += `
            <div class="product-item" id="product-${index}">
                <div class="product-image-wrap">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-subtitle">${product.subtitle}</p>

                    <div class="product-specs">
                        <span>Premium</span>
                        <span>Lightweight</span>
                        <span>Luxury</span>
                    </div>

                    <p class="product-detail">
                        ${product.desc}
                    </p>

                    <div class="product-bottom">
                        <p class="product-price-tag">$${product.price}</p>
                        <a href="order.html" class="product-btn">Order</a>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderOrderProducts() {
    const optionsContainer = document.getElementById("productOptions");
    const selectedBox = document.querySelector(
        "#productDropdown .dropdown-selected"
    );

    if (!optionsContainer || !selectedBox) return;

    optionsContainer.innerHTML = "";

    products.forEach((product, index) => {
        const option = document.createElement("div");
        option.className = "dropdown-option";
        option.innerText = product.name;
        option.dataset.index = index;

        option.addEventListener("click", () => {
            selectedBox.innerHTML = `
                ${product.name}
                <span class="dropdown-arrow">⌄</span>
            `;

            document.getElementById("productDropdown")
                .classList.remove("active");

            updateSummaryByProduct(product);
        });

        optionsContainer.appendChild(option);
    });

    if (products.length > 0) {
        selectedBox.innerHTML = `
            ${products[0].name}
            <span class="dropdown-arrow">⌄</span>
        `;

        updateSummaryByProduct(products[0]);
    }
}

function updateSummaryByProduct(product) {
    const img = document.getElementById("summaryImage");
    const name = document.getElementById("summaryName");
    const desc = document.getElementById("summaryDesc");
    const price = document.getElementById("summaryPrice");
    const summary = document.querySelector(".order-summary");

    summary.classList.remove("summary-animate");
    void summary.offsetWidth;

    img.src = product.image;
    name.innerText = product.name;
    desc.innerText = product.subtitle;
    price.innerText = `$${product.price}`;

    summary.classList.add("summary-animate");

    updateAddons();
}


renderFeaturedProducts();
renderAllProducts();
observeRevealCards();
renderOrderProducts();

window.addEventListener("load", () => {
    const hash = window.location.hash;

    if (hash) {
        const target = document.querySelector(hash);

        if (target) {
            setTimeout(() => {
                target.classList.add("active-focus");

                setTimeout(() => {
                    target.classList.remove("active-focus");
                }, 2500);
            }, 400);
        }
    }
});

/* =========================
REWARDS MEMBERSHIP FIXED
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const membershipToggle = document.getElementById("membershipToggle");
    const membershipExpand = document.getElementById("membershipExpand");
    const membershipOrderExpand = document.getElementById("membershipOrderExpand");

    const choosePlanButtons = document.querySelectorAll(".choose-plan-btn");

    const selectedPlanTitle = document.getElementById("selectedPlanTitle");
    const selectedPlanName = document.getElementById("selectedPlanName");
    const selectedPlanPrice = document.getElementById("selectedPlanPrice");

    const planPrices = {
        "Silver Member": "$29 / year",
        "Gold Member": "$59 / year",
        "Diamond Member": "$99 / year"
    };

    /* =========================
    UPGRADE MEMBERSHIP BUTTON
    ========================= */

    if (membershipToggle) {
        membershipToggle.addEventListener("click", function () {
            const isOpen = membershipExpand.classList.contains("show");

            /* kalau sedang buka → tutup semua */
            if (isOpen) {
                membershipExpand.classList.remove("show");
                membershipOrderExpand.classList.remove("show");
                return;
            }

            /* kalau sedang tutup → buka */
            membershipExpand.classList.add("show");

            setTimeout(() => {
                membershipExpand.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 150);
        });
    }

    /* =========================
    CHOOSE PLAN BUTTONS
    ========================= */

    choosePlanButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedPlan = this.dataset.plan;

            selectedPlanTitle.textContent = `Activate ${selectedPlan}`;
            selectedPlanName.textContent = selectedPlan;
            selectedPlanPrice.textContent = planPrices[selectedPlan];

            membershipOrderExpand.classList.add("show");

            setTimeout(() => {
                membershipOrderExpand.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }, 150);
        });
    });

});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});