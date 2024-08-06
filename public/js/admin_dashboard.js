function fetchDogs() {
    fetch('/auth/dogs')
    .then(response => response.json())
    .then(data => {
        const dogGrid = document.getElementById('dogGrid');
        dogGrid.innerHTML = '';
        data.forEach(dog => {
            const dogCard = document.createElement('div');
            dogCard.className = 'dog-card';
            dogCard.innerHTML = `
                <img src="${dog.image}" alt="Dog Image">
                <div class="dog-info">
                    <h2>Breed: ${dog.breed}</h2>
                    <p>Age: ${dog.age}</p>
                    <p>Color: ${dog.color}</p>
                    <p class="price">₹${dog.price}</p>
                    <button class="remove-button" onclick="removeDog(${dog.id})">Remove</button>
                </div>
            `;
            dogGrid.appendChild(dogCard);
        });
    })
    .catch(error => console.error('Error:', error));
}

function removeDog(dogId) {
    fetch(`/auth/removeDog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: dogId })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchDogs(); // Refresh the dogs grid
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', fetchDogs);

document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault();
    fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "admin_login.html";
        }
    })
    .catch(error => console.error('Error:', error));
});