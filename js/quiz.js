// Quiz Management System
class QuizManager {
    constructor() {
        this.quizzes = this.getQuizData();
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        
        this.init();
    }

    init() {
        this.displayQuizCategories();
        this.setupEventListeners();
        
        console.log('Quiz Manager initialized');
    }

    getQuizData() {
        return [
            {
                id: 'food-chains',
                title: 'Food Chains & Ecosystems',
                description: 'Test your knowledge about how energy flows through ecosystems',
                icon: 'fas fa-link',
                questions: [
                    {
                        id: 1,
                        question: 'In a typical food chain, which organism is usually a primary producer?',
                        options: [
                            'Grass',
                            'Rabbit', 
                            'Fox',
                            'Mushroom'
                        ],
                        correctAnswer: 0,
                        explanation: 'Grass is a primary producer because it creates its own food through photosynthesis.',
                        image: null
                    },
                    {
                        id: 2,
                        question: 'What happens if you remove all predators from an ecosystem?',
                        options: [
                            'Prey population decreases',
                            'Prey population increases dramatically',
                            'Plants stop growing',
                            'Nothing changes'
                        ],
                        correctAnswer: 1,
                        explanation: 'Without predators, prey populations can grow unchecked, potentially leading to overgrazing and ecosystem imbalance.',
                        image: null
                    },
                    {
                        id: 3,
                        question: 'Which animal is typically an apex predator in its ecosystem?',
                        options: [
                            'Deer',
                            'Rabbit',
                            'Lion', 
                            'Mouse'
                        ],
                        correctAnswer: 2,
                        explanation: 'Lions are apex predators because they have no natural predators in their ecosystem.',
                        image: null
                    },
                    {
                        id: 4,
                        question: 'What is the role of decomposers in a food chain?',
                        options: [
                            'Hunt other animals',
                            'Produce oxygen',
                            'Break down dead organisms',
                            'Provide shelter'
                        ],
                        correctAnswer: 2,
                        explanation: 'Decomposers like fungi and bacteria break down dead organisms, returning nutrients to the soil.',
                        image: null
                    },
                    {
                        id: 5,
                        question: 'In an ocean food chain, what do krill typically eat?',
                        options: [
                            'Small fish',
                            'Phytoplankton',
                            'Sharks',
                            'Seaweed'
                        ],
                        correctAnswer: 1,
                        explanation: 'Krill are small crustaceans that feed on phytoplankton, which are microscopic marine plants.',
                        image: null
                    }
                ]
            },
            {
                id: 'animal-adaptations',
                title: 'Animal Adaptations',
                description: 'Learn how animals survive in their environments',
                icon: 'fas fa-paw',
                questions: [
                    {
                        id: 1,
                        question: 'Why do arctic foxes change their fur color with seasons?',
                        options: [
                            'To attract mates',
                            'For temperature regulation', 
                            'For camouflage',
                            'To show dominance'
                        ],
                        correctAnswer: 2,
                        explanation: 'Arctic foxes change from white in winter to brown in summer for better camouflage in different environments.',
                        image: null
                    },
                    {
                        id: 2,
                        question: 'What special adaptation helps camels survive in deserts?',
                        options: [
                            'Webbed feet',
                            'Hump for fat storage',
                            'Sharp claws',
                            'Long neck'
                        ],
                        correctAnswer: 1,
                        explanation: 'Camels store fat in their humps, which can be converted to water and energy when resources are scarce.',
                        image: null
                    },
                    {
                        id: 3,
                        question: 'How do penguins keep warm in freezing temperatures?',
                        options: [
                            'They hibernate',
                            'Thick fur and fat layers',
                            'They migrate south', 
                            'Special heating system'
                        ],
                        correctAnswer: 1,
                        explanation: 'Penguins have dense, waterproof feathers and a thick layer of blubber for insulation against cold.',
                        image: null
                    },
                    {
                        id: 4,
                        question: 'What is the main purpose of a chameleon changing colors?',
                        options: [
                            'Temperature control',
                            'Communication',
                            'Camouflage',
                            'All of the above'
                        ],
                        correctAnswer: 3,
                        explanation: 'Chameleons change colors for camouflage, temperature regulation, and communication with other chameleons.',
                        image: null
                    },
                    {
                        id: 5,
                        question: 'Why do some animals have patterns that look like eyes?',
                        options: [
                            'To see better',
                            'To attract prey',
                            'To scare predators',
                            'For beauty'
                        ],
                        correctAnswer: 2,
                        explanation: 'Eye-like patterns can startle or confuse predators, giving the animal time to escape.',
                        image: null
                    }
                ]
            },
            {
                id: 'conservation',
                title: 'Conservation & Threats',
                description: 'Understand wildlife conservation challenges',
                icon: 'fas fa-leaf',
                questions: [
                    {
                        id: 1,
                        question: 'What is the biggest threat to most endangered species?',
                        options: [
                            'Climate change',
                            'Habitat loss',
                            'Pollution',
                            'Natural predators'
                        ],
                        correctAnswer: 1,
                        explanation: 'Habitat loss due to human activities like deforestation and urbanization is the primary threat to most endangered species.',
                        image: null
                    },
                    {
                        id: 2,
                        question: 'How does climate change affect polar bears?',
                        options: [
                            'They get too hot',
                            'Loss of sea ice habitat',
                            'They change color',
                            'They eat more fish'
                        ],
                        correctAnswer: 1,
                        explanation: 'Polar bears depend on sea ice for hunting seals. Melting ice reduces their hunting grounds and access to food.',
                        image: null
                    },
                    {
                        id: 3,
                        question: 'What is the main purpose of wildlife corridors?',
                        options: [
                            'Tourist attractions',
                            'Connect fragmented habitats',
                            'Animal entertainment',
                            'Research facilities'
                        ],
                        correctAnswer: 1,
                        explanation: 'Wildlife corridors connect isolated habitat patches, allowing animals to move between areas safely.',
                        image: null
                    },
                    {
                        id: 4,
                        question: 'Why are bees important for ecosystems?',
                        options: [
                            'They make honey',
                            'They pollinate plants',
                            'They control pests',
                            'They are food for birds'
                        ],
                        correctAnswer: 1,
                        explanation: 'Bees are crucial pollinators for many plants, including food crops that humans depend on.',
                        image: null
                    },
                    {
                        id: 5,
                        question: 'What can individuals do to help wildlife conservation?',
                        options: [
                            'Visit zoos frequently',
                            'Support sustainable products',
                            'Keep wild animals as pets',
                            'Feed animals in parks'
                        ],
                        correctAnswer: 1,
                        explanation: 'Choosing sustainable products and supporting conservation organizations are effective ways to help wildlife.',
                        image: null
                    }
                ]
            }
        ];
    }

