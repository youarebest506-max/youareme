# 🎯 FocusFirst — Work Before Play

> An app/website that blocks social media & games until you finish the work YOU set for yourself. Finish your task, prove it, then choose: keep working for **reward points** (redeemable for discount coupons) or unlock your social media.

---

## 📌 1. The One-Line Pitch

**"You don't get to scroll until you've done your work — and if you keep working instead of scrolling, you earn points worth real discounts."**

---

## 📖 2. The Full Concept (in plain words)

1. The user installs the app (or browser extension) and **sets a work goal** for the day (e.g. "Finish math assignment", "Write 500 words", "Complete the Python project").
2. Whenever the user tries to open a **social media app, website, or game**, a **pop-up / lock screen** appears instead.
3. The pop-up asks: **"Did you finish the work you set?"**
   - The user must **submit proof** — upload the work file, a screenshot, or mark the task complete (with optional verification).
4. **If the work is NOT done** → the app **force-stops / blocks** the social media or game and **opens the Workspace** instead. The user **cannot** access the blocked app until the work is submitted.
5. **When the work IS done**, the app asks:
   > **"Do you want to keep working, or view your social media?"**
   - **Choose "Work more"** → user earns **points** 🪙 (redeemable for discount coupons).
   - **Choose "Social media"** → **no points**, and the app asks **which** social media to open, shows the options, and opens it.
6. Points accumulate and motivate the user to keep working and earn rewards.

---

## 🎯 3. Who It's For (Target Users)

| User group | Pain it solves |
|---|---|
| **Students** | Can't stop scrolling, fail to finish homework/assignments |
| **Self-learners** (like you!) | Open the laptop to study, end up on YouTube |
| **Freelancers / solo founders** | No boss, no accountability, easily distracted |
| **Anyone with phone/screen addiction** | Wants to break the doom-scroll habit |

**Primary first target:** Students & self-learners (they feel the pain most and are easy to reach online).

---

## 🧩 4. Core Features (MVP — Version 1)

These are the **must-haves** to launch. Build ONLY these first.

### 4.1 Set a Work Goal
- User types a task: title + optional description.
- Optional: set a **deadline** or **time block** (e.g. "work for 25 min").
- Stored locally (and later in a database).

### 4.2 The Block / Lock Screen
- Detects when user opens a **blocked app or website**.
- Shows a **full-screen pop-up** instead of letting them in.
- Pop-up message: *"You set a goal: [task]. Finish it before you scroll."*

### 4.3 Proof of Work
- User submits one of:
  - ✅ **Mark as done** (honor system — simplest for v1)
  - 📎 **Upload a file** (the work itself)
  - 🖼️ **Upload a screenshot**
- (Advanced, later: AI checks if the file/screenshot matches the task.)

### 4.4 The Choice Screen (after work is done)
- Two big buttons:
  - 🟢 **"Work More"** → +points, opens Workspace again
  - 🔵 **"View Social Media"** → no points, opens app picker

### 4.5 Points System
- Earn points **only** for choosing "Work More".
- Points are visible on a **dashboard** (total points, streak, history).

### 4.6 Rewards / Coupons
- Points → redeemable for **discount coupons** (start with a simple static list of partner coupons or affiliate deals).

### 4.7 Social Media Picker
- After choosing "View Social Media", show buttons for the user's chosen apps (Instagram, YouTube, etc.) and open the selected one.

---

## 🚀 5. Features for LATER (Version 2+) — DO NOT build these first

