function fetchSellRequests() {
    fetch('/auth/sellRequests')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('sellRequestsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        data.forEach(request => {
            let row = tableBody.insertRow();
            row.insertCell(0).textContent = request.id;
            row.insertCell(1).textContent = request.breed;
            row.insertCell(2).textContent = request.age;
            row.insertCell(3).textContent = request.color;
            row.insertCell(4).textContent = request.price;
            row.insertCell(5).textContent = request.address;
            row.insertCell(6).textContent = request.description;
            let imgCell = row.insertCell(7);
            let img = document.createElement('img');
            img.src = request.image;
            img.alt = "Dog Image";
            img.width = 100;
            imgCell.appendChild(img);
            let actionCell = row.insertCell(8);
            if (request.status === 'accepted') {
                actionCell.textContent = 'Accepted';
            } else {
                let acceptButton = document.createElement('button');
                acceptButton.textContent = 'Accept';
                acceptButton.onclick = function() {
                    acceptSellRequest(request.id, request.breed, request.age, request.color, request.price, request.image, request.address, request.description);
                };
                actionCell.appendChild(acceptButton);
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

function acceptSellRequest(id, breed, age, color, price, image, address, description) {
    fetch('/auth/acceptSellRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, breed, age, color, price, image, address, description })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchSellRequests(); // Refresh the sell requests table
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', fetchSellRequests);

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