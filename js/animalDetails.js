// Animal Details Manager with Hologram Feature
class AnimalDetailsManager {
    constructor() {
        this.currentAnimal = null;
        this.currentAnimalSound = null;
        this.hologramActive = false;
        this.hologramRotation = 0;
        this.hologramScale = 1;
        this.hologramScene = null;
        this.hologramRenderer = null;
        this.hologramCamera = null;
        this.hologramModel = null;
        this.animationFrameId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('Animal Details Manager initialized with Hologram feature');
    }
    initAnimalMap(animal) {
        const mapId = `animalMap-${animal.id}`;
        const mapContainer = document.getElementById(mapId);
        
        if (!mapContainer) {
            console.error('Map container not found:', mapId);
            return;
        }
        
        // Initialize map
        const map = L.map(mapId).setView([20, 0], 2);
        
        // Add dark theme tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '©OpenStreetMap, ©CartoDB',
            maxZoom: 8,
            minZoom: 1
        }).addTo(map);
        
        // Define habitat regions based on animal location
        const regions = this.getAnimalRegions(animal);
        
        // Add markers for each region
        regions.forEach(region => {
            const marker = L.marker(region.coords)
                .addTo(map)
                .bindPopup(`
                    <div style="color: #000; padding: 0.5rem;">
                        <strong>${animal.name} Habitat</strong><br>
                        <i class="fas fa-map-marker-alt"></i> ${region.name}
                    </div>
                `);
            
            // Add habitat area overlay (simplified)
            if (region.area) {
    const regionColors = {
        'arctic': '#4FC3F7',      // Ice blue
        'africa': '#FF9800',      // Safari orange
        'asia': '#4CAF50',        // Forest green
        'south america': '#9C27B0', // Purple
        'north america': '#2196F3', // Blue
        'europe': '#FF5722',      // Red-orange
        'australia': '#E91E63',   // Pink
        'antarctica': '#00BCD4'   // Cyan
    };
    
    const regionColor = regionColors[region.name.toLowerCase()] || '#FFCC00';
    
    L.polygon(region.area, {
        color: regionColor,
        fillColor: regionColor,
        fillOpacity: 0.1,
        weight: 2,
        opacity: 0.7
    }).addTo(map);
}
        });
        
        // Fit map to show all regions
        if (regions.length > 0) {
            const group = new L.featureGroup(regions.map(r => L.marker(r.coords)));
            map.fitBounds(group.getBounds().pad(0.1));
        }
        
        // Add legend
        this.addMapLegend(map, animal);
        
        return map;
    }
    addMultiRegionLegend(map, animal, regions, colors) {
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-legend multi-region-legend');
        let html = `<div style="background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px; border: 1px solid #FFCC00;">
            <strong>${animal.name} Habitats</strong><br>`;
        
        regions.forEach((region, index) => {
            const color = colors[index % colors.length];
            html += `<div style="margin: 5px 0; display: flex; align-items: center;">
                <div style="width: 15px; height: 15px; background: ${color}; margin-right: 8px; border-radius: 3px;"></div>
                ${region.name}
            </div>`;
        });
        
        html += `</div>`;
        div.innerHTML = html;
        return div;
    };
    
    legend.addTo(map);
}
        getAnimalRegions(animal) {
            console.log('🦓 Processing animal:', animal.name, 'ID:', animal.id);
        const regionDatabase = {
            
        '1': ['asia', 'india'], // Bengal Tiger
        '2': ['africa', 'congo basin'], // Mountain Gorilla
        '3': ['africa', 'sub-saharan africa'], // African Elephant
        '4': ['asia', 'china'], // Giant Panda
        '5': ['africa', 'sub-saharan africa'], // African Lion
        '6': ['antarctica'], // Emperor Penguin
        '7': ['south america', 'amazon basin'], // Toco Toucan
        '8': ['south america', 'amazon basin'], // Howler Monkey
        '9': ['africa', 'sub-saharan africa'], // Nile Crocodile
        '10': ['asia', 'himalayan mountains'], // Snow Leopard
        '11': ['asia', 'southeast asia'], // Orangutan (First one)
        '12': ['arctic'], // Arctic Fox
        '13': ['asia', 'himalayan mountains'], // Red Panda
        '14': ['asia', 'southeast asia'], // Komodo Dragon
        '15': ['arctic'], // Polar Bear
        '16': ['global oceans'], // Blue Whale
        '17': ['global oceans'], // Humpback Whale
        '18': ['global oceans'], // Great White Shark
        '19': ['north america'], // Bald Eagle
        '20': ['north america', 'europe', 'asia'], // Gray Wolf
        '21': ['africa', 'sub-saharan africa'], // Giraffe
        '22': ['africa', 'sub-saharan africa'], // Hippopotamus
        '23': ['australia'], // Kangaroo
        '24': ['australia'], // Koala
        '25': ['australia'], // Platypus
        '26': ['africa', 'sub-saharan africa'], // Cheetah
        '27': ['africa', 'asia'], // Leopard
        '28': ['south america', 'central america'], // Jaguar
        '29': ['africa', 'congo basin'], // Gorilla
        '30': ['africa', 'congo basin'], // Chimpanzee
        '31': ['asia', 'southeast asia'], // Orangutan (Second one - ID 31)
        '32': ['africa', 'congo basin'], // Bonobo
        '33': ['asia', 'southeast asia'], // Gibbon
        '34': ['africa', 'asia'], // Rhinoceros
        '35': ['africa', 'sub-saharan africa'], // Zebra
        '36': ['north america', 'europe', 'asia'], // Moose
        '37': ['north america'], // Bison
        '38': ['africa', 'sub-saharan africa'], // Ostrich
        '39': ['africa', 'asia', 'south america'], // Flamingo
        '40': ['asia', 'india'], // Peacock
        '41': ['global oceans'], // Octopus
        '42': ['global oceans'], // Sea Turtle
        '43': ['global oceans'], // Pufferfish
        '44': ['global oceans'], // Seahorse
        '45': ['south america', 'central america'], // Sloth
        '46': ['south america', 'central america', 'north america'], // Armadillo
        '47': ['africa', 'sub-saharan africa'], // Meerkat
        '48': ['north america', 'europe', 'asia'], // Wolverine
        '49': ['global oceans'], // Manta Ray
        '50': ['north america'], // Axolotl
        
        // EXTINCT ANIMALS (IDs 51-60)
        '51': ['australia'], // Tasmanian Tiger
        '52': ['arctic', 'north america', 'europe', 'asia'], // Woolly Mammoth
        '53': ['africa'], // Dodo
        '54': ['north america', 'south america'], // Saber-toothed Cat
        '55': ['europe', 'asia'], // Irish Elk
        '56': ['north atlantic'], // Great Auk
        '57': ['africa'], // Quagga
        '58': ['north america'], // Carolina Parakeet
        '59': ['north pacific', 'bering sea'], // Steller's Sea Cow
        '60': ['north america'] // Passenger Pigeon
        };
        
        const regions = [];
        const animalRegions = regionDatabase[animal.id] || [];
        
        const regionCoordinates = {
        'arctic': { coords: [70, -40], name: 'Arctic', area: [[80, -180], [80, 180], [60, 180], [60, -180]] },
    'africa': { coords: [8, 20], name: 'Africa', area: [[37, -25], [37, 55], [-35, 55], [-35, -25]] },
    'asia': { coords: [34, 100], name: 'Asia', area: [[75, 25], [75, 180], [10, 180], [10, 25]] },
    'india': { coords: [22, 79], name: 'India', area: [[37, 68], [37, 97], [6, 97], [6, 68]] },
    'south america': { coords: [-14, -60], name: 'South America', area: [[13, -92], [13, -32], [-56, -32], [-56, -92]] },
    'north america': { coords: [45, -100], name: 'North America', area: [[85, -170], [85, -52], [7, -52], [7, -170]] },
    'central america': { coords: [17, -88], name: 'Central America', area: [[25, -118], [25, -60], [7, -60], [7, -118]] },
    'europe': { coords: [50, 10], name: 'Europe', area: [[71, -25], [71, 60], [35, 60], [35, -25]] },
    'australia': { coords: [-25, 135], name: 'Australia', area: [[-10, 110], [-10, 155], [-45, 155], [-45, 110]] },
    'antarctica': { coords: [-75, 0], name: 'Antarctica', area: [[-60, -180], [-60, 180], [-90, 180], [-90, -180]] },
    'china': { coords: [35, 104], name: 'China', area: [[54, 73], [54, 135], [18, 135], [18, 73]] },
    'global oceans': { coords: [0, -160], name: 'Global Oceans' },
    'north atlantic': { coords: [40, -40], name: 'North Atlantic', area: [[65, -80], [65, 0], [0, 0], [0, -80]] },
    'north pacific': { coords: [30, -160], name: 'North Pacific', area: [[65, 120], [65, -100], [0, -100], [0, 120]] },
    'bering sea': { coords: [60, -175], name: 'Bering Sea', area: [[66, 160], [66, -160], [52, -160], [52, 160]] },
    
    // ADDITIONAL SPECIFIC REGIONS
    'indian subcontinent': { coords: [22, 79], name: 'Indian Subcontinent', area: [[37, 68], [37, 97], [6, 97], [6, 68]] },
    'sub-saharan africa': { coords: [0, 20], name: 'Sub-Saharan Africa', area: [[20, -25], [20, 55], [-35, 55], [-35, -25]] },
    'himalayan mountains': { coords: [30, 85], name: 'Himalayan Mountains', area: [[35, 75], [35, 95], [26, 95], [26, 75]] },
    'congo basin': { coords: [0, 22], name: 'Congo Basin', area: [[10, 10], [10, 34], [-10, 34], [-10, 10]] },
    'amazon basin': { coords: [-5, -60], name: 'Amazon Basin', area: [[5, -80], [5, -50], [-15, -50], [-15, -80]] },
    'southeast asia': { coords: [10, 105], name: 'Southeast Asia', area: [[28, 92], [28, 130], [-10, 130], [-10, 92]] }
        };
        
        animalRegions.forEach(region => {
            if (regionCoordinates[region]) {
                regions.push(regionCoordinates[region]);
            }
        });
        
        return regions;
    }
    
    getAnimalRegions(animal) {
        // Define coordinates for different habitats/regions
       const regionCoordinates = {
    'arctic': { 
        coords: [75, -40], 
        name: 'Arctic', 
        area: [[90, -180], [90, 180], [66.5, 180], [66.5, -180]] 
    },
    'africa': { 
        coords: [8, 21], 
        name: 'Africa', 
        area: [[37, -18], [37, 52], [-35, 52], [-35, -18]] 
    },
    'asia': { 
        coords: [34, 100], 
        name: 'Asia', 
        area: [[75, 25], [75, 180], [10, 180], [10, 25]] 
    },
    'india': { 
        coords: [22, 79], 
        name: 'India', 
        area: [[37, 68], [37, 97], [6, 97], [6, 68]] 
    },
    'south america': { 
        coords: [-14, -55], 
        name: 'South America', 
        area: [[13, -82], [13, -35], [-56, -35], [-56, -82]] 
    },
    'north america': { 
        coords: [45, -100], 
        name: 'North America', 
        area: [[85, -170], [85, -52], [7, -52], [7, -170]] 
    },
    'central america': { 
        coords: [17, -88], 
        name: 'Central America', 
        area: [[25, -118], [25, -60], [7, -60], [7, -118]] 
    },
    'europe': { 
        coords: [50, 15], 
        name: 'Europe', 
        area: [[71, -25], [71, 60], [35, 60], [35, -25]] 
    },
    'australia': { 
        coords: [-25, 135], 
        name: 'Australia', 
        area: [[-10, 112], [-10, 154], [-44, 154], [-44, 112]] 
    },
    'antarctica': { 
        coords: [-75, 0], 
        name: 'Antarctica', 
        area: [[-60, -180], [-60, 180], [-90, 180], [-90, -180]] 
    },
    'china': { 
        coords: [35, 105], 
        name: 'China', 
        area: [[54, 73], [54, 135], [18, 135], [18, 73]] 
    },
    'global oceans': { 
        coords: [0, -160], 
        name: 'Global Oceans' 
    },
    'north atlantic': { 
        coords: [40, -40], 
        name: 'North Atlantic', 
        area: [[65, -75], [65, 0], [0, 0], [0, -75]] 
    },
    'north pacific': { 
        coords: [30, -160], 
        name: 'North Pacific', 
        area: [[65, 120], [65, -100], [0, -100], [0, 120]] 
    },
    'bering sea': { 
        coords: [60, -175], 
        name: 'Bering Sea', 
        area: [[66, 160], [66, -160], [52, -160], [52, 160]] 
    },
    'indian subcontinent': { 
        coords: [22, 79], 
        name: 'Indian Subcontinent', 
        area: [[37, 68], [37, 97], [6, 97], [6, 68]] 
    },
    'sub-saharan africa': { 
        coords: [0, 22], 
        name: 'Sub-Saharan Africa', 
        area: [[20, -18], [20, 52], [-35, 52], [-35, -18]] 
    },
    'himalayan mountains': { 
        coords: [30, 85], 
        name: 'Himalayan Mountains', 
        area: [[35, 75], [35, 95], [26, 95], [26, 75]] 
    },
    'congo basin': { 
        coords: [0, 22], 
        name: 'Congo Basin', 
        area: [[10, 10], [10, 34], [-10, 34], [-10, 10]] 
    },
    'amazon basin': { 
        coords: [-5, -60], 
        name: 'Amazon Basin', 
        area: [[5, -80], [5, -50], [-15, -50], [-15, -80]] 
    },
    'southeast asia': { 
        coords: [10, 105], 
        name: 'Southeast Asia', 
        area: [[28, 92], [28, 130], [-10, 130], [-10, 92]] 
    }
};
        
        // Parse animal location to determine regions
        const location = animal.location.toLowerCase();
        const regions = [];
        
        // Simple region matching - you can make this more sophisticated
        for (const [region, data] of Object.entries(regionCoordinates)) {
            if (location.includes(region) || 
                animal.habitat.toLowerCase().includes(region)) {
                regions.push({
                    name: region.charAt(0).toUpperCase() + region.slice(1),
                    coords: data.coords,
                    area: data.area
                });
            }
        }
        
        // Default fallback
        if (regions.length === 0) {
            regions.push({
                name: 'Global',
                coords: [0, 0],
                area: null
            });
        }
        
        return regions;
    }
    
    addMapLegend(map, animal) {
        const legend = L.control({ position: 'bottomright' });
        
        legend.onAdd = function() {
            const div = L.DomUtil.create('div', 'map-legend');
            div.innerHTML = `
                <div style="font-size: 12px;">
                    <i class="fas fa-paw"></i> <strong>${animal.name}</strong><br>
                    <i class="fas fa-home"></i> ${animal.habitat}<br>
                    <i class="fas fa-map-marker-alt"></i> ${animal.location}
                </div>
            `;
            return div;
        };
        
        legend.addTo(map);
    }
    setupEventListeners() {
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.hologramActive) {
                    this.closeHologram();
                } else {
                    this.closeModal();
                }
            }
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Handle window resize for hologram
        window.addEventListener('resize', () => {
            if (this.hologramActive && this.hologramRenderer && this.hologramCamera) {
                this.hologramCamera.aspect = window.innerWidth / window.innerHeight;
                this.hologramCamera.updateProjectionMatrix();
                this.hologramRenderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
    }

    showAnimalDetails(animalId) {
        let animal;
        
        // Try to get animal from main app first
        if (window.bioRelmApp && typeof window.bioRelmApp.getAnimalById === 'function') {
            animal = window.bioRelmApp.getAnimalById(animalId);
        }
        
        // Fallback: search in embedded data
        if (!animal && window.animalData) {
            animal = window.animalData.find(a => a.id == animalId);
        }

        if (!animal) {
            console.error('Animal not found:', animalId);
            this.showError('Animal information not available.');
            return;
        }

        this.currentAnimal = animal;
        this.displayAnimalModal(animal);
        
        // Auto-play animal sound if available and global sound is enabled
        if (window.bioRelmApp && window.bioRelmApp.isSoundOn && animal.audio) {
            console.log('🔊 Auto-playing animal sound:', animal.audio);
            this.playAnimalSound(animal.audio);
        }
    }

    displayAnimalModal(animal) {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = this.generateAnimalDetailHTML(animal);
        
        const modal = document.getElementById('animalModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            this.initAnimalMap(animal);
        }, 100);

        // Add animation
        this.animateModalEntry();
    }

    generateAnimalDetailHTML(animal) {
        const statusClass = `status-${animal.status.replace(' ', '-')}`;
        const hasHologram = animal.hologram && animal.hologram.available;
        
        return `
            <div class="animal-detail">
                <!-- Hologram Controls -->
                ${hasHologram ? `
                <div class="hologram-controls">
                    <button class="hologram-toggle-btn" onclick="animalDetailsManager.toggleHologram('${animal.id}')">
                        <i class="fas fa-cube"></i> 3D Hologram View
                    </button>
                    <div class="hologram-info">
                        <i class="fas fa-info-circle"></i>
                        <span>Experience ${animal.name} in 3D</span>
                    </div>
                </div>

                <!-- Hologram Container -->
                <div id="hologramContainer" class="hologram-container" style="display: none;">
                    <div class="hologram-viewer" id="hologramViewer">
                        <div class="hologram-loading" id="hologramLoading">
                            <i class="fas fa-spinner fa-spin"></i>
                            <span>Initializing 3D Hologram...</span>
                        </div>
                    </div>
                    <div class="hologram-controls-overlay">
                        <button class="hologram-close-btn" onclick="animalDetailsManager.closeHologram()" title="Close Hologram">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="rotation-controls">
                            <button class="rotate-btn" onclick="animalDetailsManager.rotateHologram('left')" title="Rotate Left">
                                <i class="fas fa-undo"></i>
                            </button>
                            <button class="rotate-btn" onclick="animalDetailsManager.rotateHologram('right')" title="Rotate Right">
                                <i class="fas fa-redo"></i>
                            </button>
                        </div>
                        <div class="zoom-controls">
                            <button class="zoom-btn" onclick="animalDetailsManager.zoomHologram('in')" title="Zoom In">
                                <i class="fas fa-search-plus"></i>
                            </button>
                            <button class="zoom-btn" onclick="animalDetailsManager.zoomHologram('out')" title="Zoom Out">
                                <i class="fas fa-search-minus"></i>
                            </button>
                        </div>
                        <button class="hologram-reset-btn" onclick="animalDetailsManager.resetHologram()" title="Reset View">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                ` : `
                <div class="hologram-unavailable">
                    <i class="fas fa-cube"></i>
                    <span>3D Hologram not available for this animal</span>
                </div>
                `}

                <!-- Audio Controls -->
                <div class="animal-audio-controls">
                    ${animal.audio ? `
                    <button class="audio-play-btn" onclick="animalDetailsManager.playAnimalSound('${animal.audio}')">
                        <i class="fas fa-play"></i> Play ${animal.name} Sound
                    </button>
                    ` : `
                    <div class="no-audio-message">
                        <i class="fas fa-volume-mute"></i> Sound not available
                    </div>
                    `}
                </div>

                <div class="animal-detail-image-container" id="animalImageContainer">
                    <img src="${animal.image}" alt="${animal.name}" class="animal-detail-image"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEnICsgJzE0ZDNkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij4nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFuaW1hbC5uYW1lKSArICc8L3RleHQ+PC9zdmc+'">
                    <div class="image-overlay">
                        <span class="status-badge ${statusClass}" style="position: absolute; top: 1rem; right: 1rem; padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold; font-size: 0.9rem; background: var(--accent-red); color: white;">
                            ${animal.status.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div class="animal-map-section">
                <h4 style="color: var(--accent-yellow); margin-bottom: 1rem;">
                    <i class="fas fa-globe-americas"></i> Habitat Map
                </h4>
                <div id="animalMap-${animal.id}" class="animal-habitat-map"></div>
                <p class="map-note" style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">
                    Showing approximate habitat regions for ${animal.name}
                </p>
            </div>
                
                <div class="animal-detail-info">
                    <div class="animal-header">
                        <h3>${animal.name}</h3>
                        <p class="scientific-name" style="font-style: italic; opacity: 0.8; margin-bottom: 1rem;">${animal.scientificName}</p>
                    </div>
                    
                    <div class="animal-detail-meta">
                        <div class="meta-card">
                            <i class="fas fa-home"></i>
                            <span class="label">Habitat</span>
                            <span class="value">${animal.habitat}</span>
                        </div>
                        <div class="meta-card">
                            <i class="fas fa-utensils"></i>
                            <span class="label">Diet</span>
                            <span class="value">${animal.diet}</span>
                        </div>
                        <div class="meta-card">
                            <i class="fas fa-globe-americas"></i>
                            <span class="label">Location</span>
                            <span class="value">${animal.location}</span>
                        </div>
                        <div class="meta-card">
                            <i class="fas fa-ruler-combined"></i>
                            <span class="label">Size</span>
                            <span class="value">${animal.size}</span>
                        </div>
                    </div>

                    <div class="animal-description">
                        <h4 style="color: var(--accent-yellow); margin-bottom: 1rem;">About the ${animal.name}</h4>
                        <p>${animal.description}</p>
                    </div>

                    <div class="animal-facts">
                        <h4 style="color: var(--accent-yellow); margin-bottom: 1rem;">🐾 Interesting Facts</h4>
                        <ul>
                            ${animal.facts.map(fact => `<li>${fact}</li>`).join('')}
                        </ul>
                    </div>

                    ${animal.dietInfo ? `
                    <div class="info-section diet-info" style="margin-bottom: 1.5rem;">
                        <h4 style="color: var(--accent-yellow); margin-bottom: 1rem;">🍽️ Diet & Feeding</h4>
                        <p>${animal.dietInfo}</p>
                    </div>
                    ` : ''}

                    ${animal.behavior ? `
                    <div class="info-section behavior-info" style="margin-bottom: 1.5rem;">
                        <h4 style="color: var(--accent-yellow); margin-bottom: 1rem;">👥 Behavior & Social Structure</h4>
                        <p>${animal.behavior}</p>
                    </div>
                    ` : ''}

                    <div class="conservation-status">
                        <h4 style="color: var(--accent-yellow); margin-bottom: 1rem;">🛡️ Conservation Status</h4>
                        <p><strong class="${statusClass}" style="padding: 0.3rem 0.8rem; border-radius: 15px; background: var(--accent-red); color: white;">${animal.status.toUpperCase()}</strong></p>
                        <p>${animal.conservationInfo}</p>
                    </div>

                    <div class="animal-actions" style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="action-btn primary" onclick="animalDetailsManager.shareAnimal('${animal.id}')" style="background: var(--accent-orange); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-share"></i> Share
                        </button>
                        <button class="action-btn secondary" onclick="animalDetailsManager.learnMore('${animal.name}')" style="background: transparent; color: white; border: 2px solid var(--accent-yellow); padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-book"></i> Learn More
                        </button>
                        ${hasHologram ? `
                        <button class="action-btn hologram" onclick="animalDetailsManager.toggleHologram('${animal.id}')" style="background: linear-gradient(135deg, var(--accent-yellow), var(--accent-orange)); color: var(--jungle-dark); border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-cube"></i> 3D View
                        </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    animateModalEntry() {
        const modalContent = document.querySelector('.modal-content');
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(modalContent,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
        } else {
            // Fallback CSS animation
            modalContent.style.animation = 'modalSlideIn 0.3s ease';
        }
    }

    closeModal() {
        // Close hologram if active
        if (this.hologramActive) {
            this.closeHologram();
        }
        
        const modal = document.getElementById('animalModal');
        const modalContent = modal.querySelector('.modal-content');
        
        // Stop any playing sounds
        this.stopAllSounds();
        
        if (typeof gsap !== 'undefined') {
            gsap.to(modalContent, {
                scale: 0.8,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    this.currentAnimal = null;
                }
            });
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.currentAnimal = null;
        }
    }

    // HOLOGRAM METHODS
    toggleHologram(animalId) {
        if (this.hologramActive) {
            this.closeHologram();
        } else {
            this.openHologram(animalId);
        }
    }

    openHologram(animalId) {
        const animal = this.currentAnimal;
        if (!animal) return;

        this.hologramActive = true;
        const hologramContainer = document.getElementById('hologramContainer');
        const imageContainer = document.getElementById('animalImageContainer');
        
        // Hide image, show hologram
        if (imageContainer) imageContainer.style.display = 'none';
        hologramContainer.style.display = 'block';
        
        // Update button
        const hologramBtn = document.querySelector('.hologram-toggle-btn');
        if (hologramBtn) {
            hologramBtn.innerHTML = '<i class="fas fa-times"></i> Close 3D View';
            hologramBtn.classList.add('active');
        }

        // Initialize 3D hologram
        this.initHologram(animal);
        
        this.showNotification(`Now viewing ${animal.name} in 3D hologram mode`);
    }

    closeHologram() {
        this.hologramActive = false;
        const hologramContainer = document.getElementById('hologramContainer');
        const imageContainer = document.getElementById('animalImageContainer');
        
        // Show image, hide hologram
        if (imageContainer) imageContainer.style.display = 'block';
        if (hologramContainer) hologramContainer.style.display = 'none';
        
        // Update button
        const hologramBtn = document.querySelector('.hologram-toggle-btn');
        if (hologramBtn) {
            hologramBtn.innerHTML = '<i class="fas fa-cube"></i> 3D Hologram View';
            hologramBtn.classList.remove('active');
        }

        // Clean up 3D resources
        this.cleanupHologram();
        
        this.showNotification('Exited 3D hologram view');
    }

    initHologram(animal) {
        const loadingElement = document.getElementById('hologramLoading');
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }

        try {
            // Try Three.js first if available
            if (typeof THREE !== 'undefined') {
                this.initThreeJSHologram(animal);
            } else {
                // Fallback to CSS-based hologram
                this.initCSSHologram(animal);
            }
        } catch (error) {
            console.error('Error initializing hologram:', error);
            this.showNotification('3D hologram not available for this animal');
            this.closeHologram();
        }
    }

    initCSSHologram(animal) {
        const hologramViewer = document.getElementById('hologramViewer');
        const loadingElement = document.getElementById('hologramLoading');
        
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        hologramViewer.innerHTML = `
            <div class="css-hologram" id="cssHologram">
                <div class="hologram-model" style="background-image: url('${animal.image}')"></div>
                <div class="hologram-reflection"></div>
                <div class="hologram-glow"></div>
                <div class="hologram-particles"></div>
            </div>
        `;

        // Add auto-rotation
        this.startHologramRotation();
        this.showNotification('CSS 3D hologram activated');
    }

    initThreeJSHologram(animal) {
        const hologramViewer = document.getElementById('hologramViewer');
        const loadingElement = document.getElementById('hologramLoading');
        
        try {
            // Create canvas for Three.js
            const canvas = document.createElement('canvas');
            canvas.id = 'hologramCanvas';
            hologramViewer.innerHTML = '';
            hologramViewer.appendChild(canvas);

            // Setup Three.js scene
            this.setupThreeJSScene(canvas, animal);
            
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            this.showNotification('Advanced 3D hologram activated (Three.js)');
        } catch (error) {
            console.error('Three.js initialization failed:', error);
            // Fallback to CSS hologram
            this.initCSSHologram(animal);
        }
    }

    setupThreeJSScene(canvas, animal) {
        // Scene setup
        this.hologramScene = new THREE.Scene();
        this.hologramScene.background = new THREE.Color(0x1a2a24);
        
        // Camera setup
        this.hologramCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.hologramCamera.position.z = 5;
        
        // Renderer setup
        this.hologramRenderer = new THREE.WebGLRenderer({ 
            canvas, 
            alpha: true,
            antialias: true 
        });
        this.hologramRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.hologramRenderer.setClearColor(0x000000, 0);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.hologramScene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.hologramScene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xff00ff, 0.5, 100);
        pointLight.position.set(-5, -5, -5);
        this.hologramScene.add(pointLight);
        
        // Create animal geometry (sphere as placeholder)
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        
        // Create texture from animal image
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(animal.image, (texture) => {
            const material = new THREE.MeshPhongMaterial({ 
                map: texture,
                transparent: true,
                opacity: 0.9,
                shininess: 100
            });
            
            this.hologramModel = new THREE.Mesh(geometry, material);
            this.hologramScene.add(this.hologramModel);
            
            // Add wireframe for hologram effect
            const wireframeGeometry = new THREE.WireframeGeometry(geometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ 
                color: 0x00ffff,
                transparent: true,
                opacity: 0.3
            });
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            this.hologramModel.add(wireframe);
        });
        
        // Animation loop
        const animate = () => {
            if (!this.hologramActive) return;
            
            this.animationFrameId = requestAnimationFrame(animate);
            
            if (this.hologramModel) {
                this.hologramModel.rotation.y += 0.01;
                this.hologramModel.rotation.x += 0.005;
            }
            
            this.hologramRenderer.render(this.hologramScene, this.hologramCamera);
        };
        
        animate();
    }

    rotateHologram(direction) {
        if (this.hologramModel) {
            // Three.js rotation
            this.hologramModel.rotation.y += direction === 'left' ? -0.5 : 0.5;
        } else {
            // CSS rotation
            const hologramElement = document.getElementById('cssHologram');
            if (hologramElement) {
                const currentRotation = this.hologramRotation;
                this.hologramRotation = direction === 'left' ? currentRotation - 45 : currentRotation + 45;
                hologramElement.style.transform = `translate(-50%, -50%) rotateY(${this.hologramRotation}deg) scale(${this.hologramScale})`;
            }
        }
    }

    zoomHologram(action) {
        this.hologramScale = action === 'in' ? 
            Math.min(this.hologramScale + 0.2, 2.5) : 
            Math.max(this.hologramScale - 0.2, 0.3);
        
        if (this.hologramModel) {
            // Three.js scaling
            this.hologramModel.scale.setScalar(this.hologramScale);
        } else {
            // CSS scaling
            const hologramElement = document.getElementById('cssHologram');
            if (hologramElement) {
                hologramElement.style.transform = `translate(-50%, -50%) rotateY(${this.hologramRotation}deg) scale(${this.hologramScale})`;
            }
        }
    }

    resetHologram() {
        this.hologramRotation = 0;
        this.hologramScale = 1;
        
        if (this.hologramModel) {
            // Three.js reset
            this.hologramModel.rotation.set(0, 0, 0);
            this.hologramModel.scale.setScalar(1);
            this.hologramCamera.position.z = 5;
        } else {
            // CSS reset
            const hologramElement = document.getElementById('cssHologram');
            if (hologramElement) {
                hologramElement.style.transform = 'translate(-50%, -50%) rotateY(0deg) scale(1)';
            }
        }
        
        this.showNotification('Hologram view reset');
    }

    startHologramRotation() {
        const hologramElement = document.getElementById('cssHologram');
        if (hologramElement) {
            hologramElement.style.animation = 'hologramRotate 20s infinite linear';
        }
    }

    stopHologramRotation() {
        const hologramElement = document.getElementById('cssHologram');
        if (hologramElement) {
            hologramElement.style.animation = 'none';
        }
    }

    cleanupHologram() {
        // Stop animation frame
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        // Clean up Three.js resources
        if (this.hologramRenderer) {
            this.hologramRenderer.dispose();
            this.hologramRenderer = null;
        }
        
        this.hologramScene = null;
        this.hologramCamera = null;
        this.hologramModel = null;
        
        // Reset values
        this.hologramRotation = 0;
        this.hologramScale = 1;
    }

    // EXISTING METHODS (Audio, Share, etc.)
    playAnimalSound(soundFile) {
        console.log('🔊 Playing animal sound:', soundFile);
        
        // Stop any currently playing sound
        this.stopAllSounds();
        
        try {
            // Update button state
            const playButton = document.querySelector('.audio-play-btn');
            if (playButton) {
                playButton.classList.add('playing');
                playButton.innerHTML = '<i class="fas fa-volume-up"></i> Playing Sound...';
            }
            
            // Play new sound
            this.currentAnimalSound = new Audio(soundFile);
            this.currentAnimalSound.volume = 0.7;
            
            this.currentAnimalSound.play().then(() => {
                console.log('✅ Animal sound playing successfully');
                this.showNotification('Playing animal sound...');
            }).catch(error => {
                console.error('❌ Animal sound play failed:', error);
                this.showNotification('Sound playback failed.');
                this.resetAudioButton();
            });
            
            // Reset button when audio ends
            this.currentAnimalSound.onended = () => {
                console.log('🔊 Animal sound ended');
                this.resetAudioButton();
                this.showNotification('Sound finished playing.');
            };
            
            // Auto-stop after 10 seconds (safety)
            setTimeout(() => {
                if (this.currentAnimalSound && !this.currentAnimalSound.ended) {
                    this.stopAllSounds();
                    this.resetAudioButton();
                }
            }, 10000);
            
        } catch (error) {
            console.error('❌ Error playing animal sound:', error);
            this.showNotification('Error playing sound.');
            this.resetAudioButton();
        }
    }

    stopAllSounds() {
        if (this.currentAnimalSound) {
            this.currentAnimalSound.pause();
            this.currentAnimalSound.currentTime = 0;
            this.currentAnimalSound = null;
        }
    }

    resetAudioButton() {
        const playButton = document.querySelector('.audio-play-btn');
        if (playButton && this.currentAnimal) {
            playButton.classList.remove('playing');
            playButton.innerHTML = '<i class="fas fa-play"></i> Play ' + this.currentAnimal.name + ' Sound';
        }
    }

    shareAnimal(animalId) {
        let animal;
        
        if (window.bioRelmApp) {
            animal = window.bioRelmApp.getAnimalById(animalId);
        } else if (this.currentAnimal && this.currentAnimal.id == animalId) {
            animal = this.currentAnimal;
        }

        if (!animal) {
            this.showNotification('Animal information not available for sharing.');
            return;
        }

        const shareText = `Check out the ${animal.name} on BioRelm! ${animal.description.substring(0, 100)}...`;
        const shareUrl = window.location.href + `#animal-${animalId}`;

        if (navigator.share) {
            navigator.share({
                title: `${animal.name} - BioRelm`,
                text: shareText,
                url: shareUrl
            }).catch(error => {
                console.log('Error sharing:', error);
                this.fallbackShare(shareText, shareUrl);
            });
        } else {
            this.fallbackShare(shareText, shareUrl);
        }
    }

    fallbackShare(shareText, shareUrl) {
        // Copy to clipboard as fallback
        const tempInput = document.createElement('input');
        tempInput.value = `${shareText} ${shareUrl}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Show confirmation
        this.showNotification('Animal information copied to clipboard!');
    }

    learnMore(animalName) {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(animalName + ' wildlife facts')}`;
        window.open(searchUrl, '_blank');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle" style="color: var(--accent-yellow);"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--jungle-green);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            border-left: 4px solid var(--accent-yellow);
            box-shadow: var(--shadow-medium);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    showError(message) {
        this.showNotification(message);
    }

    // Utility method to get related animals
    getRelatedAnimals(animal) {
        if (!window.bioRelmApp) return [];
        
        return window.bioRelmApp.animals.filter(a => 
            a.id !== animal.id && 
            (a.habitat === animal.habitat || a.diet === animal.diet)
        ).slice(0, 3);
    }
}

// Initialize animal details manager
document.addEventListener('DOMContentLoaded', () => {
    window.animalDetailsManager = new AnimalDetailsManager();
    console.log('🐾 BioRelm Animal Details Manager with Hologram feature loaded!');
});