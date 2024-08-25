## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Assumptions](#assumptions)

## 🚨 Tutorial

A small recording has been added here, <a href="https://drive.google.com/file/d/11bBbccy-2I6UCbpX1MkQ_8jksis2JoYo/view?usp=sharing" target="_blank">Drive Link</a>.

## <a name="introduction">🤖 Introduction</a>

This is a small React Native app that fetches top news headlines for technology from the News API and displays them in a list.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native
- Axios
- Zustand
- RN Reanimated
- RN Gesture Handler
- React Native mmkv

## <a name="features">🔋 Features</a>

👉 **Pin Headlines**: Users can pin their favorite headlines for easy access which will get stored in the local storage.

👉 **Load Next Headlines**: The app fetches next set of news headlines every 10 seconds automatically. The user can manually fetch more by tapping on a button.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Monisankarnath/headlinehub.git
cd headlinehub
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:
Get your own NEWS_API_KEY from [https://newsapi.org](https://newsapi.org).

```env
ENV_BASE_URL=https://newsapi.org/v2
NEWS_API_KEY=<YOUR NEWS API KEY>

```

**Running the Project**

```bash
npm run android
```

## <a name="assumptions">🕸️ Assumptions</a>

- The app will be run on an android device.
- The user's internet connection is stable and fast.
- The API used for fetching news headlines has a limit of requests per minute so the user must not use the app too frequently.
