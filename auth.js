const FIXED_PASSCODE = "tyUU15#$/";
let currentDynamicPass = generateRandomPass();

function checkFixedPass() {
    const userInput = document.getElementById("fixedPass").value;
    if (userInput === FIXED_PASSCODE) {
        document.getElementById("dynamicPassSection").style.display = "block";
        document.getElementById("dynamicPassAlert").innerText = "Your Code: " + currentDynamicPass;
    } else {
        alert("Incorrect Passcode!");
    }
}

function generateRandomPass() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function checkDynamicPass() {
    const userDynamicInput = document.getElementById("dynamicPass").value;
    if (userDynamicInput === currentDynamicPass) {
        alert("Login Successful!");
        window.location.href = "business.html"; // เปลี่ยนไปหน้าหลัก
    } else {
        alert("Incorrect Dynamic Code!");
    }
}

// อัปเดตรหัสทุก 1 นาที
setInterval(() => {
    currentDynamicPass = generateRandomPass();
}, 60000);
