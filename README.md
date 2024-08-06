# Happy PAWS: Comprehensive Dog Marketplace

Welcome to the Happy Paws project! This project is a web application that allows users to buy and sell dogs. The application includes user authentication, dog listing management, and an admin dashboard for overseeing the site operations.


https://github.com/user-attachments/assets/5d7a447e-6559-485a-b33a-77bff87a4586


## Features

- **User Registration and Login**: Users can register and log in using their username and password.
- **User Profile Management**: Users can update their profile information.
- **Dog Listings**: Users can browse dogs available for sale.
- **Sell Dogs**: Users can list their dogs for sale by providing details such as breed, age, color, price, and description.
- **Admin Dashboard**: Admins can manage the dog listings, add new dogs, and accept or reject user-submitted sell requests.
- **Reviews**: Users can leave reviews for each dog.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: bcrypt for password hashing
- **File Uploads**: multer for handling image uploads

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- MySQL
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/pet-website.git
   cd pet-website

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up the MySQL database**
   * Create a database named pet_website.
   * Import the database schema using the provided pet_website.sql file.
   * Update the database configuration in config/db.js with your MySQL credentials.
   ```bash
   const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'pet_website'
    });

4. **Run the server:**
   ```bash
   node server.js

5. **Open your browser and navigate to:**
   ```bash
   http://localhost:5000


### Usage

#### User Registration

1. Navigate to the registration page.
2. Fill in your details, including username, email, phone number, and password.
3. Click the Register button to create an account.

#### User Login

1. Navigate to the login page.
2. Enter your username and password.
3. Click the Login button to access your account.

#### Buying a Dog

1. Navigate to the Buy Dogs page.
2. Browse the available dog listings.
3. Click on a dog to view its details and reviews.
4. Click the Buy button to purchase the dog.

#### Selling a Dog

1. Navigate to the Sell Dog page.
2. Fill in the dog’s details, including breed, age, color, price, and description.
3. Upload an image of the dog.
4. Click the Submit button to list the dog for sale.

#### Admin Dashboard

1. Log in as an admin using the admin login page.
2. Navigate to the Admin Dashboard to manage dog listings.
3. Accept or reject user-submitted sell requests.
4. Add new dogs using the Add Dog page.

### Contact

For any questions or inquiries, please contact [harshithkotian999@gmail.com](mailto:harshithkotian999@gmail.com).
   

   




