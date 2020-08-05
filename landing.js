var i = 0;
var txt = 'Chatbot!!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

var currentTab = 0; // Current tab is set to be the first tab (0)
var currentStep = 0;
showTab(currentTab); // Display the current tab



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
