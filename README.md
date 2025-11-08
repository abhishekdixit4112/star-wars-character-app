# Star Wars Character Explorer

This is a single-page app (SPA) built with **React** and styled using **Tailwind CSS**. It grabs Star Wars character data from the official SWAPI, shows it clearly, and makes it easy to find who you're looking for.

## Getting Started: How to Run It

Follow these steps to get the app running on your computer:

### What you need:
* Node.js
* npm or yarn

### Steps:

1.  **Get the code:** Clone this repository and move into the project folder.
    ```bash
    git clone [YOUR_REPOSITORY_LINK]
    cd star-wars-character-explorer
    ```

2.  **Install everything:**
    ```bash
    npm install
    ```

3.  **Start the app:**
    ```bash
    npm start
    ```

The app will open automatically at `http://localhost:3000`. You'll need to use the mock login.

## What's Included: Features & Extras

### Core Features
* **Pagination:** You can flip through pages of characters (10 per page).
* **Character Details:** Clicking any card opens a modal to show extra stats and details about their homeworld.
* **Error Handling:** Clear messages show up if the data fails to load.

### Bonus Features
* **Global Search:** Searching checks the *entire* SWAPI database, not just the characters currently loaded on your page.
* **Homeworld Filter:** You can instantly filter the list by the character's home planet.
* **Mock Login:** The app requires a login to see the content.
    * **Username:** `star`
    * **Password:** `coder`

---

## Design Choices: Why I Built It This Way 

* **Small Components:** I broke down complex parts (like the Search/Filter bar and the Homeworld details) into tiny, focused components. This keeps the main pages clean and makes the code reusable.
* **React Hooks:** All the complicated tasks—like fetching data, managing the search, and handling the login status—are separated into custom hooks. This keeps the data logic away from the display code.
* **No Redux:** Standard React state management was enough for this size of project, avoiding unnecessary complexity.
