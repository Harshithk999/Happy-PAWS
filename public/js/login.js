document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            sessionStorage.setItem('userId', data.user.id); // Store user ID in session storage
            window.location.href = "homepage.html";
        } else {
            alert('Invalid username or password');
        }
    })
    .catch(error => console.error('Error:', error));
});