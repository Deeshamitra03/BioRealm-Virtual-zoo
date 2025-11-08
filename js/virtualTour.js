// Virtual Safari Tour Manager - Enhanced Immersive Version
class VirtualSafari {
    constructor() {
        this.viewer = null;
        this.currentScene = 'jungle';
        this.scenes = {
            jungle: {
                title: "Tropical Rainforest Canopy",
                panorama: "assets/images/360/jungle-canopy.jpg",
                audio: "assets/sounds/jungle-ambience.mp3",
                hotspots: [
                    {
                        pitch: -10,
                        yaw: 30,
                        text: "🦍 Howler Monkeys in the trees!",
                        animalId: 8,
                        type: "animal"
                    },
                    {
                        pitch: 5,
                        yaw: 150,
                        text: "🦜 Colorful Toucans flying",
                        animalId: 7,
                        type: "animal"
                    },
                    {
                        pitch: -15,
                        yaw: -45,
                        text: "🐅 Bengal Tiger territory",
                        animalId: 1,
                        type: "animal"
                    },
                    {
                        pitch: 8,
                        yaw: 200,
                        text: "🌿 Dense jungle vegetation",
                        type: "habitat"
                    }
                ]
            },
            savanna: {
                title: "African Savanna Plains",
                panorama: "assets/images/360/savanna.jpg",
                audio: "assets/sounds/savanna-wind.mp3",
                hotspots: [
                    {
                        pitch: -5,
                        yaw: 0,
                        text: "🦁 Lion pride resting",
                        animalId: 5,
                        type: "animal"
                    },
                    {
                        pitch: -8,
                        yaw: 120,
                        text: "🐘 Elephant herd gathering",
                        animalId: 3,
                        type: "animal"
                    },
                    {
                        pitch: 0,
                        yaw: -90,
                        text: "🦒 Giraffes grazing",
                        animalId: 21,
                        type: "animal"
                    },
                    {
                        pitch: -3,
                        yaw: 180,
                        text: "🌅 Sunset over the plains",
                        type: "habitat"
                    }
                ]
            },
            waterfall: {
                title: "Rainforest Waterfall Oasis",
                panorama: "assets/images/360/waterfall.jpg",
                audio: "assets/sounds/waterfall.mp3",
                hotspots: [
                    {
                        pitch: -20,
                        yaw: 0,
                        text: "🐅 Tiger drinking water",
                        animalId: 1,
                        type: "animal"
                    },
                    {
                        pitch: -10,
                        yaw: 100,
                        text: "🐊 River crocodile",
                        animalId: 9,
                        type: "animal"
                    },
                    {
                        pitch: 5,
                        yaw: -60,
                        text: "🦜 Macaws flying overhead",
                        type: "habitat"
                    },
                    {
                        pitch: -15,
                        yaw: 150,
                        text: "💦 Waterfall mist zone",
                        type: "habitat"
                    }
                ]
            },
            arctic: {
                title: "Arctic Tundra Expedition",
                panorama: "assets/images/360/arctic.jpg",
                audio: "assets/sounds/arctic-wind.mp3",
                hotspots: [
                    {
                        pitch: -15,
                        yaw: 20,
                        text: "🐧 Penguin colony",
                        animalId: 6,
                        type: "animal"
                    },
                    {
                        pitch: -5,
                        yaw: -120,
                        text: "🦊 Arctic fox hunting",
                        animalId: 12,
                        type: "animal"
                    },
                    {
                        pitch: 10,
                        yaw: 180,
                        text: "🐻‍❄️ Polar bear territory",
                        animalId: 15,
                        type: "animal"
                    },
                    {
                        pitch: 0,
                        yaw: 90,
                        text: "❄️ Frozen landscape",
                        type: "habitat"
                    }
                ]
            }
        };
        
        this.audioElements = {};
        this.isAudioEnabled = false;
        this.safariGuide = new SafariGuide();
        this.animalEncounters = new AnimalEncounters();
        
        this.init();
    }

    init() {
        this.createViewer();
        this.setupSceneButtons();
        this.setupHotspotHandlers();
        this.setupAudioSystem();
        this.setupSafariUI();
        
        console.log('🎯 Virtual Safari initialized with immersive features');
    }

    setupAudioSystem() {
        // Pre-load audio for each scene
        Object.keys(this.scenes).forEach(sceneId => {
            const scene = this.scenes[sceneId];
            if (scene.audio) {
                this.audioElements[sceneId] = new Audio(scene.audio);
                this.audioElements[sceneId].loop = true;
                this.audioElements[sceneId].volume = 0.4;
            }
        });
    }

