document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('/auth/adminLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "admin_dashboard.html";
        } else {
            document.getElementById('loginError').textContent = "Invalid email or password.";
        }
    })
    .catch(error => console.error('Error:', error));
});