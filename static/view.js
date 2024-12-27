// Global variables
let floatingChatOpen = false;
let floatingSelectedStylist = null;
let floatingChatHistory = [];
let currentUniqueId = null;
let selectedStylistId = null;
let currentTokenName = null;
let selectedItems = new Map();
let floatingChatUniqueId = null;
let floatingChatTokenName = null;
// Stylist data
let stylists = [
    {
        id: 'reginald',
        name: 'AI Reginald',
        image: '/static/images/reginald.png',
        bio: 'Reginald Ferguson, also known as (The Bro) and owner of New York Fashion Geek...'
    },
    {
        id: 'eliza',
        name: 'AI Eliza',
        image: '/static/images/eliza.png',
        bio: 'Eliza Parrilla, the Wardrobe Boss, is a seasoned personal stylist...'
    },
    {
        id: 'lilia',
        name: 'AI Lilia',
        image: '/static/images/lilia.png',
        bio: 'Lilia Dolinsky, founder of LiliBelle, specializes in personal styling...'
    }
];

// Single function to initialize file input
function initializeFileInput() {
    const imageInput = document.getElementById('image');
    if (!imageInput) return;
    
    // Remove any existing listeners
    const newImageInput = imageInput.cloneNode(true);
    imageInput.parentNode.replaceChild(newImageInput, imageInput);
    
    // Add single event listener
    newImageInput.addEventListener('change', function(event) {
        const container = document.getElementById('caption-thumbnails-container');
        if (container) {
            // Clear existing content first
            container.innerHTML = '';
            currentFiles.clear();
            
            displayMultipleThumbnails(container, this.files);
        }
    });
}

