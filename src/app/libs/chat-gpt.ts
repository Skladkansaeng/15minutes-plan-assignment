import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.CHAT_GPT_KEY, // This is the default and can be omitted
});

export async function callChatGPT(content: any): Promise<any> {
    try {
        const output = []
        const stream = await openai.beta.chat.completions.stream({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content
            }],
            stream: true,
        });

        for await (const chunk of stream) {
            // process.stdout.write(chunk.choices[0]?.delta?.content || '');
            output.push(chunk.choices[0]?.delta?.content || '')
        }

        return output

    } catch (error) {
        console.error("Error calling OpenAI API:", error);
    }
}