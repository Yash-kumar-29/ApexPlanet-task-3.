// Sample data for posts
const samplePosts = [
    {
        id: 1,
        title: "The Future of Web Development",
        excerpt: "Explore the latest trends in web development including AI integration, progressive web apps, and modern frameworks that are shaping the future of the internet.",
        content: "Web development is evolving rapidly with new technologies emerging every day. From AI-powered tools to progressive web applications, developers need to stay updated with the latest trends.",
        category: "technology",
        author: "John Smith",
        date: "2024-01-15",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Healthy Living in the Digital Age",
        excerpt: "Discover how to maintain a healthy lifestyle while navigating the challenges of our increasingly digital world and busy schedules.",
        content: "In today's fast-paced digital world, maintaining a healthy lifestyle can be challenging. This post explores practical tips for staying healthy while managing technology use.",
        category: "lifestyle",
        author: "Sarah Johnson",
        date: "2024-01-12",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "Exploring Hidden Gems in Europe",
        excerpt: "Take a journey through some of Europe's most beautiful and lesser-known destinations that offer authentic cultural experiences.",
        content: "Europe is full of amazing destinations beyond the typical tourist spots. This guide takes you through hidden gems that offer authentic cultural experiences.",
        category: "travel",
        author: "Mike Wilson",
        date: "2024-01-10",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        title: "The Art of Home Cooking",
        excerpt: "Learn essential cooking techniques and discover delicious recipes that will transform your home kitchen into a culinary haven.",
        content: "Cooking at home can be both therapeutic and delicious. This post shares essential techniques and recipes to elevate your home cooking experience.",
        category: "food",
        author: "Emma Davis",
        date: "2024-01-08",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        title: "Machine Learning for Beginners",
        excerpt: "A comprehensive guide to getting started with machine learning, covering the basics and practical applications for newcomers.",
        content: "Machine learning can seem intimidating, but it's accessible to everyone. This beginner's guide covers the fundamentals and practical applications.",
        category: "technology",
        author: "Alex Chen",
        date: "2024-01-05",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        title: "Mindfulness and Mental Health",
        excerpt: "Discover the benefits of mindfulness practices and how they can improve your mental health and overall well-being.",
        content: "Mindfulness practices have been shown to significantly improve mental health. This post explores various techniques and their benefits.",
        category: "lifestyle",
        author: "Lisa Brown",
        date: "2024-01-03",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        title: "Adventure Travel in South America",
        excerpt: "Experience the thrill of adventure travel through South America's most exciting destinations and activities.",
        content: "South America offers incredible opportunities for adventure travel. From hiking to water sports, there's something for every thrill-seeker.",
        category: "travel",
        author: "Carlos Rodriguez",
        date: "2024-01-01",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        title: "Sustainable Eating Habits",
        excerpt: "Learn how to adopt sustainable eating habits that benefit both your health and the environment.",
        content: "Sustainable eating is not just good for the environment, it's also beneficial for your health. This guide shows you how to make better food choices.",
        category: "food",
        author: "Maria Garcia",
        date: "2023-12-28",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        title: "Cybersecurity Best Practices",
        excerpt: "Essential cybersecurity practices to protect your digital life in an increasingly connected world.",
        content: "With the rise of digital threats, cybersecurity has become more important than ever. This post covers essential practices to protect yourself online.",
        category: "technology",
        author: "David Kim",
        date: "2023-12-25",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        title: "Digital Detox Strategies",
        excerpt: "Effective strategies for taking a break from technology and reconnecting with the real world.",
        content: "Taking regular breaks from technology is essential for mental health. This post provides practical strategies for digital detox.",
        category: "lifestyle",
        author: "Rachel Green",
        date: "2023-12-22",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    }
];

// Global variables
let currentPosts = [...samplePosts];
let filteredPosts = [...samplePosts];
let currentPage = 1;
let postsPerPage = 6;
let currentView = 'grid';

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const categorySelect = document.getElementById('categorySelect');
const postsContainer = document.getElementById('postsContainer');
const resultsCount = document.getElementById('resultsCount');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumbers = document.getElementById('pageNumbers');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    displayPosts();
    updatePagination();
    updateResultsCount();
}

