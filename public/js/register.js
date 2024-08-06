document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, phone, password })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data === 'User registered') {
            window.location.href = "login.html";
        }
    })
    .catch(error => console.error('Error:', error));
});