// Base de datos de tarjetas flash (preguntas y respuestas)
const flashCards = [
    {
        question: "What is the difference between var, let, and const?",
        answer: "In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified."
    },
    {
        question: "What is a closure in JavaScript?",
        answer: "A closure is a function that has access to its own scope, the outer function's scope, and the global scope. It retains access to variables from its containing scope even after the outer function has finished execution."
    },
    {
        question: "What is the difference between == and === in JavaScript?",
        answer: "The == operator performs type coercion before comparing values, while === (strict equality) checks both value and type without coercion. For example, 5 == '5' is true, but 5 === '5' is false."
    },
    {
        question: "What is event delegation in JavaScript?",
        answer: "Event delegation is a technique where you attach a single event listener to a parent element instead of multiple listeners to individual child elements. Events from child elements bubble up and can be handled by the parent."
    },
    {
        question: "What is the difference between null and undefined?",
        answer: "undefined means a variable has been declared but not assigned a value. null is an assignment value that represents no value or no object. typeof undefined returns 'undefined', while typeof null returns 'object' (a historical bug in JavaScript)."
    },
    {
        question: "What is a promise in JavaScript?",
        answer: "A promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: pending, fulfilled, and rejected. Promises allow better handling of asynchronous operations compared to callbacks."
    },
    {
        question: "What is the 'this' keyword in JavaScript?",
        answer: "The 'this' keyword refers to the object that is executing the current function. Its value depends on how a function is called: in a method, 'this' refers to the object; in a regular function, 'this' refers to the global object (or undefined in strict mode)."
    },
    {
        question: "What is the purpose of the bind() method?",
        answer: "The bind() method creates a new function that, when called, has its 'this' keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called."
    },
    {
        question: "What is the difference between call() and apply()?",
        answer: "Both call() and apply() invoke a function with a specified 'this' value. The difference is that call() accepts an argument list, while apply() accepts a single array of arguments."
    },
    {
        question: "What is hoisting in JavaScript?",
        answer: "Hoisting is JavaScript's behavior of moving declarations to the top of their containing scope during compilation. Variable declarations (using var) and function declarations are hoisted, but let and const declarations are not initialized until their definition is evaluated."
    },
    {
        question: "What are template literals in JavaScript?",
        answer: "Template literals are string literals allowing embedded expressions, denoted by backticks (`). They support multi-line strings and string interpolation with ${expression} syntax."
    },
    {
        question: "What are arrow functions and how do they differ from regular functions?",
        answer: "Arrow functions are a concise syntax for writing function expressions. They don't have their own 'this', 'arguments', 'super', or 'new.target'. They are always anonymous and cannot be used as constructors."
    },
    {
        question: "What is destructuring assignment in JavaScript?",
        answer: "Destructuring assignment is a syntax that allows unpacking values from arrays or properties from objects into distinct variables. For example: const {name, age} = person; extracts name and age from the person object."
    },
    {
        question: "What is the spread operator in JavaScript?",
        answer: "The spread operator (...) allows an iterable like an array or string to be expanded in places where zero or more arguments or elements are expected. It can be used to copy arrays, concatenate arrays, or pass array elements as function arguments."
    },
    {
        question: "What is the difference between synchronous and asynchronous code?",
        answer: "Synchronous code executes line by line, blocking further execution until the current operation completes. Asynchronous code allows the program to continue execution while waiting for operations (like network requests) to complete, using callbacks, promises, or async/await."
    },
    {
        question: "What is async/await in JavaScript?",
        answer: "Async/await is syntactic sugar built on promises that allows writing asynchronous code that looks synchronous. The async keyword declares an asynchronous function, and await pauses execution until a promise is resolved or rejected."
    },
    {
        question: "What are JavaScript modules?",
        answer: "JavaScript modules are reusable pieces of code that can be exported from one module and imported into another. ES6 introduced import/export syntax for modules, allowing better code organization and dependency management."
    },
    {
        question: "What is the event loop in JavaScript?",
        answer: "The event loop is a mechanism that handles asynchronous callbacks. It continuously checks the call stack and the callback queue. If the call stack is empty, it takes the first event from the queue and pushes it to the call stack for execution."
    },
    {
        question: "What is the purpose of the localStorage object?",
        answer: "The localStorage object allows storing key-value pairs in a web browser with no expiration time. Data persists even after the browser is closed and can only be removed via JavaScript or by clearing the browser cache."
    },
    {
        question: "What is the difference between localStorage and sessionStorage?",
        answer: "localStorage persists data across browser sessions (even after closing and reopening the browser), while sessionStorage only stores data for the duration of a page session (cleared when the tab/window is closed)."
    }
];

