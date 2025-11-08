// Main application controller
class BioRelmApp {
    constructor() {
        this.animals = [];
        this.filteredAnimals = [];
        this.currentPage = 1;
        this.animalsPerPage = 9;
        this.isSoundOn = false;
        this.audioContext = null;
        this.backgroundMusic = null;
         this.currentAnimalAudio = null;
        
        this.init();
    }

    async init() {
        await this.loadAnimals();
        this.setupEventListeners();
        this.setupAudio();
        this.setupHologramTabs();
        
        // Show initial animals
        this.displayAnimals();
        
        console.log('BioRelm App initialized successfully!');
    }

   async loadAnimals() {
    try {
        // Try to fetch from data/animals.json file
        const response = await fetch('data/animals.json');
        if (response.ok) {
            const data = await response.json();
            this.animals = data.animals || [];
            this.filteredAnimals = [...this.animals];
            console.log(`✅ Loaded ${this.animals.length} animals from data/animals.json`);
        } else {
            throw new Error('Failed to load animals.json');
        }
    } catch (error) {
        console.error('❌ Error loading animals from JSON file:', error);
        
        // Fallback 1: Check if data is embedded in HTML
        if (window.animalData && window.animalData.length > 0) {
            this.animals = window.animalData;
            this.filteredAnimals = [...this.animals];
            console.log(`📁 Loaded ${this.animals.length} animals from embedded data`);
        } else {
            // Fallback 2: Use minimal fallback data
            console.warn('⚠️ No animal data found, using fallback data');
            this.loadFallbackData();
        }
    }
}

    loadFallbackData() {
        // Fallback data in case embedded data fails
        this.animals = [
            {
                id: 1,
                name: "Bengal Tiger",
                scientificName: "Panthera tigris tigris",
                image: "assets/images/animals/tiger.jpg",
                habitat: "jungle",
                diet: "carnivore",
                status: "endangered",
                location: "Indian Subcontinent",
                size: "2.7-3.1 meters, 180-258 kg",
                description: "The Bengal tiger is a majestic big cat known for its striking orange coat with black stripes.",
                facts: ["Largest tiger species", "Can swim up to 6 km", "Stripes help camouflage"],
                conservationInfo: "Habitat loss and poaching threats.",
                dietInfo: "Hunts deer and wild boar.",
                behavior: "Solitary hunters, primarily nocturnal."
            }
        ];
        this.filteredAnimals = [...this.animals];
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('exploreBtn').addEventListener('click', () => {
            this.scrollToSection('animals');
        });

        document.getElementById('safariBtn').addEventListener('click', () => {
            this.scrollToSection('safari');
        });

        // Sound toggle
        document.getElementById('soundToggle').addEventListener('click', () => {
            this.toggleSound();
        });

        // Mobile menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Animal filters
        document.getElementById('habitatFilter').addEventListener('change', () => {
            this.filterAnimals();
        });

        document.getElementById('dietFilter').addEventListener('change', () => {
            this.filterAnimals();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.filterAnimals();
        });

        document.getElementById('animalSearch').addEventListener('input', () => {
            this.filterAnimals();
        });

        // Load more animals
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMoreAnimals();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Modal close events
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupAudio() {
        this.backgroundMusic = document.getElementById('backgroundMusic');
        
        // Initialize Web Audio API for better control
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }

        // Auto-play background music (with user interaction)
        document.addEventListener('click', () => {
            if (this.isSoundOn && this.backgroundMusic.paused) {
                this.playBackgroundMusic().catch(console.error);
            }
        }, { once: true });
    }

    toggleSound() {
        this.isSoundOn = !this.isSoundOn;
        const soundToggle = document.getElementById('soundToggle');
        const icon = soundToggle.querySelector('i');

        if (this.isSoundOn) {
            icon.className = 'fas fa-volume-up';
            this.playBackgroundMusic();
        } else {
            icon.className = 'fas fa-volume-mute';
            this.pauseBackgroundMusic();
        }

        soundToggle.classList.toggle('active', this.isSoundOn);
    }

