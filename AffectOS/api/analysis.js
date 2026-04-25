module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: "OPENAI_API_KEY is not configured on the server."
    });
    return;
  }

  try {
    const { userActionData } = req.body || {};
    const prompt = buildPrompt(userActionData);

    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        input: prompt,
        max_output_tokens: 120
      })
    });

    if (!openAIResponse.ok) {
      const errorPayload = await openAIResponse.text();
      res.status(502).json({ error: `OpenAI request failed: ${errorPayload}` });
      return;
    }

    const data = await openAIResponse.json();
    const text = extractText(data) || "Analysis unavailable from model output.";
    res.status(200).json({ analysis: text });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unexpected server error." });
  }
};

function buildPrompt(userActionData) {
  const action = userActionData?.type || "unknown";
  const category = userActionData?.postCategory || "none";
  const reaction = userActionData?.reactionType || "none";
  const commentSignal = userActionData?.commentSignal || "none";

  return [
    "You are a calm product analytics assistant for a speculative social platform demo.",
    "Return 1-2 short sentences about system interpretation and next feed direction.",
    "Tone: neutral, corporate, concise.",
    `Action: ${action}`,
    `Post category: ${category}`,
    `Reaction: ${reaction}`,
    `Comment signal: ${commentSignal}`
  ].join("\n");
}

function extractText(responseJson) {
  if (typeof responseJson?.output_text === "string" && responseJson.output_text.trim()) {
    return responseJson.output_text.trim();
  }

  const output = responseJson?.output;
  if (!Array.isArray(output)) return "";

  for (const item of output) {
    const content = item?.content;
    if (!Array.isArray(content)) continue;
    for (const chunk of content) {
      if (typeof chunk?.text === "string" && chunk.text.trim()) {
        return chunk.text.trim();
      }
    }
  }

  return "";
}
