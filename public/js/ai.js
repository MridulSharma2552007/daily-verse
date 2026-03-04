const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";
const apiKey = "AIzaSyBiOpPihCddfmBbtuTFLWbp2HZ_xav7MyU";

async function callGemini() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a data API. Respond ONLY with valid JSON. Do not include explanations, markdown, or text outside the JSON.

Generate 10 interesting facts about computers or technology.

Requirements:

* Each fact must be short (15–30 words).
* Each fact should be accurate and interesting.
* Include an image URL that visually relates to the fact (computer hardware, early computers, programming, internet history, etc.).

Return the response in this exact JSON format:

{
"facts": [
{
"title": "Short title of the fact",
"fact": "The interesting computer fact",
"image": "https://example.com/image.jpg"
}
]
}

Rules:

* Exactly 10 facts.
* Image URLs should be from reliable sources (Wikipedia, Unsplash, Wikimedia, or similar).
* Do not include any text outside the JSON.
 `,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Log the full response object
    console.log(JSON.stringify(data, null, 2));

    // Access the generated text directly
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (generatedText) {
      console.log("\nResponse Text:", generatedText);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}

callGemini();