// Variables globales
let currentCardIndex = 0;
let totalCards = flashCards.length;
let isFlipped = false;

// Elementos DOM
const flashcardElement = document.getElementById('flashcard');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const flipBtn = document.getElementById('flip-btn');
const progressPercentElement = document.getElementById('progress-percent');
const currentCardElement = document.getElementById('current-card');
const totalCardsElement = document.getElementById('total-cards');
const progressFillElement = document.getElementById('progress-fill');
const answerStateText = document.getElementById('answer-state-text');

// Inicializar la aplicación
function initApp() {
    totalCardsElement.textContent = totalCards;
    updateCard();
    updateProgressBar();
    updateAnswerState();
    
    // Event Listeners
    flashcardElement.addEventListener('click', flipCard);
    prevBtn.addEventListener('click', showPreviousCard);
    nextBtn.addEventListener('click', showNextCard);
    flipBtn.addEventListener('click', flipCard);
}

// Mostrar la tarjeta actual
function updateCard() {
    const currentCard = flashCards[currentCardIndex];
    questionElement.textContent = currentCard.question;
    answerElement.textContent = currentCard.answer;
    currentCardElement.textContent = currentCardIndex + 1;
    
    // Volver la tarjeta a su estado frontal si está volteada
    if (isFlipped) {
        flashcardElement.classList.remove('flipped');
        isFlipped = false;
        updateAnswerState();
    }
}

// Voltear la tarjeta
function flipCard() {
    isFlipped = !isFlipped;
    
    if (isFlipped) {
        flashcardElement.classList.add('flipped');
        flipBtn.textContent = "Ocultar Respuesta";
    } else {
        flashcardElement.classList.remove('flipped');
        flipBtn.textContent = "Mostrar Respuesta";
    }
    
    updateAnswerState();
}

// Actualizar el estado de la respuesta
function updateAnswerState() {
    if (isFlipped) {
        answerStateText.textContent = "Respuesta visible";
        answerStateText.style.color = "#27ae60";
    } else {
        answerStateText.textContent = "Respuesta oculta";
        answerStateText.style.color = "#2c3e50";
    }
}

// Mostrar la tarjeta anterior
function showPreviousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCard();
        updateProgressBar();
        updateButtonStates();
    }
}

// Mostrar la siguiente tarjeta
function showNextCard() {
    if (currentCardIndex < totalCards - 1) {
        currentCardIndex++;
        updateCard();
        updateProgressBar();
        updateButtonStates();
    }
}

// Actualizar la barra de progreso
function updateProgressBar() {
    const progress = ((currentCardIndex + 1) / totalCards) * 100;
    progressPercentElement.textContent = `${Math.round(progress)}%`;
    progressFillElement.style.width = `${progress}%`;
}

// Actualizar estados de los botones
function updateButtonStates() {
    // Deshabilitar botón anterior si estamos en la primera tarjeta
    if (currentCardIndex === 0) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = "0.5";
        prevBtn.style.cursor = "not-allowed";
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
    }
    
    // Deshabilitar botón siguiente si estamos en la última tarjeta
    if (currentCardIndex === totalCards - 1) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";
        nextBtn.style.cursor = "not-allowed";
        nextBtn.style.backgroundColor = "#95a5a6";
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
        nextBtn.style.backgroundColor = "#2c3e50";
    }
}

// Navegación con teclado
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowLeft':
            showPreviousCard();
            break;
        case 'ArrowRight':
            showNextCard();
            break;
        case ' ':
        case 'Enter':
            event.preventDefault();
            flipCard();
            break;
    }
});

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);