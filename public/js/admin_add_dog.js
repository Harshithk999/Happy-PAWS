document.getElementById('addDogForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let breed = document.getElementById('breed').value;
    let age = document.getElementById('age').value;
    let color = document.getElementById('color').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let image = document.getElementById('image').files[0];

    let formData = new FormData();
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('color', color);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    fetch('/auth/addDog', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('confirmationMessage').textContent = "Dog added successfully!";
    })
    .catch(error => console.error('Error:', error));
});