const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

export const sendMsgToOpenAI = async (message) => {
  if (!apiKey) {
    throw new Error("Missing OpenRouter API key in .env file.");
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173", 
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", 
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.choices?.[0]?.message?.content?.trim();
};