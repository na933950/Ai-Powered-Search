const axios = require("axios");
const cherrio = require("cheerio");
const { OpenAI } = require("openai");

//const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getContent = async (url, limit) => {
  try {
    const res = await axios.get(url);
    const html = res.data;
    const $ = cherrio.load(html);
    const content = $("body").text();
    return content.slice(0, Number(limit * 4.7));
  } catch (err) {
    console.error(`Error fetching URL: ${err}`);
    return "";
  }
};

exports.getRelevance = async (query, url, content) => {  
  try {
    const GPTquery = `I searched this query: ${query} and got this url: ${url} and content: ${content} back. Why may this website help me answer my query? If you can, use specifics from the website content`;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: GPTquery }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  } catch (err) {
    return 'Hmmm it seems like there was an error in having our AI analyze this site!'
  }
};