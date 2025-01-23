// Global state
let currentPage = 1;
let isLoading = false;
let hasMore = true;
let observer = null;

function initializeShop() {
    loadProducts(1);
   if (!isLoading) {
       
       initializeInfiniteScroll();
   }
}

function switchTab(tabName) {
    const wardrobeSection = document.getElementById('wardrobeSection');
    const shopSection = document.getElementById('shopSection');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    shopSection.style.minWidth = '100%';
    
    tabButtons.forEach(button => {
        button.classList.remove('border-black', 'border-transparent', 'text-gray-500');
        if (button.textContent.toLowerCase().includes(tabName.toLowerCase())) {
            button.classList.add('border-black');
        } else {
            button.classList.add('border-transparent', 'text-gray-500');
        }
    });
    if (!window.shopInitialized) {
        window.shopInitialized = true;
        initializeShop();
    }
    if (tabName === 'shop') {
        wardrobeSection.classList.add('hidden');
        shopSection.classList.remove('hidden');
    } else {
        console.log('initializeShop');
        initializeShop()
        wardrobeSection.classList.remove('hidden');
        shopSection.classList.add('hidden');
    }
}

window.switchTab = switchTab;

function initializeInfiniteScroll() {
    observer?.disconnect();

    const options = {
        root: document.getElementById('shopSection'),
        rootMargin: '100px',
        threshold: 0.1
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && hasMore && !isLoading) {
                loadMoreProducts();
            }
        });
    }, options);

    const loader = document.getElementById('productLoader');
    if (loader) {
        observer.observe(loader);
    }
}
async function loadProducts(page = 1, reset = true) {
   if (isLoading) return;
   
   try {
       isLoading = true;
       const container = document.getElementById('productsContainer');
       container.style.minWidth = '100%';
       container.style.minHeight = '60vh';
       
       if (reset) {
           currentPage = 1;
           hasMore = true;
           
           if (container) {
               const loaderWrapper = document.createElement('div');
               loaderWrapper.style.minWidth = '100%';
               loaderWrapper.style.minHeight = '60vh';
               loaderWrapper.innerHTML = `
                   <div id="productLoader" class="w-full py-8 text-center">
                       <div class="loader-spinner"></div>
                   </div>
               `;
               container.innerHTML = '';
               container.appendChild(loaderWrapper);
           }
       }

       const params = new URLSearchParams({
           page: page.toString(),
           per_page: '5'
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

async function loadMoreProducts() {
   if (!hasMore || isLoading) return;
   await loadProducts(currentPage + 1, false);
}

function renderProducts(products, append = false) {
   const container = document.getElementById('productsContainer');
   if (!container) return;

   if (!products || products.length === 0) {
       if (!append) {
           container.innerHTML = '<p class="text-center text-gray-500 py-8">No products found</p>';
       }
       return;
   }

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
       <div class="group relative overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)]">
           <!-- Image Container -->
           <div class="aspect-[2/3] overflow-hidden bg-gray-50">
               <img src="${product.image_urls?.[0] || '/static/placeholder.png'}" 
                    alt="${product.name}"
                    loading="lazy"
                    class="h-full w-full object-cover transition-all duration-1000 ease-out will-change-transform group-hover:scale-110">
               
               <!-- Simple overlay with shop now button -->
               <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out flex items-center justify-center">
                   <a href="${product.url}" 
                      target="_blank" 
                      class="relative px-8 py-3.5 bg-white/95 backdrop-blur-md text-black text-xs uppercase tracking-[0.2em] font-medium 
                             transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                             transition-all duration-700 ease-out hover:bg-black hover:text-white">
                       Shop Now
                   </a>
               </div>
           </div>
     
           <!-- Product Information Section -->
           <div class="p-6 space-y-3 bg-white">
               <!-- Retailer Badge -->
               <div class="inline-block bg-neutral-100 px-4 py-1.5 rounded-full">
                   <span class="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-600">
                       ${product.retailer?.toUpperCase()}
                   </span>
               </div>
     
               <!-- Brand Name -->
               <p class="text-xs text-gray-500 font-medium tracking-wide">
                   ${product.brand || 'Unknown Brand'}
               </p>
     
               <!-- Product Name -->
               <h3 class="font-medium tracking-tight line-clamp-1 text-base text-neutral-900">
                   ${product.name}
               </h3>
               
               <!-- Price -->
               <span class="block font-light text-neutral-800">
                   ${product.price 
                       ? new Intl.NumberFormat('en-US', {
                           style: 'currency',
                           currency: product.currency || 'USD'
                         }).format(product.price)
                       : 'Price not available'
                   }
               </span>
           </div>
       </div>
     `;
       
       fragment.appendChild(productCard);
   });
   
   container.appendChild(fragment);

   if (hasMore) {
    const loader = document.createElement('div');
    loader.id = 'productLoader';
    loader.className = 'w-full py-8 text-center';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    container.appendChild(loader);
    initializeInfiniteScroll(); // Re-initialize observer for new loader
    }
}
document.addEventListener('DOMContentLoaded', () => {
    switchTab('wardrobe');
});
