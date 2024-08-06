document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dogId = urlParams.get('id');

    // Fetch and display dog details
    fetch(`/auth/dog/${dogId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('dogImage').src = data.image;
            document.getElementById('dogBreed').textContent = data.breed;
            document.getElementById('dogPrice').textContent = data.price;
            document.getElementById('dogColor').textContent = data.color;
            document.getElementById('dogAge').textContent = data.age;
            document.getElementById('dogDescription').textContent = data.description;
        })
        .catch(error => console.error('Error:', error));

    // Fetch and display reviews
    function loadReviews() {
        fetch(`/auth/reviews/${dogId}`)
            .then(response => response.json())
            .then(data => {
                const reviewsContainer = document.getElementById('reviewsContainer');
                reviewsContainer.innerHTML = '';
                data.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review';
                    reviewElement.innerHTML = `
                        <h3>${review.username}</h3>
                        <p>${review.text}</p>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    loadReviews(); // Initial load of reviews

    // Submit a new review
    document.getElementById('submitReview').addEventListener('click', function() {
        const reviewText = document.getElementById('reviewText').value;
        const username = sessionStorage.getItem('username'); // Assume username is stored in sessionStorage

        if (!username) {
            alert('User not logged in. Please log in first.');
            return;
        }

        fetch('/auth/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dogId, text: reviewText, username })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadReviews(); // Reload reviews after submitting a new one
        })
        .catch(error => console.error('Error:', error));
    });

    // Back button functionality
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back();
    });
});