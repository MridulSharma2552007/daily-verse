const AI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";
const AI_API_KEY = "AIzaSyBiOpPihCddfmBbtuTFLWbp2HZ_xav7MyU";

async function loadAI() {
  const container = document.getElementById("ai-container");
  if (!container) return;

  // Show loading animation
  container.innerHTML = '<div class="loader"></div>';

  try {
    const response = await fetch(AI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": AI_API_KEY,
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
"image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60"
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
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      // Clean up markdown code blocks if present (Gemini sometimes wraps JSON in ```json ... ```)
      const jsonString = generatedText.replace(/```json|```/g, "").trim();
      const parsedData = JSON.parse(jsonString);

      container.innerHTML = parsedData.facts
        .map(
          (item) => `
        <div class="ai-card">
          <div class="ai-image">
            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400?text=AI+Fact'" />
          </div>
          <div class="ai-content">
            <h3>${item.title}</h3>
            <p>${item.fact}</p>
          </div>
        </div>
      `,
        )
        .join("");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    container.innerHTML =
      '<p style="text-align:center; color: rgba(255,255,255,0.7);">Failed to load AI facts. Please try again later.</p>';
  }
}

loadAI();
