// Service Worker Register
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker is registered", registration);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  });
}

// Add to Home Screen
let deferredPrompt;
const addBtn = document.querySelector(".add-button");
if (addBtn) addBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (addBtn) addBtn.style.display = "block";

  addBtn.addEventListener("click", (e) => {
    if (addBtn) addBtn.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
