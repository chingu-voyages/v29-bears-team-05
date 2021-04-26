# Awesome Project Build with TypeORM

Steps to run this project:
1. Ensure [docker and docker-compose](https://www.docker.com/get-started) is installed in your system
2. Adjust postgres server settings if needed at the project root's `docker-compose.yml` file. Default settings: `USER=postgres`, `PASSWORD=admin`, `PORT=5432`
3. Start postgres server in the background: `docker-compose up -d`.  Can close the postgres server with `docker-compose down`
4. Run `npm i` command
5. Setup database settings inside `ormconfig.json` file
6. Setup `.env` file.  Example:
    ```
    DATABASE_URL=postgresql://postgres:admin@localhost:5432/keybound_api
    PORT=4000
    CORS_ORIGIN=http://localhost:3000
    ```
7. Run `npm start` command
8. Run `npm run mockdata` command to populate mock data to database

## API

### Get Cheatsheets
----
  Returns json data of a list of available cheatsheets

* **URL**

  /sheet/

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```
  [
    {
        "id": 1,
        "name": "vscode",
        "logoUrl": ""
    }
  ]
  ```

* **Sample Call:**

  ```javascript
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("localhost:4000/sheet/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  ```

### Get Cheatsheet
----
  Returns json data about a single cheatsheet and its keybindings

* **URL**

  /sheet/:id

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```
    [
        {
            "id": "9032619f-3dff-4649-9c3d-ece74c1f40a3",
            "name": "Ctrl+Shift+P, F1",
            "keyCombination": "Ctrl+Shift+P, F1",
            "description": "Show Command Palette",
            "likes": 0,
            "cheatsheet": {
                "id": 1,
                "name": "vscode",
                "logoUrl": ""
            },
            "cheatsheetCategory": {
                "id": "ff8f468a-7c82-4758-819e-32e60bbfbbda",
                "name": "General",
                "index": 0
            }
        },
        ...
    ]
  ```

* **Sample Call:**

  ```javascript
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("localhost:4000/sheet/1", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  ```

### Create User
----
  Creates a user

* **URL**

  /user/

* **Method:**

  `POST`

* **Data Params**

  ```
  {
    "username": "username",
    "email": "hello@example.com",
    "password": "password"
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `User created`

* **Sample Call:**

  ```javascript
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": "clyde",
      "email": "qwerty@asdf.com",
      "password": "1234abc"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("localhost:4000/user", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  ```

### Get Users
----
  Returns json data of a list of registered users

* **URL**

  /user/

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```
  [
    {
        "id": "dd3db498-dc91-4ea6-82dd-e107bd8e17fe",
        "username": "clyde",
        "email": "qwerty@asdf.com"
    },
    {
        "id": "8632aa21-a62d-426e-a7b0-7f0c9d866a1d",
        "username": "bonnie",
        "email": "asdf@qwerty.com"
    }
  ]
   ```

* **Sample Call:**

  ```javascript
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("localhost:4000/user/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  ```

### Login User
----
  Returns json data of a token after successful validation of login credentials

* **URL**

  /auth/login

* **Method:**

  `POST`

* **Data Params**

  ```
  {
    "username": "username",
    "password": "password"
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTFhMzA0OS1kYTc4LTQ1MjgtODM2Mi1jNDFmNzZmYjFiZDUiLCJ1c2VybmFtZSI6ImJvbm5pZSIsImlhdCI6MTYxOTQwNDg4OCwiZXhwIjoxNjE5NDA4NDg4fQ.HDtlsIHUJRIkrKXGpXp9uuC33qQbSm36YQ0Ej1Mxan8"
    }
    ```

* **Sample Call:**

  ```javascript
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": "bonnie",
      "password": "1234abc"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("localhost:4000/auth/login/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  ```

### Show User Favorites
----
  Returns json data about a single user and its keybindings

* **URL**

  /user/favorites

* **Method:**

  `GET`
  
*  **Header Params**

   **Required:**
 
   Key=`Authorization`, Value=`Bearer <jwt token>`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": "012a5479-136f-4a3b-9d0c-b0967ac9798f",
        "username": "clyde",
        "userFavorites": [
            {
                "id": "4915ec3b-e45e-41ed-980b-d4f90be50254",
                "name": "Ctrl+Shift+P, F1",
                "keyCombination": "Ctrl+Shift+P, F1",
                "description": "Show Command Palette",
                "likes": 1
            }
        ]
    }
    ```

* **Sample Call:**

  ```javascript
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTFhMzA0OS1kYTc4LTQ1MjgtODM2Mi1jNDFmNzZmYjFiZDUiLCJ1c2VybmFtZSI6ImJvbm5pZSIsImlhdCI6MTYxOTQwNDg4OCwiZXhwIjoxNjE5NDA4NDg4fQ.HDtlsIHUJRIkrKXGpXp9uuC33qQbSm36YQ0Ej1Mxan8");

    var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("localhost:4000/user/favorites", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  ```

### Add Keybind to User Favorites
----
  Returns json data about a single user and its updated keybindings

* **URL**

  /user/favorites

* **Method:**

  `POST`
  
*  **Header Params**

   **Required:**
 
   Key=`Authorization`, Value=`Bearer <jwt token>`

* **Data Params**

  ```
    {
        "keybind": {
            "id": "id"
        }
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": "012a5479-136f-4a3b-9d0c-b0967ac9798f",
        "username": "clyde",
        "userFavorites": [
            {
                "id": "4915ec3b-e45e-41ed-980b-d4f90be50254",
                "name": "Ctrl+Shift+P, F1",
                "keyCombination": "Ctrl+Shift+P, F1",
                "description": "Show Command Palette",
                "likes": 1
            },
            {
                "id": "51e4efbb-b75d-4c5c-8dc1-7831d057ad7d",
                "name": "Ctrl+P",
                "keyCombination": "Ctrl+P",
                "description": "Quick Open, Go to File...",
                "likes": 1
            }
        ]
    }
    ```

* **Sample Call:**

  ```javascript
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTFhMzA0OS1kYTc4LTQ1MjgtODM2Mi1jNDFmNzZmYjFiZDUiLCJ1c2VybmFtZSI6ImJvbm5pZSIsImlhdCI6MTYxOTQwNDg4OCwiZXhwIjoxNjE5NDA4NDg4fQ.HDtlsIHUJRIkrKXGpXp9uuC33qQbSm36YQ0Ej1Mxan8");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "keybind": {
        "id": "51e4efbb-b75d-4c5c-8dc1-7831d057ad7d"
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("localhost:4000/user/favorites", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  ```

### Remove Keybind to User Favorites
----
  Returns json data about a single user and its keybindings, and the removed keybinding

* **URL**

  /user/favorites

* **Method:**

  `DELETE`
  
*  **Header Params**

   **Required:**
 
   Key=`Authorization`, Value=`Bearer <jwt token>`

* **Data Params**

  ```
    {
        "keybind": {
            "id": "id"
        }
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "user": {
            "id": "012a5479-136f-4a3b-9d0c-b0967ac9798f",
            "username": "clyde",
            "userFavorites": [
                {
                    "id": "4915ec3b-e45e-41ed-980b-d4f90be50254",
                    "name": "Ctrl+Shift+P, F1",
                    "keyCombination": "Ctrl+Shift+P, F1",
                    "description": "Show Command Palette",
                    "likes": 1
                }
            ]
        },
        "removed": {
            "id": "51e4efbb-b75d-4c5c-8dc1-7831d057ad7d",
            "name": "Ctrl+P",
            "keyCombination": "Ctrl+P",
            "description": "Quick Open, Go to File...",
            "likes": 0
        }
    }
    ```

* **Sample Call:**

  ```javascript
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTFhMzA0OS1kYTc4LTQ1MjgtODM2Mi1jNDFmNzZmYjFiZDUiLCJ1c2VybmFtZSI6ImJvbm5pZSIsImlhdCI6MTYxOTQwNDg4OCwiZXhwIjoxNjE5NDA4NDg4fQ.HDtlsIHUJRIkrKXGpXp9uuC33qQbSm36YQ0Ej1Mxan8");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "keybind": {
        "id": "51e4efbb-b75d-4c5c-8dc1-7831d057ad7d"
      }
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("localhost:4000/user/favorites/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  ```