    setupSafariUI() {
        // Add safari vehicle frame
        const panoramaElement = document.getElementById('panorama');
        const safariFrame = document.createElement('div');
        safariFrame.className = 'safari-vehicle-frame';
        safariFrame.innerHTML = `
            <div class="safari-vehicle-top"></div>
            <div class="safari-vehicle-bottom"></div>
            <div class="safari-binoculars">
                <div class="binocular-left"></div>
                <div class="binocular-right"></div>
            </div>
        `;
        panoramaElement.appendChild(safariFrame);

        // Add safari compass
        this.addSafariCompass();
    }

    addSafariCompass() {
        const compass = document.createElement('div');
        compass.className = 'safari-compass';
        compass.innerHTML = `
            <div class="compass-rose">
                <div class="compass-n">N</div>
                <div class="compass-needle"></div>
            </div>
        `;
        document.querySelector('.safari-container').appendChild(compass);
    }

    createViewer() {
        const panoramaElement = document.getElementById('panorama');
        if (!panoramaElement) {
            console.error('Panorama element not found');
            return;
        }
        
        // Create enhanced scene configuration
        const sceneConfig = {};
        Object.keys(this.scenes).forEach(sceneId => {
            const scene = this.scenes[sceneId];
            sceneConfig[sceneId] = {
                title: scene.title,
                type: "equirectangular",
                panorama: scene.panorama,
                hotSpots: scene.hotspots.map((hotspot, index) => ({
                    pitch: hotspot.pitch,
                    yaw: hotspot.yaw,
                    type: "info",
                    text: hotspot.text,
                    cssClass: `custom-hotspot ${hotspot.type}-hotspot`,
                    clickHandlerFunc: () => this.handleHotspotClick(hotspot)
                }))
            };
        });

        try {
            this.viewer = pannellum.viewer('panorama', {
                default: {
                    firstScene: this.currentScene,
                    author: "BioRelm Safari",
                    sceneFadeDuration: 1500,
                    autoLoad: true,
                    compass: true,
                    northOffset: 0,
                    autoRotate: false,
                    autoRotateInactivityDelay: 3000,
                    autoRotateStopDelay: 0
                },
                scenes: sceneConfig
            });

            // Enhanced hotspot styling
            this.styleEnhancedHotspots();
            
            // Add scene change listener
            this.viewer.on('scenechange', (newSceneId) => {
                this.handleSceneChange(newSceneId);
            });

        } catch (error) {
            console.error('Error creating Pannellum viewer:', error);
            this.showViewerError();
        }
    }

    styleEnhancedHotspots() {
    const style = document.createElement('style');
    style.textContent = `
        .animal-hotspot {
            background: rgba(247, 197, 72, 0.9) !important;
            border: 3px solid #e67e22 !important;
            width: 35px !important;
            height: 35px !important;
            animation: animalPulse 2s infinite !important;
            z-index: 25 !important;
        }
        
        .habitat-hotspot {
            background: rgba(52, 152, 219, 0.8) !important;
            border: 3px solid #2980b9 !important;
            width: 30px !important;
            height: 30px !important;
            animation: habitatGlow 3s infinite !important;
            z-index: 25 !important;
        }
        
        @keyframes animalPulse {
            0%, 100% { 
                transform: translate(-50%, -50%) scale(1);
                box-shadow: 0 0 0 0 rgba(247, 197, 72, 0.7);
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.1);
                box-shadow: 0 0 0 8px rgba(247, 197, 72, 0);
            }
        }
        
        @keyframes habitatGlow {
            0%, 100% { 
                opacity: 0.8;
                box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
            }
            50% { 
                opacity: 1;
                box-shadow: 0 0 12px rgba(52, 152, 219, 0.8);
            }
        }
        
        /* Ensure Pannellum controls are always on top */
        .pnlm-controls-container {
            z-index: 20 !important;
        }
        
        .pnlm-zoom-controls {
            z-index: 20 !important;
        }
        
        .pnlm-controls {
            z-index: 20 !important;
        }
        
        .pnlm-hotspot-tooltip {
            z-index: 30 !important;
        }
    `;
    document.head.appendChild(style);
}

    handleSceneChange(newSceneId) {
        this.currentScene = newSceneId;
        
        // Stop previous audio
        this.stopAllAudio();
        
        // Play new scene audio
        if (this.isAudioEnabled && this.audioElements[newSceneId]) {
            this.audioElements[newSceneId].play().catch(e => console.log('Audio play prevented:', e));
        }
        
        // Update safari info
        this.updateSafariInfo(newSceneId);
        
        // Show guide message
        this.safariGuide.speakSceneIntroduction(newSceneId);
        
        // Trigger random animal encounter
        this.animalEncounters.triggerRandomEncounter(newSceneId);
        
        // Update active button
        document.querySelectorAll('.scene-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-scene="${newSceneId}"]`).classList.add('active');
    }

    stopAllAudio() {
        Object.values(this.audioElements).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    toggleSafariAudio() {
        this.isAudioEnabled = !this.isAudioEnabled;
        
        if (this.isAudioEnabled) {
            this.audioElements[this.currentScene]?.play().catch(e => console.log('Audio play prevented:', e));
        } else {
            this.stopAllAudio();
        }
        
        return this.isAudioEnabled;
    }

    setupSceneButtons() {
        document.querySelectorAll('.scene-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sceneId = e.currentTarget.getAttribute('data-scene');
                this.switchScene(sceneId);
            });
        });

