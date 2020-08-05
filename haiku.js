var i = 0;
var txt = 'Chatbot!!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var score = 0;
var answers = ["","", "", "", "", ""];
var currentTab = 0; // Current tab is set to be the first tab (0)
var reflexQuestion = 0;
var reflexCountdown = 30;
var reflexNextQuestion = false;
var name;
var answer;
var acceptableAnswers = ['a', 'b', 'c', 'd'];
var currentStep = 0;
showTab(currentTab); // Display the current tab


function handleHaiku(){
  var i;
  var x = document.getElementsByClassName("haiku");
  for (i = 0; i < x.length; i++) {
    console.log("x: " + x[i].name);
 //   console.log("input: " + x[i].value);
  //  console.log("label: " + document.getElementById(x[i].name).innerText);
    document.getElementById(x[i].name).innerText = checkLine(x[i].value);
  }
  var haiku = true;
  for (var i = x.length - 1; i >= 0; i--) {
    var length = 5;
    if(i == 1){
      length = 7;
    }
    console.log("length " + length);
    console.log(document.getElementById(x[i].name).innerText);
    if(document.getElementById(x[i].name).innerText != length){
      haiku = false;
    }
  }
  if(haiku == true){
    document.getElementById("button").style.display = "inline";
  }else{

    document.getElementById("button").style.display = "none";
  }
  setTimeout(handleHaiku, 3000);
}


function syllables(word) {
  word = word.toLowerCase();
  //Logger.log('Word: "%s"', word);
  if(word == "") { return 0; }
  if(word.length <= 3) { return 1; }
    return word.replace(/(?:[^laeiouy]es|ed|lle|[^laeiouy]e)$/, '')
               .replace(/^y/, '')
               .match(/[aeiouy]{1,2}/g).length;
}

function checkLine(sentence){
  //Logger.log('Sentence : "%s"', sentence);
  var count = 0;
  var words = sentence.split(" ");
  //Logger.log('Words : "%s"', words);
  
  words.map(function(val, key){
    count += syllables(val)
  });
  console.log(count);
  return count;
  
}
function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("question");
  x[n].style.display = "block";
    console.log("hi");
  console.log(x[n].getElementsByClassName("haiku"));
  if(x[n].getElementsByClassName("haiku").length > 0){
    handleHaiku();
  }else{
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("bot").style.display = "inline";
    document.getElementById("button").style.display = "inline";
  } else {
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("button").style.display = "none";
    document.getElementById("bot").style.display = "none";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
  console.log("hi");
  console.log(x[n].getElementsByClassName("haiku"));
  if(x[n].getElementsByClassName("haiku").length > 0){
    handleHaiku();
  }
  else if (x[n].getElementsByClassName("selfportrait").length > 0){
    handleSelfPortrait();
  }
  else if (x[n].getElementsByClassName("reflexQuestions").length > 0){
    console.log("reflex?");
    handleReflexes();
  }
}
}