    displayQuizCategories() {
        const quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;

        quizContainer.innerHTML = `
            <div class="quiz-start-screen">
                <h3>Wildlife Knowledge Challenge</h3>
                <p>Test your knowledge about animals, ecosystems, and conservation. Choose a category to begin!</p>
                
                <div class="quiz-categories">
                    ${this.quizzes.map(quiz => `
                        <div class="quiz-category" data-quiz-id="${quiz.id}">
                            <i class="${quiz.icon}"></i>
                            <h4>${quiz.title}</h4>
                            <p>${quiz.description}</p>
                            <small>${quiz.questions.length} questions</small>
                        </div>
                    `).join('')}
                </div>
                
                <div class="quiz-stats">
                    <div class="stat-card" style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; text-align: center;">
                        <i class="fas fa-trophy" style="color: var(--accent-yellow); font-size: 2rem; margin-bottom: 0.5rem;"></i>
                        <span>Complete all quizzes to become a Wildlife Expert!</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Quiz category selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quiz-category')) {
                const quizCategory = e.target.closest('.quiz-category');
                const quizId = quizCategory.getAttribute('data-quiz-id');
                this.startQuiz(quizId);
            }
        });

        // Quiz navigation
        document.addEventListener('click', (e) => {
            if (e.target.id === 'nextQuestion' || e.target.closest('#nextQuestion')) {
                this.nextQuestion();
            }
            if (e.target.id === 'prevQuestion' || e.target.closest('#prevQuestion')) {
                this.previousQuestion();
            }
            if (e.target.id === 'restartQuiz' || e.target.closest('#restartQuiz')) {
                this.restartQuiz();
            }
            if (e.target.id === 'newQuiz' || e.target.closest('#newQuiz')) {
                this.displayQuizCategories();
            }
        });

        // Option selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quiz-option')) {
                const option = e.target.closest('.quiz-option');
                if (!this.quizStarted) return;
                
                const selectedIndex = parseInt(option.getAttribute('data-index'));
                this.selectAnswer(selectedIndex);
            }
        });
    }

    startQuiz(quizId) {
        this.currentQuiz = this.quizzes.find(q => q.id === quizId);
        if (!this.currentQuiz) return;

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = true;

        this.displayCurrentQuestion();
    }

    displayCurrentQuestion() {
        if (!this.currentQuiz) return;

        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) * 100;

        const quizContainer = document.getElementById('quizContainer');
        quizContainer.innerHTML = `
            <div class="quiz-header">
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">Question ${this.currentQuestionIndex + 1} of ${this.currentQuiz.questions.length}</span>
                </div>
                <div class="quiz-score">
                    Score: <span id="quizScore">${this.score}</span>
                </div>
            </div>

            <div class="quiz-content">
                <div class="quiz-question">
                    ${question.question}
                    ${question.image ? `<img src="${question.image}" alt="Question image" style="max-width: 100%; border-radius: 10px; margin-top: 1rem;">` : ''}
                </div>
                
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" data-index="${index}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${option}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div id="quizFeedback"></div>
            </div>

            <div class="quiz-actions">
                <button class="quiz-btn secondary" id="prevQuestion" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button class="quiz-btn primary" id="nextQuestion">
                    ${this.currentQuestionIndex === this.currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next'} <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        // Show previous answer if exists
        if (this.userAnswers[this.currentQuestionIndex] !== undefined) {
            this.showAnswerFeedback(this.userAnswers[this.currentQuestionIndex]);
        }
    }

    selectAnswer(selectedIndex) {
        if (this.userAnswers[this.currentQuestionIndex] !== undefined) return;

        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswer;
        
        this.userAnswers[this.currentQuestionIndex] = {
            selected: selectedIndex,
            correct: isCorrect
        };

        if (isCorrect) {
            this.score++;
            document.getElementById('quizScore').textContent = this.score;
        }

        this.showAnswerFeedback(selectedIndex);
    }

    showAnswerFeedback(selectedIndex) {
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswer;
        
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.classList.remove('selected', 'correct', 'incorrect');
            
            if (index === selectedIndex) {
                option.classList.add('selected');
                option.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
            
            if (index === question.correctAnswer) {
                option.classList.add('correct');
            }
        });

        const feedbackDiv = document.getElementById('quizFeedback');
        feedbackDiv.innerHTML = `
            <div class="quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
                <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                ${isCorrect ? 'Correct!' : 'Not quite!'}
                <div class="feedback-explanation">${question.explanation}</div>
            </div>
        `;
    }

