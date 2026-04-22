# 📱 Social Feed App (React Native)

A modern mobile application built with **React Native** that demonstrates authentication, API integration, global state management, and persistence using industry-standard tools.

---

## 🚀 Features

### 🔐 Authentication (Firebase)

* User Signup (Email & Password)
* User Login
* Logout functionality
* Persistent session using Firebase Auth listener

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
│   └── postApi.js                 # API request for fetching posts
│
├── components/
│   ├── feed/
│   │   ├── FeedEmpty.js           # Empty state UI for feed
│   │   ├── FeedError.js           # Error state UI for feed
│   │   ├── FeedHeader.js          # Feed header with refresh action
│   │   ├── FeedLoading.js         # Loading UI for feed
│   │   └── PostCard.js            # Single post card component
│   │
│   └── profile/
│       ├── LogoutButton.js        # Reusable logout button
│       ├── ProfileCard.js         # User profile information card
│       ├── ProfileErrorMessage.js # Profile error message UI
│       └── ProfileHeader.js       # Profile screen header
│
├── constants/
│   └── colorscheme.js            # Centralized app color theme
│
├── redux/
│   ├── hooks.js                  # Custom Redux hooks
│   ├── postsSlice.js             # Posts and likes Redux slice
│   └── store.js                  # Redux store + persist config
│
├── screens/
│   ├── FeedScreen.js             # Main feed screen
│   ├── ForgotPasswordScreen.js   # Password reset screen
│   ├── LoginScreen.js            # Login screen
│   ├── ProfileScreen.js          # User profile screen
│   └── SignUpScreen.js           # User registration screen
│
├── services/
│   └── auth/
│       └── registerService.js    # Firebase registration logic
│
├── utils/
│   └── validation/
│       └── registerValidation.js # Signup form validation helpers
│
└── ios/                          # iOS native project files
```

## 📂 Folder Explanation

### `screens`

Contains all main app screens such as login, signup, feed, profile, and forgot password.

### `redux`

Manages global application state using Redux Toolkit, including posts, likes, and persisted state.

### `api`

Contains API request functions, such as fetching posts from the dummy API.

### `components`

Contains reusable UI components, divided into feature-based folders like `feed` and `profile`.

### `services`

Contains business logic and service functions, such as Firebase authentication actions.

### `utils`

Contains helper functions such as validation logic and reusable utility methods.

### `constants`

Stores fixed values used across the app, such as colors, theme settings, and configuration constants.

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
