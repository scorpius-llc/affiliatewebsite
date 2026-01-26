document.addEventListener('DOMContentLoaded', function () {
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const priceValue = document.getElementById('priceValue');
    const reviewsList = document.getElementById('reviews-list');
    let reviewCards = []; // This will be populated dynamically

    // Your Amazon Associate Tag
    const AMAZON_TAG = "poolbotreviews-20";

    // --- Simulated Affiliate API ---
    const mockApiPrices = {
        "Dolphin-Nautilus-CC-Plus": 799,
        "Dolphin-Premier": 1099,
        "Dolphin-Triton-PS": 899,
        "Dolphin-Sigma": 1399,
        "Polaris-9650iQ-Sport": 1150,
        "Polaris-F9550-Sport": 1099,
        "Polaris-P39": 680,
        "Hayward-TigerShark-QC": 920,
        "Hayward-SharkVac-XL": 980,
        "Hayward-W3PVS20JST-Poolvergnuegen": 530,
        "Aquabot-Breeze-IQ": 590,
        "Aquabot-X4": 825,
        "Pentair-Prowler-930": 1120,
        "Aiper-Scuba-S1": 699,
        "Aiper-Seagull-Pro": 850,
        "Zodiac-Voyager-RE4200": 790,
    };

    async function fetchPrice(sku) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(mockApiPrices[sku]);
            }, 500);
        });
    }
    // --- End of API Simulation ---

    async function loadProducts() {
        try {
            // Use absolute path with a cache-busting timestamp
            const response = await fetch(`/products.json?t=${new Date().getTime()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            
            populateBrandFilter(products);

            reviewsList.innerHTML = ''; // Clear loading spinner
            
            products.forEach(product => {
                const card = createProductCard(product);
                reviewsList.appendChild(card);
            });

            reviewCards = reviewsList.querySelectorAll('.review-card');
            await updatePrices();

        } catch (error) {
            console.error('Error loading products:', error);
            reviewsList.innerHTML = '<p class="text-danger">Failed to load products. Please check the file path and JSON format.</p>';
        }
    }

    function populateBrandFilter(products) {
        const brands = [...new Set(products.map(p => p.brand))];
        brandFilter.innerHTML = '<option value="all">All Brands</option>'; // Reset and add default
        brands.sort().forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    }

    function createProductCard(product) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-md-6 mb-4 review-card';
        cardDiv.setAttribute('data-brand', product.brand);
        cardDiv.setAttribute('data-price', product.approx_price);
        cardDiv.setAttribute('data-sku', product.sku);

        // Link to the dynamic template page with the SKU parameter
        const reviewPageUrl = `/reviews/review.html?sku=${product.sku}`;
        
        // Generate Amazon Affiliate Link
        let amazonLink = "#";
        if (product.asin) {
            amazonLink = `https://www.amazon.com/dp/${product.asin}?tag=${AMAZON_TAG}`;
        }

        cardDiv.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text fw-bold price-display">Approx. Price: $${product.approx_price}</p>
                    <div class="mt-auto d-flex gap-2">
                        <a href="${reviewPageUrl}" class="btn btn-outline-primary flex-grow-1">Read Review</a>
                        <a href="${amazonLink}" target="_blank" class="btn btn-warning flex-grow-1 fw-bold">Check Price</a>
                    </div>
                </div>
            </div>
        `;
        return cardDiv;
    }

    async function updatePrices() {
        for (const card of reviewCards) {
            const sku = card.getAttribute('data-sku');
            const priceDisplay = card.querySelector('.price-display');
            
            if (sku) {
                const livePrice = await fetchPrice(sku);
                if (livePrice !== undefined) {
                    priceDisplay.textContent = `Live Price: $${livePrice}`;
                    card.setAttribute('data-price', livePrice);
                }
            }
        }
        filterReviews();
    }

    function filterReviews() {
        const selectedBrand = brandFilter.value;
        const selectedPrice = parseInt(priceFilter.value, 10);

        priceValue.textContent = `$${selectedPrice}`;

        reviewCards.forEach(card => {
            const cardBrand = card.getAttribute('data-brand');
            const cardPrice = parseInt(card.getAttribute('data-price'), 10);

            const brandMatch = selectedBrand === 'all' || cardBrand === selectedBrand;
            const priceMatch = cardPrice <= selectedPrice;

            if (brandMatch && priceMatch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    brandFilter.addEventListener('change', filterReviews);
    priceFilter.addEventListener('input', filterReviews);

    // Initial setup
    loadProducts();
});