// Add listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", async function() {
    try {
        
        // Create message container
        messageContainer = createMessageContainer();
        
        // Initialize gender and stylists
        const email = localStorage.getItem('wardrobeEmail');
        console.log('View page loaded - Email:', email); // Debug log

        const response = await fetch(`/get_gender?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        const gender = data.gender || "other";
        
        // Set initial gender and arrange stylists
        const genderSelect = document.getElementById('genderSelect');
        if (genderSelect) {
            genderSelect.value = gender;
        }
        arrangeStylistsByGender(gender);
        
        // Initialize file input
        initializeFileInput();        
        // Initialize floating chat
        await initializeFloatingChat();
        
        // Add event listeners for buttons
        setupEventListeners();
        
        // Initialize delete modal
        createDeleteModal();
        
    } catch (error) {
        console.error("Error in DOMContentLoaded:", error);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Form submit listener
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFormSubmit);
    }

    // File input change listener
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', async function() {
            await displayMultipleThumbnails(
                document.getElementById('caption-thumbnails-container'),
                this.files
            );
        });
    }
});
function setupEventListeners() {
    // Upload button
    const uploadButton = document.querySelector('button[onclick="openUploadModal()"]');
    if (uploadButton) {
        uploadButton.addEventListener('click', openUploadModal);
    }

    // Chat input listeners
    const floatingChatInput = document.getElementById('floatingChatInput');
    if (floatingChatInput) {
        floatingChatInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleFloatingChatSubmit(event);
            }
        });
    }

    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
        chatInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    // // File input listener
    // const imageInput = document.getElementById('image');
    // if (imageInput) {
    //     imageInput.addEventListener('change', function() {
    //         displayMultipleThumbnails(document.getElementById('caption-thumbnails-container'), this.files);
    //     });
    // }

    // Form submit handler
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFormSubmit);
    }

    // Floating chat toggle
    const chatToggleButton = document.querySelector('button[onclick="toggleFloatingChat()"]');
    if (chatToggleButton) {
        chatToggleButton.addEventListener('click', toggleFloatingChat);
    }

    // Close modal buttons
    document.querySelectorAll('button[onclick="closeUploadModal()"]').forEach(button => {
        button.addEventListener('click', closeUploadModal);
    });

    // Select item buttons
    document.querySelectorAll('.select-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const data = this.dataset;
            toggleItemSelection({
                uniqueId: data.uniqueId,
                tokenName: data.token,
                imageUrl: data.imageUrl,
                caption: data.caption
            });
        });
    });

    // Delete buttons
    document.querySelectorAll('button[onclick^="deleteItem"]').forEach(button => {
        button.addEventListener('click', function() {
            const tokenName = this.closest('[data-token]').dataset.token;
            const itemElement = this.closest('.hover-scale');
            deleteItem(tokenName, itemElement);
        });
    });
}
// Mobile Menu Functionality
// Mobile Menu Functionality
function initializeMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !mobileMenu) return;

    function toggleMenu(event) {
        event.stopPropagation();
        const isOpen = mobileMenu.classList.contains('active');
        
        // Toggle menu
        mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', !isOpen);
        
        // Toggle body scroll
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    }

    // Menu button click handler
    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !menuBtn.contains(event.target)) {
            toggleMenu(event);
        }
    });

    // Prevent menu content clicks from bubbling
    mobileMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Close menu on menu item click
    const menuItems = mobileMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            toggleMenu(event);
        });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 640 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}
function handleLogout(event) {
    event.preventDefault();
    
    try {
        // Clear all authentication data from localStorage
        localStorage.removeItem('wardrobeEmail');
        localStorage.removeItem('wardrobePassword');
        
        // Clear any other app-specific data
        localStorage.removeItem('gender');
        
        // Clear any runtime variables
        selectedItems.clear();
        chatHistory = [];
        floatingChatHistory = [];
        currentUniqueId = null;
        currentTokenName = null;
        selectedStylistId = null;
        floatingSelectedStylist = null;
        
        // Show success message
        showMessage('Successfully logged out', 'success');
        
        // Redirect to login page after a brief delay
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
        
    } catch (error) {
        console.error('Error during logout:', error);
        showMessage('Error during logout', 'error');
    }
}
// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
});
async function refreshFloatingStylist() {
    // Show typing indicator
    document.getElementById("floatingTypingIndicator").classList.remove("hidden");
    
    try {
        const response = await fetch("/refresh_stylist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem('wardrobeEmail'),
                password: localStorage.getItem('wardrobePassword'),
                stylist: floatingSelectedStylist.id
            })
        });

        const data = await response.json();
        
        if (response.ok && data.status === "success") {
            // Clear chat history
            floatingChatHistory = [];
            
            // Add initial system message
            floatingChatHistory.push({
                type: "assistant",
                text: data.initial_message
            });
            
            // Update chat view
            updateFloatingChatView();
            
            // Show success message
            showMessage(data.message, "success");
        } else {
            // Handle error responses
            const errorMessage = data.message || "Failed to refresh stylist";
            showMessage(errorMessage, "error");
            
            // Add error message to chat
            floatingChatHistory.push({
                type: "assistant",
                text: "I apologize, but I encountered an error. Please try again."
            });
            updateFloatingChatView();
        }
    } catch (error) {
        console.error("Error refreshing stylist:", error);
        showMessage("Failed to refresh stylist", "error");
        
        // Add error message to chat
        floatingChatHistory.push({
            type: "assistant",
            text: "I apologize, but I encountered an error. Please try again."
        });
        updateFloatingChatView();
    } finally {
        // Hide typing indicator
        document.getElementById("floatingTypingIndicator").classList.add("hidden");
    }
}

// Add this function to handle gender selection and update
async function updateGenderPreference(gender) {
    try {
        // First, update the gender in the database
        const response = await fetch('/update_gender', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('wardrobeEmail'),
                password: localStorage.getItem('wardrobePassword'),
                gender: gender
            })
        });

        const result = await response.json();

        if (result.success) {
            // Show success message
            showMessage('Gender preference updated successfully', 'success');
            
            // Rearrange stylists based on new gender
            arrangeStylistsByGender(gender);
            
            // Add smooth transition for rearrangement
            const stylistList = document.getElementById('stylistList');
            stylistList.style.opacity = '0';
            
            setTimeout(() => {
                arrangeStylistsByGender(gender);
                stylistList.style.opacity = '1';
            }, 300);
            
        } else {
            showMessage('Failed to update gender preference', 'error');
        }
    } catch (error) {
        console.error('Error updating gender:', error);
        showMessage('An error occurred while updating gender preference', 'error');
    }
}

// Modify the DOMContentLoaded event to set the initial gender selection
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const email = localStorage.getItem('wardrobeEmail');
        const response = await fetch(`/get_gender?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        // Set the gender based on server response
        const gender = data.gender || "other";
        
        // Set the select element's value
        const genderSelect = document.getElementById('genderSelect');
        if (genderSelect) {
            genderSelect.value = gender;
        }

        // Arrange stylists based on gender
        arrangeStylistsByGender(gender);
    } catch (error) {
        console.error("Error fetching gender:", error);
    }
});
async function uploadProfilePicture(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Basic validation
        if (!file.type.startsWith('image/')) {
            showMessage('Please select an image file', 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showMessage('Image size should be less than 5MB', 'error');
            return;
        }

        try {
            // Load EXIF.js if needed
            if (!window.EXIF) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.min.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            
            // Fix orientation
            const fixedFile = await fixImageOrientation(file);
            const base64File = await fileToBase64(fixedFile);
            
            // Create JSON request body with corrected field name
            const requestBody = {
                email: localStorage.getItem('wardrobeEmail'),
                password: localStorage.getItem('wardrobePassword'),
                image_data: base64File.includes('base64,') ? base64File.split('base64,')[1] : base64File,
                filename: file.name,  // Changed from file_name to filename
                content_type: file.type
            };

            // Show loading state with modern spinner
            const profileContainer = document.querySelector('.text-center.fade-in');
            profileContainer.innerHTML = `
                <div class="relative inline-block group">
                    <div class="profile-image-loading">
                        <img src="${URL.createObjectURL(file)}" alt="Profile Picture"
                            class="rounded-full w-40 h-40 border-4 border-white object-cover shadow-xl hover-scale profile-image-transition opacity-50">
                        <div class="absolute inset-0 rounded-full border-4 border-gray-100 opacity-50"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="spinner">
                                <div class="double-bounce1"></div>
                                <div class="double-bounce2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const response = await fetch('/upload_profile_picture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            if (result.status === 'success') {
                showMessage('Profile picture updated successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Failed to update profile picture', 'error');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
}
// Update openUploadModal to reinitialize the file input
function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    const generateButton = document.getElementById('generateButton');
    if (modal && generateButton) {
        modal.classList.remove('hidden');
        generateButton.classList.add('hidden');
        
        // Reset form
        const form = document.getElementById('upload-form');
        if (form) form.reset();
        
        // Clear thumbnails
        const container = document.getElementById('caption-thumbnails-container');
        if (container) {
            container.innerHTML = '';
            currentFiles.clear();
        }
        
        // Reinitialize file input
        initializeFileInput();
    }
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    const generateButton = document.getElementById('generateButton');
    const chatWindow = document.getElementById('floatingChatWindow');
    if (modal && generateButton && chatWindow) {
        modal.classList.add('hidden');
        // Only show the generate button if the chat window is not open
        if (chatWindow.classList.contains('hidden')) {
            generateButton.classList.remove('hidden');
        }
        // Reset form
        const form = document.getElementById('upload-form');
        if (form) form.reset();
        // Clear thumbnails
        const container = document.getElementById('caption-thumbnails-container');
        if (container) container.innerHTML = '';
    }
}

// Reuse the upload functionality from profile.html
let currentFiles = new Map();

// Updated display thumbnails function
async function displayMultipleThumbnails(container, files) {
    if (!container || !files.length) return;
    
    container.innerHTML = '';
    currentFiles.clear();
    
    const processedFiles = new Set();
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        // Skip if we've already processed this file
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
        if (processedFiles.has(fileKey)) {
            console.log('Skipping duplicate file:', file.name);
            continue;
        }
        processedFiles.add(fileKey);
        try {
            // Fix orientation first
            const fixedFile = await fixImageOrientation(file);
            const uniqueId = `file-${Date.now()}-${index}`;
            currentFiles.set(uniqueId, fixedFile);
            
            // Create object URL from the fixed file
            const blob = new Blob([await fixedFile.arrayBuffer()], { type: fixedFile.type });
            const previewURL = URL.createObjectURL(blob);
            
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.className = 'relative';
            thumbnailDiv.dataset.fileId = uniqueId;
            
            thumbnailDiv.innerHTML = `
                <img src="${previewURL}" alt="Image ${index + 1}" 
                     class="w-full h-32 object-cover rounded-lg shadow-sm">
                <button class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 
                             flex items-center justify-center shadow-lg hover:bg-red-600 
                             transform hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" 
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                              stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 
                          rounded-full thumbnail-label">
                    Image ${index + 1}
                </div>
            `;
            
            // Add delete button event listener
            const deleteButton = thumbnailDiv.querySelector('button');
            deleteButton.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentFiles.delete(uniqueId);
                thumbnailDiv.remove();
                URL.revokeObjectURL(previewURL); // Clean up the object URL
                
                // Update remaining thumbnails
                container.querySelectorAll('.thumbnail-label').forEach((label, idx) => {
                    label.textContent = `Image ${idx + 1}`;
                });
            };
            
            container.appendChild(thumbnailDiv);
        } catch (error) {
            console.error('Error processing image:', error);
            showMessage('Error processing image', 'error');
        }
    }
}
// Add event listener for file input
document.getElementById('image').addEventListener('change', async function() {
    await displayMultipleThumbnails(document.getElementById('caption-thumbnails-container'), this.files);
});
// Helper function to convert File to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
    });
}
// Updated form submit handler for JSON submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const email = localStorage.getItem('wardrobeEmail');
    const password = localStorage.getItem('wardrobePassword');
    const files = Array.from(currentFiles.values());

    if (files.length === 0) {
        showMessage('Please select at least one image', 'error');
        return;
    }

    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;

    const gridContainer = document.querySelector('.grid');
    const placeholderCards = new Map();
    const uploadedCards = new Map();

    try {
        // Create placeholders for each image immediately
        files.forEach(file => {
            const tokenName = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const placeholderCard = createLoadingPlaceholder(file, tokenName);
            gridContainer.insertBefore(placeholderCard, gridContainer.firstChild);
            placeholderCards.set(tokenName, { card: placeholderCard, file });
        });

        // Process each image sequentially to ensure all captions are generated
        for (const [tokenName, { card: placeholderCard, file }] of placeholderCards) {
            try {
                // Convert file to base64
                const base64Image = await fileToBase64(file);

                // Create request body for this specific image
                const requestBody = {
                    email,
                    password,
                    token_name: tokenName,
                    image: base64Image.includes('base64,') ? base64Image.split('base64,')[1] : base64Image
                };

                // Upload individual image
                const response = await fetch('/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Upload failed');
                }

                const uploadResult = await response.json();

                if (uploadResult.status === 'success') {
                    // Create and add the actual card with animation
                    const newItem = createItemCard({
                        token_name: tokenName,
                        image_url: uploadResult.image_url,
                        caption: uploadResult.caption,
                        unique_id: uploadResult.unique_id
                    });

                    newItem.style.opacity = '0';
                    newItem.style.transform = 'translateY(20px)';
                    placeholderCard.replaceWith(newItem);

                    requestAnimationFrame(() => {
                        newItem.style.transition = 'all 0.3s ease-out';
                        newItem.style.opacity = '1';
                        newItem.style.transform = 'translateY(0)';
                    });

                    uploadedCards.set(tokenName, uploadResult);
                }
            } catch (error) {
                console.error(`Error uploading image with token ${tokenName}:`, error);
                placeholderCard.remove();
                showMessage(`Failed to upload image: ${error.message}`, 'error');
            }
        }

        // Show success message based on number of successful uploads
        const successCount = uploadedCards.size;
        if (successCount > 0) {
            showMessage(`Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}`, 'success');
            closeUploadModal();
        }

    } catch (error) {
        console.error('Upload error:', error);
        showMessage(error.message || 'Failed to upload images', 'error');
        // Remove any remaining placeholders
        placeholderCards.forEach(({card}) => card.remove());
    } finally {
        button.textContent = originalText;
        button.disabled = false;
        document.getElementById('image').value = '';
        currentFiles.clear();
    }
}

// Create loading placeholder card
function createLoadingPlaceholder(file, tokenName) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl overflow-hidden shadow-lg hover-scale';
    div.dataset.token = tokenName;
    
    // Create object URL for immediate image preview
    const imageUrl = URL.createObjectURL(file);
    
    div.innerHTML = `
        <div class="relative">
            <div class="relative">
                <img src="${imageUrl}" alt="Uploading..." class="w-full h-72 object-cover filter blur-sm">
                <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div class="loading-spinner">
                        <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-5">
            <div class="animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    `;
    
    // Clean up object URL when placeholder is removed
    div.addEventListener('remove', () => URL.revokeObjectURL(imageUrl));
    
    return div;
}
// // Update the form submit handler
// document.getElementById('upload-form')?.addEventListener('submit', async function(event) {
//     event.preventDefault();
    
//     const form = this;
//     const thumbnailsContainer = document.getElementById('caption-thumbnails-container');
//     const visibleThumbnails = thumbnailsContainer.querySelectorAll('[data-file-id]');
    
//     if (visibleThumbnails.length === 0) {
//         showMessage('Please select at least one image', 'error');
//         return;
//     }
    
//     form.classList.add('loading');
//     const button = form.querySelector('button[type="submit"]');
//     const originalButtonText = button.textContent;
//     button.textContent = 'Processing...';
    
//     try {
//         const email = localStorage.getItem('wardrobeEmail');
//         const password = localStorage.getItem('wardrobePassword');
        
//         for (const thumbnail of visibleThumbnails) {
//             const fileId = thumbnail.dataset.fileId;
//             const file = currentFiles.get(fileId);
            
//             if (!file) continue;
            
//             const tokenName = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
//             // Convert file to base64
//             const base64File = await fileToBase64(file);
            
//             // Create JSON request body
//             const requestBody = {
//                 email: email,
//                 password: password,
//                 token_name: tokenName,
//                 image_data: base64File.includes('base64,') ? base64File.split('base64,')[1] : base64File,
//                 file_name: file.name,
//                 content_type: file.type
//             };

//             const response = await fetch('/upload', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(requestBody)
//             });

//             const result = await response.json();
            
//             if (result.status === 'success') {
//                 const gridContainer = document.querySelector('.grid');
//                 const newItem = createItemCard({
//                     ...result,
//                     token_name: tokenName,
//                     unique_id: result.unique_id || tokenName
//                 });
//                 gridContainer.insertBefore(newItem, gridContainer.firstChild);
//                 newItem.classList.add('slide-in-right');
//             }
//         }
        
//         // Clear form and close modal
//         currentFiles.clear();
//         document.getElementById('image').value = '';
//         thumbnailsContainer.innerHTML = '';
//         closeUploadModal();
//         showMessage(`Successfully uploaded ${visibleThumbnails.length} images`, 'success');
        
//     } catch (error) {
//         console.error('Error:', error);
//         showMessage('An error occurred during upload', 'error');
//     } finally {
//         form.classList.remove('loading');
//         button.textContent = originalButtonText;
//     }
// });

// Update createItemCard for smoother transitions
function createItemCard(result) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl overflow-hidden shadow-lg hover-scale';
    div.dataset.token = result.token_name;
    
    const caption = result.caption || result.image_caption || '';
    const imageUrl = result.image_url;
    const uniqueId = result.unique_id;
    
    div.innerHTML = `
        <div class="relative">
            <img src="${imageUrl}" alt="${caption}" class="w-full h-72 object-cover">
            <button 
                onclick="toggleItemSelection({
                    uniqueId: '${uniqueId}',
                    tokenName: '${result.token_name}',
                    imageUrl: '${imageUrl}',
                    caption: '${caption.replace(/'/g, "\\'")}'
                })"
                class="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 select-item-btn z-10"
                data-token="${result.token_name}"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
            <button onclick="deleteItem('${result.token_name}', this.closest('.hover-scale'))" 
                class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition duration-300">
                &times;
            </button>
        </div>
        <div class="p-5">
            <p class="text-gray-800 text-lg font-medium leading-relaxed">${caption}</p>
        </div>
    `;
    
    return div;
}

