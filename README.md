# AI Powered Search Tool

This is an AI search tool powered by OpenAPI GPT and Metaphor to streamline search results with an AI-generated description to make up for nonsensical HTML content.

Technologies used to create this project include: 
* ReactJS + Vite
* TypeScript
* JavaScript
* Node.js
* Express.js
* Axios
* Metaphor API
* OpenAI API
* Postman

# Usage 

To use, clone the repository and and run ```npm i```.

Additionally, you need your own keys for the OpenAI API and Metaphor API. Please add the following config.env file:
```
PORT=3000
METAPHOR_API_KEY=[YOUR_KEY]
OPENAI_API_KEY=[YOUR_KEY]
```
Then run:
```
> cd server
\server> npm start
```
```
> cd client
\client> npm run dev
```
And click on the localhost.

# Documentation

Hitting "Enter" or pressing the search button sends a ```GET``` Request to the Node server which is running on port 3000 to the route:
```127.0.0.1:3000/api/searches?search=[YOUR_SLUGIFIED_SEARCH]```

If you would like to test out the route but don't have API keys, navigate as follows:
```
> cd client/src/assets/SearchBar/SearchBar.tsx
```
and adjust line 29 from:
```
29 |     `http://127.0.0.1:3000/api/searches?search=${sluggedQuery}`
```
To
```
29 |     `http://127.0.0.1:3000/api/test?search=${sluggedQuery}`
```
This will return a hard-coded test API response giving two results to a query about CommonJS and ES6
