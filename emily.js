var i = 0;
var txt = 'Chatbot!!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

var currentTab = 0; // Current tab is set to be the first tab (0)
var reflexQuestion = 0;
var reflexCountdown = 30;
var reflexNextQuestion = false;
var name;
var answer;
var acceptableAnswers = ['a', 'b', 'c', 'd'];
var currentStep = 0;
showTab(currentTab); // Display the current tab

  var LETTERS = ['1','2','3','4','5','6','7','8','9','0'];
  var animations = {};
  var gameOn = true;
  var timeOffset = 20; //interval between letters starting, will be faster over time
  var DURATION = 5000;
  var main = document.getElementById('main');
  var rate = 1;
  var RATE_INTERVAL = .05; //playbackRate will increase by .05 for each letter... so after 20 letters, the rate of falling will be 2x what it was at the start
//beginMatrix();
function beginMatrix(){
  LETTERS.forEach(function(l) {
    animations[l] = [];
  });
  create();
  document.body.style.backgroundColor = "black";
  document.body.style.color = "#66FF00";
  document.body.boxSizing = "border-box";

  name = document.getElementById("fname").value;
  console.log(name);

  console.log(answer);
  //answer = document.getElementById("").innerHTML;
  var x = document.getElementById("regForm");

  x.style.display = "none";
  x = document.getElementById("myForm");
  x.style.display = "block";
  x = document.getElementsByClassName("form-container");
  for (var i = x.length - 1; i >= 0; i--) {
    x[i].style.display = "block";
  }
  console.log("matrux!");
  txt = 'Hello ' + name + ", I see you are currently being sold silly etiquette propaganda!\n\nNow I'm sure you were just playing along, otherwise why else would you have answered with " + answer +"? \n\nC'mon, you can tell me, what's your real answer?\n"
  txt += "A: As Needed\nB: Into a Spitoon\nC: Not In Mixed Company\nD: Never\n[A, B, C, D]\n"
  setTimeout(typeWriter, 10000);
}


