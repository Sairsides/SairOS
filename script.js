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

function maximizeWindow(element, iframeId, heightWrapperId) {
  const iframeEl = document.getElementById(iframeId);
  const wrapperEl = document.getElementById(heightWrapperId);

  if (element.style.width === "100vw") {

    element.style.width = element.id === "CalcWindow" ? "260px" : element.id === "SettingsWindow" ? "320px" : element.id === "PortfolioWindow" ? "700px" : "500px";
    element.style.height = "auto";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
    

    if (iframeEl) iframeEl.style.height = "450px";
    if (wrapperEl && element.id === "PortfolioWindow") wrapperEl.style.height = "450px";
    if (wrapperEl && element.id === "NotesWindow") wrapperEl.style.height = "300px";
    

    const textareaEl = element.querySelector("textarea");
    if (textareaEl) textareaEl.style.height = "200px";
    
    if (element.id === "CalcWindow" && wrapperEl) {
      wrapperEl.style.height = "auto";
      const calcButtons = wrapperEl.querySelectorAll("button");
      calcButtons.forEach(btn => btn.style.height = "auto");
    }
  } else {

    element.style.transform = "none";
    element.style.top = "40px"; 
    element.style.left = "0px";
    element.style.width = "100vw";
    element.style.height = "calc(100vh - 40px)";
    

    if (iframeEl) iframeEl.style.height = "calc(100vh - 76px)";
    if (wrapperEl && element.id === "PortfolioWindow") wrapperEl.style.height = "calc(100vh - 76px)";
    

    if (wrapperEl && element.id === "NotesWindow") {
      wrapperEl.style.height = "calc(100vh - 65px)";
      const textareaEl = element.querySelector("textarea");
      if (textareaEl) textareaEl.style.height = "calc(100vh - 150px)";
    }
    
    if (element.id === "CalcWindow" && wrapperEl) {
      wrapperEl.style.height = "calc(100vh - 140px)";
      const calcButtons = wrapperEl.querySelectorAll("button");
      calcButtons.forEach(btn => btn.style.height = "100%");
    }
  }
}


window.addEventListener("DOMContentLoaded", function() {
  const bootScreen = document.getElementById("bootScreen");
  const startPrompt = document.getElementById("startPrompt");
  const bootContent = document.getElementById("bootContent");
  const bootLogs = document.getElementById("bootLogs");
  const loginPrompt = document.getElementById("loginPrompt");
  const typingUser = document.getElementById("typingUser");
  const bootSound = document.getElementById("bootSound");

  if (!bootScreen || !startPrompt) return;


  bootScreen.addEventListener("click", function startBoot() {

    bootScreen.removeEventListener("click", startBoot);
    

    startPrompt.style.display = "none";
    bootContent.style.display = "block";


    if (bootSound) {
      bootSound.volume = 0.59;
      bootSound.play().catch(err => console.log("Audio play blocked: ", err));
    }


    setTimeout(printNextLine, 300);
  });

  const logs = [
    "SairOS Loader v2.0.0 initializing core components...",
    "[  OK  ] Checking archive integrity...",
    "[  OK  ] Mounting root filesystem partition sectors...",
    "[  OK  ] Starting virtual sandbox security layer variables...",
    "[  OK  ] Mapping multi-tasking workspace windows context layers...",
    "[ WARN ] Local configuration out of sync... Attempting automatic correction.",
    "[  OK  ] GitHub Pages server handshake confirmed successfully.",
    "[  OK  ] Synchronizing SairOS desktop core resources...",
    "         - CalcWindow initialized... [ Ready ]",
    "         - NotesWindow initialized... [ Ready ]",
    "         - SettingsWindow initialized... [ Ready ]",
    "         - PortfolioWindow initialized... [ Ready ]",
    "[  OK  ] System audio driver card configuration allocated.",
    "[  OK  ] System records and user environments verified.",
    "Loading authentication profile fields..."
  ];

  let lineIndex = 0;

  function printNextLine() {
    if (lineIndex < logs.length) {
      let line = logs[lineIndex];
      line = line.replace("[  OK  ]", "<span style='color:#4af626; font-weight:bold;'>[  OK  ]</span>");
      line = line.replace("[ WARN ]", "<span style='color:#ffbd2e; font-weight:bold;'>[ WARN ]</span>");
      
      bootLogs.innerHTML += line + "<br>";
      lineIndex++;
      
      const nextDelay = Math.random() * 200 + 80;
      setTimeout(printNextLine, nextDelay);
    } else {
      setTimeout(startLoginSequence, 400);
    }
  }

  function startLoginSequence() {
    loginPrompt.style.display = "flex";
    const username = "Sair";
    let charIndex = 0;

    function typeUsername() {
      if (charIndex < username.length) {
        typingUser.textContent += username.charAt(charIndex);
        charIndex++;
        setTimeout(typeUsername, 200);
      } else {
        bootLogs.innerHTML += "<br><span style='color:#4af626;'>sair@sairos:~$ password: </span>******** (none)";
        bootLogs.innerHTML += "<br><br><span style='color:#4af626; font-weight:bold;'>Access Granted. Welcome back, Sair.</span>";
        
        setTimeout(function() {
          bootScreen.style.opacity = "0";
          bootScreen.style.visibility = "hidden";
        }, 1200);
      }
    }
    setTimeout(typeUsername, 500);
  }
});
