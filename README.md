# 🔗 URL Shortener Service

A full-stack web application that converts long, complex URLs into short, manageable links. Built with **React** for the frontend, **Node.js/Express** for the backend, and **Supabase** for the database.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

*   **⚡ Instant Shortening:** Generates unique short IDs using efficient encoding.
*   **🚀 Fast Redirection:** Low-latency redirection to the original URL.
*   **📋 Copy to Clipboard:** One-click button to copy the generated link.
*   **📊 Analytics:** Tracks the number of clicks (visit count) for every link.
*   **📱 Responsive Design:** Clean, modern UI that works on mobile and desktop.
*   **🔒 Secure:** Implemented using Supabase Row Level Security (RLS) best practices.

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Hooks, State Management)
*   Axios (HTTP Requests)
*   CSS3 (Custom Styling)

**Backend:**
*   Node.js & Express.js (REST API)
*   Supabase (PostgreSQL Database)
*   ShortId / NanoID (Unique ID Generation)
*   Dotenv (Environment Variable Management)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v14 or higher)
*   npm or yarn
*   A [Supabase](https://supabase.com/) account

### 1. Clone the Repository

git clone https://github.com/competitive-programmer04/url_shortner.git
cd url_shortner

### 2. Backend Setup
Navigate to the server folder and install dependencies:
code
Bash
cd server
npm install
Configuration (.env):
Create a .env file in the server folder and add your credentials:
code
Env
PORT=3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
Run the Server:
code
Bash
npm start
or for development
npm run dev
The server will start on http://localhost:3000

### 3. Frontend Setup
Open a new terminal, navigate to the client folder, and install dependencies:
code
Bash
cd client
npm install
Run the Client:
code
Bash
npm start
The application will open on http://localhost:3000.
📡 API Endpoints
Method	Endpoint	Description	Body / Params
POST	/shorten	Create a new short URL	Body: { "originalUrl": "https://..." }
GET	/:id	Redirect to original URL	Param: id (e.g., Ab3d)


### 🗄️ Database Schema (Supabase)
Table: urls
Column Name	Type	Description
id	int8	Primary Key
created_at	timestamptz	Auto-generated timestamp
original_url	text	The long URL input by user
short_id	text	Unique short code (Indexed)
visit_cnt	int8	Counter for redirects



### 🤝 Contributing
Contributions are welcome!
Fork the project.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.


📝 License
Distributed under the MIT License. See LICENSE for more information.


Developed by Vaibhav Agrawal