// Updated toggleItemSelection function for single selection
function toggleItemSelection(item) {
    // Use tokenName to find the clicked button
    const buttons = document.querySelectorAll('.select-item-btn');
    const btn = Array.from(buttons).find(button => 
        button.getAttribute('data-token') === item.tokenName
    );
    
    if (!btn) {
        console.error('Button not found for token:', item.tokenName);
        return;
    }
    
    if (selectedItems.has(item.tokenName)) {
        // Deselecting item
        selectedItems.delete(item.tokenName);
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejofin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
        `;
        btn.classList.remove('bg-black', 'text-white', 'selected');
    } else {
        // First deselect any currently selected item
        const currentlySelectedToken = Array.from(selectedItems.keys())[0];
        if (currentlySelectedToken) {
            // Find and update the previously selected button
            const prevSelectedBtn = Array.from(buttons).find(button => 
                button.getAttribute('data-token') === currentlySelectedToken
            );
            if (prevSelectedBtn) {
                prevSelectedBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                `;
                prevSelectedBtn.classList.remove('bg-black', 'text-white', 'selected');
            }
            selectedItems.delete(currentlySelectedToken);
        }
        
        // Select new item
        selectedItems.set(item.tokenName, {
            uniqueId: item.uniqueId,
            tokenName: item.tokenName,
            imageUrl: item.imageUrl,
            caption: item.caption
        });
        
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        `;
        btn.classList.add('bg-black', 'text-white', 'selected');
    }
    
    updateSelectedItemsDisplay();
    //updateSelectionButton();
}
// Add logging to help debug
document.addEventListener('DOMContentLoaded', () => {
    // Log when items are selected/deselected
    const originalSet = selectedItems.set;
    selectedItems.set = function() {
        console.log('Setting item:', ...arguments);
        return originalSet.apply(this, arguments);
    };

    const originalDelete = selectedItems.delete;
    selectedItems.delete = function() {
        console.log('Deleting item:', ...arguments);
        return originalDelete.apply(this, arguments);
    };
});
// Add this new function to update all selection buttons
function updateAllSelectionButtons() {
    // Clear all selections first
    document.querySelectorAll('.select-item-btn').forEach(btn => {
        const uniqueId = btn.getAttribute('data-unique-id');
        if (selectedItems.has(uniqueId)) {
            // This item is selected
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            `;
            btn.classList.add('bg-black', 'text-white', 'selected');
        } else {
            // This item is not selected
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            `;
            btn.classList.remove('bg-black', 'text-white', 'selected');
        }
    });
}
function updateSelectedItemsDisplay() {
    const items = Array.from(selectedItems.values());
    const container = document.getElementById('selectedItemsContainer');
    const thumbnails = document.getElementById('selectedItemsThumbnails');
    
    // Update chat button text
    const chatButton = document.querySelector('#floatingChat button');
    if (items.length > 0) {
        chatButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="font-medium">Chat about ${items.length} selected item${items.length > 1 ? 's' : ''}</span>
        `;
        
        // Update thumbnails
        thumbnails.innerHTML = items.map(item => `
            <div class="relative flex-shrink-0">
                <img 
                    src="${item.imageUrl}" 
                    alt="Selected item" 
                    class="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <button
                    onclick="toggleItemSelection({
                        tokenName: '${item.tokenName}',
                        uniqueId: '${item.uniqueId}',
                        imageUrl: '${item.imageUrl}',
                        caption: '${item.caption}'
                    })"
                    class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                    ×
                </button>
            </div>
        `).join('');
        
        container.classList.remove('hidden');
    } else {
        chatButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="font-medium">Chat with AI Style Assistant</span>
        `;
        container.classList.add('hidden');
        thumbnails.innerHTML = '';
    }
}
// Message System with modern dark theme styling
const createMessageContainer = () => {
    const container = document.createElement('div');
    container.className = 'fixed top-4 right-4 z-[60] flex flex-col gap-2';  // Increased z-index to be above modals
    document.body.appendChild(container);
    return container;
};

let messageContainer = createMessageContainer();

const showMessage = (message, type = 'default') => {
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = `flex items-start max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 p-4 transform transition-all duration-300 ${
        type === 'success' ? 'border-l-green-500' :
        type === 'error' ? 'border-l-red-500' :
        type === 'warning' ? 'border-l-yellow-500' :
        'border-l-gray-500'
    }`;
    
    // Set initial state for animation
    alertElement.style.opacity = '0';
    alertElement.style.transform = 'translateX(100%)';
    
    // Create content
    alertElement.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
                ${type === 'success' ? `
                    <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                ` : type === 'error' ? `
                    <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                    </svg>
                ` : type === 'warning' ? `
                    <svg class="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                ` : `
                    <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                `}
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900 dark:text-gray-100">${message}</p>
            </div>
            <button class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none" onclick="dismissMessage(this.parentElement.parentElement)">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
    `;
    
    // Add to container
    messageContainer.appendChild(alertElement);
    
    // Trigger animation
    requestAnimationFrame(() => {
        alertElement.style.opacity = '1';
        alertElement.style.transform = 'translateX(0)';
    });
    
    // Auto dismiss after 8 seconds
    const dismissTimer = setTimeout(() => {
        dismissMessage(alertElement);
    }, 8000);
    
    // Store the timer ID on the element
    alertElement.dataset.dismissTimer = dismissTimer;
};

