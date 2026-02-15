/**
 * PROJECT: YouTube Comment Auto-Reply Bot with Gemini AI
 * AUTHOR: Thilina Sandakelum Wijesinghe
 * DESCRIPTION: Automatically replies to YouTube comments using Google Gemini AI with a specific persona
 * * SETUP:
 * 1. Get your Gemini API Key from Google AI Studio.
 * 2. Get your YouTube Channel ID.
 * 3. Add the 'YouTube Data API v3' service in Apps Script.
 */

/**
 * CONFIGURATION
 */
const CONFIG = {
  GEMINI_API_KEY: "YOUR_GEMINI_API_KEY_HERE",
  CHANNEL_ID: "YOUR_CHANNEL_ID_HERE", 
  MAX_COMMENTS: 10, 
};

/**
 * MAIN FUNCTION: Scans for unreplied comments and generates AI responses
 */
function autoReplyWithGemini() {
  const startTime = new Date().getTime(); 
  let pageToken = null; 

  try {
    do {
      const results = YouTube.CommentThreads.list('snippet', {
        allThreadsRelatedToChannelId: CONFIG.CHANNEL_ID,
        maxResults: CONFIG.MAX_COMMENTS,
        pageToken: pageToken,
        order: "time" 
      });

      if (!results.items || results.items.length === 0) break;

      for (let item of results.items) {
        if (new Date().getTime() - startTime > 300000) { 
          Logger.log("Time limit (5 min) approaching. Stopping to save progress.");
          return; 
        }

        let topComment = item.snippet.topLevelComment;
        let commentId = topComment.id;
        let userComment = topComment.snippet.textOriginal;
        let authorName = topComment.snippet.authorDisplayName;

        if (item.snippet.totalReplyCount === 0) {
          
          // 1. Get AI Reply
          let aiReply = getGeminiResponse(userComment);
          
          // 2. Reply only if a valid response is generated
          if (aiReply) {
            Logger.log(`>>> Found unreplied comment from ${authorName}: "${userComment}"`);

            //Random delay to mimic human behavior
            Utilities.sleep(Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000);

            YouTube.Comments.insert({
              snippet: {
                parentId: commentId,
                textOriginal: aiReply
              }
            }, 'snippet');

            Logger.log(`Successfully replied to ${authorName}: ${aiReply}`);
            
            Utilities.sleep(Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000);
          } else {
            // if something is wrong, skip the comment (Skip)
            Logger.log(`Skipping comment from ${authorName} due to API Error.`);
          }
        }
      }
      pageToken = results.nextPageToken;
    } while (pageToken); 

  } catch (e) {
    Logger.log('Error in autoReplyWithGemini: ' + e.message);
  }
}

/**
 * HELPER FUNCTION: Communicates with Gemini API with persona rules
 */
function getGeminiResponse(commentText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  //const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  //const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`;

  //This is persona (Change this prompt accrding to your channel background and scenario)
  const prompt = `You are the human creator of the YouTube channel 'PsycoSan'.
    Channel Vibe: Slowed + Reverb music, chill, aesthetic, lo-fi, and very relaxed.
    
    STRICT LANGUAGE RULES:
    1. SINGLISH RULE: If the comment is in Singlish, your reply MUST also be in chill Singlish.
    2. SINHALA RULE: If in Sinhala script, reply in natural, everyday Sinhala.
    3. ENGLISH RULE: If in English, reply in chill English.
    4. EMOJI ONLY: If only emojis, reply with only 1-2 aesthetic emojis.
    5. UNIVERSAL LANGUAGE MATCH: Detect the language and the FORMAT of the comment and reply in the same.

    CRITICAL LANGUAGE RULES:
    1. EXACT LANGUAGE MATCH: Detect the language of the comment (e.g., Sinhala, English, Indonesian, Filipino, etc.). 
    2. SCRIPT/FORMAT MATCH: Reply in the SAME format (Romanized or native script).
    3. NO CROSS-LANGUAGE REPLY: Never reply in Sinhala or Singlish to a foreign language comment.
    
    HUMAN TONE RULES:
    - Be like a real person, not an AI. Never say "I appreciate it" or "I'm glad".
    - Use natural slang of the detected language (e.g., "machan/bn" for Sri Lankan, "bang/bro" for Indonesian).
    - Keep it very short (under 8 words). 
    - Act like a chill music producer.
    - If it's just emojis, reply with 1-2 chill emojis.
    
    User's Comment: "${commentText}"`;

  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    if (json.error || !json.candidates || !json.candidates[0].content) {
      if (json.error) Logger.log("Gemini API Error: " + json.error.message);
      return null; 
    }

    return json.candidates[0].content.parts[0].text.trim();
  } catch (err) {
    Logger.log("Connection Error: " + err.message);
    return null; 
  }
}

// to check your available google's api models (v1beta)
function checkMyModels() {
  const apiKey = "AIzaSyBoqzmy_ylnWVhdcIgyxcUjqOhS_YfAhik"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
  const json = JSON.parse(response.getContentText());
  if (json.models) {
    json.models.forEach(model => {
      Logger.log("Model Name: " + model.name);
    });
  }
}