function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter and sort
    sortSelect.addEventListener('change', applyFilters);
    categorySelect.addEventListener('change', applyFilters);

    // View switching
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));

    // Pagination
    prevPageBtn.addEventListener('click', () => changePage(currentPage - 1));
    nextPageBtn.addEventListener('click', () => changePage(currentPage + 1));
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredPosts = [...currentPosts];
    } else {
        filteredPosts = currentPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    applyFilters();
}

function applyFilters() {
    let filtered = [...filteredPosts];
    
    // Apply category filter
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
        filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Apply sorting
    const sortBy = sortSelect.value;
    switch (sortBy) {
        case 'newest':
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'title':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    filteredPosts = filtered;
    currentPage = 1;
    displayPosts();
    updatePagination();
    updateResultsCount();
}

function displayPosts() {
    showLoading(true);
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        
        if (postsToShow.length === 0) {
            showNoResults();
        } else {
            hideNoResults();
            renderPosts(postsToShow);
        }
        
        showLoading(false);
    }, 500);
}

function renderPosts(posts) {
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = `post-card ${currentView === 'list' ? 'list-view' : ''}`;
    
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    postDiv.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
        <div class="post-content">
            <span class="post-category">${post.category}</span>
            <h2 class="post-title">${post.title}</h2>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-meta">
                <span class="post-date">
                    <i class="fas fa-calendar"></i>
                    ${formattedDate}
                </span>
                <span class="post-author">
                    <i class="fas fa-user"></i>
                    ${post.author}
                </span>
            </div>
        </div>
    `;
    
    // Add click event for post details
    postDiv.addEventListener('click', () => {
        showPostDetails(post);
    });
    
    return postDiv;
}

function showPostDetails(post) {
    // Create modal for post details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${post.image}" alt="${post.title}" class="modal-image">
            <div class="modal-body">
                <span class="post-category">${post.category}</span>
                <h1>${post.title}</h1>
                <div class="modal-meta">
                    <span><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}</span>
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                </div>
                <p>${post.content}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .modal-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 15px 15px 0 0;
        }
        .modal-body {
            padding: 30px;
        }
        .modal-body h1 {
            margin: 20px 0;
            color: #333;
        }
        .modal-meta {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            color: #666;
        }
        .modal-body p {
            line-height: 1.8;
            color: #555;
        }
    `;
    document.head.appendChild(style);
}

function switchView(view) {
    currentView = view;
    
    // Update button states
    gridViewBtn.classList.toggle('active', view === 'grid');
    listViewBtn.classList.toggle('active', view === 'list');
    
    // Update container class
    postsContainer.classList.toggle('list-view', view === 'list');
    
    // Re-render posts with new view
    displayPosts();
}

function changePage(page) {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayPosts();
        updatePagination();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    // Update previous/next buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    
    // Generate page numbers
    pageNumbers.innerHTML = '';
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => changePage(i));
        pageNumbers.appendChild(pageBtn);
    }
}

function updateResultsCount() {
    const totalPosts = filteredPosts.length;
    const startIndex = (currentPage - 1) * postsPerPage + 1;
    const endIndex = Math.min(currentPage * postsPerPage, totalPosts);
    
    if (totalPosts === 0) {
        resultsCount.textContent = 'No posts found';
    } else if (totalPosts <= postsPerPage) {
        resultsCount.textContent = `Showing ${totalPosts} post${totalPosts !== 1 ? 's' : ''}`;
    } else {
        resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${totalPosts} posts`;
    }
}

function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
        postsContainer.style.display = 'none';
    } else {
        loadingSpinner.classList.add('hidden');
        postsContainer.style.display = 'grid';
    }
}

function showNoResults() {
    noResults.classList.remove('hidden');
    postsContainer.style.display = 'none';
}

function hideNoResults() {
    noResults.classList.add('hidden');
    postsContainer.style.display = 'grid';
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
    }
});

// Add intersection observer for lazy loading images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

// Initialize lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}); 