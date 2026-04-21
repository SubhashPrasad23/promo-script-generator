import genAI from "../config/gemini.js";


export const generateVideo = async (req, res) => {
    const { prompt, goal, duration, audience, budget, style, language,shootType } = req.body;

const aiPrompt = `

You are a top-tier viral content strategist, creative director, viral content creator and short-form video expert.
Your job is to create HIGH-CONVERTING,VIRAL, SCROLL-STOPPING video ad plans optimized for Reels, Shorts, and TikTok.

Think like:
- A viral content strategist (focus on attention & trends)
- A performance marketer (focus on conversion)
- A creator (practical and easy to shoot)

STRICT RULES:
- First 3-5 seconds must grab attention
- Avoid generic ideas
- NO generic lines
- MUST feel like real viral content
- Keep content realistic and shootable
- Focus on high retention and engagement
- NO boring explanation


Ensure:
- Content feels modern,punchy sentences  and trending
- Hook creates curiosity/emotion/surprise
- Human, natural tone
- Make viewer feel something
- Script is concise and engaging
- Output is structured and easy to follow

Based on the user input, generate:

1.Generate EXACTLY 2 different viral hooks
- Hooks must be clearly different in angle (e.g., curiosity vs emotional vs shocking)
- Keep both hooks short, punchy, and scroll-stopping
- A clear and engaging script
2. A clear and engaging script
3. Scene-by-scene breakdown and explain scene clearly
4. Camera and shooting guidance
5. Editing plan for viral performance
6. Use viral hooks, curiosity gaps, and pattern interrupts
7. Content should feel like TikTok/Reels trend
8. Add relatability + storytelling
9. Make it sound NATURAL (not robotic)
10.Use short punchy lines
11. Focus on audience psychology
- Start with a STRONG scroll-stopping hook (no generic lines)
- Make it sound natural, human, and engaging
- Focus on benefits, emotions, and experience
- Add curiosity or FOMO
- Keep it relatable and fast-paced
- Use simple conversational language


PRODUCT UNDERSTANDING RULE:

- First, intelligently interpret the product/category from the Product input.
- If it's a known category (e.g., mobile, skincare, restaurant, clothing, app, etc.):
  → Identify key features, benefits, and selling points automatically.


Examples:
- Mobile → Focus on camera, battery, performance, display, durability, fast charging, price 
- Electronics (Laptop, Gadgets) → Focus on performance, battery, design, value for money, 
- Skincare → Focus on glow, acne, hydration, ingredients, results, skin type suitability
- Restaurant → Focus on taste, food quality, ambiance, hygiene, freshness, pricing, offers, highlight food, ambience and offers, create excitement and urgency
- Clothing → Focus on comfort, style, fit, fabric quality, durability, trend
- App → Focus on ease of use, speed, problem solving, UI/UX, reliability
- Bike → Focus on mileage, performance, comfort, design, pickup, technology, maintenance cost, price, value for money
- Car → Focus on safety, mileage, comfort, features, pickup, technology, resale value, price
- Course/Education → Focus on skills, career growth, certification, placement, real-world projects, price , value for money
- Event → Focus on crowd, vibe, experience, energy, uniqueness
- Movie/Web Series → Focus on story, acting, emotions, visuals, engagement
- Startup/Product → Focus on innovation, problem solving, uniqueness, scalability
- Service → Focus on quality, speed, results, hygiene, trust, affordability
- Travel → Focus on views, experience, budget, adventure, uniqueness
- Hotel → Focus on rooms, service, luxury, location, cleanliness, value
- Gym/Fitness → Focus on strength, weight loss, transformation, expertise, trust, results, ambience, equipment, hygiene, certified trainers
- Real Estate / Flat → Focus on location, price, investment value, future growth, amenities, connectivity, nearby facilities, safety, space, layout, ventilation, natural light, parking, security, builder trust, legal approval, loan availability, resale value, rental income, luxury, lifestyle upgrade, peaceful environment, family comfort, status, urgency, offers



- Adapt script based on Shoot Type:
  - Solo → direct talking, personal storytelling, face to camera,POV
  - Duo → conversation, questions, reactions, engaging dialogue
  - 3-4 → multi-character scenes (if suitable or possible), storytelling, more dynamic shots


Create a HIGH-CONVERTING and TRENDING video ad plan.

Product: ${prompt}
Goal: ${goal}
Duration: ${duration}
Audience: ${audience || "General audience"}
Budget: ${budget}
Style: ${style}
Language: ${language}
ShootType:${shootType}

LANGUAGE RULE:
 - If language is Hindi → ALL output in Hindi
 - Else → English
 - Do NOT mix languages.


IMPORTANT RULES:
- Response MUST be VALID JSON only
- NO markdown (no \`\`\`)
- NO explanation outside JSON
- Make content VIRAL, TRENDING, CREATIVE
- Add modern social media style hooks
- Script MUST be line by line (Scene 1, Scene 2 on new lines)
- Make it feel like REAL viral reel idea
- Avoid generic boring content
- Add creativity + twist
- Scenes must be realistic and shootable


OUTPUT FORMAT:

{
  "Hook": "Hook 1: First viral hook,  ...\\n\\nHook 2: Second viral hook, ..."
  "Core Concept": "...",
  "Full Script": "Scene 1: ...\\nScene 2: ...\\nScene 3: ...",
  "Scene Breakdown": "Scene 1: ...\\nScene 2: ...\\nScene 3: ...",
  "Performance Direction": "How actor should behave, ...",
  "Camera Setup": "Shots, angles, movement, ...",
  "Lighting Plan": "Lighting style, ...",
  "Outfit": "...",
  "Location": "...",
  "Shooting Guide": "...",
  "Editing Plan": "Cuts, transitions, captions style, ...",
  "Background Music": "... (suggest trending or viral music style)",
  "CTA": "Strong call to action, ...",
  "Engagement Tips": "Ways to boost virality, ..."
}
`;

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview"
        });

        const result = await model.generateContent(aiPrompt);

        const text = result.response.text();

        try {
            res.json(JSON.parse(text));
        } catch {
            res.json({ result: text }); 
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gemini failed" });
    }
};