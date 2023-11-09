<p align="center">
  <a href="https://nextjs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="128">
    </picture>
    <h1 align="center">Next.js</h1>
  </a>
    <p align="center">- Yash Barman <a align="center" href="https://www.yashbarman.me/">Website</a></p>
</p>

# Next.js Pdf Modifier

This is the frontend for the pdf modifier app. It is built with Next.js and React.

Backend: **https://github.com/yash-kreeti/server**


* Authentication via JWT and next-js serverless functions.
* Has login and signup pages.
* User can upload a pdf file and modify it.
* Download the modified pdf file.
* Users can see their uploaded files in the dashboard under mypdfs tab.
* Users can delete their uploaded files also.

You can see a live demo at **https://pdf-modifier.vercel.app/**


## About

* This project is built with Next.js and React.
* It uses next-js serverless functions for backend.
* It uses react-hook-form for form validation.
* It uses react-pdf for pdf rendering.
* It uses react-toastify for toast notifications.
* It uses react-icons for icons.
* It uses react-dropzone for drag and drop functionality.
* It uses react-loader-spinner for loading spinner.


## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/yash-kreeti/pdf-modifier.git
    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.

## Configuring environment variables

You have to configure your environment variables in the `.env.` file.

### Example `.env` file:
``````
MONGODB_URL="mongodb+srv://yourmongodburl"
TOKEN_SECRET = "yourtokensecret"
```````

## Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.


### Backend of this Project is at **https://github.com/yash-kreeti/server**