    async playBackgroundMusic() {
        if (!this.backgroundMusic) return;

        try {
            this.backgroundMusic.volume = 0.3;
            await this.backgroundMusic.play();
        } catch (error) {
            console.log('Audio play failed:', error);
            // Auto-play might be blocked, we'll try again on user interaction
        }
    }

    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.getElementById('menuToggle');
        const icon = menuToggle.querySelector('i');

        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }

    filterAnimals() {
        const habitatFilter = document.getElementById('habitatFilter').value;
        const dietFilter = document.getElementById('dietFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const searchTerm = document.getElementById('animalSearch').value.toLowerCase();

        this.filteredAnimals = this.animals.filter(animal => {
            const matchesHabitat = habitatFilter === 'all' || animal.habitat === habitatFilter;
            const matchesDiet = dietFilter === 'all' || animal.diet === dietFilter;
            const matchesStatus = statusFilter === 'all' || animal.status === statusFilter;
            const matchesSearch = animal.name.toLowerCase().includes(searchTerm) ||
                                animal.scientificName.toLowerCase().includes(searchTerm) ||
                                animal.description.toLowerCase().includes(searchTerm);

            return matchesHabitat && matchesDiet && matchesStatus && matchesSearch;
        });

        this.currentPage = 1;
        this.displayAnimals();
    }

    displayAnimals() {
        const animalsGrid = document.getElementById('animalsGrid');
        const startIndex = 0;
        const endIndex = this.currentPage * this.animalsPerPage;
        const animalsToShow = this.filteredAnimals.slice(startIndex, endIndex);

        if (animalsToShow.length === 0) {
            animalsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--accent-yellow); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--accent-yellow); margin-bottom: 1rem;">No animals found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            this.toggleLoadMoreButton(false);
            return;
        }

        animalsGrid.innerHTML = animalsToShow.map(animal => this.generateAnimalCard(animal)).join('');

        // Add click event listeners to animal cards
        document.querySelectorAll('.animal-card').forEach(card => {
            card.addEventListener('click', () => {
                const animalId = card.getAttribute('data-animal-id');
                this.showAnimalDetails(animalId);
            });
        });

        // Show/hide load more button
        this.toggleLoadMoreButton(endIndex < this.filteredAnimals.length);
    }

    generateAnimalCard(animal) {
        const statusClass = `status-${animal.status.replace(' ', '-')}`;
        
        return `
            <div class="animal-card" data-animal-id="${animal.id}">
                <div class="animal-status ${statusClass}">
                    ${animal.status}
                </div>
                <img src="${animal.image}" alt="${animal.name}" class="animal-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEnICsgJzE0ZDNkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij4nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFuaW1hbC5uYW1lKSArICc8L3RleHQ+PC9zdmc+'">
                <h3>${animal.name}</h3>
                <p class="scientific-name" style="font-style: italic; opacity: 0.8; margin-bottom: 0.5rem;">${animal.scientificName}</p>
                <div class="animal-meta">
                    <span class="meta-item">
                        <i class="fas fa-home"></i> ${animal.habitat}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-utensils"></i> ${animal.diet}
                    </span>
                </div>
                <p class="animal-fact">${animal.facts[0]}</p>
            </div>
        `;
    }

    toggleLoadMoreButton(show) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = show ? 'inline-flex' : 'none';
        }
    }

    loadMoreAnimals() {
        this.currentPage++;
        this.displayAnimals();
        
        // Smooth scroll to newly loaded animals
        setTimeout(() => {
            const animalsSection = document.getElementById('animals');
            if (animalsSection) {
                animalsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 100);
    }

    showAnimalDetails(animalId) {
        const animal = this.getAnimalById(animalId);
        if (!animal) {
            console.error('Animal not found:', animalId);
            return;
        }
          this.stopAnimalAudio();

        // Play animal sound if available and sound is enabled
        if (this.isSoundOn && animal.audio) {
            this.playAnimalSound(animal.audio);
        }

        // Use the animalDetailsManager if available, otherwise use built-in method
        if (window.animalDetailsManager && typeof window.animalDetailsManager.showAnimalDetails === 'function') {
            window.animalDetailsManager.showAnimalDetails(animalId);
        } else {
            this.showAnimalModal(animal);
        }
    }
    playAnimalSound(audioPath) {
        try {
            // Stop any existing animal audio
            this.stopAnimalAudio();
            
            // Create and play new audio
            this.currentAnimalAudio = new Audio(audioPath);
            this.currentAnimalAudio.volume = 0.6; // Slightly louder than background
            this.currentAnimalAudio.play().catch(error => {
                console.log('Animal audio play failed:', error);
            });
            
            // Auto-stop after 5 seconds to prevent long sounds
            setTimeout(() => {
                this.stopAnimalAudio();
            }, 5000);
            
        } catch (error) {
            console.error('Error playing animal sound:', error);
        }
    }

    stopAnimalAudio() {
        if (this.currentAnimalAudio) {
            this.currentAnimalAudio.pause();
            this.currentAnimalAudio.currentTime = 0;
            this.currentAnimalAudio = null;
        }
    }

    toggleSound() {
        this.isSoundOn = !this.isSoundOn;
        const soundToggle = document.getElementById('soundToggle');
        const icon = soundToggle.querySelector('i');

        if (this.isSoundOn) {
            icon.className = 'fas fa-volume-up';
            this.playBackgroundMusic();
        } else {
            icon.className = 'fas fa-volume-mute';
            this.pauseBackgroundMusic();
            this.stopAnimalAudio(); // Stop animal sounds when sound is turned off
        }

        soundToggle.classList.toggle('active', this.isSoundOn);
    }

    // Update the hologram HTML to include audio controls
    generateAnimalDetailHTML(animal) {
        const statusClass = `status-${animal.status.replace(' ', '-')}`;
        
        return `
            <div class="animal-hologram-container">
                <!-- Add audio controls to hologram header -->
                <div class="hologram-audio-controls">
                    ${animal.audio ? `
                    <button class="audio-play-btn" onclick="window.bioRelmApp.playAnimalSound('${animal.audio}')">
                        <i class="fas fa-play"></i> Play ${animal.name} Sound
                    </button>
                    ` : `
                    <div class="no-audio-message">
                        <i class="fas fa-volume-mute"></i> Sound not available
                    </div>
                    `}
                </div>

                <!-- Rest of your hologram HTML remains the same -->
                <div class="hologram-display">
                    <div class="hologram-platform"></div>
                    <div class="hologram-effect">
                        <div class="hologram-scan-lines"></div>
                        <div class="hologram-glare"></div>
                        <img src="${animal.image}" alt="${animal.name}" class="hologram-animal-image"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEnICsgJzE0ZDNkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij4nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFuaW1hbC5uYW1lKSArICc8L3RleHQ+PC9zdmc+'">
                    </div>
                    <div class="hologram-data-stream">
                        <div class="data-particle"></div>
                        <div class="data-particle"></div>
                        <div class="data-particle"></div>
                    </div>
                </div>

                <!-- Rest of your existing hologram HTML... -->
                <!-- ... [keep all your existing hologram HTML code] ... -->
            </div>
        `;
    }

    // Also update the closeModals method to stop audio
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
        this.stopAnimalAudio(); // Stop audio when modal closes
    }


    showAnimalModal(animal) {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = this.generateAnimalDetailHTML(animal);
        
        const modal = document.getElementById('animalModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

   generateAnimalDetailHTML(animal) {
    const statusClass = `status-${animal.status.replace(' ', '-')}`;
    
    return `
        <div class="animal-hologram-container">
            <!-- Holographic Animal Display -->
            <div class="hologram-display">
                <div class="hologram-platform"></div>
                <div class="hologram-effect">
                    <div class="hologram-scan-lines"></div>
                    <div class="hologram-glare"></div>
                    <img src="${animal.image}" alt="${animal.name}" class="hologram-animal-image"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEnICsgJzE0ZDNkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij4nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFuaW1hbC5uYW1lKSArICc8L3RleHQ+PC9zdmc+'">
                </div>
                <div class="hologram-data-stream">
                    <div class="data-particle"></div>
                    <div class="data-particle"></div>
                    <div class="data-particle"></div>
                </div>
            </div>

            <!-- Animal Information Panel -->
            <div class="hologram-info-panel">
                <div class="animal-header">
                    <h3 class="hologram-title">${animal.name}</h3>
                    <p class="scientific-name hologram-subtitle">${animal.scientificName}</p>
                    <div class="status-badge ${statusClass} hologram-status">
                        ${animal.status.toUpperCase()}
                    </div>
                </div>
                
                <!-- Quick Stats -->
                <div class="hologram-stats">
                    <div class="stat-card">
                        <i class="fas fa-home"></i>
                        <span class="label">Habitat</span>
                        <span class="value">${animal.habitat}</span>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-utensils"></i>
                        <span class="label">Diet</span>
                        <span class="value">${animal.diet}</span>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-globe-americas"></i>
                        <span class="label">Location</span>
                        <span class="value">${animal.location}</span>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-ruler-combined"></i>
                        <span class="label">Size</span>
                        <span class="value">${animal.size}</span>
                    </div>
                </div>

                <!-- Information Tabs -->
                <div class="hologram-tabs">
                    <button class="tab-button active" data-tab="description">Description</button>
                    <button class="tab-button" data-tab="facts">Amazing Facts</button>
                    <button class="tab-button" data-tab="behavior">Behavior</button>
                    <button class="tab-button" data-tab="conservation">Conservation</button>
                </div>

                <div class="tab-content">
                    <!-- Description Tab -->
                    <div class="tab-pane active" id="description">
                        <h4><i class="fas fa-file-alt"></i> About the ${animal.name}</h4>
                        <p>${animal.description}</p>
                        ${animal.dietInfo ? `
                        <div class="info-section">
                            <h5><i class="fas fa-utensils"></i> Diet & Feeding</h5>
                            <p>${animal.dietInfo}</p>
                        </div>
                        ` : ''}
                    </div>

                    <!-- Facts Tab -->
                    <div class="tab-pane" id="facts">
                        <h4><i class="fas fa-star"></i> Amazing Facts</h4>
                        <div class="facts-grid">
                            ${animal.facts.map(fact => `
                                <div class="fact-card">
                                    <div class="fact-icon">✨</div>
                                    <p>${fact}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Behavior Tab -->
                    <div class="tab-pane" id="behavior">
                        <h4><i class="fas fa-brain"></i> Behavior & Social Structure</h4>
                        ${animal.behavior ? `
                            <p>${animal.behavior}</p>
                        ` : `
                            <div class="no-data">
                                <i class="fas fa-microscope"></i>
                                <p>Behavioral data currently being analyzed...</p>
                            </div>
                        `}
                    </div>

                    <!-- Conservation Tab -->
                    <div class="tab-pane" id="conservation">
                        <h4><i class="fas fa-shield-alt"></i> Conservation Status</h4>
                        <div class="conservation-alert ${statusClass}">
                            <div class="alert-header">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>STATUS: ${animal.status.toUpperCase()}</span>
                            </div>
                            <p>${animal.conservationInfo}</p>
                        </div>
                        <div class="conservation-tips">
                            <h5><i class="fas fa-hands-helping"></i> How You Can Help</h5>
                            <ul>
                                <li>Support wildlife conservation organizations</li>
                                <li>Choose sustainable products</li>
                                <li>Spread awareness about ${animal.name} conservation</li>
                                <li>Reduce your environmental footprint</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Holographic UI Elements -->
            <div class="hologram-ui">
                <div class="ui-element scan-line"></div>
                <div class="ui-element grid-overlay"></div>
                <div class="ui-element corner-tl"></div>
                <div class="ui-element corner-tr"></div>
                <div class="ui-element corner-bl"></div>
                <div class="ui-element corner-br"></div>
            </div>
        </div>
    `;
}
// Add tab switching functionality
setupHologramTabs() {
    // Use event delegation for dynamically created content
    document.addEventListener('click', (e) => {
        const tabButton = e.target.closest('.tab-button');
        if (tabButton) {
            e.preventDefault();
            const tabId = tabButton.getAttribute('data-tab');
            
            console.log('Tab clicked:', tabId); // Debug log
            
            // Get the modal content container
            const modalContent = document.getElementById('modalContent');
            if (!modalContent) {
                console.log('Modal content not found');
                return;
            }
            
            // Remove active class from all buttons and panes within the modal
            modalContent.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            modalContent.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding pane
            tabButton.classList.add('active');
            const targetPane = modalContent.querySelector(`#${tabId}`);
            if (targetPane) {
                targetPane.classList.add('active');
                console.log('Tab activated:', tabId);
            } else {
                console.log('Tab pane not found:', tabId);
            }
        }
    });
}
showAnimalModal(animal) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = this.generateAnimalDetailHTML(animal);
    
    const modal = document.getElementById('animalModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Force activate the first tab
    setTimeout(() => {
        const firstTab = modalContent.querySelector('.tab-button');
        const firstPane = modalContent.querySelector('.tab-pane');
        if (firstTab && firstPane) {
            modalContent.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            modalContent.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            firstTab.classList.add('active');
            firstPane.classList.add('active');
        }
    }, 100);
}
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.querySelector('.jungle-nav').offsetHeight;
            const targetPosition = section.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.getElementById('menuToggle');
        const icon = menuToggle.querySelector('i');

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            icon.className = 'fas fa-bars';
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // Utility method to get animal by ID
    getAnimalById(id) {
        return this.animals.find(animal => animal.id == id);
    }

    // Utility method to get animals by habitat
    getAnimalsByHabitat(habitat) {
        return this.animals.filter(animal => animal.habitat === habitat);
    }

    // Utility method to get animals by diet
    getAnimalsByDiet(diet) {
        return this.animals.filter(animal => animal.diet === diet);
    }
}


// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        console.log('GSAP loaded successfully');
    } else {
        console.warn('GSAP not loaded - animations may not work');
    }

    // Check if Pannellum is available
    if (typeof pannellum !== 'undefined') {
        console.log('Pannellum loaded successfully');
    } else {
        console.warn('Pannellum not loaded - virtual safari may not work');
    }

    // Initialize the main application
    window.bioRelmApp = new BioRelmApp();
});

// Global error handler for better debugging
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BioRelmApp };
}