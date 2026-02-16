# ☕ Bookafé - Artisan Coffee Platform

Bookafé is a premium digital hideaway for modern coffee connoisseurs. This platform bridges the gap between artisan cafes and coffee lovers through a seamless, global cafe experience.

---

## 📂 Project Structure

The project is split into two primary directories:

* **`/coffee`**: The backend built with **Java Spring Boot**. It manages user roles (Customer, Cafe Owner, Admin), data persistence, and identity verification.
* **`/frontend`**: The user interface built with **React** and **Vite**. It features a modern, responsive design with a focus on ease of use and visual elegance.

---

## 🚀 Getting Started

### Prerequisites
* **Java 17+** (for the backend)
* **Node.js & npm** (for the frontend)
* **MySQL** (or equivalent database)

### Backend Setup (`/coffee`)
1.  Navigate to the folder: `cd coffee`
2.  Configure your database settings in `src/main/resources/application.properties`.
3.  Run the application:
    ```bash
    mvn spring-boot:run
    ```
4.  The backend API is hosted at `http://localhost:8080`.

### Frontend Setup (`/frontend`)
1.  Navigate to the folder: `cd frontend`
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Access the site at `http://localhost:5173`.

---

## 🛠️ Key Features

### 1. Multi-Step Registration
* **Customer Sign-Up**: A 4-step wizard collecting personal info, academic details, account setup, and identity verification.
* **File Upload**: Native support for uploading Government IDs (Aadhar/PAN) for manual verification.
* **Approval Flow**: New users are moved to a `/waiting` room until the Admin approves their account.

### 2. Admin Portal
* **Dashboard Stats**: Track total visitors, new messages, and registered users.
* **Visual Analytics**: Interactive charts showing user activity and growth trends.
* **Role Management**: Control access for Cafe Owners and Customers.

### 3. Professional UI/UX
* **Premium Theme**: A "Matte Black" and "Artisan Gold" aesthetic throughout the footer and headers.
* **Responsive Navigation**: Working Quick Links for smooth section scrolling on the Home page.

---

## 🎨 Theme & Styles
* **Primary Color**: `#121212` (Premium Matte Black)
* **Highlight Color**: `#D4AF37` (Artisan Gold)
* **Font Family**: 'Poppins', 'Playfair Display', and 'Inter'

---

## 🗄️ Database Schema

The backend uses a **One-to-Many** relationship between users and their academic history.

### 1. User Table
Stores primary account and profile information.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Long (PK) | Unique identifier for the user. |
| `first_name` | String | User's first name. |
| `email` | String (Unique) | Account email used for login. |
| `role` | String | 'Customer', 'Cafe Owner', or 'Admin'. |
| `status` | String | Current status (e.g., 'Pending', 'Active'). |

### 2. AcademicInfo Table
Stores the educational background provided during registration.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Long (PK) | Unique identifier for the entry. |
| `user_id` | Long (FK) | Links the entry back to a specific User. |
| `institution` | String | Name of school or university. |
| `degree` | String | Degree or qualification obtained. |
| `year_of_passing` | String | The graduation year. |

---

## 📋 API Documentation Snippet

For developers to test the registration flow via Postman:

**Endpoint:** `POST /users/register`  
**Content-Type:** `multipart/form-data`

| Part Name | Type | Description |
| :--- | :--- | :--- |
| `userData` | JSON (Blob) | Contains all text-based fields (names, email, academic array). |
| `govtProof` | File | The uploaded ID image or PDF. |

---

© 2026 Bookafé. Crafted with ❤️ for coffee lovers.
