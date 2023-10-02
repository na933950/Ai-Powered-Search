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
    console.log(err);
    return "Hmmm it seems like there was an error in having our AI analyze this site!";
  }
};

exports.getSynthesis= async (search, res) => {
  try {
    let sources = `I searched the following: ${search} and got a bunch of my responses. You are a helpful assistant. Using the following search results, synthesize the results and return an answer to my question using the sources. You should cite sources in your answer as if you were responding to an analytical essay prompt and put their URLs in as well:\n\n`;
    res.forEach((element) => {
      sources += `Source URL: ${element.url}, Source content: ${element.content}\n\n`;
    });
    const completion = await openai.chat.completions.create({
      messages: [{role: "system", content: sources}],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  } catch (err) {
    console.log(err);
    return "Hmmmmm it seems like there was an error in having our AI synthesize this data!";
  }
};
