import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || '',
    completionParams: {
        model: "gpt-3.5-turbo",
        temperature: 0.5
    }
})


const summerizeArticle = async (content: any, complexity = 2) => {

    const how_complex = complexity >= 3 ? 'university' : 'grade 5'
    const bullet_number = complexity >= 3 ? complexity * 2 : complexity;
    const sentence_num = complexity >= 3 ? "2-3" : "1-2";

    const propmpt = `You are a journalist write a headline summary of the article, along with ${bullet_number} bullet points and ${sentence_num} sentences for each bullet point of the article content. Set the summary to a ${how_complex} reading level.  \n\n The content is here: ${content}.`
    const res = await api.sendMessage(propmpt)

    return {
        id: res.id,
        parentMessageId: res.parentMessageId,
        message: res.text,
    }
}

const expoundArticle = async (url: string, parentMessageId: string) => {

}

export { summerizeArticle, expoundArticle }