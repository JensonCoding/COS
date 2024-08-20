function showToast(message, duration = 3000) {
    // Select the container for toast notifications
    const container = document.getElementById('toast-container');

    // Remove any existing toasts
    const existingToasts = container.getElementsByClassName('toast');
    while (existingToasts.length > 0) {
        container.removeChild(existingToasts[0]);
    }

    // Create a new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // Append the new toast to the container
    container.appendChild(toast);

    // Show the toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hide and remove the toast after the specified duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 500);
    }, duration);
}
''

document.addEventListener('DOMContentLoaded', () => {
    // Show initial toast message

    // Initialize and start the clock
    startClock();

    // Initialize the status on page load
    updateOnlineStatus();

    // Add event listeners for online and offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Add event listeners for app icons
    document.querySelectorAll('.app-icon').forEach(app => {
        app.addEventListener('click', () => {
            const appName = app.getAttribute('data-app');
            openApp(appName);
        });
    });

    // Add event listeners for the lock screen swipe functionality
    setupLockScreenSwipe();
});

// Declare timeInterval at the top level
let timeInterval;

// Function to update the time every second
function updateTime() {
    const timeDisplay = document.getElementById('time-display');
    const lockTimeDisplay = document.getElementById('lock-time-display');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${hours}:${minutes} ${ampm}`;

    // Update both lock screen and status bar time
    timeDisplay.textContent = timeString;
    lockTimeDisplay.textContent = timeString;
}

// Initialize and start updating time every second
function startClock() {
    updateTime(); // Initialize the time immediately on page load
    timeInterval = setInterval(updateTime, 1000);
}

// Clear the interval when the page unloads
function stopClock() {
    clearInterval(timeInterval);
}
window.addEventListener('beforeunload', stopClock);

// Function to handle online/offline status
const statusElement = document.getElementById('network');
function updateOnlineStatus() {
    if (navigator.onLine) {
        statusElement.innerHTML = "📶"
        showToast("You are now connected to the internet.");
    } else {
        statusElement.innerHTML = "❗"
        showToast("It appears that you're offline.");
    }
}

// Function to handle app opening
function openApp(appName) {
    const appScreens = document.querySelectorAll('.app-screen');
    appScreens.forEach(screen => screen.classList.remove('show'));

    if (appName === 'App1') {
        if (navigator.onLine) {
            window.location.href = "chatgpt.html";
            showToast('Opening ChatGPT...', 3000);
        } else {
            window.location.href = "offline.html";
            showToast('You are offline', 3000);
        }
    } else if (appName === 'App2') {
        if (navigator.onLine) {
            window.location.href = "youtube.html";
            showToast('Opening YouTube...', 3000);
        } else {
            window.location.href = "offline.html";
            showToast('You are offline', 3000);
        }
    } else if (appName === 'App3') {
        if (navigator.onLine) {
            window.location.href = "chatapp.html";
            showToast('Opening ChatApp...', 3000);
        } else {
            window.location.href = "offline.html";
            showToast('You are offline', 3000);
        }
    }
}

// Function to set up swipe-to-unlock functionality
function setupLockScreenSwipe() {
    const lockScreen = document.getElementById('lock-screen');
    const homeScreen = document.getElementById('home-screen');
    let touchStartY = 0;
    let touchEndY = 0;


const lockScreenMsg = document.getElementById("lock-message")
    lockScreenMsg.innerHTML = "^<br>Swipe up to unlock"
const errorInfo = document.getElementById("error-info")
    errorInfo.style.visibility = "hidden"

    lockScreen.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
        lockScreen.style.transition = 'none'; // Disable transition during swipe
    });

    lockScreen.addEventListener('touchmove', function(event) {
        touchEndY = event.touches[0].clientY;
        const distanceMoved = touchStartY - touchEndY;
        const screenHeight = window.innerHeight;

        if (distanceMoved > 0) { // Swiping up
            const translateY = Math.min(distanceMoved, screenHeight);
            const opacity = Math.max(0, 1 - (distanceMoved / screenHeight));
            lockScreen.style.transform = `translateY(-${translateY}px)`;
            lockScreen.style.opacity = opacity;
        }
    });

    lockScreen.addEventListener('touchend', function() {
        const distanceMoved = touchStartY - touchEndY;
        if (distanceMoved > 100) { // User swiped up by at least 100px
            unlockScreen();
        } else {
            // Reset position and opacity if swipe is insufficient
            lockScreen.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            lockScreen.style.transform = 'translateY(0)';
            lockScreen.style.opacity = '1';
        }
    });

    // Function to unlock the screen
    function unlockScreen() {
        lockScreen.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        lockScreen.style.transform = `translateY(-${window.innerHeight}px)`; // Move out of view
        lockScreen.style.opacity = '0'; // Fade out

        homeScreen.style.display = 'flex'; // Ensure the home screen is displayed
        setTimeout(() => {
            homeScreen.style.opacity = '1';
            // Fade in the home screen
        }, 100); // Short delay to ensure display change

        setTimeout(() => {
            lockScreen.style.display = 'none'; // Hide lock screen after transition
        }, 300); // Match the transition duration
    }

    // Initialize home screen with opacity 0
    homeScreen.style.opacity = '0';
}  
let huh = document.getElementById("what")
huh.style.opacity = '0'
huh.style.visibility = 'hidden'
  

function selfDestruct() {
  let phoneWallpaper = document.getElementById("phone")
  phoneWallpaper.style.transition  = 'opacity 3s ease, visibility 4s ease';
  huh.style.transition = 'opacity 4s ease, visibility 4s ease'
  phoneWallpaper.style.opacity = '0';
  phoneWallpaper.style.visibility = 'hidden';
  huh.style.visibility = 'visible';
  huh.style.opacity = '1';
  setInterval(() => {
    showToast("WHAT DID YOU DO??")
   let body =  document.body.style
   body.transition = 'background-color 5s ease'
   body.backgroundColor = "maroon"
   navigator.vibrate(10000000000)
  }, 585)
}