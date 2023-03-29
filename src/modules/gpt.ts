import { ChatGPTAPI } from "chatgpt";

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || "",
  completionParams: {
    model: "gpt-3.5-turbo",
    temperature: 0.5,
  },
});

const summerizeArticle = async (content: any, complexity = 2) => {
  console.time("API timer:");
  // const how_complex = complexity >= 3 ? 'university' : 'grade 5'
  //const bullet_number = complexity >= 3 ? complexity * 2 : complexity;

  let prompt: string;

  if (complexity === 0) {
    prompt = "0";
  } else if (complexity === 1) {
    prompt = `You are a journalist. Summerize the article in 2 bullet points and 1-2 sentences for each bullet point, ONLY return a JSON with the data so that the bullet points are all in an array. \n\n The article content is here: ${content}.`;
  } else if (complexity === 2) {
    prompt = `You are a journalist. Summerize the article in 4 bullet points and 1-2 sentences for each bullet point, ONLY return a JSON with the data so that the bullet points are all in an array. \n\n The article content is here: ${content}.`;
  } else if (complexity === 3) {
    prompt = `You are a journalist. Summerize the article in 6 bullet points and 1-2 sentences for each bullet point, ONLY return a JSON with the data so that the bullet points are all in an array. \n\n The article content is here: ${content}.`;
  } else if (complexity === 4) {
    prompt = `You are a journalist. Summerize the article in 8 bullet points and 1-2 sentences for each bullet point, ONLY return a JSON with the data so that the bullet points are all in an array. \n\n The article content is here: ${content}.`;
  } else if (complexity === 5) {
    prompt = `You are a journalist. Summerize the article in 10 bullet points and 1-2 sentences for each bullet point, ONLY return a JSON with the data so that the bullet points are all in an array. \n\n The article content is here: ${content}.`;
  } else {
    prompt = `You are a journalist. Summerize the article in 10 bullet points and 1-2 sentences for each bullet point, ONLY return a JSON with the data so that the bullet points are all in an array. \n\n The article content is here: ${content}.`;
  }
  console.log(prompt);
  //const propmpt = `You are a journalist. Summerize and provide ${bullet_number} bullet points and 1-2 sentences for each bullet point, ONLY return a JSON with the data so that the bullet points are all in an array. \n\n The article content is here: ${content}.`
  const res = await api.sendMessage(prompt);

  //console.log(res)

  const data = await (function () {
    try {
      return JSON.parse(res.text);
    } catch (e) {
      return res.text;
    }
  })();

  console.timeEnd("API timer:");
  return {
    id: res.id,
    parentMessageId: res.parentMessageId,
    message: data,
    data_type: data.bullet_points ? "json" : "text",
  };
};

const expoundArticle = async (url: string, parentMessageId: string) => {};

export { summerizeArticle, expoundArticle };