// Separate dismiss function
const dismissMessage = (element) => {
    if (!element) return;
    
    // Clear any existing dismiss timer
    if (element.dataset.dismissTimer) {
        clearTimeout(Number(element.dataset.dismissTimer));
    }
    
    // Start exit animation
    element.style.opacity = '0';
    element.style.transform = 'translateX(100%)';
    
    // Remove element after animation
    setTimeout(() => {
        if (element.parentElement) {
            element.remove();
        }
    }, 300);
};
function showStylistInfo(name, bio, contact, image) {
    selectedStylistId = name.toLowerCase();

    document.getElementById("stylistName").textContent = name;
    document.getElementById("stylistBio").textContent = bio;
    document.getElementById("stylistContact").textContent = contact;
    document.getElementById("stylistImage").src = `/static/images/${image}`;
    document.getElementById("stylistInfoModal").classList.remove("hidden");
    closeAvatarModal(); // Close the avatar modal
}
// Close the stylist info modal
function closeStylistInfoModal() {
    document.getElementById("stylistInfoModal").classList.add("hidden");
}
// Update startChatWithStylist function to include the selected image in the chat flow
function startChatWithStylist() {
    const stylistName = document.getElementById("stylistName").textContent;
    const stylistImage = document.getElementById("stylistImage").src;
    
    document.getElementById("currentStylistName").textContent = stylistName;
    document.getElementById("currentStylistImage").src = stylistImage;
    document.getElementById("typingStyleImage").src = stylistImage;
    
    document.getElementById("stylistInfoModal").classList.add("hidden");
    document.getElementById("chatModal").classList.remove("hidden");
    
    // Clear any existing chat history
    chatHistory = [];
    
    // Add initial system message with the selected garment image
    chatHistory.push({
        type: "assistant",
        text: `Hello! I'm ${stylistName}. I'm here to help you style this garment.`,
        images: [{
            image_url: document.getElementById("modalImage").src
        }]
    });
    
    updateChatView();
}
function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
}
function closeChatModal() {
    document.getElementById("chatModal").classList.add("hidden");
}
// Add these functions at the top with your other JavaScript code
function createDeleteModal() {
    const modal = document.createElement('div');
    modal.id = 'deleteModal';
    modal.className = 'hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40';
    modal.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md fade-in">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Item</h3>
                <p class="text-sm text-gray-500 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
                <div class="flex justify-center gap-4">
                    <button id="cancelDelete" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        Cancel
                    </button>
                    <button id="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Remove the existing showDeleteFeedback function and use showMessage instead
function showDeleteFeedback(success) {
    if (success) {
        showMessage("Item deleted successfully", 'success');
    } else {
        showMessage("Failed to delete item", 'error');
    }
}

function removeItemWithAnimation(element) {
    element.style.transition = 'all 0.5s ease-out';
    element.style.transform = 'scale(0.95)';
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.height = `${element.offsetHeight}px`;
        element.style.marginTop = '0';
        element.style.marginBottom = '0';
        
        setTimeout(() => {
            element.style.height = '0';
            element.style.marginTop = '0';
            element.style.marginBottom = '0';
            element.style.padding = '0';
            
            setTimeout(() => {
                element.remove();
                // Check if wardrobe is empty
                const wardrobe = document.querySelector('.grid');
                if (wardrobe && wardrobe.children.length === 0) {
                    showEmptyState();
                }
            }, 500);
        }, 50);
    }, 100);
}

function showEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'col-span-full py-12 text-center fade-in';
    emptyState.innerHTML = `
        <div class="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">No items in your wardrobe</h3>
        <p class="text-sm text-gray-500">Start by adding some clothes to your virtual wardrobe.</p>
    `;
    document.querySelector('.grid').appendChild(emptyState);
}
// Updated delete function
async function deleteItem(token_name, itemElement) {
    const modal = document.getElementById('deleteModal') || createDeleteModal();
    modal.classList.remove('hidden');

    const confirmBtn = document.getElementById('confirmDelete');
    const cancelBtn = document.getElementById('cancelDelete');

    const handleDelete = async () => {
        modal.classList.add('hidden');
        try {
            const response = await fetch(`/delete_item/${token_name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('wardrobeEmail'),
                    password: localStorage.getItem('wardrobePassword')
                })
            });

            const data = await response.json();
            
            if (data.success) {
                removeItemWithAnimation(itemElement);
                showMessage("Item deleted successfully", 'success');
            } else {
                showMessage(data.message || "Failed to delete item", 'error');
            }
        } catch (error) {
            console.error("Error:", error);
            showMessage("Failed to delete item", 'error');
        }
    };

    const handleCancel = () => {
        modal.classList.add('hidden');
    };

    confirmBtn.addEventListener('click', handleDelete, { once: true });
    cancelBtn.addEventListener('click', handleCancel, { once: true });
}

function saveCaption(uniqueId, tokenName, newCaption) {
    fetch(`/edit_caption/${uniqueId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            unique_id: uniqueId,
            token_name: tokenName,
            new_caption: newCaption,
            email: localStorage.getItem('wardrobeEmail'),
            password: localStorage.getItem('wardrobePassword')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage("Caption updated successfully.", "success");
        } else {
            showMessage("Failed to update caption.", "error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showMessage("An error occurred.", "error");
    });
}
function filterStylists() {
    const searchInput = document.getElementById("stylistSearch").value.toLowerCase();
    const stylistList = document.getElementById("stylistList");
    const stylists = stylistList.getElementsByClassName("cursor-pointer");

    for (let i = 0; i < stylists.length; i++) {
        const stylistName = stylists[i].innerText.toLowerCase();
        if (stylistName.includes(searchInput)) {
            stylists[i].style.display = "block";
        } else {
            stylists[i].style.display = "none";
        }
    }
}
let chatHistory = []; // Array to hold chat history
// Update the sendMessage function to properly store the images in chat history
async function sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const message = chatInput.value.trim();
    
    if (message === "" || !currentUniqueId || !currentTokenName || !selectedStylistId) return;

    // Add user message to chat history
    chatHistory.push({ type: "user", text: message });
    updateChatView();
    chatInput.value = "";

    // Show typing indicator
    document.getElementById("typingIndicator").classList.remove("hidden");

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                input_text: message,
                unique_id: currentUniqueId,
                token_name: currentTokenName,
                email: localStorage.getItem('wardrobeEmail'),
                password: localStorage.getItem('wardrobePassword'),
                stylist: selectedStylistId
            })
        });

        const data = await response.json();
        console.log("Backend response data:", data); // Debug log

        // Hide typing indicator
        document.getElementById("typingIndicator").classList.add("hidden");

        if (!data.images) {
            console.log("No images in response");
        }

        // Add assistant message with recommended images
        const assistantMessage = {
            type: "assistant",
            text: data.reply,
            images: Array.isArray(data.images) ? data.images : [] // Ensure images is always an array
        };
        
        console.log("Adding assistant message:", assistantMessage); // Debug log
        chatHistory.push(assistantMessage);
        updateChatView();
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("typingIndicator").classList.add("hidden");
        chatHistory.push({ 
            type: "assistant", 
            text: "I apologize, but I encountered an error. Please try again.",
            images: []
        });
        updateChatView();
    }
}
// Update the updateChatView function to properly display recommended images
function updateChatView() {
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.innerHTML = "";

    chatHistory.forEach(message => {
        const messageDiv = document.createElement("div");
        messageDiv.className = "flex items-start gap-2 mb-4";
        
        if (message.type === "user") {
            messageDiv.className += " justify-end";
        }

        if (message.type === "assistant") {
            const avatarDiv = document.createElement("div");
            avatarDiv.className = "flex-shrink-0";
            const avatar = document.createElement("img");
            avatar.src = document.getElementById("currentStylistImage").src;
            avatar.className = "w-8 h-8 rounded-full object-cover";
            avatarDiv.appendChild(avatar);
            messageDiv.appendChild(avatarDiv);
        }

        const messageBubble = document.createElement("div");
        messageBubble.className = `message-bubble ${message.type === "user" ? "user-message" : "assistant-message"}`;
        
        // Add text content
        const textDiv = document.createElement("div");
        textDiv.textContent = message.text;
        messageBubble.appendChild(textDiv);

        // Add images if present
        if (message.images && message.images.length > 0) {
            const imageContainer = document.createElement("div");
            imageContainer.className = "mt-2 space-y-2";
            
            message.images.forEach(image => {
                const imgWrapper = document.createElement("div");
                imgWrapper.className = "relative rounded-lg overflow-hidden";
                
                const imgElement = document.createElement("img");
                imgElement.src = image.image_url;
                imgElement.className = "w-full max-w-[240px] rounded-lg shadow-sm object-cover";
                imgElement.style.maxHeight = "200px";
                
                imgWrapper.appendChild(imgElement);
                imageContainer.appendChild(imgWrapper);
            });
            
            messageBubble.appendChild(imageContainer);
        }

        messageDiv.appendChild(messageBubble);
        chatContainer.appendChild(messageDiv);
    });

    // Smooth scroll to bottom
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
}

// Helper function to create image wrappers
function createImageWrapper(imageUrl, altText) {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "relative rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300";
    
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = altText;
    imgElement.className = "w-full rounded-lg shadow-sm object-cover cursor-pointer";
    imgElement.style.maxHeight = "200px";
    
    // Add click handler to show full-size image
    imgElement.onclick = () => {
        // You could implement a modal or lightbox here to show the full-size image
        window.open(imageUrl, '_blank');
    };
    
    imgWrapper.appendChild(imgElement);
    return imgWrapper;
}
document.addEventListener("DOMContentLoaded", async function() {
try {
    // Fetch user gender from the server
    const email = localStorage.getItem('wardrobeEmail'); // Retrieve user email if available
    const response = await fetch(`/get_gender?email=${encodeURIComponent(email)}`);
    const data = await response.json();

    // Set the gender based on server response
    const gender = data.gender || "other"; // Default to "other" if no gender found

    // Reorder stylists based on gender
    arrangeStylistsByGender(gender);
} catch (error) {
    console.error("Error fetching gender:", error);
}


});

