const Metaphor = require("metaphor-node");
const { getContent, getRelevance } = require("./utils");

const metaphor = new Metaphor.default(process.env.METAPHOR_API_KEY);

exports.search = async (req, res) => {
  try {
    const response = await metaphor.search(req.query.search, {
      useAutoprompt: true,
      numResults: 2,
    });

    if (response && response.results) {
      //Getting content from the documents to pass into GPT
      const contentPromises = response.results.map(async (result) => {
          const content = await getContent(result.url, 500);
          return {
              ...result,
              content: content,
          };
      });

      const newData = await Promise.all(contentPromises);

      //Sending the original query and the data on the content + url over to GPT to add a "relevance" attribute to response.results
      const relevancePromises = newData.map(async (result) => {
        const relevance = await getRelevance(req.query.search, result.url, result.content);
        return {
          ...result,
          relevance,
        }
      })

      const finalData = await Promise.all(relevancePromises)

      res.status(200).json({
        status: "success",
        data: {
          ...response,
          results: finalData,
        },
      });
    } else {
      res.status(404).json({
        status: "fail",
        error: `Request failed with status code ${response.status}`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};
