function updateTime() {
  const currentTime = new Date().toLocaleString(); 
  const timeText = document.querySelector("#timeText");
  if (timeText) timeText.innerHTML = currentTime;
}
updateTime();
setInterval(updateTime, 1000);

let currentSelectedIcon = undefined;
const WelcomeWindow = document.querySelector("#WelcomeWindow");
const NotesWindow = document.querySelector("#NotesWindow");
const CalcWindow = document.querySelector("#CalcWindow");
const SettingsWindow = document.querySelector("#SettingsWindow");
const PortfolioWindow = document.querySelector("#PortfolioWindow");

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
    if (element.id === "calcIcon") openWindow(CalcWindow);
    if (element.id === "notesIcon") openWindow(NotesWindow);
  } else {
    if (currentSelectedIcon) deselectIcon(currentSelectedIcon);
    selectIcon(element);
  }
}

let biggestIndex = 10;

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "block";
  bringToFront(element);
}

function bringToFront(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

const notesIcon = document.querySelector("#notesIcon");
const calcIcon = document.querySelector("#calcIcon");
const settingsIcon = document.querySelector("#settingsIcon");
const portfolioIcon = document.querySelector("#portfolioIcon");

const iconSetup = [
  { icon: notesIcon, window: NotesWindow },
  { icon: calcIcon, window: CalcWindow },
  { icon: settingsIcon, window: SettingsWindow },
  { icon: portfolioIcon, window: PortfolioWindow }
];

iconSetup.forEach(item => {
  if (item.icon) {
    item.icon.addEventListener("click", function() {
      if (currentSelectedIcon) deselectIcon(currentSelectedIcon);
      selectIcon(item.icon);
    });
    item.icon.addEventListener("dblclick", function() {
      deselectIcon(item.icon);
      if (item.window) openWindow(item.window);
    });
  }
});

if (WelcomeWindow) WelcomeWindow.addEventListener("mousedown", function() { bringToFront(this); });
if (NotesWindow) NotesWindow.addEventListener("mousedown", function() { bringToFront(this); });
if (CalcWindow) CalcWindow.addEventListener("mousedown", function() { bringToFront(this); });
if (SettingsWindow) SettingsWindow.addEventListener("mousedown", function() { bringToFront(this); });
if (PortfolioWindow) PortfolioWindow.addEventListener("mousedown", function() { bringToFront(this); });

const closeSelectors = [
  { button: "#notesclose", target: NotesWindow },
  { button: "#welcomeclose", target: WelcomeWindow },
  { button: "#calcclose", target: CalcWindow },
  { button: "#settingsclose", target: SettingsWindow },
  { button: "#portfolioclose", target: PortfolioWindow }
];

closeSelectors.forEach(item => {
  const btn = document.querySelector(item.button);
  if (btn && item.target) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      closeWindow(item.target);
    });
  }
});

const welcomeOpenBtn = document.querySelector("#welcomeopen");
if (welcomeOpenBtn && WelcomeWindow) {
  welcomeOpenBtn.addEventListener("click", function() {
    openWindow(WelcomeWindow);
  });
}

const calcDisplay = document.querySelector("#calcDisplay");

window.pressCalc = function(value) {
  if (!calcDisplay) return;
  if (calcDisplay.value === "0" && value !== ".") {
    calcDisplay.value = value;
  } else {
    calcDisplay.value += value;
  }
};

window.clearCalc = function() {
  if (calcDisplay) calcDisplay.value = "0";
};

window.calculateResult = function() {
  if (!calcDisplay) return;
  try {
    calcDisplay.value = eval(calcDisplay.value);
  } catch (error) {
    calcDisplay.value = "Error";
    setTimeout(clearCalc, 1500);
  }
};

window.changeTheme = function(imagePath) {
  document.body.style.backgroundImage = "url('" + imagePath + "')";
};

function dragElement(elmnt) {
  if (!elmnt) return;
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = document.getElementById(elmnt.id + "header");
  
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    const rect = elmnt.getBoundingClientRect();
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

    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

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

dragElement(WelcomeWindow);
dragElement(NotesWindow);
dragElement(CalcWindow);
dragElement(SettingsWindow);
dragElement(PortfolioWindow);

function minimizeWindow(element) {
  element.style.display = "none";
}

function maximizeWindow(element) {
  if (element.style.width === "100vw") {
    // Restore window back to standard desktop sizes if already maximized
    element.style.width = element.id === "CalcWindow" ? "260px" : element.id === "SettingsWindow" ? "320px" : "500px";
    element.style.height = "auto";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
  } else {
    // Expand to full screen dimensions instantly
    element.style.transform = "none";
    element.style.top = "40px"; // Sits perfectly below your top panel bar
    element.style.left = "0px";
    element.style.width = "100vw";
    element.style.height = "calc(100vh - 40px)";
  }
}