// Update the arrangeStylistsByGender function to include smooth transitions
function arrangeStylistsByGender(gender) {
    const stylistList = document.getElementById("stylistList");
    
    // Add transition effect
    stylistList.style.transition = 'opacity 0.3s ease';
    stylistList.style.opacity = '0';
    
    setTimeout(() => {
        stylistList.innerHTML = ""; // Clear existing list

        // Define stylist HTML strings with the actual content
        const reginaldHTML = `
            <div class="cursor-pointer p-3 rounded-lg hover:bg-gray-100" onclick="showStylistInfo('Reginald', 'Reginald Ferguson, also known as (The Bro) and owner of New York Fashion Geek, is a personal stylist dedicated to helping clients elevate their style and confidence. With services like private consultations, closet audits, and curated shopping experiences, he offers a tailored approach to fashion. Reginald believes that clothing is currency and teaches clients to invest in timeless, high-quality pieces that reflect their unique identity. His mission is to transform individuals into their best selves, making style effortless and empowering.', 'reg@nyfashiongeek.com', 'reginald.png')">
                <img src="/static/images/reginald.png" alt="Reginald" class="style-assistant-img inline-block mr-3">
                <span class="text-gray-900 font-semibold">AI Reginald</span>
            </div>
        `;
        
        const elizaHTML = `
            <div class="cursor-pointer p-3 rounded-lg hover:bg-gray-100" onclick="showStylistInfo('Eliza', 'Eliza Parrilla, the Wardrobe Boss, is a seasoned personal stylist with expertise in designer, couture, and vintage clothing. With experience at top fashion houses like Bergdorf Goodman, Saks Fifth Avenue, and Louis Vuitton, Eliza helps clients find their signature style through curated wardrobes and her popular Wardrobe Remix service. She also hosts the Wardrobe Boss podcast, sharing her passion for empowering confidence through fashion.', 'support@ba536d85-492f-45fb-a195-b4b002d8804a.mail.conversations.godaddy.com', 'eliza.png')">
                <img src="/static/images/eliza.png" alt="Eliza" class="style-assistant-img inline-block mr-3">
                <span class="text-gray-900 font-semibold">AI Eliza</span>
            </div>
        `;
        
        const liliaHTML = `
            <div class="cursor-pointer p-3 rounded-lg hover:bg-gray-100" onclick="showStylistInfo('Lilia', 'Lilia Dolinsky, founder of LiliBelle, specializes in personal styling that celebrates individual body shapes with elegance and confidence. Known for her 4 Body Shape Guide, she helps clients find flattering styles and create wardrobes that reflect their unique identities. Lilia offers a range of services, from closet revamps to bridal styling, all aimed at empowering clients to embrace their best selves.', 'LiliBellestyle@gmail.com', 'lilia.png')">
                <img src="/static/images/lilia.png" alt="Lilia" class="style-assistant-img inline-block mr-3">
                <span class="text-gray-900 font-semibold">AI Lilia</span>
            </div>
        `;

        // Arrange stylists based on gender with smooth transition
        if (gender === "man" || gender === "Man") {
            stylistList.innerHTML = reginaldHTML + elizaHTML + liliaHTML;
        } else if (gender === "woman" || gender === "Woman") {
            stylistList.innerHTML = elizaHTML + liliaHTML + reginaldHTML;
        } else {
            stylistList.innerHTML = elizaHTML + liliaHTML + reginaldHTML;
        }

        // Fade in the new arrangement
        requestAnimationFrame(() => {
            stylistList.style.opacity = '1';
        });
    }, 300);
}
// Add event listener for Enter key
document.getElementById("chatInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});




async function initializeFloatingChat() {
    try {
        const email = localStorage.getItem('wardrobeEmail');
        const response = await fetch(`/get_gender?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        const gender = data.gender || "other";

        // Create custom dropdown
        const genderSelect = document.createElement('div');
        genderSelect.className = 'w-full mb-4';
        genderSelect.innerHTML = `
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Select your gender identity or preference
            </label>
            <div class="relative">
                <button id="genderDropdownButton" type="button" 
                    class="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex justify-between items-center">
                    <span id="selectedGender">${gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Choose your gender identity...'}</span>
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div id="genderDropdown" class="absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div class="max-h-48 overflow-auto">
                        <button type="button" class="w-full px-4 py-2 text-left hover:bg-gray-100" data-value="man">Man</button>
                        <button type="button" class="w-full px-4 py-2 text-left hover:bg-gray-100" data-value="woman">Woman</button>
                        <button type="button" class="w-full px-4 py-2 text-left hover:bg-gray-100" data-value="other">Other</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('stylistSelection').innerHTML = '';
        document.getElementById('stylistSelection').appendChild(genderSelect);

        // Add event listeners
        const dropdownButton = document.getElementById('genderDropdownButton');
        const dropdown = document.getElementById('genderDropdown');

        dropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.add('hidden');
        });

        // Handle option selection
        dropdown.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const value = e.target.dataset.value;
                document.getElementById('selectedGender').textContent = e.target.textContent;
                dropdown.classList.add('hidden');
                updateFloatingGenderPreference(value);
            });
        });

        // Rest of your initialization code...
        const stylistList = document.createElement('div');
        stylistList.id = 'floatingStylistList';
        stylistList.className = 'space-y-4';
        document.getElementById('stylistSelection').appendChild(stylistList);

        arrangeFloatingStylistsByGender(gender);

    } catch (error) {
        console.error("Error initializing floating chat:", error);
        showMessage("Failed to initialize chat", "error");
    }
}
function arrangeFloatingStylistsByGender(gender) {
    const stylistList = document.getElementById('floatingStylistList');
    
    stylistList.style.transition = 'opacity 0.3s ease';
    stylistList.style.opacity = '0';
    
    setTimeout(() => {
        stylistList.innerHTML = "";

        const reginaldHTML = `
            <div class="cursor-pointer p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md" 
                onclick="showFloatingStylistInfo('Reginald', 'Reginald Ferguson, also known as (The Bro) and owner of New York Fashion Geek, is a personal stylist dedicated to helping clients elevate their style and confidence. With services like private consultations, closet audits, and curated shopping experiences, he offers a tailored approach to fashion. Reginald believes that clothing is currency and teaches clients to invest in timeless, high-quality pieces that reflect their unique identity. His mission is to transform individuals into their best selves, making style effortless and empowering.', 'reg@nyfashiongeek.com', 'reginald.png')">
                <div class="flex items-start gap-4 sm:gap-6">
                    <div class="relative shrink-0">
                        <img src="/static/images/reginald.png" alt="Reginald" class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md">
                        <div class="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">AI Reginald</h3>
                        <p class="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-2">Reginald Ferguson, also known as (The Bro) and owner of New York Fashion Geek, is a personal stylist dedicated to helping clients elevate their style and confidence.</p>
                        <div class="flex items-center text-xs text-gray-500 truncate">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span class="truncate">reg@nyfashiongeek.com</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const elizaHTML = `
            <div class="cursor-pointer p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md" 
                onclick="showFloatingStylistInfo('Eliza', 'Eliza Parrilla, the Wardrobe Boss, is a seasoned personal stylist with expertise in designer, couture, and vintage clothing. With experience at top fashion houses like Bergdorf Goodman, Saks Fifth Avenue, and Louis Vuitton, Eliza helps clients find their signature style through curated wardrobes and her popular Wardrobe Remix service. She also hosts the Wardrobe Boss podcast, sharing her passion for empowering confidence through fashion.', 'support@ba536d85-492f-45fb-a195-b4b002d8804a.mail.conversations.godaddy.com', 'eliza.png')">
                <div class="flex items-start gap-4 sm:gap-6">
                    <div class="relative shrink-0">
                        <img src="/static/images/eliza.png" alt="Eliza" class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md">
                        <div class="absolute -bottom-2 -right-2 bg-pink-500 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">AI Eliza</h3>
                        <p class="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-2">Eliza Parrilla, the Wardrobe Boss, is a seasoned personal stylist with expertise in designer, couture, and vintage clothing. With experience at top fashion houses like Bergdorf Goodman, Saks Fifth Avenue, and Louis Vuitton.</p>
                        <div class="flex items-center text-xs text-gray-500 truncate">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span class="truncate">support@ba536d85-492f-45fb-a195-b4b002d8804a.mail.conversations.godaddy.com</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const liliaHTML = `
            <div class="cursor-pointer p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md" 
                onclick="showFloatingStylistInfo('Lilia', 'Lilia Dolinsky, founder of LiliBelle, specializes in personal styling that celebrates individual body shapes with elegance and confidence. Known for her 4 Body Shape Guide, she helps clients find flattering styles and create wardrobes that reflect their unique identities. Lilia offers a range of services, from closet revamps to bridal styling, all aimed at empowering clients to embrace their best selves.', 'LiliBellestyle@gmail.com', 'lilia.png')">
                <div class="flex items-start gap-4 sm:gap-6">
                    <div class="relative shrink-0">
                        <img src="/static/images/lilia.png" alt="Lilia" class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md">
                        <div class="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">AI Lilia</h3>
                        <p class="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-2">Lilia Dolinsky, founder of LiliBelle, specializes in personal styling that celebrates individual body shapes with elegance and confidence. Known for her 4 Body Shape Guide, she helps clients find flattering styles.</p>
                        <div class="flex items-center text-xs text-gray-500 truncate">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span class="truncate">LiliBellestyle@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (gender === "man" || gender === "Man") {
            stylistList.innerHTML = reginaldHTML + elizaHTML + liliaHTML;
        } else if (gender === "woman" || gender === "Woman") {
            stylistList.innerHTML = elizaHTML + liliaHTML + reginaldHTML;
        } else {
            stylistList.innerHTML = elizaHTML + liliaHTML + reginaldHTML;
        }

        requestAnimationFrame(() => {
            stylistList.style.opacity = '1';
        });
    }, 300);
}
// Update showFloatingStylistInfo to reset chat context
function showFloatingStylistInfo(name, bio, contact, image) {
    const stylistId = name.toLowerCase();
    
    // Reset chat context
    floatingChatUniqueId = null;
    floatingChatTokenName = null;
    
    // Update header with stylist info
    const stylistInfo = document.getElementById('selectedStylistInfo');
    stylistInfo.classList.remove('hidden');
    stylistInfo.querySelector('img').src = `/static/images/${image}`;
    stylistInfo.querySelector('h3').textContent = `AI ${name}`;
    
    // Hide selection view, show chat view
    document.getElementById('stylistSelection').classList.add('hidden');
    document.getElementById('floatingChatContainer').classList.remove('hidden');
    document.getElementById('stylistSelectionTitle').classList.add('hidden');
    
    // Set selected stylist
    floatingSelectedStylist = {
        id: stylistId,
        name: `AI ${name}`,
        image: `/static/images/${image}`
    };
    
    // Add welcome message
    floatingChatHistory = [{
        type: 'assistant',
        text: `Hello! I'm AI ${name}. How can I help you with your style today?`
    }];
    updateFloatingChatView();
}
// Function to fix image orientation
function fixImageOrientation(file) {
    const DEBUG = true; // Toggle debugging
    
    function debugLog(...args) {
        if (DEBUG) {
            console.log(`[OrientationFix]`, ...args);
        }
    }

    function debugError(...args) {
        if (DEBUG) {
            console.error(`[OrientationFix]`, ...args);
        }
    }

    function debugWarn(...args) {
        if (DEBUG) {
            console.warn(`[OrientationFix]`, ...args);
        }
    }

    return new Promise((resolve, reject) => {
        debugLog('Starting orientation fix for file:', file.name);
        debugLog('File type:', file.type);
        debugLog('File size:', (file.size / 1024).toFixed(2) + 'KB');

        const reader = new FileReader();
        
        reader.onload = function(e) {
            debugLog('FileReader loaded file successfully');
            const img = new Image();
            
            img.onload = function() {
                debugLog('Image loaded:', {
                    width: img.width,
                    height: img.height,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                });

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                EXIF.getData(img, function() {
                    const orientation = EXIF.getTag(this, 'Orientation') || 1;
                    debugLog('EXIF Orientation:', orientation);
                    
                    // Log all relevant EXIF data
                    if (DEBUG) {
                        const exifData = EXIF.getAllTags(this);
                        debugLog('All EXIF data:', exifData);
                    }

                    // Set canvas dimensions
                    const needsRotation = [5, 6, 7, 8].indexOf(orientation) > -1;
                    if (needsRotation) {
                        debugLog('Image needs rotation, swapping canvas dimensions');
                        canvas.width = img.height;
                        canvas.height = img.width;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }
                    
                    debugLog('Canvas dimensions set to:', {
                        width: canvas.width,
                        height: canvas.height
                    });

                    // Save transformation matrix for debugging
                    let transformMatrix;
                    
                    // Transform context based on orientation
                    try {
                        ctx.save();
                        debugLog('Applying transformation for orientation:', orientation);
                        
                        switch (orientation) {
                            case 2:
                                transformMatrix = [-1, 0, 0, 1, img.width, 0];
                                ctx.transform(...transformMatrix);
                                debugLog('Applied horizontal flip');
                                break;
                            case 3:
                                transformMatrix = [-1, 0, 0, -1, img.width, img.height];
                                ctx.transform(...transformMatrix);
                                debugLog('Applied 180° rotation');
                                break;
                            case 4:
                                transformMatrix = [1, 0, 0, -1, 0, img.height];
                                ctx.transform(...transformMatrix);
                                debugLog('Applied vertical flip');
                                break;
                            case 5:
                                transformMatrix = [0, 1, 1, 0, 0, 0];
                                ctx.transform(...transformMatrix);
                                debugLog('Applied 90° rotation with horizontal flip');
                                break;
                            case 6:
                                transformMatrix = [0, 1, -1, 0, img.height, 0];
                                ctx.transform(...transformMatrix);
                                debugLog('Applied 90° clockwise rotation');
                                break;
                            case 7:
                                transformMatrix = [0, -1, -1, 0, img.height, img.width];
                                ctx.transform(...transformMatrix);
                                debugLog('Applied 90° rotation with vertical flip');
                                break;
                            case 8:
                                transformMatrix = [0, -1, 1, 0, 0, img.width];
                                ctx.transform(...transformMatrix);
                                debugLog('Applied 270° clockwise rotation');
                                break;
                            default:
                                transformMatrix = [1, 0, 0, 1, 0, 0];
                                ctx.transform(...transformMatrix);
                                debugLog('No transformation needed (default orientation)');
                        }
                        
                        debugLog('Transformation matrix applied:', transformMatrix);

                        // Draw image and report any errors
                        try {
                            ctx.drawImage(img, 0, 0);
                            debugLog('Image drawn to canvas successfully');
                        } catch (drawError) {
                            debugError('Error drawing image to canvas:', drawError);
                            throw drawError;
                        }

                        ctx.restore();
                        
                        // Convert to blob with quality check
                        canvas.toBlob((blob) => {
                            if (!blob) {
                                const error = new Error('Failed to create blob from canvas');
                                debugError(error);
                                reject(error);
                                return;
                            }

                            debugLog('Canvas converted to blob:', {
                                size: (blob.size / 1024).toFixed(2) + 'KB',
                                type: blob.type
                            });

                            const correctedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: file.lastModified
                            });
                            
                            debugLog('Created corrected file:', {
                                name: correctedFile.name,
                                size: (correctedFile.size / 1024).toFixed(2) + 'KB',
                                type: correctedFile.type
                            });

                            // Clean up
                            URL.revokeObjectURL(img.src);
                            debugLog('Cleaned up object URL');

                            resolve(correctedFile);
                        }, 'image/jpeg', 0.95);

                    } catch (transformError) {
                        debugError('Error during image transformation:', transformError);
                        reject(transformError);
                    }
                });
            };
            
            img.onerror = function(error) {
                debugError('Error loading image:', error);
                URL.revokeObjectURL(img.src);
                reject(error);
            };
            
            img.src = e.target.result;
            debugLog('Set image source from FileReader result');
        };
        
        reader.onerror = function(error) {
            debugError('Error reading file:', error);
            reject(error);
        };
        
        debugLog('Starting to read file as Data URL');
        reader.readAsDataURL(file);
    });
}

