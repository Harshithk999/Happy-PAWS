document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sellForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let breed = document.getElementById('breed').value;
        let age = document.getElementById('age').value;
        let color = document.getElementById('color').value;
        let price = document.getElementById('price').value;
        let address = document.getElementById('address').value;
        let description = document.getElementById('description').value;
        let image = document.getElementById('image').files[0];
        
        // Retrieve userId from session storage
        let userId = sessionStorage.getItem('userId');

        if (!userId) {
            alert('User not logged in. Please log in first.');
            return;
        }

        let formData = new FormData();
        formData.append('breed', breed);
        formData.append('age', age);
        formData.append('color', color);
        formData.append('price', price);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('userId', userId);

        fetch('/auth/sell', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('confirmationMessage').textContent = "We have received your message, we will contact you within a few hours.";
        })
        .catch(error => console.error('Error:', error));
    });
});