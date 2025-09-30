# 📝 ThinkShare – Full-Stack Blogging Platform

A full-stack blogging platform built using **React.js**, **Appwrite**, **Tailwind CSS**, and **Redux Toolkit**. ThinkShare enables secure user authentication and offers seamless blog creation, editing, and deletion — all in real time.

---

## 🌟 Key Features

- 🔐 **User Authentication** — Secure login and registration via Appwrite.
- ✍️ **Rich Text Editor** — Integrated **TinyMCE** for advanced text formatting.
- 🧾 **Full CRUD Support** — Create, read, update, and delete blog posts effortlessly.
- 📱 **Responsive UI** — Built with Tailwind CSS for mobile-first design.
- ⚛️ **State Management** — Powered by Redux Toolkit for global state control.
- 🔐 **Protected Routes** — Ensures users access only their own content.

---

## 🛠️ Tech Stack

### 🔷 Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Redux Toolkit
- React Hook Form
- TinyMCE Editor

### 🔶 Backend
- Appwrite (Authentication, Database, Realtime APIs)

### 🚀 Deployment
- Vercel

---

## 🚀 Live Demo

👉 [Live App](https://your-live-demo-link.com)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/ThinkShare.git
cd ThinkShare

````

### 2️⃣ Install Dependencies

Make sure you have **Node.js** and **npm** installed.

```bash
npm install
```

### 3️⃣ Configure Appwrite

* Set up an Appwrite project at [Appwrite.io](https://appwrite.io).
* Create a project and set up:

  * Database
  * Authentication
  * Collections
* Update the credentials in `appwriteConfig.js`:

  ```js
  export const config = {
    endpoint: "YOUR_ENDPOINT_URL",
    projectId: "YOUR_PROJECT_ID",
    databaseId: "YOUR_DATABASE_ID",
    collectionId: "YOUR_COLLECTION_ID",
  };
  ```

### 4️⃣ Start the App

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

* **Authentication**: Users can register, log in, and manage sessions securely via Appwrite.
* **Blog Management**: Authenticated users can create, edit, and delete blog posts.
* **Rich Text Editor**: TinyMCE provides intuitive formatting for blog content.
* **State Management**: Redux Toolkit manages all application state (user, posts, UI state).
* **Protected Routes**: Routes are guarded to prevent unauthorized access.

---

## 📁 Project Structure (Simplified)

```
ThinkShare/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── appwrite/
│   └── utils/
├── public/
├── appwriteConfig.js
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/YourFeatureName

# Commit your changes
git commit -m "Add some feature"

# Push to the branch
git push origin feature/YourFeatureName

# Open a pull request
```

---

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for more information.

---

## 👤 Author

Made with ❤️ by Niranjan Khavale(https://github.com/Niranjan2902)
Feel free to reach out or contribute!

```

---


Would you like me to include a **demo GIF** section with a placeholder or help you generate badges (e.g., stars, forks, license)?
```
