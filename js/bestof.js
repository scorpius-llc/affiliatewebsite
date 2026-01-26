document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const listId = urlParams.get('list');
    
    // Your Amazon Associate Tag
    const AMAZON_TAG = "poolbotreviews-20";

    if (!listId) {
        showError();
        return;
    }

    try {
        // Fetch both data files in parallel
        const [listsResponse, productsResponse] = await Promise.all([
            fetch(`/best-lists.json?t=${new Date().getTime()}`),
            fetch(`/products.json?t=${new Date().getTime()}`)
        ]);

        if (!listsResponse.ok || !productsResponse.ok) {
            throw new Error('Failed to load data');
        }

        const lists = await listsResponse.json();
        const allProducts = await productsResponse.json();
        
        const selectedList = lists.find(l => l.id === listId);

        if (selectedList) {
            populatePage(selectedList, allProducts, AMAZON_TAG);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Error:', error);
        showError();
    }
});

function populatePage(list, allProducts, amazonTag) {
    // 1. Header & Intro
    document.title = `${list.title} - PoolBot Reviews`;
    document.getElementById('list-title').textContent = list.title;
    document.getElementById('list-description').textContent = list.description;
    document.getElementById('list-intro').innerHTML = list.intro;

    // 2. Criteria
    const criteriaList = document.getElementById('list-criteria');
    list.criteria.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        criteriaList.appendChild(li);
    });

    // Prepare product data for this list
    const listProducts = list.products.map(item => {
        const productData = allProducts.find(p => p.sku === item.sku);
        return { ...productData, ...item }; // Merge list-specific data (badge, reason) with product data
    }).filter(p => p.sku); // Filter out any undefined if SKU not found

    // 3. Shortlist Cards
    const shortlistContainer = document.getElementById('shortlist-container');
    listProducts.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3 mb-4';
        col.innerHTML = `
            <div class="card h-100 border-primary">
                <div class="card-header bg-primary text-white text-center fw-bold">
                    ${product.badge}
                </div>
                <img src="${product.image_url || 'https://via.placeholder.com/300x200'}" class="card-img-top p-3" alt="${product.name}">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title h6">${product.name}</h5>
                    <p class="card-text small text-muted flex-grow-1">${product.reason}</p>
                    <a href="#review-${product.sku}" class="btn btn-outline-primary btn-sm mt-2">Read Mini-Review</a>
                </div>
            </div>
        `;
        shortlistContainer.appendChild(col);
    });

    // 4. Comparison Table
    const tableBody = document.getElementById('comparison-table-body');
    listProducts.forEach(product => {
        const row = document.createElement('tr');
        const amazonLink = product.asin ? `https://www.amazon.com/dp/${product.asin}?tag=${amazonTag}` : '#';
        
        // Extract a key feature (first bullet point or generic)
        let keyFeature = "High Performance";
        if (product.features && product.features.includes('<li>')) {
             // Simple regex to grab first li content
             const match = product.features.match(/<li><strong>(.*?)<\/strong>/);
             if (match) keyFeature = match[1];
        }

        row.innerHTML = `
            <td class="fw-bold"><a href="/reviews/review.html?sku=${product.sku}" class="text-decoration-none">${product.name}</a></td>
            <td><span class="badge bg-info text-dark">${product.badge}</span></td>
            <td>$${product.approx_price}</td>
            <td>${keyFeature}</td>
            <td><a href="${amazonLink}" target="_blank" class="btn btn-warning btn-sm fw-bold text-nowrap">Check Price</a></td>
        `;
        tableBody.appendChild(row);
    });

    // 5. Mini Reviews
    const miniReviewsContainer = document.getElementById('mini-reviews-container');
    listProducts.forEach(product => {
        const amazonLink = product.asin ? `https://www.amazon.com/dp/${product.asin}?tag=${amazonTag}` : '#';
        
        const reviewDiv = document.createElement('div');
        reviewDiv.id = `review-${product.sku}`;
        reviewDiv.className = 'card mb-4';
        reviewDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4 text-center p-4 d-flex align-items-center justify-content-center bg-white">
                    <img src="${product.image_url || 'https://via.placeholder.com/300x200'}" class="img-fluid rounded-start" alt="${product.name}" style="max-height: 200px;">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h3 class="card-title h4">${product.name}</h3>
                                <span class="badge bg-primary mb-2">${product.badge}</span>
                            </div>
                            <div class="text-end">
                                <div class="h4 mb-0 text-primary">$${product.approx_price}</div>
                            </div>
                        </div>
                        
                        <p class="card-text mt-3">${product.description}</p>
                        <p class="card-text"><strong>Why we picked it:</strong> ${product.reason}</p>
                        
                        <div class="d-flex gap-2 mt-4">
                            <a href="/reviews/review.html?sku=${product.sku}" class="btn btn-outline-primary">Read Full Review</a>
                            <a href="${amazonLink}" target="_blank" class="btn btn-warning fw-bold">Check Price on Amazon</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        miniReviewsContainer.appendChild(reviewDiv);
    });

    // 6. Buying Advice
    document.getElementById('buying-advice').innerHTML = list.buying_advice;

    // Show Content
    document.getElementById('list-content').style.display = 'block';
}

function showError() {
    document.getElementById('error-container').style.display = 'block';
    document.getElementById('list-content').style.display = 'none';
}