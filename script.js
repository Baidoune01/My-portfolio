// Matrix-style Background Animation
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("matrix-background").appendChild(canvas);

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters and setup
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        drops[i] = y * fontSize > canvas.height || Math.random() > 0.95 ? 0 : y + 1;
    });

    requestAnimationFrame(drawMatrix);
}
drawMatrix();

// Terminal Commands Configuration
const welcomeMessage = `
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║     ██████╗  █████╗ ██╗██████╗  ██████╗ ██╗   ██╗███╗   ██╗      ║
║     ██╔══██╗██╔══██╗██║██╔══██╗██╔═══██╗██║   ██║████╗  ██║      ║
║     ██████╔╝███████║██║██║  ██║██║   ██║██║   ██║██╔██╗ ██║      ║
║     ██╔══██╗██╔══██║██║██║  ██║██║   ██║██║   ██║██║╚██╗██║      ║
║     ██████╔╝██║  ██║██║██████╔╝╚██████╔╝╚██████╔╝██║ ╚████║      ║
║     ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝      ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

Welcome to my interactive terminal portfolio! Type 'help' to see available commands.

`;

const commands = {
    help: `
╔═════════════════════════════════════╗
║          Available Commands         ║
╚═════════════════════════════════════╝
┌─────────────────────────────────────┐
│ help     │ Show this help message   │
│ bio      │ About me                 │
│ skills   │ Technical expertise      │
│ projects │ View my work             │
│ contact  │ Get in touch             │
│ clear    │ Clear terminal           │
└─────────────────────────────────────┘`,
    bio: `
╔═══════════════════ ABOUT ME ═══════════════════╗

  🎓 BAIDOUNE Abderrahmane
  └─ 4th Year Computer Science Student
     
  🔐 Cybersecurity Enthusiast
  └─ Specializing in Penetration Testing
     
  💻 Full-Stack Developer
  └─ Passionate about Web Development & AI
     
  🌟 Always learning, always hacking!
  
╚═══════════════════════════════════════════════╝`,
    skills: `
╔═════════════════ TECHNICAL SKILLS ════════════════╗

  🔧 Programming Languages
  ├─▷ Python        ██████████  100%
  ├─▷ JavaScript    ██████████  100%
  ├─▷ GoLang        █████████░  90%
  ├─▷ Java          █████████░  90%
  └─▷ C++           ██████████  100%

  🌐 Web Technologies
  ├─▷ Nuxt.js       █████████░  90%
  ├─▷ Vue.js        █████████░  90%
  ├─▷ Node.js       ██████████  100%
  └─▷ Tailwind CSS  ████████░░  80%

  🤖 Artificial Intelligence
  ├─▷ Transformers  ██████████  100%
  ├─▷ CNNs          ██████████  100%
  └─▷ RNNs          ██████████  100%

  ☁️ Cloud & DevOps
  ├─▷ OpenStack     █████████░  90%
  └─▷ Databricks    ██████░░░░  60%

╚══════════════════════════════════════════════════╝`,
    projects: `
╔═════════════════ MY PROJECTS ════════════════╗

  🎓 AI-Classroom
  ├─ Educational platform using Nuxt.js & Azure AI
  ├─ Features: Real-time collaboration, AI tutoring
  └─ Tech: Vue.js, Node.js, Azure AI Services

  🗺️ Pathfinder
  ├─ AI-powered pathfinding visualization tool
  ├─ Features: Multiple algorithms, Real-time viz
  └─ Tech: Python, PyTorch, React

  📦 Key-Value Storage
  ├─ High-performance LSM-tree based storage API
  ├─ Features: ACID compliance, Custom indexing
  └─ Tech: GoLang, gRPC, RocksDB

  👁️ Site Surveillance
  ├─ Mining equipment monitoring platform
  ├─ Features: Real-time alerts, Analytics
  └─ Tech: Vue.js, WebSocket, Python

╚═══════════════════════════════════════════════╝`,
    contact: `
╔════════════════ CONTACT INFO ═══════════════╗

  📧 Email
  └─▷ Abderrahmane.BAIDOUNE@UM6P.MA

  📱 Phone
  └─▷ +2126**-******

  🔗 LinkedIn
  └─▷ linkedin.com/in/abderrahmane-baidoune

  💻 GitHub
  └─▷ github.com/baidoune01

╚═══════════════════════════════════════════════╝`,
};

// Terminal State Management
let commandHistory = [];
let historyIndex = -1;

// DOM Elements
const terminalOutput = document.getElementById("output");
const terminalInput = document.getElementById("command");

// Terminal Functions
function displayPrompt() {
    const promptHTML = `<span class="prompt"><span class="user">baidoune</span><span class="at">@</span><span class="host">portfolio</span>:<span style="color: #3465A4;">~</span>$</span> `;
    return promptHTML;
}

function displayOutput(command, response) {
    const commandLine = `${displayPrompt()}${command}\n`;
    const outputLine = `${response}\n`;
    terminalOutput.innerHTML += commandLine + outputLine;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCommand(command) {
    let response = commands[command.toLowerCase()] || `Command not found: ${command}`;

    if (command.toLowerCase() === "clear") {
        terminalOutput.innerHTML = "";
        return;
    }

    displayOutput(command, response);
}

// Event Listeners
terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const command = terminalInput.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            executeCommand(command);
        }
        terminalInput.value = "";
    }

    if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
        e.preventDefault();
    } else if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = "";
        }
        e.preventDefault();
    }
});

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Display welcome message on load
window.addEventListener('load', () => {
    terminalOutput.innerHTML = welcomeMessage;
});

// Focus input on terminal click
document.getElementById("terminal").addEventListener("click", () => {
    terminalInput.focus();
});