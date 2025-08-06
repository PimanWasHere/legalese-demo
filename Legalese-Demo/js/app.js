document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const label = btn.textContent.trim();
      if (label === "Save Draft") {
        const content = document.querySelector("textarea")?.value || "";
        const title = document.title.replace(/\s+/g, "_");
        localStorage.setItem(`contract_${title}`, content);
        alert("Draft saved locally.");
      } else if (label === "Load Draft") {
        const title = document.title.replace(/\s+/g, "_");
        const stored = localStorage.getItem(`contract_${title}`);
        if (stored !== null) {
          document.querySelector("textarea").value = stored;
          alert("Draft loaded from localStorage.");
        } else {
          alert("No saved draft found.");
        }
      } else if (label === "Export Draft") {
        const content = document.querySelector("textarea")?.value || "";
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = document.title.replace(/\s+/g, "_") + ".txt";
        a.click();
      } else {
        alert(`Button clicked: ${label}`);
      }
    });
  });

  // Highlight nav
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("nav-active");
    }
  });
});

function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  if (username && password) {
    localStorage.setItem(`user_${username}`, password);
    alert("Account created! You can now log in.");
    window.location.href = "login.html";
  } else {
    alert("Please enter both username and password.");
  }
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const storedPassword = localStorage.getItem(`user_${username}`);
  if (storedPassword === password) {
    localStorage.setItem("currentUser", username);
    alert(`Welcome, ${username}!`);
    window.location.href = "profile.html";
  } else {
    alert("Invalid credentials.");
  }
}

function updateNavUser() {
  const currentUser = localStorage.getItem("currentUser");
  const nav = document.querySelector("nav .space-x-6");
  if (nav && currentUser) {
    const userEl = document.createElement("span");
    userEl.className = "text-sm text-gray-600";
    userEl.textContent = "👤 " + currentUser;
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.className = "text-sm text-red-600 underline ml-4";
    logoutBtn.onclick = () => {
      localStorage.removeItem("currentUser");
      alert("Logged out");
      window.location.href = "login.html";
    };
    nav.appendChild(userEl);
    nav.appendChild(logoutBtn);
  }
}

function protectRoutes() {
  const protectedPages = ["profile.html"];
  const current = window.location.pathname.split("/").pop();
  const loggedIn = !!localStorage.getItem("currentUser");
  if (protectedPages.includes(current) && !loggedIn) {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
  }
}

updateNavUser();
protectRoutes();
