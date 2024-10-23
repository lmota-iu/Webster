# Client

## About

A graphic-design application, written in React, with the use of Konva, Redux, Chakra UI, Unsplash API & Google Fonts API.

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example`. Make sure your `PORT` in the `server/.env` file is part of the `VITE_API_URL` in your `client/.env`.
Then proceed:

- Create a Unsplash account and use the provided test API keys.
- Get [Google fonts API key](https://developers.google.com/fonts/docs/developer_api) and use the provided key.
- Run `yarn install` in the `client/` directory.
- Run `yarn run dev`.

## Available Scripts

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html#building-the-app) for more information.
