// Global state
let currentPage = 1;
let isLoading = false;
let hasMore = true;
let observer = null;

// Define switchTab globally
function switchTab(tabName) {
    // Hide all sections
    document.getElementById('wardrobeSection')?.classList.add('hidden');
    document.getElementById('shopSection')?.classList.add('hidden');

    // Show selected section
    if (tabName === 'shop') {
        document.getElementById('shopSection')?.classList.remove('hidden');
        loadProducts(1); // Reset and load first page
        initializeInfiniteScroll(); // Initialize infinite scroll
    } else {
        document.getElementById('wardrobeSection')?.classList.remove('hidden');
    }

    // Update active tab button
    document.querySelectorAll('.tab-button').forEach(button => {
        if (button.textContent.toLowerCase().includes(tabName.toLowerCase())) {
            button.classList.add('active', 'border-black');
            button.classList.remove('text-gray-500', 'border-transparent');
        } else {
            button.classList.remove('active', 'border-black');
            button.classList.add('text-gray-500', 'border-transparent');
        }
    });
}

// Make switchTab available globally
window.switchTab = switchTab;

// Initialize Intersection Observer for infinite scroll
function initializeInfiniteScroll() {
    // Disconnect existing observer if any
    if (observer) {
        observer.disconnect();
    }

    const options = {
        root: null,
        rootMargin: '200px',
        threshold: 0.1
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && hasMore && !isLoading) {
                loadMoreProducts();
            }
        });
    }, options);

    // Observe loader element
    const loader = document.getElementById('productLoader');
    if (loader) {
        observer.observe(loader);
    }
}

// Load products with infinite scroll
async function loadProducts(page = 1, reset = true) {
    if (isLoading) return;
    
    try {
        isLoading = true;
        if (reset) {
            currentPage = 1;
            hasMore = true;
            const container = document.getElementById('productsContainer');
            if (container) {
                container.innerHTML = `
                    <div id="productLoader" class="w-full py-8 text-center">
                        <div class="loader-spinner"></div>
                    </div>
                `;
            }
        }

        const params = new URLSearchParams({
            page: page.toString(),
            per_page: '5', // Load 5 products at a time
            sort_by: 'created_at',
            sort_order: 'desc'
        });

        const response = await fetch(`/products?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "success" && data.data) {
            renderProducts(data.data.products, !reset);
            hasMore = data.data.pagination.has_more;
            currentPage = page;
            
            // Reinitialize infinite scroll if this is the first load
            if (reset) {
                initializeInfiniteScroll();
            }
        }
    } catch (error) {
        console.error('Error loading products:', error);
        const container = document.getElementById('productsContainer');
        if (container && reset) {
            container.innerHTML = '<p class="text-center text-red-500 py-8">Error loading products</p>';
        }
    } finally {
        isLoading = false;
    }
}

// Load more products for infinite scroll
async function loadMoreProducts() {
    if (!hasMore || isLoading) return;
    await loadProducts(currentPage + 1, false);
}

// Render products
function renderProducts(products, append = false) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    if (!products || products.length === 0) {
        if (!append) {
            container.innerHTML = '<p class="text-center text-gray-500 py-8">No products found</p>';
        }
        return;
    }

    // Remove existing loader if appending
    if (append) {
        const existingLoader = document.getElementById('productLoader');
        if (existingLoader) {
            existingLoader.remove();
        }
    } else {
        container.innerHTML = '';
    }

    const fragment = document.createDocumentFragment();
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300';
        
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image_urls?.[0] || '/static/placeholder.png'}" 
                     alt="${product.name}"
                     loading="lazy"
                     class="w-full h-64 object-cover">
                <div class="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    ${product.retailer?.toUpperCase()}
                </div>
            </div>
            
            <div class="p-5 space-y-3">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${product.name}</h3>
                    <p class="text-sm text-gray-600">${product.brand || 'Unknown Brand'}</p>
                </div>

                <div class="text-xl font-bold text-gray-900">
                    ${product.price 
                        ? new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: product.currency || 'USD'
                          }).format(product.price)
                        : 'Price not available'
                    }
                </div>

                ${product.colors && product.colors.length > 0 ? `
                    <div>
                        <div class="flex flex-wrap gap-1">
                            ${product.colors.slice(0, 4).map(color => `
                                <div class="w-4 h-4 rounded-full border border-gray-200" 
                                     style="background-color: ${color.toLowerCase()}"
                                     title="${color}">
                                </div>
                            `).join('')}
                            ${product.colors.length > 4 ? `
                                <div class="text-xs text-gray-500">+${product.colors.length - 4}</div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <a href="${product.url}" target="_blank" 
                   class="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    View Details
                </a>
            </div>
        `;
        
        fragment.appendChild(productCard);
    });
    
    container.appendChild(fragment);

    // Add new loader if there are more products to load
    if (hasMore) {
        const loader = document.createElement('div');
        loader.id = 'productLoader';
        loader.className = 'w-full py-8 text-center';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        container.appendChild(loader);
    }
}

// Initialize immediately when script loads
window.switchTab = switchTab;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start with wardrobe tab
    switchTab('wardrobe');
});