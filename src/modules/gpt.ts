import { ChatGPTAPI } from "chatgpt";

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || "",
  completionParams: {
    model: "gpt-3.5-turbo",
  },
});

const summerizeArticle = async (content: any, complexity = 2) => {
  console.time("API timer:");

  const bulletCount = complexity > 0 ? complexity * 2 : 2; // if complexity is less than 0, default to 2 bullet points. If not multiply by 2.   

  const prompt = `You are a journalist with a proficient level of English comprehension. Using markdown language, generate ${bulletCount} bulleted summary of the article below. \n\n The article content is here: ${content}.`;

  const res = await api.sendMessage(prompt);
  const responseText = res.text.split('\n').filter(item => item.trim() !== '').map(item => item.replace(/^\s*-\s*/, ''));

  console.timeEnd("API timer:");
  return {
    id: res.id,
    role: res.role,
    parentMessageId: res.parentMessageId,
    message: responseText // returns in an array of each bullet point.
  };
};

const expoundArticle = async (url: string, parentMessageId: string) => { };

export { summerizeArticle, expoundArticle };
