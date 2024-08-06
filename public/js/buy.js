document.addEventListener('DOMContentLoaded', function() {
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
                        <h2>${dog.breed}</h2>
                        <p>Age: ${dog.age}</p>
                        <p>Color: ${dog.color}</p>
                        <p class="price">₹${dog.price}</p>
                    </div>
                `;
                dogCard.addEventListener('click', () => {
                    window.location.href = `dog_details.html?id=${dog.id}`;
                });
                dogGrid.appendChild(dogCard);
            });
        })
        .catch(error => console.error('Error:', error));
});