- 🔒 **Strict mode** (can't disable the block without a penalty/password)
- 🤖 **AI work verification** (checks the uploaded file actually completes the task)
- 📊 **Analytics** (time saved, focus streaks, weekly reports)
- 👥 **Accountability buddies / friends** (compete on points)
- 🏪 **Real coupon marketplace** (partner with brands, affiliate revenue)
- ⏱️ **Pomodoro timer** built into the workspace
- 📱 **Cross-device sync** (phone + laptop)
- 🔔 **Smart reminders / nudges**

---

## ⚖️ 6. Platform Decision — App vs Website vs Extension

This is the **biggest technical decision**. Here's the honest breakdown:

| Platform | Can it block apps/games? | Difficulty | Recommendation |
|---|---|---|---|
| **Website** | ❌ No — a website can't block other apps on your computer/phone | Easy | ❌ Won't work for the core feature |
| **Browser Extension** (Chrome/Edge) | ✅ Can block **websites** (YouTube, Instagram web) but **NOT installed apps or games** | Medium | ✅ **Best starting point** |
| **Desktop App** (Windows/Mac) | ✅ Can block apps **and** websites | Hard | ⭐ Powerful but harder |
| **Mobile App** (Android/iOS) | ⚠️ Very limited — Apple/Google **restrict** app-blocking heavily | Very Hard | ❌ Avoid for v1 |

### 🏆 Recommended v1: **Browser Extension**
**Why:** Most of the doom-scrolling (YouTube, Instagram, Twitter/X, Reddit) happens **in the browser**. A Chrome/Edge extension can:
- Detect when you open a blocked website.
- Show your lock screen / pop-up instead.
- Redirect you to your workspace.
- Track points & show the dashboard.

This gives you **80% of the value** with **20% of the difficulty**. You can add a desktop app later to block native games/apps.

> ⚠️ **Important reality check:** Blocking **installed games and native apps** (not in a browser) requires a **desktop app** with system-level permissions — that is significantly harder and should be a Version 2 goal, not v1.

---

## 🛠️ 7. Suggested Tech Stack (beginner-friendly)

### Option A — Browser Extension (Recommended for v1)
- **HTML + CSS + JavaScript** (extensions are built with these)
- **Chrome Extension APIs** (`chrome.tabs`, `chrome.storage`, `declarativeNetRequest` for blocking)
- **Local storage** for goals & points (no server needed at first)

### Option B — Desktop App (Version 2)
- **Electron** (build desktop apps with web tech you already know) — or **Python + Tauri**
- Lets you block native apps & games

### When you add accounts & cloud sync (later)
- **Backend:** Node.js or Python (FastAPI)
- **Database:** start with simple storage → later Postgres/Firebase
- **Auth:** Firebase Auth or Clerk

> 💡 Since you're learning, **the extension path is perfect** — it's pure HTML/CSS/JS and teaches you real, useful skills fast.

---

## 🗺️ 8. Build Roadmap (step-by-step, no overwhelm)

| Step | What you build | What you learn |
|---|---|---|
| **1** | A simple webpage: "Set your goal" form + "Mark done" button + points counter (saved in browser) | HTML, CSS, JS basics, localStorage |
| **2** | Turn it into a **Chrome extension** that shows a popup | Extension structure, manifest |
| **3** | Make the extension **block YouTube/Instagram** and redirect to your lock screen | Tab detection, redirects |
| **4** | Add the **"Work More vs Social Media"** choice + points logic | Conditional logic, state |
| **5** | Add a **dashboard** (points, streak, history) | Data display, storage |
| **6** | Add a **coupon/reward list** | More UI + logic |
| **7 (later)** | Accounts + cloud sync + AI verification | Backend, database, APIs |

---

## 🧠 9. User Flow Diagram (text version)

```
User opens YouTube
        │
        ▼
Extension detects blocked site
        │
        ▼
┌─────────────────────────────┐
│   LOCK SCREEN POP-UP          │
│  "You set a goal: [task]"     │
│  Did you finish your work?    │
└─────────────────────────────┘
        │
   ┌────┴─────┐
   │          │
 NOT done    DONE (proof submitted)
   │          │
   ▼          ▼
Block +    "Work more or view social media?"
open            │
Workspace   ┌───┴────┐
            │        │
       Work More  Social Media
            │        │
        +Points   No points
            │        │
       Workspace  Pick app → opens it
```

---

## 💰 10. How It Could Make Money (later)

1. **Affiliate coupons** — when users redeem points for coupons, you earn affiliate commission.
2. **Premium subscription** — strict mode, AI verification, analytics, cross-device sync.
3. **Brand partnerships** — companies sponsor the coupon marketplace.
4. **B2B / Schools** — sell to schools or coaching centers for student focus.

> Don't worry about money for v1. **Build the free working version first, get 10 real users, then think about revenue.**

---

## ⚠️ 11. Honest Risks & Challenges (no sugar-coating)

| Risk | Reality |
|---|---|
| **Can't block native games/apps in a browser** | True — needs a desktop app (Version 2). Start with websites. |
| **Users can just disable the extension** | True for honor-mode. "Strict mode" (harder to disable) is a later feature. |
| **Competition exists** | Yes: Cold Turkey, Freedom, StayFocusd, Forest, LeechBlock. **Your edge = the points→reward loop + the "work more vs scroll" choice.** Most blockers just block; yours **rewards** working. |
| **Proof of work is hard to verify** | Start with honor system. AI verification is a hard, later feature. |
| **Motivation to redeem coupons** | Coupons must be genuinely useful or users won't care. Test what rewards people actually want. |

### 💎 Your Differentiator
Most focus apps **only block**. FocusFirst adds a **positive reward loop**:
> Block (stick) **+** points/coupons for choosing work (carrot) **+** the explicit "keep working vs scroll" decision moment that builds the habit.

That carrot+stick+choice combo is your unique angle.

---

## ✅ 12. Definition of "Done" for v1 (MVP)

You've succeeded at v1 when:
- [ ] User can set a daily work goal.
- [ ] Opening YouTube/Instagram shows the lock screen instead.
- [ ] User must mark work done (or upload proof) to proceed.
- [ ] After work, user picks "Work More" (gets points) or "Social Media" (no points).
- [ ] Points are saved and shown on a dashboard.
- [ ] Choosing social media opens the app the user picks.
- [ ] At least one redeemable coupon exists.

---

## 📂 13. Suggested Project Folder Structure (extension)

```
FocusFirst/
├── manifest.json        # Extension config (required)
├── background.js        # Detects blocked sites, runs in background
├── blocked.html         # The lock screen / pop-up page
├── blocked.js           # Logic for the lock screen
├── dashboard.html       # Points, streak, history
├── dashboard.js
├── popup.html           # Click the extension icon → set goal
├── popup.js
├── styles/
│   └── main.css
└── assets/
    └── icon.png
```

---

## 🏁 14. Next Action

> **Don't plan more. Build Step 1.** A single webpage with a goal form + a "mark done" button + a points counter saved in the browser. That alone teaches you HTML, CSS, JS, and storage — and it's the seed of the whole product.

When you're ready, say **"let's build Step 1"** and we'll write the first real files together.

---

*Document version 1.0 — FocusFirst project spec.*
