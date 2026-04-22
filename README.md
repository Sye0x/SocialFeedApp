# 📱 Social Feed App (React Native)

A modern mobile application built with **React Native** that demonstrates authentication, API integration, global state management, and persistence using industry-standard tools.

---

## 🚀 Features

### 🔐 Authentication (Firebase)

* User Signup (Email & Password)
* User Login
* Logout functionality
* Persistent session using Firebase Auth listener
* Forgot Password

---

### 📰 Feed (API Integration)

* Fetch posts from:
  https://jsonplaceholder.typicode.com/posts
* Display posts in a scrollable list
* Pull-to-refresh support
* Clean UI with reusable components

---

### ❤️ Like / Unlike System

* Toggle like/unlike on posts
* Instant UI updates using Redux
* Likes are:

  * Stored in Redux (UI state)
  * Synced with Firebase (per user)
  * Persisted locally using Redux Persist

---

### 🧠 State Management (Redux Toolkit)

* Centralized global state
* Async API handling using `createAsyncThunk`
* Slice-based architecture

---

### 💾 Persistence (Redux Persist)

* Stores Redux state locally on device
* Keeps posts and liked posts after app restart

---

### 🔥 Firebase Firestore Integration

* Stores user data in `users` collection
* Each user document contains:

  * name
  * email
  * likedPostIds
* Likes are user-specific and synced across sessions

---

## 🏗️ Project Structure

```text
project-root/
│
├── api/
│   └── postApi.js                  # API request for fetching posts
│
├── components/
│   ├── feed/
│   │   ├── FeedEmpty.js
│   │   ├── FeedError.js
│   │   ├── FeedHeader.js
│   │   ├── FeedLoading.js
│   │   └── PostCard.js
│   │
│   └── profile/
│       ├── LogoutButton.js
│       ├── ProfileCard.js
│       ├── ProfileErrorMessage.js
│       └── ProfileHeader.js
│
├── constants/
│   └── colorscheme.js              # App color theme
│
├── redux/
│   ├── hooks.js                    # Custom Redux hooks
│   ├── postsSlice.js               # Posts & likes state logic
│   └── store.js                    # Redux + Persist config
│
├── screens/
│   ├── FeedScreen.js
│   ├── ForgotPasswordScreen.js
│   ├── LoginScreen.js
│   ├── ProfileScreen.js
│   └── SignUpScreen.js
│
├── services/
│   ├── app/
│   │   ├── feedService.js          # Feed-related logic (API + Firestore)
│   │   └── profileService.js       # Profile-related logic
│   │
│   └── auth/
│       ├── forgotPasswordService.js # Password reset logic
│       ├── loginService.js          # Firebase login logic
│       └── registerService.js       # Firebase signup logic
│
├── utils/
│   ├── app/
│   │   ├── feedUtils.js            # Feed helper functions
│   │   └── profileUtils.js         # Profile helper functions
│   │
│   └── validation/
│       ├── forgotPasswordValidation.js
│       ├── loginValidation.js
│       └── registerValidation.js

```

---

## 📂 Folder Explanation

### `screens`

Contains all main UI screens (authentication + app flow).

---

### `redux`

Handles global state using Redux Toolkit:

* Posts data
* Like/unlike state
* Persisted state across app restarts

---

### `api`

Handles external API calls (e.g., fetching posts).

---

### `components`

Reusable UI components divided by feature:

* `feed` → feed UI elements
* `profile` → profile UI elements

---

### `services`

Business logic layer:

#### `services/auth`

Handles Firebase authentication:

* Login
* Signup
* Forgot password

#### `services/app`

Handles app-specific logic:

* Feed operations
* Profile operations

---

### `utils`

Helper and reusable logic:

#### `utils/app`

General-purpose helpers

#### `utils/validation`

Form validation logic for:

* Login
* Signup
* Forgot password

---

### `constants`

Centralized configuration:

* Colors
* Static values

---

## 🧠 Architecture Overview

```text
UI (Screens + Components)
        ↓
Redux (State Management)
        ↓
Services (Business Logic)
        ↓
API / Firebase (Data Source)
```

---

## ⭐ Key Highlights

* Clean and scalable folder structure
* Separation of concerns (UI / logic / data)
* Firebase + Redux integration
* User-based like system
* Persistent state using Redux Persist

---

## ⚙️ Tech Stack

* React Native
* Firebase Authentication
* Firebase Firestore
* Redux Toolkit
* Redux Persist
* Axios
* React Navigation

---

## 🔄 App Flow

1. User signs up or logs in using Firebase
2. App detects auth state and navigates accordingly
3. Feed screen loads posts from API
4. User can like/unlike posts
5. Likes are:

   * Stored in Redux (for UI)
   * Saved in Firestore (per user)
6. Redux Persist ensures data survives app restarts

---

## 🧪 Key Concepts Demonstrated

* Auth-based navigation (Auth Stack vs App Stack)
* Async state handling with Redux Toolkit
* Local vs remote data synchronization
* Persistent state management
* Modular component architecture

---

## 📌 Important Notes

* Redux Persist stores data **per device**
* Firestore stores data **per user**
* Both are used together for better UX and real-world behavior

---

## ▶️ How to Run

```bash
# Install dependencies
npm install

# Start Metro
npx react-native start

# Run Android
npx react-native run-android
```

---

## 📖 Future Improvements

* Add pagination / infinite scroll
* Improve UI animations
* Add comments feature
* Optimize caching strategy
* Add offline support

---

## 👨‍💻 Author

Built as part of a mobile app development assignment to demonstrate:

* Authentication
* API handling
* State management
* Persistence

---

## ⭐ Conclusion

This project showcases a complete mobile app architecture combining:

* Local state (Redux)
* Persistent storage (Redux Persist)
* Backend data (Firebase)

It reflects real-world application design patterns used in production apps.
