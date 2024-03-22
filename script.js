const questions = [
    {
        question: "Is this a fake news?",
        imgPath: "images\\alien.jpg",
        answers: true,
        explanation1: "Who?",
        explanation2: "Who wrote it? Check for the author’s name.In this case, Weekly World News is an American urban tabloid that has ceased publication, famous for reporting anecdotes, urban legends, and spoof news ",
    },
    {
        question: "Is this a fake news?",
        imgPath: "images\\unreliableAuthor.jpg",
        answers: true,
        explanation1: "Where?",
        explanation2: "Did I find this on Social Media? Social Media platforms are not news organizations. These are platforms for people to create and/or share content. Monitoring of fake news is virtually non-existent on social media platforms and blogs. They use algorithms to curate content that would be of interest to you, creating a personal echo chamber. Be cautious of videos/photos as images may have been manipulated.",
    }
]

const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const image = document.getElementById("image");
const explanation = document.getElementById("explaination");
let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showExplanation() {
    let currentQuestion = questions[currentQuestionIndex];
    let title = document.querySelector("#explaination");
    title.innerHTML = "Tips:";
    title.style.fontSize = "40px";
    title.style.fontWeight = "bold";
    title.style.textAlign = "center";
    // insert the title to the class "quiz" at fisrt position
    document.querySelector(".quiz").insertBefore(title, document.querySelector(".quiz").firstChild);
    let explanation1 = currentQuestion.explanation1;
    let explanation2 = currentQuestion.explanation2;
    let explanation = explanation1 + "<br><br>" + explanation2;
    question.innerHTML = explanation;
    question.style.marginTop = "20px";
    //center the qeustion and make it font larger
    question.style.textAlign = "center";
    question.style.fontSize = "25px";
    image.src = "";
    nextButton.style.display = "block";


}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    question.innerHTML = questionNo + ". " + currentQuestion.question;
    image.src = currentQuestion.imgPath;
    //adjust he image size
    if (currentQuestionIndex === 1) {
        document.querySelector(".app").style.maxWidth = "1000px";
    } else {
        image.style.width = "90%";
    }

    const buttonYes = document.createElement("button");
    buttonYes.innerHTML = "Yes";
    buttonYes.classList.add("btn");
    buttonYes.addEventListener("click", selectAnswer);
    answerButtons.appendChild(buttonYes);
    const buttonNo = document.createElement("button");
    buttonNo.innerHTML = "No";
    buttonNo.classList.add("btn");

    buttonNo.addEventListener("click", selectAnswer);
    answerButtons.appendChild(buttonNo);

}

function resetState() {
    //delete the explanation for let title = document.querySelector("#explaination");
    let title = document.querySelector("#explaination");
    title.innerHTML = "";
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.innerHTML === "Yes" ? true : false;
    if (isCorrect)
        selectedBtn.classList.add("correct");
    else
        selectedBtn.classList.add("wrong");

    Array.from(answerButtons.children).forEach(button => {

        if (button.innerHTML === "Yes") {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });
    showExplanation();
    nextButton.style.display = "block";
}

function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        //Refresh the page
        location.reload();
        
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNext();
    } else {
        nextButton.innerHTML = "Restart";
        nextButton.addEventListener("click", startQuiz);
    }
});

startQuiz();