## Next Features To Add

- Implement JWT Login Tracking

    [ ] Research and install a JWT library for my backend (e.g., npm install jsonwebtoken or pip install flask-jwt-extended)

    [ ] In the existing login route, after the password check is successful, generate a JWT token

    [ ] Send this token back to the frontend in the JSON response

    [ ] (Frontend) When the token is received, save it (e.g., in localStorage or a cookie)

    [ ] Create a new protected backend route (e.g., /api/data) that requires a valid JWT

    [ ] (Frontend) Make a test button that tries to fetch data from this new protected route, sending the saved token in the "Authorization" header

    [ ] Update the frontend text to show "Logged in" or "Not logged in" based on a successful fetch from the protected route

Connect MongoDB to Project

    [ ] Install the MongoDB driver for my backend (e.g., npm install mongoose or pip install pymongo)

    [ ] Create a free account on MongoDB Atlas

    [ ] Create a new cluster and get the connection string

    [ ] Add the connection string to my backend's environment file (.env)

    [ ] Write the startup code in my backend to connect to the database

    [ ] Create a simple "User" model/schema (e.g., with username and password fields)

    [ ] (Crucial Change) Modify the login route: instead of checking the test_db dictionary, find the user in the real MongoDB database

Allow User Registrations

    [ ] Research and install a password-hashing library (e.g., npm install bcrypt or pip install bcrypt)

    [ ] Create a new backend route: POST /api/register

    [ ] In that route, get the username and password from the request body

    [ ] Add a check: does a user with this username already exist in the database?

    [ ] If not, "hash" the plain-text password using bcrypt

    [ ] Create a new User object with the username and the hashed password, and save it to MongoDB

    [ ] Send a "Success" message back to the frontend

    [ ] (Frontend) Build the new registration form (the UI part)

    [ ] (Frontend) Connect the form's "Submit" button to send the data to the POST /api/register route

Later

    [ ] Testing Rich Text Editor Args

    [ ] Handling Images

    [ ] UI Improvements

    [ ] Port to Chrome Extension