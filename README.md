# AI Powered Search Tool

This is an AI search tool powered by OpenAPI GPT and Metaphor to streamline search results with an AI-generated description to make up for nonsensical HTML content. It also has the ability to synthesize the search results in a long format with MLA-style citations at the bottom. You can switch between these two options. Please allow for some processing time after you search.

![Screenshot 2023-10-02 172616](https://github.com/na933950/Ai-Powered-Search/assets/51889372/7e300852-0a90-4d61-a253-706186dab2ac)
![Screenshot 2023-10-02 172728](https://github.com/na933950/Ai-Powered-Search/assets/51889372/9059dea8-6d5d-40d4-943a-5bdab748436f)
![Screenshot 2023-10-02 172917](https://github.com/na933950/Ai-Powered-Search/assets/51889372/ed9ab9b1-a3bb-427b-9a06-c335f3b231c2)
![Screenshot 2023-10-02 172952](https://github.com/na933950/Ai-Powered-Search/assets/51889372/8770addb-9f26-4dac-84c1-6426a7ecf777)

Technologies used to create this project include:

- ReactJS + Vite
- TypeScript
- JavaScript
- Node.js
- Express.js
- Axios
- Metaphor API
- OpenAI API
- Postman

# Usage

To use, clone the repository and and run `npm i`.

Additionally, you need your own keys for the OpenAI API and Metaphor API. Please add the following config.env file:

```
PORT=3000
METAPHOR_API_KEY=[YOUR_KEY]
OPENAI_API_KEY=[YOUR_KEY]
```

Then run:

```
> cd metaphor-project\server
\metaphor-project\server> npm start
```

Open a new terminal and run:

```
> cd metaphor-project\client
\metaphor-project\client> npm run dev
```

And click on the localhost.

# Documentation

Hitting "Enter" or pressing the search button sends a `GET` Request to the Node server which is running on port 3000 to the route:
`127.0.0.1:3000/api/{searches|synthesis}?search=[YOUR_SLUGIFIED_SEARCH]`

If you would like to test out the route but don't have API keys, navigate as follows:

```
> cd client/src/assets/SearchBar/SearchBar.tsx
```

And adjust line 43 from:

```
43 |        `http://127.0.0.1:3000/api/searches?search=${sluggedQuery}`
```

To:

```
43 |        `http://127.0.0.1:3000/api/test-searches?search=${sluggedQuery}`
```

And also adjust line 56 from:

```
56 |        `http://127.0.0.1:3000/api/synthesis?search=${sluggedQuery}`
```

To:

```
56 |        `http://127.0.0.1:3000/api/test-synthesis?search=${sluggedQuery}`
```

The test search return a hard-coded test API response giving two results to a query about CommonJS and ES6. The test synthesis will return a synthesis on four results about whether corn is beneficial for the United States.