// Helper function to format bytes to human-readable size
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
// Helper function to create an object URL for preview
function createObjectURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
// Add function to set chat context when needed
function setFloatingChatContext(uniqueId, tokenName) {
    floatingChatUniqueId = uniqueId;
    floatingChatTokenName = tokenName;
}
// Function to minimize floating chat
function minimizeFloatingChat() {
    const chatWindow = document.getElementById('floatingChatWindow');
    const generateButton = document.getElementById('generateButton');
    
    if (chatWindow && generateButton) {
        chatWindow.classList.add('hidden');
        generateButton.classList.remove('hidden');
        floatingChatOpen = false;
    }
}
// Function to update gender preference in floating chat
async function updateFloatingGenderPreference(gender) {
    try {
        const response = await fetch('/update_gender', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('wardrobeEmail'),
                password: localStorage.getItem('wardrobePassword'),
                gender: gender
            })
        });

        const result = await response.json();

        if (result.status === 'success') {
            showMessage('Gender preference updated successfully', 'success');
            arrangeFloatingStylistsByGender(gender);
        } else {
            showMessage('Failed to update gender preference', 'error');
        }
    } catch (error) {
        console.error('Error updating gender:', error);
        showMessage('An error occurred while updating gender preference', 'error');
    }
}
// Utility function to update UI elements
function updateUIAfterAction(action, status, message) {
    showMessage(message, status === 'success' ? 'success' : 'error');
    if (status === 'success') {
        // Additional UI updates can be added here
        if (action === 'upload') {
            document.getElementById('uploadModal')?.classList.add('hidden');
        }
    }
}
// Helper function to check if a file is an image
function isImageFile(file) {
    return file && file.type.startsWith('image/');
}

function toggleFloatingChat() {
    const chatWindow = document.getElementById('floatingChatWindow');
    const generateButton = document.getElementById('generateButton');
    if (!chatWindow || !generateButton) return;
    
    floatingChatOpen = !floatingChatOpen;
    
    if (floatingChatOpen) {
        chatWindow.classList.remove('hidden');
        generateButton.classList.add('hidden');
        updateSelectedItemsDisplay();
    } else {
        chatWindow.classList.add('hidden');
        generateButton.classList.remove('hidden');
        resetFloatingChat();
    }
}
function ensureMessageContainer() {
    if (!messageContainer) {
        messageContainer = createMessageContainer();
    }
    return messageContainer;
}

