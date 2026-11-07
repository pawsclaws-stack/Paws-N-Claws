// ==========================================
// 1. PRIVATE DASHBOARD LOGIN SECURITY & ROUTING
// ==========================================
const loginScreen = document.getElementById('login-screen');
const signupScreen = document.getElementById('signup-screen'); 
const privateTracker = document.getElementById('private-tracker');

const usernameInputField = document.getElementById('portal-username'); 
const passcodeInputField = document.getElementById('portal-passcode');
const loginSubmitBtn = document.getElementById('login-submit-btn');
const loginErrorMsg = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');

// NEW SUPER SIMPLE LOGINS FOR TESTING
const SECRET_USERNAME = "mina";
const SECRET_PASSWORD = "123";

const CLIENT_EMAIL = "customer";
const CLIENT_PASSWORD = "456";

if (loginSubmitBtn && usernameInputField && passcodeInputField) {
    loginSubmitBtn.addEventListener('click', function() {
        const typedEmail = usernameInputField.value.trim();
        const typedPassword = passcodeInputField.value;

        // PATH A: Walker Admin Portal
        if (typedEmail === SECRET_USERNAME && typedPassword === SECRET_PASSWORD) {
            if (loginScreen) loginScreen.style.display = "none";
            if (privateTracker) privateTracker.style.display = "block";
            if (loginErrorMsg) loginErrorMsg.style.display = "none"; 
        
        // PATH B: Client Dashboard Page
        } else if (typedEmail === CLIENT_EMAIL && typedPassword === CLIENT_PASSWORD) {
            window.location.href = "client-dashboard.html";
        
        // PATH C: Incorrect Fallback
        } else {
            if (loginErrorMsg) loginErrorMsg.style.display = "block";
        }
    });
}

if (logoutBtn && loginScreen && privateTracker) {
    logoutBtn.addEventListener('click', function() {
        privateTracker.style.display = "none";
        loginScreen.style.display = "block";
        if (usernameInputField) usernameInputField.value = "";
        if (passcodeInputField) passcodeInputField.value = "";
    });
}

// ==========================================
// 2. LIVE ACTIVE TRACKER EVENT COUNTERS & CAMERA
// ==========================================
let peeCount = 0;
let poopCount = 0;
let uploadedPhotoData = ""; 

const peeBtn = document.getElementById('pee-btn');
const poopBtn = document.getElementById('poop-btn');
const peeDisplay = document.getElementById('pee-count');
const poopDisplay = document.getElementById('poop-count');
const walkNotesInput = document.getElementById('walk-notes');
const reportCard = document.getElementById('report-card');
const reportContent = document.getElementById('report-content');
const walkPhotoInput = document.getElementById('walk-photo-input');
const photoPreview = document.getElementById('photo-preview');

if (peeBtn && peeDisplay) {
    peeBtn.addEventListener('click', function() { peeCount++; peeDisplay.innerText = peeCount; });
}

if (poopBtn && poopDisplay) {
    poopBtn.addEventListener('click', function() { poopCount++; poopDisplay.innerText = poopCount; });
}

if (walkPhotoInput && photoPreview) {
    walkPhotoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedPhotoData = e.target.result; 
                photoPreview.src = uploadedPhotoData; 
                photoPreview.style.display = "block"; 
            };
            reader.readAsDataURL(file);
        }
    });
}

// ==========================================
// 3. ENHANCED TIMER ENGINE WITH START CONTROLS
// ==========================================
let timerInterval = null;
let totalSeconds = 0;

const startWalkBtn = document.getElementById('start-walk-btn');
const endWalkBtn = document.getElementById('end-walk-btn');
const timerDisplay = document.getElementById('walk-timer');
const timeRemainingDisplay = document.getElementById('time-remaining');
const targetDurationSelect = document.getElementById('target-duration');
const timerBox = document.getElementById('timer-box');

function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

if (startWalkBtn && targetDurationSelect && timerDisplay && timeRemainingDisplay) {
    startWalkBtn.addEventListener('click', function() {
        if (timerInterval) return; 

        startWalkBtn.innerText = "🚶 Progress...";
        startWalkBtn.style.background = "#7f8c8d";
        startWalkBtn.style.cursor = "default";

        const targetMinutes = parseInt(targetDurationSelect.value);
        const targetSeconds = targetMinutes * 60;

        timerInterval = setInterval(function() {
            totalSeconds++;
            timerDisplay.innerText = formatTime(totalSeconds);

            let remainingSeconds = targetSeconds - totalSeconds;
            
            if (remainingSeconds > 0) {
                const remMins = Math.floor(remainingSeconds / 60);
                const remSecs = remainingSeconds % 60;
                timeRemainingDisplay.innerText = `Remaining: ${remMins}:${String(remSecs).padStart(2, '0')}`;
            } else {
                timeRemainingDisplay.innerText = "⏰ Walk complete!";
                if (timerBox) timerBox.style.color = "#e74c3c"; 
            }
        }, 1000);
    });
}

if (endWalkBtn && reportContent && reportCard) {
    endWalkBtn.addEventListener('click', function() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        const finalTime = formatTime(totalSeconds);
        let ownerNotes = (walkNotesInput) ? walkNotesInput.value : "";
        if (ownerNotes.trim() === "") {
            ownerNotes = "Your pup had a fantastic time stretching their legs today!";
        }

        let photoHTML = "";
        if (uploadedPhotoData !== "") {
            photoHTML = `<div style="margin: 15px 0;"><img src="${uploadedPhotoData}" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"></div>`;
        }

        reportContent.innerHTML = `
            <p style="margin: 10px 0;"><strong>Walk Status:</strong> Completed successfully! 🎉</p>
            <p style="margin: 10px 0;"><strong>Walk Duration:</strong> ${finalTime} ⏱️</p>
            <p style="margin: 10px 0;"><strong>Total Pee Breaks:</strong> ${peeCount} 💧</p>
            <p style="margin: 10px 0;"><strong>Total Poop Breaks:</strong> ${poopCount} 💩</p>
            ${photoHTML}
            <p style="margin: 15px 0 5px 0; font-weight: bold; color: #2c3e50;">Walk Summary Notes:</p>
            <p style="margin: 5px 0; padding: 10px; background-color: #fff; border-left: 4px solid #e67e22; font-style: italic; color: #555;">"${ownerNotes}"</p>
        `;
        reportCard.style.display = "block";
    });
}

// ==========================================
// 4. SIGN UP PAGE ENGINE
// ==========================================
const signupSubmitBtn = document.getElementById('signup-submit-btn');
if (signupSubmitBtn) {
    signupSubmitBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        alert("🎉 Welcome to the pack! Your account has been successfully created. Click OK to log in.");
        window.location.href = "login.html";
    });
}
