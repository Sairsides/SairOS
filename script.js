function updateTime() {
      
var currentTime = new Date().toLocaleString(); 
var timeText = document.querySelector("#timeText");
 timeText.innerHTML = currentTime

}

setInterval(updateTime,1000);


dragElement(document.getElementById("WelcomeWindow"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {

    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {

    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {

    document.onmouseup = null;
    document.onmousemove = null;
  }
}


var WelcomeWindow = document.querySelector("#WelcomeWindow")

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "block"
}

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(WelcomeWindow);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(WelcomeWindow);
});


var currentSelectedIcon = undefined;


function selectIcon(element) {
  element.classList.add("selected");
  currentSelectedIcon = element;
}


function deselectIcon(element) {
  element.classList.remove("selected");
  currentSelectedIcon = undefined;
}


function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(NotesWindow);
  } else {
    selectIcon(element);

  }
}


var notesIcon = document.querySelector(".desktop-icon");
notesIcon.addEventListener("click", function() {
  handleIconTap(notesIcon);
});


document.querySelector("#notesclose").addEventListener("click", function(e) {
  e.stopPropagation();
  closeWindow(NotesWindow);
  if (currentSelectedIcon) {
    deselectIcon(currentSelectedIcon);
  }
});

dragElement(document.querySelector("#NotesWindow"));

let biggestIndex = 10;

function openWindow(element) {
  element.style.display = "block";
  bringToFront(element);
}

function bringToFront(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

document.getElementById("WelcomeWindow").addEventListener("mousedown", function() {
  bringToFront(this);
});

document.getElementById("NotesWindow").addEventListener("mousedown", function() {
  bringToFront(this);
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    var rect = elmnt.getBoundingClientRect();
    
    if (elmnt.style.transform) {
      elmnt.style.transform = "none";
      elmnt.style.top = rect.top + "px";
      elmnt.style.left = rect.left + "px";
    }

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    var newTop = elmnt.offsetTop - pos2;
    var newLeft = elmnt.offsetLeft - pos1;

    if (newTop < 40) {
      newTop = 40;
    }

    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}