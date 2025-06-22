# VoicePay – Inclusive Voice-Powered Digital Payments

**VoicePay** is a multilingual, AI-powered voice assistant platform designed to enable secure and accessible digital payments through natural speech. It allows users to confirm purchases, select payment methods, and verify OTPs — all without touching the screen.

---

## 🌍 Why VoicePay?

Millions of users, including the elderly, visually impaired, or those with limited digital literacy, face barriers using traditional payment interfaces. VoicePay addresses this by enabling a completely voice-driven, hands-free payment experience — empowering inclusivity at scale.

---

## 🔧 Features

- 🌐 Multilingual voice interface (English, Hindi, Chinese)
- 🎙️ Natural command navigation (e.g., “Go to About”, “Open Pricing”)
- 🔁 Voice-controlled payment flow with confirmation prompts
- 🔐 Voice-verified OTP system using FastAPI + Twilio
- 🎨 Accessible UI with light/dark mode — also voice-controlled

---

## 🛠 Tech Stack

### Frontend
- HTML5 / CSS3 / JavaScript
- Web Speech API (Speech Recognition & Synthesis)
- Responsive design with accessible controls
- Dynamic page navigation and audio feedback

### Backend
- FastAPI (Python) for OTP generation & verification
- Twilio API for real-time SMS OTP delivery
- CORS setup for secure frontend-backend communication

---

## 🧪 Voice Command Examples

| Task                        | Commands                     |
|-----------------------------|------------------------------|
| Navigate to a page          | “Home”, “About”, “Pricing”   |
| Confirm purchase            | “Yes”, “Proceed”, “Confirm”  |
| Cancel transaction          | “No”, “Cancel”               |
| Change theme to light mode  | “Light”, “Sun”, “Day mode”   |
| Change theme to dark mode   | “Dark”, “Night”, “Moon”      |

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/voicepay-inclusive-future.git
   cd voicepay-inclusive-future

