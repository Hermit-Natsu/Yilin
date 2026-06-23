// --- QUIZ DATA CONFIGURATION ---
const originalQuestions = [
    {
        id: "color",
        question: "What favorite color do we have in common?",
        choices: ["Green", "Red", "Purple", "White"],
        correct: "Green"
    },
    {
        id: "hungary_sentence",
        question: "Finish the sentence: I want to eat food, I am ______",
        choices: ["hungry", "Hungary", "starving"],
        correct: "Hungary"
    },
    {
        id: "buda_art",
        question: "Buda castle art: who is the artist with the hard to read art?",
        choices: ["László Iványi", "Mihály Munkácsy", "Pál Szinyei Merse", "József Rippl-Rónai", "Victor Vasarely"],
        correct: "László Iványi"
    },
    {
        id: "budapest_cake",
        question: "Which cake is known in Budapest?",
        choices: ["Chimney Cake", "Dobos Torte", "Eszterházy Cake", "Flódni"],
        correct: "Chimney Cake"
    }
];

const loveQuestion = {
    id: "love_me",
    question: "Do you love me?",
    choices: ["Yes", "YES", "No...", "Idk maybe?"],
    correct: "Idk maybe?"
};

let activeQuestions = [];
let currentQuestionIndex = 0;
let noClickCount = 0;
let maybeClickCount = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showScreen(screenId) {
    document.querySelectorAll('.card').forEach(card => card.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function checkPassword() {
    const answer = document.getElementById('password-input').value.trim().toLowerCase();
    if (answer === "lino") {
        showScreen('screen-start');
    } else {
        alert("Wrong answer! Hint: He has four legs and is adorable.");
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    noClickCount = 0;
    maybeClickCount = 0;
    
    const yesBtn = document.getElementById('yes-btn');
    const maybeBtn = document.getElementById('maybe-btn');
    const noBtn = document.getElementById('no-btn');

    yesBtn.classList.add('hidden');
    yesBtn.style.opacity = '0';
    
    maybeBtn.classList.remove('hidden');
    maybeBtn.innerText = "MAYBE";

    noBtn.style.position = 'static';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.transform = 'none';
    noBtn.style.zIndex = '10';

    let shuffledPool = shuffle([...originalQuestions]);
    activeQuestions = [...shuffledPool, loveQuestion];

    loadQuestion();
    showScreen('screen-quiz');
}

function loadQuestion() {
    const currentQ = activeQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQ.question;

    const choicesBox = document.getElementById('choices-box');
    choicesBox.innerHTML = ''; 

    let shuffledChoices = shuffle([...currentQ.choices]);

    shuffledChoices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.innerText = choice;
        button.onclick = () => handleAnswer(choice, currentQ.correct, currentQ.id, currentQ.question);
        choicesBox.appendChild(button);
    });
}

function handleAnswer(selected, correct, questionId, questionText) {
    if (selected === correct) {
        currentQuestionIndex++;
        if (currentQuestionIndex < activeQuestions.length) {
            loadQuestion();
        } else {
            showScreen('screen-proposal');
        }
    } else {
        alert("Oops! That's wrong. Back to the start page!");
        showScreen('screen-start');
    }
}

function handleMaybe() {
    maybeClickCount++;
    const maybeBtn = document.getElementById('maybe-btn');

    if (maybeClickCount === 1) {
        maybeBtn.innerText = "Are you sure? 🤔";
    } else if (maybeClickCount === 2) {
        maybeBtn.innerText = "Think again... 😉";
    } else if (maybeClickCount === 3) {
        maybeBtn.innerText = "Maybe means yes? 😏";
    } else if (maybeClickCount === 4) {
        maybeBtn.innerText = "One more time! ✨";
    } else if (maybeClickCount >= 5) {
        const yesBtn = document.getElementById('yes-btn');
        maybeBtn.classList.add('hidden');
        yesBtn.classList.remove('hidden');
        setTimeout(() => {
            yesBtn.style.opacity = '1';
        }, 50);
    }
}

function handleNo() {
    noClickCount++;

    // --- RESET THE ENTIRE TEST ON THE 10TH CLICK ---
    if (noClickCount >= 10) {
        alert("You failed the test! Back to the beginning page!");
        
        // Zero out all tracking elements safely
        currentQuestionIndex = 0;
        noClickCount = 0;
        maybeClickCount = 0;
        
        // Return directly back to the welcome main lobby screen
        showScreen('screen-start');
        return;
    }

    const noBtn = document.getElementById('no-btn');
    const container = noBtn.parentElement;

    const containerWidth = container.clientWidth || 300;
    const containerHeight = container.clientHeight || 220;
    const btnWidth = noBtn.offsetWidth || 85;
    const btnHeight = noBtn.offsetHeight || 42;

    const centerX = (containerWidth - btnWidth) / 2;
    const centerY = (containerHeight - btnHeight) / 2;
    
    const radius = 160; 

    const randomAngle = Math.random() * 2 * Math.PI;
    const randomX = centerX + radius * Math.cos(randomAngle);
    const randomY = centerY + radius * Math.sin(randomAngle);

    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = 'none'; 
    noBtn.style.zIndex = '99999';
}

function handleYes() {
    showScreen('screen-success');
}
