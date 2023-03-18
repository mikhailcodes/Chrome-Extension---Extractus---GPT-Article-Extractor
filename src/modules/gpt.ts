import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || '',
    completionParams: {
        model: "gpt-3.5-turbo",
        temperature: 0.5
    }
})


const summerizeArticle = async (content: any) => {
    const propmpt = `You are a journalist writing a short summary about the following content: ${content} \n\n Write a short summary of the article. 
    Provide the summary with 5 bullet points and 2-3 sentences for each bullet point.
    `
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