    nextQuestion() {
        if (this.userAnswers[this.currentQuestionIndex] === undefined) {
            this.showNotification('Please select an answer before continuing.');
            return;
        }

        if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayCurrentQuestion();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayCurrentQuestion();
        }
    }

    finishQuiz() {
        const percentage = Math.round((this.score / this.currentQuiz.questions.length) * 100);
        const performance = this.getPerformanceMessage(percentage);
        
        const resultsContent = document.getElementById('quizResultsContent');
        resultsContent.innerHTML = `
            <h3>Quiz Complete!</h3>
            <div class="quiz-score-display">${percentage}%</div>
            <div class="performance-message">${performance}</div>
            
            <div class="quiz-results-breakdown">
                <div class="result-stat">
                    <span class="value">${this.score}</span>
                    <span class="label">Correct Answers</span>
                </div>
                <div class="result-stat">
                    <span class="value">${this.currentQuiz.questions.length}</span>
                    <span class="label">Total Questions</span>
                </div>
                <div class="result-stat">
                    <span class="value">${Math.round(percentage)}%</span>
                    <span class="label">Score</span>
                </div>
            </div>

            <div class="quiz-review">
                <h4>Question Review</h4>
                ${this.currentQuiz.questions.map((question, index) => {
                    const userAnswer = this.userAnswers[index];
                    const isCorrect = userAnswer.correct;
                    return `
                        <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}" style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1rem; border-left: 4px solid ${isCorrect ? 'var(--sky-blue)' : 'var(--accent-red)'}">
                            <div class="review-question">
                                <strong>Q${index + 1}:</strong> ${question.question}
                            </div>
                            <div class="review-answer">
                                Your answer: ${question.options[userAnswer.selected]}
                                ${!isCorrect ? `<br>Correct answer: ${question.options[question.correctAnswer]}` : ''}
                            </div>
                            <div class="review-explanation">
                                ${question.explanation}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="quiz-actions" style="margin-top: 2rem;">
                <button class="quiz-btn secondary" id="restartQuiz">
                    <i class="fas fa-redo"></i> Try Again
                </button>
                <button class="quiz-btn primary" id="newQuiz">
                    <i class="fas fa-list"></i> New Quiz
                </button>
            </div>
        `;

        document.getElementById('quizResultsModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    getPerformanceMessage(percentage) {
        if (percentage >= 90) return "🏆 Wildlife Expert! Amazing knowledge!";
        if (percentage >= 75) return "🎉 Great job! You know your wildlife!";
        if (percentage >= 60) return "👍 Good effort! Keep learning!";
        if (percentage >= 40) return "📚 Not bad! Review and try again!";
        return "🌱 Beginner level - plenty to discover!";
    }

    restartQuiz() {
        this.closeResultsModal();
        this.startQuiz(this.currentQuiz.id);
    }

    closeResultsModal() {
        document.getElementById('quizResultsModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-orange);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 3000;
            box-shadow: var(--shadow-medium);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize quiz manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizManager = new QuizManager();
});