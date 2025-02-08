document.addEventListener("DOMContentLoaded", () => {
    const startPage = document.getElementById("start-page");
    const quizPage = document.getElementById("quiz-page");
    const questionPage = document.getElementById("question-page");
    const finalPage = document.getElementById("final-page");
    const questionText = document.getElementById("question-text");
    const answerBox = document.getElementById("answer-box");
    const feedback = document.getElementById("feedback");
    const images = document.querySelectorAll(".image-container img");
    const questionImage = document.createElement("img");
    questionImage.classList.add("question-image");
    questionPage.appendChild(questionImage);

    // Create the back arrow
    const backButton = document.createElement("div");
    backButton.classList.add("back-arrow");
    backButton.innerHTML = "&#8592;";
    backButton.onclick = () => {
        questionPage.classList.add("hidden");
        quizPage.classList.remove("hidden");
    };
    questionPage.appendChild(backButton);

   

    const questions = [
        "What is my favorite color?",
        "Where did we first meet?",
        "What is my favorite food?",
        "What is the first gift I ever gave you?",
        "What is the exact date we became a couple?",
        "What is the first movie we ever watched together?",
        "What was the first thing we did together when we met?",
        "What is something I always do that makes you smile?",
        "What do I always call you when I text you?",
        "How many months have we been together?"
    ];

    const answers = [
        "Light Blue",
        "School",
        "Chicken",
        "Pillow",
        "27.05.2022",
        "Morbius",
        "Vaped",
        "Cringe",
        "Girl",
        "32"
    ];

    let currentQuestionIndex = -1;
    let remainingQuestions = [...Array(10).keys()];

    window.startQuiz = () => {
        startPage.classList.add("hidden");
        quizPage.classList.remove("hidden");
    };

    window.askQuestion = (index) => {
        currentQuestionIndex = index;
        questionText.textContent = questions[index];
        answerBox.value = "";
        feedback.textContent = "";
        questionImage.src = images[index].src;
        questionImage.style.display = "block";
        questionImage.style.width = "300px";
        questionImage.style.height = "auto";
        questionImage.style.objectFit = "contain";
        questionImage.style.marginTop = "20px";
        questionImage.style.display = "block";
        questionImage.style.marginLeft = "auto";
        questionImage.style.marginRight = "auto";
        quizPage.classList.add("hidden");
        questionPage.classList.remove("hidden");
    };

    window.checkAnswer = () => {
        if (answerBox.value.trim().toLowerCase() === answers[currentQuestionIndex].toLowerCase()) {
            remainingQuestions = remainingQuestions.filter(q => q !== currentQuestionIndex);
            images[currentQuestionIndex].style.display = "none";
            
            if (remainingQuestions.length === 0) {
                questionPage.classList.add("hidden");
                finalPage.classList.remove("hidden");
                // Play sound when final page appears
            let audio = new Audio("100roosiannikile.mp3"); // Change this to your actual file name
            audio.loop = true;
            audio.play();
            } else {
                questionPage.classList.add("hidden");
                quizPage.classList.remove("hidden");
            }
        } else {
            feedback.textContent = "Wrong answer! Try again.";
        }
    };

    // Allow Enter key to submit answers
    answerBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // Randomly scatter images without overlapping
    const placedPositions = [];
    images.forEach(img => {
        let top, left;
        let overlapping;
        do {
            top = Math.random() * 70;
            left = Math.random() * 80;
            overlapping = placedPositions.some(pos => 
                Math.abs(pos.top - top) < 10 && Math.abs(pos.left - left) < 10);
        } while (overlapping);
        placedPositions.push({ top, left });
        img.style.position = "absolute";
        img.style.top = `${top}%`;
        img.style.left = `${left}%`;
        img.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    });
});
