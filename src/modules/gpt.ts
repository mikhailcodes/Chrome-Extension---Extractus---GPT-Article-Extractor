import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || '',
    completionParams: {
        model: "gpt-4",
        temperature: 0.5
    }
})


const summerizeArticle = async (content: any, complexity = 2) => {

    // const how_complex = complexity >= 3 ? 'university' : 'grade 5'
    const bullet_number = complexity >= 3 ? complexity * 2 : complexity;

    const propmpt = `You are a journalist. Summerize and provide ${bullet_number} bullet points and 1-2 sentences for each bullet point, using "-" to seperate each bullet of the article content below. \n\n The article content is here: ${content}.`
    //const res = await api.sendMessage(propmpt)

    return {
        id: 1,
        parentMessageId: 2,
        message: complexity,
    }
    }
    /*
    return {
        id: res.id,
        parentMessageId: res.parentMessageId,
        message: res.text,
    }
    */
}

const expoundArticle = async (url: string, parentMessageId: string) => {

}

export { summerizeArticle, expoundArticle }