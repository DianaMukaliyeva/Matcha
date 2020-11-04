# MATCHA - Dating App

This is a team project, a part of the web branch at [Hive Helsinki](https://www.hive.fi/) coding school.

-   [Task](#task)
-   [Authors](#authors)
-   [Tech stack](#tech-stack)
-   [Functionality](#functionality)
-   [Planning](#planning)
    -   [Work breakdown](#work-breakdown)
    -   [Database structure](#database-structure)
    -   [Website wireframe](#website-wireframe)
-   [App Preview](#app-preview)
-   [Run locally](#run-locally)

## Authors

**Tatiana** - _Back/Front_ - [check her profile](https://github.com/T7Q)

**Diana** - _Back/Front_ - [check her profile](https://github.com/DianaMukaliyeva)

## Task

The aim of this project is to build a **Tinder-like web app**, where the users can create their profile, browse through a list of recommended profiles or conduct a search by age, distance, fame rating, commong tags. Users can like, report and block other users and chat with users that liked them back.

**Project constraints:**

-   Clientside: HTML, CSS, Javascript
-   Relational or graph-oriented database
-   Micro-frameworks and UI libraries are allowed
-   No ORM, validators, or User Account Manager
-   No errors, warnings or notice on both server- and client- sides
-   No security breaches (e.g. no SQL, HTML injections, plain passwords in the database)
-   Compatible at least with Firefox (>=41) and Chrome (>= 46)
-   Responsive design

## Stack

This is the first project in Hive Helsinki web branch when we were allowed to choose the language.

Our team decided to use this opportunity to learn **PERN stack**. This was the first time for both of us to use PostgreSQL, React, Redux, and also JWT, Material UI and Socket.io. We also used this project to learn more about Node.js projects structures (including folder structure, configuring env variables and MVC pattern).

-   **PostgreSQL**
-   **Express**
-   **React, Redux**
-   **Node**
-   JWT
-   Material UI
-   Socket.io

## Functionality

-   **User features:**
    -   Registration and login (Oauth), and password reset through email link.
    -   User data management, incl. edit profile data, change password and notification preferences.
    -   View own and other user profiles.
    -   View profile visit history, list of connected and blocked profiles.
-   **Matching features:**
    -   Multiple infinite scroll galleries with a list of suggestions that match his/her profile (recommended, online, popular, nearby).
    -   Matching Alogrimth using scoring weights based on Chinese and Western horoscope compatibility, common tags, fame rating, location, age and gender.
    -   Advanced range sliders to sort and filter users by horoscope believe, common tags, location, fame rating and age.
-   **Chat features:**
    -   FB messenger-like real-time chat for connected users.
-   **Notifications features:**
    -   Real-time push notifications when the user receives a like/unlike, message from another user or user's profile is checked.

## Planning

### Work milestones and breakdown

TBC

### Database structure

![Database planning](../assets/db.png?raw=true)

### Website wireframe

See full mobile and desktop versions.
![Gallery draft](../assets/wireframe.png?raw=true)

## App live preview

Live preview on HEROKU

You can create your own profile or use a ready made: **username** `Love` **password** `Astro1ove`

## App snapshots

TBC

## Run locally

-   **Git clone** repo
-   Install [PostgreSQL](https://www.postgresql.org/) and its [PostGIS](https://postgis.net/) extension
    `brew install postgresql postgis` or `apt install postgresql postgis`
-   Make sure you can send email from terminal
-   Install nodejs and npm `brew install nodejs npm` or `apt install nodejs`
-   Sign up and get credentials from:
    -   [Google](https://developers.google.com/adwords/api/docs/guides/authentication)
    -   [Google map API](https://developers.google.com/maps/documentation/javascript/get-api-key)
    -   [Geoip-lite configuration key](https://www.maxmind.com/en/geolite2/signup) and run:
        `cd backend/node_modules/geoip-lite && npm run-script updatedb license_key=YOUR_LICENSE_KEY`
-   Create a file **.env** in `backend/config` folder and update with your credentials

    ```
    # database configuration
    DB_USER=dmukaliy
    DB_NAME=matcha
    DB_PWD=123456
    DB_HOST=*.*.*.*
    DB_PORT=5432

    # server configuration
    PORT=5000

    # JWT secret
    JWT_SECRET=your_secret

    # mail configuration
    EMAIL=your_system_email
    EMAIL_PWD=your_password

    # google credentials
    GOOGLE_CLIENT_ID=your_google_id
    GOOGLE_CLIENT_SECRET=your_google_secret

    # geoip
    GEOIP_LITE_KEY=your_geoip_lite_key
    IPSTACK=your_ipstack_key

    DEV_URL=localhost:3000
    ```

-   Run command `npm run init` in the root folder to install all dependencies in the backend and frontend.
-   Run command `npm run dev` to start a server and open `localhost:3000` in your preferred browser in development mode
-   Run command `npm start` to start a server and open `localhost:3000` in your preferred browser in production mode
