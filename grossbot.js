flashBanner();
flashConspiracy();
var i = 0;
beginGrossBot();
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function flashBanner(){
if (document.getElementById("banner1").style.display == "none") {
    document.getElementById("banner2").style.display = "none";
    document.getElementById("banner1").style.display = "inline";
  } else {
    document.getElementById("banner2").style.display = "inline";
    document.getElementById("banner1").style.display = "none";
  }
  setTimeout(flashBanner, 1000);
}

function flashConspiracy(){
if (document.getElementById("conspiracy1").style.display == "none") {
    document.getElementById("conspiracy2").style.display = "none";
    document.getElementById("conspiracy1").style.display = "inline";
  } else {
    document.getElementById("conspiracy2").style.display = "inline";
    document.getElementById("conspiracy1").style.display = "none";
  }
  setTimeout(flashConspiracy, 900);
}
function beginGrossBot(){
  console.log("matrux!");
  txt = 'Hello there' + ", I see you are currently being sold silly etiquette propaganda!\n\n\n\nC'mon, you can tell me, what's your real answer?\n"
  txt += "A: As Needed\nB: Into a Spitoon\nC: Not In Mixed Company\nD: Never\n[A, B, C, D]\n"
  setTimeout(typeWriter, 50);
}


function typeWriter() {
 //console.log(document.getElementsByClassName("form-container"));
 //console.log(document.getElementsByClassName("form-container")[0].style.font);
 //document.getElementsByClassName("form-container")[0].style.font = "Courier";
 // console.log(document.getElementById("msg").style.textAlign);

  document.getElementById("msg").style.textAlign = "left";
  if (i < txt.length) {
  //console.log(txt.charAt(i));
    document.getElementById("msg").value += txt.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
  else{
    document.getElementById("msg").value += "\n\n\n";
    i = 0;
    checkText();
  //  document.getElementById("msg").style.textAlign = "right";
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