        // Add audio toggle button
        const audioBtn = document.createElement('button');
        audioBtn.className = 'safari-audio-btn';
        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        audioBtn.addEventListener('click', () => {
            const isEnabled = this.toggleSafariAudio();
            audioBtn.innerHTML = isEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        });
        document.querySelector('.safari-controls').appendChild(audioBtn);
    }

    switchScene(sceneId) {
        if (this.scenes[sceneId] && this.currentScene !== sceneId && this.viewer) {
            this.viewer.loadScene(sceneId);
        }
    }

    updateSafariInfo(sceneId) {
        const scene = this.scenes[sceneId];
        const infoContent = document.getElementById('safariInfoContent');
        
        if (infoContent) {
            infoContent.innerHTML = `
                <div class="safari-scene-info">
                    <h4>${scene.title}</h4>
                    <div class="scene-stats">
                        <span class="stat">
                            <i class="fas fa-bullseye"></i>
                            ${scene.hotspots.filter(h => h.type === 'animal').length} wildlife spots
                        </span>
                        <span class="stat">
                            <i class="fas fa-volume-up"></i>
                            ${this.isAudioEnabled ? 'Ambient sounds on' : 'Sounds off'}
                        </span>
                    </div>
                    <p>Look for glowing markers to discover animals and habitat features!</p>
                    <div class="habitat-tips">
                        <h5>Safari Tips:</h5>
                        <ul>
                            <li>🟡 Yellow markers indicate animals</li>
                            <li>🔵 Blue markers show habitat features</li>
                            <li>Use mouse to look around</li>
                            <li>Scroll to zoom in/out</li>
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    setupHotspotHandlers() {
        // Animal tag clicks in safari info
        document.addEventListener('click', (e) => {
            if (e.target.closest('.animal-tag')) {
                const animalTag = e.target.closest('.animal-tag');
                const animalId = animalTag.getAttribute('data-animal-id');
                this.handleAnimalEncounter(animalId);
            }
        });
    }

    handleHotspotClick(hotspot) {
        if (hotspot.animalId) {
            this.handleAnimalEncounter(hotspot.animalId);
        } else {
            this.showHabitatFeature(hotspot);
        }
    }

    handleAnimalEncounter(animalId) {
        if (window.bioRelmApp) {
            // Add discovery effect
            this.showDiscoveryEffect();
            // Show animal details
            window.bioRelmApp.showAnimalDetails(animalId);
            // Record safari progress
            this.animalEncounters.recordSighting(animalId);
        }
    }

    showDiscoveryEffect() {
        const effect = document.createElement('div');
        effect.className = 'discovery-effect';
        effect.innerHTML = '🎯 Wildlife Spotted!';
        document.getElementById('panorama').appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 2000);
    }

    showHabitatFeature(hotspot) {
        const modalContent = document.getElementById('modalContent');
        const scene = this.scenes[this.currentScene];
        
        modalContent.innerHTML = `
            <div class="habitat-feature">
                <h3>${scene.title} Feature</h3>
                <div class="feature-description">
                    <p>${hotspot.text}</p>
                    <div class="feature-details">
                        ${this.getHabitatFeatureDetails(this.currentScene, hotspot)}
                    </div>
                </div>
                <div class="safari-fact">
                    <h4>🌿 Safari Fact:</h4>
                    <p>${this.getRandomSafariFact()}</p>
                </div>
            </div>
        `;
        
        document.getElementById('animalModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    getHabitatFeatureDetails(sceneId, hotspot) {
        const features = {
            jungle: {
                "🌿 Dense jungle vegetation": "The rainforest canopy creates multiple layers of habitat, supporting incredible biodiversity from forest floor to treetops.",
                "💦 Waterfall mist zone": "The constant mist creates a unique microclimate supporting mosses, ferns, and specialized plant life."
            },
            savanna: {
                "🌅 Sunset over the plains": "The golden hour provides optimal lighting for photography and is when many animals become most active.",
                "🌾 Grassland expanse": "These vast grasslands support large herds of grazing animals and their predators."
            },
            waterfall: {
                "💦 Waterfall mist zone": "The oxygen-rich mist supports unique ecosystems and provides drinking water for forest animals.",
                "🦜 Macaws flying overhead": "Colorful macaws use cliff faces near waterfalls for nesting and mineral supplementation."
            },
            arctic: {
                "❄️ Frozen landscape": "The permafrost and ice create challenging conditions that only specialized species can survive.",
                "🌅 Midnight sun": "During summer months, the sun never fully sets, creating unique lighting conditions."
            }
        };
        
        return features[sceneId]?.[hotspot.text] || "This feature contributes to the unique ecosystem of this habitat.";
    }

    getRandomSafariFact() {
        const facts = [
            "Many predators are most active during dawn and dusk hours.",
            "Animal tracks can tell stories about recent wildlife activity.",
            "Birds often give alarm calls when predators are nearby.",
            "Water sources attract diverse wildlife, especially in dry seasons.",
            "Many animals have camouflage that makes them nearly invisible.",
            "Listening carefully can reveal hidden wildlife through their sounds."
        ];
        return facts[Math.floor(Math.random() * facts.length)];
    }

    showViewerError() {
        const panoramaElement = document.getElementById('panorama');
        panoramaElement.innerHTML = `
            <div class="safari-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Safari Expedition Paused</h3>
                <p>Our 360° safari vehicle is currently being serviced.</p>
                <p>In the meantime, explore our animal gallery above!</p>
                <button onclick="virtualSafari.retryLoad()" class="safari-retry-btn">
                    <i class="fas fa-redo"></i> Retry Safari
                </button>
            </div>
        `;
    }

    retryLoad() {
        this.createViewer();
    }
}

// Safari Guide System
class SafariGuide {
    constructor() {
        this.messages = {
            jungle: [
                "Welcome to the tropical rainforest! Listen for howler monkeys and watch for colorful birds in the canopy.",
                "The dense vegetation here provides perfect camouflage for jaguars and other elusive predators.",
                "Rainforests are the most biodiverse habitats on Earth - every glance reveals new wonders!"
            ],
            savanna: [
                "You've entered the African savanna. Scan the horizon for elephant herds and watch the grass for predators.",
                "The acacia trees provide shade and food for many savanna species during the heat of the day.",
                "During dry season, water holes become gathering spots for all kinds of wildlife."
            ],
            waterfall: [
                "This waterfall oasis attracts animals from miles around. Look for tracks along the water's edge.",
                "The constant mist creates unique microhabitats for specialized plants and animals.",
                "Water sources are critical survival points in the rainforest ecosystem."
            ],
            arctic: [
                "Welcome to the arctic tundra. The extreme conditions here require special adaptations to survive.",
                "Look for animal tracks in the snow - they can lead you to recent wildlife activity.",
                "Despite the harsh environment, the arctic supports a surprising diversity of life."
            ]
        };
    }

    speakSceneIntroduction(sceneId) {
        const messages = this.messages[sceneId];
        if (messages) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            this.showGuideMessage(randomMessage);
        }
    }

    showGuideMessage(message) {
        // Remove existing message
        const existingMsg = document.querySelector('.safari-guide-message');
        if (existingMsg) existingMsg.remove();

        const guideMsg = document.createElement('div');
        guideMsg.className = 'safari-guide-message';
        guideMsg.innerHTML = `
            <div class="guide-avatar">🦁</div>
            <div class="guide-text">${message}</div>
        `;
        
        document.querySelector('.safari-container').appendChild(guideMsg);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            guideMsg.classList.add('fade-out');
            setTimeout(() => guideMsg.remove(), 1000);
        }, 8000);
    }
}

// Animal Encounter System
class AnimalEncounters {
    constructor() {
        this.sightings = new Set();
        this.encounterChance = 0.4; // 40% chance per scene visit
    }

    triggerRandomEncounter(sceneId) {
        // 40% chance of a special random encounter
        if (Math.random() < this.encounterChance) {
            setTimeout(() => {
                this.showRandomEncounterPrompt(sceneId);
            }, 5000);
        }
    }

    showRandomEncounterPrompt(sceneId) {
        const prompt = document.createElement('div');
        prompt.className = 'encounter-prompt';
        prompt.innerHTML = `
            <div class="encounter-content">
                <i class="fas fa-binoculars"></i>
                <h4>Wildlife Sighting!</h4>
                <p>You've spotted something moving in the distance...</p>
                <button onclick="this.parentElement.parentElement.remove()">Continue Exploring</button>
            </div>
        `;
        
        document.querySelector('.safari-container').appendChild(prompt);
        
        setTimeout(() => {
            if (prompt.parentElement) prompt.remove();
        }, 10000);
    }

    recordSighting(animalId) {
        this.sightings.add(animalId);
        console.log(`🎯 Recorded animal sighting: ${animalId}. Total unique sightings: ${this.sightings.size}`);
    }

    getSafariProgress() {
        return {
            totalSightings: this.sightings.size,
            completion: Math.round((this.sightings.size / 50) * 100) // Assuming 50 animals total
        };
    }
}

// Initialize virtual safari when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.virtualSafari = new VirtualSafari();
});