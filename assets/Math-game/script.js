
const firebaseConfig = {

  apiKey: "AIzaSyBFM9xTKot0r-Yz4wTm4sS7Zl3U1eJyfLQ",

  authDomain: "math-game-5c97f.firebaseapp.com",

  databaseURL: "https://math-game-5c97f-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "math-game-5c97f",

  storageBucket: "math-game-5c97f.appspot.com",

  messagingSenderId: "779407522249",

  appId: "1:779407522249:web:5ad841fc9d2df4b825d018",

  measurementId: "G-68Q5Y2BN94"

};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();
// Define variables
var score = 0;
var currentQuestion = {};
var availableQuestions = [];
var options = document.getElementsByClassName("option");

// Define math functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

// Define question generation function
function generateQuestion() {
  // Define available operators and ranges
  var operators = [add, subtract, multiply];
  var ranges = [
    [1, 10],
    [1, 10],
    [1, 10]
  ];

  // Choose a random operator and range
  var operator = operators[getRandomInt(0, operators.length - 1)];
  var range = ranges[getRandomInt(0, ranges.length - 1)];
  // Generate random operands and answer
  var operand1 = getRandomInt(range[0], range[1]);
  var operand2 = getRandomInt(range[0], range[1]);
  var answer = operator(operand1, operand2);

  // Return question object
  return {
    question: operand1 + " " + operator.name + " " + operand2,
    options: [
      answer,
      getRandomInt(answer - 5, answer + 5),
      getRandomInt(answer - 10, answer + 10),
      getRandomInt(answer - 15, answer + 15)
        ].sort(() => Math.random() - 0.5),
        answer: answer
        };
      }
  
  // Define function to start game
  function startGame() {
  // Reset score and available questions
  score = 0;
  availableQuestions = [];
  
  // Add questions to available questions array
  for (var i = 0; i < 99999; i++) {
  availableQuestions.push(generateQuestion());
  }
  
  // Call function to set up first question
  setNextQuestion();
  }
  
  // Define function to set up next question
  function setNextQuestion() {
  // Remove selected option class from all options
  for (var i = 0; i < options.length; i++) {
  options[i].classList.remove("selected");
  }
  
  // Choose a random question from available questions
  var questionIndex = getRandomInt(0, availableQuestions.length - 1);
  currentQuestion = availableQuestions[questionIndex];
  availableQuestions.splice(questionIndex, 1);
  
  // Set question text and option texts
  document.getElementById("question").innerHTML = currentQuestion.question;
  for (var i = 0; i < options.length; i++) {
  options[i].innerHTML = currentQuestion.options[i];
  }
  
  // Add click event listener to options
  for (var i = 0; i < options.length; i++) {
  options[i].addEventListener("click", selectOption);
  }
  }
  
  // Define function to handle option selection
  function selectOption() {
    // Check if selected option is correct
    if (this.innerHTML == currentQuestion.answer) {
      score++;
      document.getElementById("score").innerHTML = "Score: " + score;
      this.classList.add("selected");
      setTimeout(setNextQuestion, 1);
    } else {
      // Prompt user for name and store score in Firebase
      var name = prompt("Please enter your name:");
      if (name != null && name.trim() != "") {
        var database = firebase.database();
        database.ref('scores').push({
          name: name.trim(),
          score: score,
          timestamp: Date.now()
        });
      }
      
      // Display final score and remove event listeners from options
      document.getElementById("score").innerHTML = "Final Score: " + score;
      for (var i = 0; i < options.length; i++) {
        if (options[i].innerHTML == currentQuestion.answer) {
          options[i].classList.add("selected");
        }
        options[i].removeEventListener("click", selectOption);
      }
      
      // Display score table
      var database = firebase.database();
      var scoresRef = database.ref('scores').orderByChild('score').limitToLast(10);
      scoresRef.once('value', function(snapshot) {
        var tableBody = "";
        snapshot.forEach(function(childSnapshot) {
          var data = childSnapshot.val();
          tableBody += "<tr><td>" + data.name + "</td><td>" + data.score + "</td></tr>";
        });
        document.getElementById("scoreTableBody").innerHTML = tableBody;
      }, function(error) {
        console.error("Error getting scores: ", error);
      });
    }
  }
  var database = firebase.database();
  var scoresRef = database.ref('scores').orderByChild('score').limitToLast(10);
  scoresRef.once('value', function(snapshot) {
    var tableBody = "";
    snapshot.forEach(function(childSnapshot) {
      var data = childSnapshot.val();
      tableBody = "<tr><td>" + data.name + "</td><td>" + data.score + "</td></tr>" + tableBody;
    });
    document.getElementById("scoreTableBody").innerHTML = tableBody;
    document.getElementById("scoreTable").style.display = "";
  });
  
  // Call function to start game
  startGame();
