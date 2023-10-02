const Metaphor = require("metaphor-node");
const { getContent, getRelevance, getSynthesis } = require("./utils");

const metaphor = new Metaphor.default(process.env.METAPHOR_API_KEY);

exports.synthesize = async (req, res) => {
  try {
    const response = await metaphor.search(req.query.search, {
      useAutoprompt: true,
      numResults: 4,
    });

    if (response && response.results) {
      const contentPromises = response.results.map(async (result) => {
        const content = await metaphor.getContents([result.id]);
        return {
          ...result,
          content: content.contents[0].extract,
        };
        /*const content = await getContent(result.url, 500);
        return {
          ...result,
          content: content,
        };*/
      });

      const newData = await Promise.all(contentPromises);

      const synthesis = await getSynthesis(req.query.search, newData);

      res.status(200).json({
        status: "success",
        data: {
          searchResults: newData,
          synthesis,
        },
      });
    } else {
      res.status(404).json({
        status: "fail",
        error: `Request failed with status code ${response.status}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.search = async (req, res) => {
  try {
    const response = await metaphor.search(req.query.search, {
      useAutoprompt: true,
      numResults: 5,
    });

    if (response && response.results) {
      //Getting content from the documents to pass into GPT
      const contentPromises = response.results.map(async (result) => {
        const content = await metaphor.getContents([result.id]);
        console.log(content.contents[0].extract);
        return {
          ...result,
          content: content.contents[0].extract,
        };
        /*const content = await getContent(result.url, 500);
        return {
          ...result,
          content: content,
        };*/
      });

      const newData = await Promise.all(contentPromises);

      //Sending the original query and the data on the content + url over to GPT to add a "relevance" attribute to response.results
      const relevancePromises = newData.map(async (result) => {
        const relevance = await getRelevance(
          req.query.search,
          result.url,
          result.content
        );
        return {
          ...result,
          relevance,
        };
      });

      const finalData = await Promise.all(relevancePromises);

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
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.testSearch = async (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      autopromptString:
        "Here's an insightful article about common JS migration woes:",
      results: [
        {
          title: "How To Migrate From jQuery To Next.js — Smashing Magazine",
          url: "https://www.smashingmagazine.com/2021/07/migrate-jquery-nextjs/",
          publishedDate: "2021-07-13",
          author: "Facundo Giuliani",
          id: "DkbfFz3cWXPo5H928Ys6zQ",
          score: 0.17977800965309143,
          content:
            'Skip to main content\nStart reading the article\nJump to list of all articles\nJump to all topicsArticlesBooksWorkshopsConferencesMembershipJob BoardNewsletterPodcastsWrite for usAdvertise with us\nMore\nLess\nMenu\nLessArticlesBooksWorkshopsConferencesMembershipJob BoardNewsletterPodcastsWrite for usAdvertise with us\n\nClear SearchAccessibilityUXCSSJavaScriptPerformanceDesignFigmaWallpapersReactVueRound-UpsWeb DesignGuidesBusinessCareerPrivacyJump to all articles ↬{"created_at":"2021-07-13T10:30:00Z"}Facundo GiulianiJul 13, 20210 commentsHow To Migrate From jQuery To Next.js19 min readApps,\njQuery,\nNext.js,\nFrameworksShare on Twitter, LinkedInAbout The AuthorDeveloper Relations Engineer at Storyblok. From Buenos Aires, Argentina, he has more than 15 years of experience in software development. Systems Engineer …\nMore about\nFacundo ↬Email NewsletterYour (smashing) email\nWeekly tips on front-end & UX.Trusted by 200,000+ folks.In this article, we’re taking a closer look at different approaches and strategies on how we can migrate a web application that uses jQuery framework, and start using one of the coolest React frameworks in the market: Next.js.This article has been kindly supported by our dear friends at Netlify who are a diverse group of incredible talent from all over the world and offers a platform for web developers that multiplies productivity. Thank you!When jQuery appeared in 2006, a lot of developers and organizations started to adopt it for their projects. The possibility of extending and manipulating the DOM that the library offers is great, and we also have many plugins to add behavior to our pages in case we need to do tasks that aren’t supported by the jQuery main library. It simplified a lot of the work for developers, and, at that moment, it made JavaScript a powerful language to create web applications or Single Page Applications.The result of jQuery popularity is measurable still today: Almost 80% of the most popular websites of the world still use it. Some of the reasons why jQuery is so popular are:It supports DOM manipulation.It provides CSS manipulation.Works the same on all web browsers.It wraps HTML event methods.Easy to create AJAX calls.Easy to use effects and animations.Over the years, JavaScript changed a lot and added several features that we didn’t have in the past. With the re-definit',
          relevance:
            'This website titled "Migrate jQuery to Next.js: A Step-by-Step Guide" appears to be relevant to your query because it discusses the process of migrating from the jQuery framework to Next.js, which is a popular React framework. The article provides insights and strategies for developers who are looking to transition their web applications from jQuery to Next.js. It also mentions the reasons why jQuery became popular and highlights some of its key features. The content of the article addresses your query about the challenges and difficulties associated with the migration process.',
        },
        {
          title:
            "Migration From jQuery to Next.js: A Guide — Smashing Magazine",
          url: "https://www.smashingmagazine.com/2022/08/migration-jquery-next-js-guide/",
          publishedDate: "2022-08-03",
          author: "Sam Robbins",
          id: "6hKmm2X32SNiBK89FpECPg",
          score: 0.1788109540939331,
          content:
            'Skip to main content\nStart reading the article\nJump to list of all articles\nJump to all topicsArticlesBooksWorkshopsConferencesMembershipJob BoardNewsletterPodcastsWrite for usAdvertise with us\nMore\nLess\nMenu\nLessArticlesBooksWorkshopsConferencesMembershipJob BoardNewsletterPodcastsWrite for usAdvertise with us\n\nClear SearchAccessibilityUXCSSJavaScriptPerformanceDesignFigmaWallpapersReactVueRound-UpsWeb DesignGuidesBusinessCareerPrivacyJump to all articles ↬{"created_at":"2022-08-03T12:00:00Z"}Sam RobbinsAug 3, 20220 commentsMigration From jQuery to Next.js: A Guide12 min readCoding,\nJavaScript,\nNextJS,\nReactShare on Twitter, LinkedInAbout The AuthorSam is a Software Developer at CybSafe. He’s a Computer Science Graduate from Durham University and loves using and developing open source software.\nMore about\nSam ↬Email NewsletterYour (smashing) email\nWeekly tips on front-end & UX.Trusted by 200,000+ folks.\nAttend Netlify Compose 2023\nPrepare for today’s communication roles Northwestern’s MS in Information Design.\nBoost Your UX & Design skills, at SmashingConf Antwerp 2023\nCreating and Maintaining Successful Design Systems with Brad Frost\nBuilding Modern HTML Emails, with Rémi Parmentier\nSmashingConf UX & Design: Antwerp 2023This guide will show you how to migrate your jQuery site to React with Next.js – which is a significant undertaking, especially for big code bases. However, this migration allows you to use newer concepts (such as data fetching at build time) to help with our code’s performance and maintainability.jQuery has served developers well for many years. However, libraries (like React) and Frameworks (like Next.js) are now bringing us more modern features to help with our code’s performance and maintainability. This guide will show you how to rewrite your jQuery site using Next.js to take advantage of all these new features, such as client-side routing for smoother transitions and the ability to separate code into components to make it more reusable.Getting startedThe easiest way to get started with a Next.js is to run npx create-next-app. This will scaffold a project for you. However, to understand what this command does, we’ll create our application from scratch.First, we’ll create our Next.js project using npm init. You can proceed with the default settings, as we will change them later. Then, we',
          relevance:
            'This website, smashingmagazine.com, is a reputable source for web development and design articles. The article titled "Migration From jQuery to Next.js: A Guide" seems to directly address your query on why common JS migration sucks. By clicking on the article link, you can read the content of the article and gain insights on the challenges and solutions for migrating from jQuery to Next.js.',
        },
      ],
    },
  });
};

exports.testSynthesis = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      searchResults: [
        {
          title: "The Real Cost of Agricultural Subsidies",
          url: "https://seekingliberty.wordpress.com/2009/09/26/the-real-cost-of-agricultural-subsidies/",
          publishedDate: "2009-09-26",
          author: "Liberty is the Fruit",
          id: "GB0CMXxKlvFMnGoQexLicA",
          score: 0.17757239937782288,
          content: "Fake content",
        },
        {
          title: "Our crazy farm subsidies, explained",
          url: "https://grist.org/food/our-crazy-farm-subsidies-explained/",
          publishedDate: "2015-04-20",
          author: "Amelia Urry",
          id: "W5oAcoiLW7bNQDceLIrRxQ",
          score: 0.17677943408489227,
          content: "Fake content",
        },
        {
          title: "Crop subsidies driven off course",
          url: "https://lompocrecord.com/opinion/commentary/crop-subsidies-driven-off-course/article_5926ee7e-94dc-11e1-9870-001a4bcf887a.html",
          publishedDate: "2012-05-03",
          author: "Joel Marshall; The Forward View",
          id: "0jwzq5j5xwVv2-UL2S3PGw",
          score: 0.17003241181373596,
          content: "Fake content",
        },
        {
          title: "How Farm Subsidies Affect the U.S. Economy",
          url: "https://www.thebalancemoney.com:443/farm-subsidies-4173885",
          publishedDate: "2019-01-03",
          author: "Kimberly Amadeo",
          id: "UnCAenb8HMqbKiiYYu4hgg",
          score: 0.1697072982788086,
          content: "Fake content",
        },
      ],
      synthesis:
        "The question of whether corn subsidies are good for the United States is a complex one with arguments on both sides.  \n\nOn one hand, corn subsidies have been beneficial to American corn producers, providing them with financial stability and helping to maintain high levels of production. The subsidies have also contributed to a stable and affordable food supply in the United States. Furthermore, they have supported rural economies and preserved farmland.\n\nHowever, there are also negative consequences associated with corn subsidies. One major concern is the impact of these subsidies on international markets. The heavy subsidies on American corn have flooded global markets, leading to unfair competition and disadvantaging farmers in other countries, particularly in Africa and Mexico. This has resulted in economic hardships and food insecurity for farmers in those regions.\n\nThe subsidies have also had negative effects within the United States. They have contributed to the overproduction of corn, which has led to environmental issues such as soil erosion and water pollution. In addition, the cheap and abundant corn has led to the production of unhealthy processed foods, contributing to health problems like obesity and diabetes. Moreover, the subsidies have been criticized for disproportionately benefiting larger farms and corporations rather than smaller, family-owned farms.\n\nIn conclusion, while corn subsidies have provided stability",
    },
  });
};