// Update the reset function to also hide the selection button
// Updated resetFloatingChat function
function resetFloatingChat() {
    floatingSelectedStylist = null;
    floatingChatHistory = [];

    // Clear selection state and reset all buttons
    const buttons = document.querySelectorAll('.select-item-btn');
    buttons.forEach(btn => {
        const tokenName = btn.getAttribute('data-token');
        if (selectedItems.has(tokenName)) {
            // Reset button appearance
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            `;
            btn.classList.remove('bg-black', 'text-white', 'selected');
        }
    });

    // Clear selectedItems Map
    selectedItems.clear();
    
    // Update UI
    updateSelectedItemsDisplay();
    //updateSelectionButton();
    
    // Reset chat UI elements
    document.getElementById('stylistSelection').classList.remove('hidden');
    document.getElementById('floatingChatContainer').classList.add('hidden');
    document.getElementById('selectedStylistInfo').classList.add('hidden');
    document.getElementById('stylistSelectionTitle').classList.remove('hidden');
    
    // Hide selected items container
    const container = document.getElementById('selectedItemsContainer');
    if (container) {
        container.classList.add('hidden');
    }
}

// Select stylist in floating chat
function selectFloatingStylist(stylistId) {
    const stylist = stylists.find(s => s.id === stylistId);
    floatingSelectedStylist = stylist;
    
    // Update UI
    document.getElementById('selectedStylistImage').src = stylist.image;
    document.getElementById('selectedStylistName').textContent = stylist.name;
    document.getElementById('floatingTypingStyleImage').src = stylist.image;
    
    document.getElementById('stylistSelection').classList.add('hidden');
    document.getElementById('floatingChatContainer').classList.remove('hidden');
    document.getElementById('selectedStylistInfo').classList.remove('hidden');
    document.getElementById('stylistSelectionTitle').classList.add('hidden');
    
    // Add welcome message
    floatingChatHistory.push({
        type: 'assistant',
        text: `Hello! I'm ${stylist.name}. How can I help you with your style today?`
    });
    updateFloatingChatView();
}
async function handleFloatingChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('floatingChatInput');
    const message = input.value.trim();
    
    if (message === '' || !floatingSelectedStylist) return;

    // Get selected items
    const items = Array.from(selectedItems.values());

    // Add user message with selected items' images
    floatingChatHistory.push({ 
        type: 'user', 
        text: message,
        images: items.map(item => ({
            image_url: item.imageUrl,
            caption: item.caption
        }))
    });
    updateFloatingChatView();
    input.value = '';

    // Show typing indicator
    document.getElementById('floatingTypingIndicator').classList.remove('hidden');

    try {
        // Create JSON request body
        const requestBody = {
            input_text: message,
            email: localStorage.getItem('wardrobeEmail'),
            password: localStorage.getItem('wardrobePassword'),
            stylist: floatingSelectedStylist.id
        };

        // Get all selected items
        const items = Array.from(selectedItems.values());
        
        if (items.length > 0) {
            // If there's only one item selected
            if (items.length === 1) {
                requestBody.unique_id = items[0].uniqueId;
                requestBody.token_name = items[0].tokenName;
                console.log("Sending single item:", { 
                    uniqueId: items[0].uniqueId, 
                    tokenName: items[0].tokenName 
                });
            } 
            // If there are multiple items selected
            else if (items.length === 2) {
                requestBody.unique_id = items[0].uniqueId;
                requestBody.token_name = items[0].tokenName;
                // Add the second item with a "2" suffix
                requestBody.unique_id2 = items[1].uniqueId;
                requestBody.token_name2 = items[1].tokenName;
                console.log("Sending multiple items:", { 
                    item1: { uniqueId: items[0].uniqueId, tokenName: items[0].tokenName },
                    item2: { uniqueId: items[1].uniqueId, tokenName: items[1].tokenName }
                });
            }
        } else {
            // If no items selected, use general chat
            requestBody.unique_id = 'general_chat';
            requestBody.token_name = 'general_chat';
            console.log("Sending general chat");
        }

        // Send request to backend
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Received chat response:", data);
        
        // Hide typing indicator
        document.getElementById('floatingTypingIndicator').classList.add('hidden');

        if (data.error) {
            throw new Error(data.error);
        }

        // Prepare images array combining selected items and response images
        const selectedItemImages = items.map(item => ({
            image_url: item.imageUrl,
            caption: item.caption || ''
        }));

        const responseImages = data.images || [];
        const uniqueSelectedImages = selectedItemImages.filter(selectedImg => 
            !responseImages.some(responseImg => responseImg.image_url === selectedImg.image_url)
        );                
        // Add assistant message with all images
        floatingChatHistory.push({
            type: 'assistant',
            text: data.reply,
            images: [...uniqueSelectedImages, ...responseImages]
        });
        
        updateFloatingChatView();

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('floatingTypingIndicator').classList.add('hidden');
        
        floatingChatHistory.push({
            type: 'assistant',
            text: "I apologize, but I encountered an error. Please try again.",
            images: []
        });
        updateFloatingChatView();
        
        showMessage("Failed to send message", "error");
    }
}

// Update updateFloatingChatView function to properly display images
function updateFloatingChatView() {
    const chatContainer = document.getElementById('floatingMessageContainer');
    chatContainer.innerHTML = '';

    floatingChatHistory.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start gap-2 mb-4 ${message.type === 'user' ? 'justify-end' : ''}`;
        
        if (message.type === 'assistant') {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'flex-shrink-0';
            const avatar = document.createElement('img');
            avatar.src = floatingSelectedStylist.image;
            avatar.className = 'w-8 h-8 rounded-full object-cover';
            avatarDiv.appendChild(avatar);
            messageDiv.appendChild(avatarDiv);
        }

        const messageBubble = document.createElement('div');
        messageBubble.className = `message-bubble ${message.type === 'user' ? 'user-message' : 'assistant-message'}`;
        
        // Add text content
        const textDiv = document.createElement('div');
        textDiv.textContent = message.text;
        messageBubble.appendChild(textDiv);

        // Add images if present
        if (message.images && message.images.length > 0) {
            console.log("Processing images:", message.images); // Debug log
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'mt-2 flex flex-wrap gap-2';
            
            message.images.forEach(image => {
                if (!image || !image.image_url) {
                    console.warn("Invalid image data:", image);
                    return;
                }

                const imgWrapper = document.createElement('div');
                imgWrapper.className = 'relative flex-shrink-0 w-32';
                
                const imgElement = document.createElement('img');
                imgElement.src = image.image_url;
                imgElement.alt = image.caption || 'Chat image';
                imgElement.className = 'w-full h-32 rounded-lg object-cover shadow-sm cursor-pointer hover:opacity-90 transition-opacity';
                
                // Add click handler to view full size
                imgElement.onclick = () => {
                    window.open(image.image_url, '_blank');
                };
                
                imgWrapper.appendChild(imgElement);
                imageContainer.appendChild(imgWrapper);
            });
            
            if (imageContainer.children.length > 0) {
                messageBubble.appendChild(imageContainer);
            }
        }

        messageDiv.appendChild(messageBubble);
        chatContainer.appendChild(messageDiv);
    });

    // Smooth scroll to bottom
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
}

// Initialize floating chat when page loads
document.addEventListener('DOMContentLoaded', initializeFloatingChat);

// Add event listener for Enter key in floating chat
document.getElementById('floatingChatInput')?.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleFloatingChatSubmit(event);
    }
});

function openFloatingChatWithSelection() {
    if (selectedItems.size === 0) {
        showMessage('Please select at least one item to discuss', 'warning');
        return;
    }
    
    toggleFloatingChat();
    
    // Show selected items in chat
    const container = document.getElementById('selectedItemsContainer');
    container.classList.remove('hidden');
    
    updateSelectedItemsDisplay();
}