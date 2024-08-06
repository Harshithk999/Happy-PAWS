document.addEventListener('DOMContentLoaded', function() {
    fetch('/auth/checkAuth')
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            document.getElementById('userName').textContent = data.user.username; // Display user's name
            document.getElementById('username').value = data.user.username;
            document.getElementById('email').value = data.user.email;
            document.getElementById('phone').value = data.user.phone;
            document.getElementById('userId').value = data.user.id; // Store the user ID in a hidden input
        } else {
            window.location.href = "login.html";
        }
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('updateProfileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let userId = document.getElementById('userId').value; // Retrieve the user ID

        fetch('/auth/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, username, email, phone })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === 'Profile updated') {
                // Optionally reload the page or fetch updated data
                window.location.reload();
            }
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "login.html";
            }
        })
        .catch(error => console.error('Error:', error));
    });
});