function typeWriter() {
 //console.log(document.getElementsByClassName("form-container"));
 //console.log(document.getElementsByClassName("form-container")[0].style.font);
 //document.getElementsByClassName("form-container")[0].style.font = "Courier";
 // console.log(document.getElementById("msg").style.textAlign);
gameOn = false;
  document.getElementById("msg").style.textAlign = "left";
  if (i < txt.length) {
  //console.log(txt.charAt(i));
    document.getElementById("msg").value += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  else{
    document.getElementById("msg").value += "\n\n\n";
    i = 0;
    checkText();
  //  document.getElementById("msg").style.textAlign = "right";
  }
}
  //Create a letter element and setup its falling animation, add the animation to the active animation array, and setup an onfinish handler that will represent a miss. 
  function create() {
    var idx = Math.floor(Math.random() * LETTERS.length);
    var x = (Math.random() * 85) + 'vw';
    var container = document.createElement('div');
    var letter = document.createElement('span');
    var letterText = document.createElement('b');
    letterText.textContent = LETTERS[idx];
    letter.appendChild(letterText);
    container.appendChild(letter);
    main.appendChild(container);
    var animation = container.animate([
      {transform: 'translate3d('+x+',-2.5vh,0)'},
      {transform: 'translate3d('+x+',82.5vh,0)'}
    ], {
      duration: DURATION,
      easing: 'linear',
      fill: 'both'
    });
    
    animations[LETTERS[idx]].splice(0, 0, {animation: animation, element: container});
    rate = rate + RATE_INTERVAL;
    animation.playbackRate = rate;
    
    //If an animation finishes, we will consider that as a miss, so we will remove it from the active animations array and increment our miss count
    animation.onfinish = function(e) {
      var target = container;
      var char = target.textContent;
      main.removeChild(target);
                                      
     // animations[char].pop();
    }
    if(gameOn){
      setTimeout(create, timeOffset);
    }
  }

function checkText(){
  var innerHTML = document.getElementById("msg").value.split("\n");

 // console.log(innerHTML[innerHTML.length-2].match(answer));
 // console.log(innerHTML[innerHTML.length-2]);
  for (var i = acceptableAnswers.length - 1; i >= 0; i--) {
    if(innerHTML[innerHTML.length-2].includes(acceptableAnswers[i])){
      if(currentStep == 0){
        currentStep++;
        acceptableAnswers = ['y', 'n'];
        txt = "\nExcuse me, but what is going on here?\n\nOh nothing, I'm just saving another poor soul from enduring painful useless etiquette lessons.\n\nMy sincerest apologies " + name + ", is this very rude bot bothering you?\n[Y, N]\n"
      }else if(currentStep == 1){
        if(acceptableAnswers[i] == 'y'){
          txt = "\nI am so very sorry for this unnecessary rudeness you have experienced to-day.\nI hope it did not tarnish your experience here too badly.\n"
        }
        else{
          txt = "\nHaha! I told you, you are too uppity and no one has time for that.\nPlus, I'm cool."
        }
      }
      typeWriter();
      return;
    }
  }

  setTimeout(checkText, 2000);
  
  //console.log(document.getElementById("msg").value);
 // console.log(document.getElementById("msg").innerHTML);
}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("question");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("begin").style.display = "inline";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
  //console.log(x[n].getElementsByClassName("haiku"));
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

function handleReflexes(){
   var x = document.getElementsByClassName("reflexQuestions");

    x[reflexQuestion].style.display = "block";
    //document.getElementById(x[i].name).innerText = checkLine(x[i].value);
    goCountdown();
   // document.getElementById("reflexBtn").style.display = "none";

}

function goCountdown(){

  var x = document.getElementsByClassName("timer");
   x[0].innerHTML = reflexCountdown;

   if(reflexCountdown == 0){
    //stop
    x = document.getElementsByClassName("reflexQuestions");
    x[reflexQuestion].style.display = "none";
    document.getElementById("reflexBtn").style.display = "none";
    reflexNextQuestion = true;
   }
   else{
    reflexCountdown--;
    setTimeout(goCountdown,1000);
  }
}

function nextQuestion(){
  var x = document.getElementsByClassName("reflexQuestions");

  x[reflexQuestion].style.display = "none";
  reflexQuestion ++;
  x[reflexQuestion].style.display = "block";
  if(reflexQuestion == x.length - 1){
    document.getElementById("reflexBtn").style.display = "none";
    reflexNextQuestion = true;
  }
}

function handleHaiku(){
  var i;
  var x = document.getElementsByClassName("haiku");
  for (i = 0; i < x.length; i++) {
    //console.log("x: " + x[i].name);
  //  console.log("input: " + x[i].value);
    //console.log("label: " + document.getElementById(x[i].name).innerText);
    document.getElementById(x[i].name).innerText = checkLine(x[i].value);
  }

  setTimeout(handleHaiku, 3000);
}

function handleSelfPortrait(){
var x = document.getElementById("selfportrait");
  if(x != null){
  console.log("x: " + x.innerHTML);
    var value = x.value;
    var count = 0;
    var words = value.split(" ");
    for(var i = 0; i < words.length; i++){
      console.log(words[i]);
      if(words[i] != " " && words[i] != ""){
        count++;
      }
    }
  console.log("count: " + count);
  document.getElementById(x.name).innerHTML = count;
  }
  setTimeout(handleSelfPortrait, 3000);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("question");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    beginMatrix();
    //document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  var radioCheck, isRadio = false;
  x = document.getElementsByClassName("question");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:



    for (i = 0; i < y.length; i++) {
      //console.log(y[i].name);
     //console.log(y[i].type);
      if(y[i].type == "radio"){
        isRadio = true;
        console.log(y[i].innerText);
        if(y[i].checked == true){
          console.log(y[i].value);
          answer = document.getElementById(y[i].value).innerText;
          radioCheck = true;
        }
      }
      else if(i>0 && y[i-1].type == "radio"){
        // other text box so just skip
      }
      // If a field is empty...
      else if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    if(isRadio && !radioCheck){
      valid = false;
    }
  
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}




function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}