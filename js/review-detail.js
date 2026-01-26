document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sku = urlParams.get('sku');
    
    // Your Amazon Associate Tag
    const AMAZON_TAG = "poolbotreviews-20";

    if (!sku) {
        showError();
        return;
    }

    try {
        // Use absolute path with a cache-busting timestamp
        const response = await fetch(`/products.json?t=${new Date().getTime()}`);
        if (!response.ok) {
            throw new Error('Failed to load products');
        }
        const products = await response.json();
        const product = products.find(p => p.sku === sku);

        if (product) {
            populateReview(product, AMAZON_TAG);
            updateMetaTags(product);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Error:', error);
        showError();
    }
});

function updateMetaTags(product) {
    // Update Title
    document.title = `${product.name} Review - Robot Pool Cleaner Reviews`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = product.description;

    // Update Open Graph Tags
    updateOgTag('og:title', `${product.name} Review - Robot Pool Cleaner Reviews`);
    updateOgTag('og:description', product.description);
    updateOgTag('og:image', product.image_url || 'https://via.placeholder.com/1200x630?text=PoolBot+Reviews');
    updateOgTag('og:url', window.location.href);

    // Update Twitter Tags
    updateOgTag('twitter:title', `${product.name} Review - Robot Pool Cleaner Reviews`, 'name');
    updateOgTag('twitter:description', product.description, 'name');
    updateOgTag('twitter:image', product.image_url || 'https://via.placeholder.com/1200x630?text=PoolBot+Reviews', 'name');
}

function updateOgTag(property, content, attributeName = 'property') {
    let tag = document.querySelector(`meta[${attributeName}="${property}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeName, property);
        document.head.appendChild(tag);
    }
    tag.content = content;
}

function populateReview(product, amazonTag) {
    // Set Page Title (Visual)
    document.getElementById('page-title').textContent = `${product.name} Review - Robot Pool Cleaner Reviews`;

    // Set Product Names
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('sidebar-product-name').textContent = product.name;

    // Set Image
    const img = document.getElementById('product-image');
    img.src = product.image_url || 'https://via.placeholder.com/600x400';
    img.alt = product.name;

    // Set Descriptions
    document.getElementById('product-long-description').textContent = product.long_description || product.description;
    
    // Set Features (handle HTML content)
    const featuresContainer = document.getElementById('product-features');
    if (product.features) {
        featuresContainer.innerHTML = product.features;
    } else {
        featuresContainer.textContent = "Detailed feature list coming soon.";
    }
    
    // Set Detailed Analysis (using innerHTML to render HTML tags)
    const analysisContainer = document.getElementById('product-detailed-analysis');
    if (product.detailed_analysis) {
        analysisContainer.innerHTML = product.detailed_analysis;
    } else {
        analysisContainer.innerHTML = '<p class="text-muted">Detailed analysis for this product is coming soon.</p>';
    }

    // Set Who This Is For (using innerHTML to render HTML tags)
    const whoForContainer = document.getElementById('product-who-is-this-for');
    if (product.who_is_this_for) {
        whoForContainer.innerHTML = product.who_is_this_for;
    } else {
        whoForContainer.innerHTML = '<p class="text-muted">Information coming soon.</p>';
    }

    document.getElementById('product-verdict').textContent = product.verdict || "Review coming soon.";

    // Set Pros
    const prosList = document.getElementById('product-pros');
    prosList.innerHTML = ''; // Clear existing content
    if (product.pros && product.pros.length > 0) {
        product.pros.forEach(pro => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = pro;
            prosList.appendChild(li);
        });
    } else {
        prosList.innerHTML = '<li class="list-group-item">No pros listed.</li>';
    }

    // Set Cons
    const consList = document.getElementById('product-cons');
    consList.innerHTML = ''; // Clear existing content
    if (product.cons && product.cons.length > 0) {
        product.cons.forEach(con => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = con;
            consList.appendChild(li);
        });
    } else {
        consList.innerHTML = '<li class="list-group-item">No cons listed.</li>';
    }
    
    // Set Amazon Link
    const checkPriceBtn = document.querySelector('.btn-warning');
    if (product.asin) {
        checkPriceBtn.href = `https://www.amazon.com/dp/${product.asin}?tag=${amazonTag}`;
    } else {
        checkPriceBtn.href = "#";
        checkPriceBtn.classList.add('disabled');
    }

    // Show Content
    document.getElementById('review-content').style.display = 'block';
}

function showError() {
    document.getElementById('error-container').style.display = 'block';
    document.getElementById('review-content').style.display = 'none';
}