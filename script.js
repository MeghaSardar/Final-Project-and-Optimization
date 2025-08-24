let currentLesson = null;
let stepIndex = 0;



// Practice steps
const practiceSteps = {
  1: [
    "Step 1: Draw a straight line across the canvas.",
    "Step 2: Try drawing circles of different sizes.",
    "Step 3: Draw squares and rectangles neatly.",
    "Step 4: Combine shapes (like a house using square + triangle).",
    "Step 5: Practice repeating patterns (zig-zag, waves, dots)."
  ],
  2: [
    "Step 1: Pick the red color and draw a circle.",
    "Step 2: Pick yellow and draw a circle next to it.",
    "Step 3: Mix red + yellow → Try drawing an orange circle.",
    "Step 4: Use blue + yellow to make green shapes.",
    "Step 5: Practice shading by pressing lightly and harder."
  ],
  3: [
    "Step 1: Draw a big circle for the character’s head.",
    "Step 2: Add two smaller circles for eyes.",
    "Step 3: Draw a smiling mouth under the eyes.",
    "Step 4: Add hair or accessories (hat, glasses, bow).",
    "Step 5: Color your character and make it unique!"
  ]
};

// Navigation
function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// Lessons
function openLesson(lessonNumber) {
  currentLesson = lessonNumber;
  let title = "", content = "";
  if(lessonNumber === 1){
    title = "Lesson 1: Basics";
    content = "In this lesson, you will learn how to draw lines, circles, and squares. Practice simple strokes and patterns before moving on.";
  } else if(lessonNumber === 2){
    title = "Lesson 2: Colors";
    content = "Here you will explore primary and secondary colors, understand how to mix them, and use brushes for shading.";
  } else if(lessonNumber === 3){
    title = "Lesson 3: Fun Characters";
    content = "This lesson helps you create fun cartoon characters step by step using shapes, expressions, and colors.";
  }
  document.getElementById("lessonTitle").innerText = title;
  document.getElementById("lessonContent").innerText = content;
  navigateTo("lessonDetail");
}

// Quiz
let currentQuizIndex = 0;
let currentLessonQuiz = [];
let score = 0;

function startQuiz(lesson) {
  navigateTo("quizPage");

  // ✅ Your existing 5 Qs per session go here:
  const quizzes = {
    1: [
      { q: "Which tool is used for freehand drawing?", options: ["Pencil", "Eraser", "Rectangle"], ans: "Pencil" },
      { q: "Which tool is used to draw straight lines?", options: ["Brush", "Line Tool", "Circle"], ans: "Line Tool" },
      { q: "Which shape has 4 equal sides?", options: ["Triangle", "Square", "Circle"], ans: "Square" },
      { q: "What is the default background color of canvas?", options: ["White", "Black", "Blue"], ans: "White" },
      { q: "Which tool removes drawn parts?", options: ["Pen", "Eraser", "Bucket"], ans: "Eraser" }
    ],
    2: [
      { q: "What are the three primary colors?", options: ["Red, Blue, Green", "Red, Blue, Yellow", "Blue, Green, Orange"], ans: "Red, Blue, Yellow" },
      { q: "Mixing red and blue makes?", options: ["Green", "Purple", "Orange"], ans: "Purple" },
      { q: "Mixing yellow and blue makes?", options: ["Green", "Purple", "Orange"], ans: "Green" },
      { q: "Which of these is a secondary color?", options: ["Purple", "Yellow", "Blue"], ans: "Purple" },
      { q: "Black and white are considered?", options: ["Colors", "Shades", "Tints"], ans: "Shades" }
    ],
    3: [
      { q: "Cartoon eyes are usually?", options: ["Realistic", "Big & expressive", "Invisible"], ans: "Big & expressive" },
      { q: "Which tool is best for outlining characters?", options: ["Brush", "Eraser", "Pen/Marker"], ans: "Pen/Marker" },
      { q: "What do speech bubbles represent?", options: ["Thoughts/Dialogue", "Shapes", "Background"], ans: "Thoughts/Dialogue" },
      { q: "What is important for cartoon expressions?", options: ["Body posture", "Facial features", "Background"], ans: "Facial features" },
      { q: "Which drawing style is simple and fun?", options: ["Cartoon", "Realism", "Abstract"], ans: "Cartoon" }
    ]
  };

  currentLessonQuiz = quizzes[lesson];
  currentQuizIndex = 0;
  score = 0;
  showQuestion();
}


function showQuestion() {
  const quizBox = document.getElementById("quizForm");
  const resultBox = document.getElementById("quizResult");
  resultBox.textContent = "";

  if (currentQuizIndex < currentLessonQuiz.length) {
    const qData = currentLessonQuiz[currentQuizIndex];
    quizBox.innerHTML = `
      <h3>${qData.q}</h3>
      ${qData.options.map(opt => `
        <button type="button" onclick="checkAnswer('${opt}')">${opt}</button>
      `).join("")}
    `;
  } else {
    // Final score display
    quizBox.innerHTML = `<h3>🎉 Quiz Completed!</h3>`;
    document.getElementById("quizResult").textContent = `Your Score: ${score} / ${currentLessonQuiz.length}`;
  }
}

function checkAnswer(selected) {
  const qData = currentLessonQuiz[currentQuizIndex];
  const resultBox = document.getElementById("quizResult");

  if (selected === qData.ans) {
    score++;
    resultBox.textContent = "✅ Correct!";
    resultBox.style.color = "green";
  } else {
    resultBox.textContent = `❌ Wrong! Correct Answer: ${qData.ans}`;
    resultBox.style.color = "red";
  }

  currentQuizIndex++;
  setTimeout(showQuestion, 1500); // show next after 1.5 sec
}

// Practice
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", ()=> drawing=true);
canvas.addEventListener("mouseup", ()=> {drawing=false; ctx.beginPath();});
canvas.addEventListener("mousemove", draw);

function draw(e){
  if(!drawing) return;
  ctx.lineWidth = document.getElementById("brushSize").value;
  ctx.strokeStyle = document.getElementById("colorPicker").value;
  ctx.lineCap = "round";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function clearCanvas(){ ctx.clearRect(0,0,canvas.width,canvas.height); }

function saveDrawing() {
  const canvas = document.getElementById('drawCanvas');
  const gallery = document.getElementById('galleryGrid');
  if (!canvas || !gallery) return;

  // Save to gallery (append image)
  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  gallery.appendChild(img);

  // Clear canvas
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Show notification (create it if it doesn't exist)
  let note = document.getElementById('notification');
  if (!note) {
    note = document.createElement('div');
    note.id = 'notification';
    note.textContent = ' Saved to Gallery! 🎉';
    document.body.appendChild(note);
  }
  note.classList.add('show');
  setTimeout(() => note.classList.remove('show'), 2000);
}


function startPractice(lesson) {
  currentLesson = lesson;
  stepIndex = 0;
  showStep();
  navigateTo("practice");
}

function showStep() {
  const steps = practiceSteps[currentLesson];
  document.getElementById("practiceInstruction").innerText = steps[stepIndex];
}

function nextStep() {
  const steps = practiceSteps[currentLesson];
  if (stepIndex < steps.length - 1) {
    stepIndex++;
    showStep();
  } else {
    document.getElementById("practiceInstruction").innerHTML = `
      🎉 Great job! You finished this practice session!<br><br>
      <button onclick="navigateTo('lessonDetail')">🔙 Back to Lesson</button>
      <button onclick="startQuiz(currentLesson)">📝 Take Quiz</button>
    `;
  }
}
