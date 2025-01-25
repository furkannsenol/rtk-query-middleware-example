# Token Refresh and Error Handling with RTK Query

## Project Purpose
This project aims to handle expired tokens during service requests without showing a 401 error to the user. It achieves this by obtaining a new access token using the refresh token, resending the requests seamlessly, and updating the global state with the received data to ensure a smooth user experience. Additionally, it includes error handling mechanisms to properly manage and display any errors that occur during API operations.

The token expiration time is set to 15 seconds, and the refresh token expiration time is set to 1 minute. If you wish to modify these settings, you can update the `jwt.ts` file located under the `utils` folder in the backend directory.

## Installing Dependencies
To install the required dependencies, navigate to both the `backend` and `frontend` directories and run the following command:

`npm i`

## Starting the Backend Server
Run the following command inside the backend directory to start the server:

`npm run dev`

## Starting the Frontend
`npm start`

## Backend Port
The `backend` server runs on port `5034` by default. If you want to change it, you can edit the `PORT` variable in the `.env` file located in the backend directory. However, don't forget to update the `baseURL` in the `.env` file located in the `frontend` directory to match the new port.

## Screenshot
![Ekran görüntüsü 2025-01-26 011723](https://github.com/user-attachments/assets/88762cc1-dad3-45bb-9e60-787e839889dc)
![Ekran görüntüsü 2025-01-26 012737](https://github.com/user-attachments/assets/349331ed-c0cc-4d60-85b3-130b9e2b4a29)
![Ekran görüntüsü 2025-01-26 012644](https://github.com/user-attachments/assets/fe74f35b-36f8-4f34-a8cd-4401e92b5f82)
