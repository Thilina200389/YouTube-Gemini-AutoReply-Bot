# YouTube AI Comment Bot (Gemini + Apps Script) 🤖🎵

An automated YouTube comment reply system designed for my music channel, **PsycoSan**. This script uses Google Apps Script and the Gemini API to detect unreplied comments and generate context-aware, human-like responses in multiple languages (English, Sinhala, Singlish).

## 🚀 Key Features
* **Persona-Based AI:** The bot acts as a "chill music producer," matching the aesthetic of the Slowed + Reverb channel.
* **Smart Language Detection:** Automatically replies in the same language and script as the user (Sinhala, English, or Singlish).
* **Human-Like Behavior:** Uses random time delays (`Utilities.sleep`) to mimic natural typing speed and avoid bot detection.
* **Spam Prevention:** Checks if a reply already exists before posting.
* **Time Management:** Automatically stops execution before the Google Apps Script 5-minute timeout.

## 🛠️ Tech Stack
* **Platform:** Google Apps Script
* **AI Model:** Google Gemini 3 Flash via REST API
* **Integration:** YouTube Data API v3

## ⚙️ How It Works
1.  Scans the specific YouTube Channel ID for new comments.
2.  Filters out comments that already have a reply.
3.  Sends the user's comment to Gemini with a strict "Persona Prompt."
4.  Gemini generates a short, chill response.
5.  The script posts the reply via the YouTube API after a random delay.

## ⚠️ Setup Note
To use this script, you must replace `YOUR_GEMINI_API_KEY_HERE` and `YOUR_CHANNEL_ID_HERE` in the `Code.gs` file with your actual credentials.

## ⚠️ Disclaimer & Usage Caution
This script is developed for **educational and experimental purposes only**. Automated interactions on YouTube must comply with the [YouTube Terms of Service](https://www.youtube.com/t/terms) and [Community Guidelines](https://www.youtube.com/howyoutubeworks/policies/community-guidelines/).

* **Rate Limits:** Do not set the execution frequency too high (recommended: once every 10-15 minutes). Excessive usage may trigger YouTube's spam filters.
* **Liability:** The author (Thilina Sandakelum Wijesinghe) is not responsible for any channel penalties, API quota costs, or bans resulting from the misuse of this script. Use it responsibly at your own risk.

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## ☕ Support & Services

Found this script helpful? You can support my work by buying me a coffee! 
<a href="buymeacoffee.com/thilii_music" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

### 🛠️ Need Professional Setup?
Not comfortable with coding or APIs? No worries! 

I offer a **Complete Setup Service** where I will:
* Configure the Google Cloud Project & YouTube API.
* Set up the Gemini AI connection.
* Deploy the script securely for your channel.

**💰 Service Fee: $5 (or LKR Equivalent)**
👉 **[Click Here to Request Setup / DM Me](http://wa.me/+94787769314)** or email me at: `thilinasandakelum2003@gmail.com`

### 📬 Connect with Me
* **LinkedIn:** [Thilina Sandakelum](https://www.linkedin.com/in/thilina-sandakelum-wijesinghe/)

---
*Experimental project by Thilina Sandakelum Wijesinghe.*
