# 🤖 AI BUILD INSTRUCTIONS — FocusFirst

> **READ THIS FIRST.** You are an AI coding agent. Your job is to build the **FocusFirst** Chrome/Edge browser extension **exactly** as described here. Do NOT invent new features. Do NOT change the data shapes. Build ONLY Version 1 (MVP). Use plain **HTML + CSS + JavaScript** (Manifest V3). No frameworks, no build tools, no npm.

---

## 🎯 What you are building (one line)

A Manifest V3 browser extension that **blocks distracting websites until the user finishes a self-set work goal**, then lets them choose to **"Work More" (earn points)** or **"View Social Media" (no points)**. Points are redeemable for coupons.

---

## 📜 The 7 Golden Rules (do not break these)

1. **Manifest V3 only.** Use `chrome.declarativeNetRequest` OR `chrome.tabs.onUpdated` for blocking (explained below).
2. **No frameworks.** Pure HTML/CSS/vanilla JS. No React, no bundlers, no npm install.
3. **Use `chrome.storage.local`** for all saved data. Never use a server in v1.
4. **Follow the exact data shapes** in `DATA_MODEL.md`. Do not rename keys.
5. **Build in the order below.** Finish and verify each step before the next.
6. **Comment the important lines** in plain, simple English (the owner is a beginner).
7. **Everything must run by loading the unpacked extension** — no build step required.

---

## 📂 Files you must create

```
FocusFirst/
├── manifest.json        # Extension config (Manifest V3)
├── background.js        # Service worker: detects blocked sites, redirects
├── blocked.html         # Lock screen shown instead of the blocked site
├── blocked.js           # Lock-screen logic (check goal, mark done, choice)
├── popup.html           # Opens when clicking the toolbar icon: set goal
├── popup.js             # Popup logic (set/clear goal, show points)
├── dashboard.html       # Points, streak, history, coupons
├── dashboard.js         # Dashboard logic
├── styles/
│   └── main.css         # Shared styles for all pages
└── assets/
    └── icon.png         # 128x128 icon (use a placeholder if needed)
```

---

## 🪜 BUILD ORDER (do exactly this, in this order)

### ✅ STEP 1 — Skeleton that loads
- Create `manifest.json` (Manifest V3) with: name, version `1.0`, an action popup (`popup.html`), a background service worker (`background.js`), and permissions: `["storage", "tabs", "declarativeNetRequest"]`. Add `"host_permissions": ["<all_urls>"]`.
- Create a minimal `popup.html` that says "FocusFirst" and links to the dashboard.
- **Verify:** the extension loads in `chrome://extensions` with Developer Mode on, no errors.

### ✅ STEP 2 — Set a goal (popup)
- In `popup.html`: a text input "What will you work on?" + a **Set Goal** button + a **Clear Goal** button + a small points display.
- In `popup.js`: save the goal to `chrome.storage.local` using the `goal` shape from `DATA_MODEL.md`. Show the current goal if one exists.
- **Verify:** setting a goal persists after closing/reopening the popup.

### ✅ STEP 3 — Block sites + show lock screen (THE CORE)
- In `background.js`: listen with `chrome.tabs.onUpdated`. When a tab's URL matches the **blocklist** (default: `youtube.com`, `instagram.com`, `facebook.com`, `twitter.com`, `x.com`, `reddit.com`, `tiktok.com`) **AND** the goal is not marked done today → redirect that tab to `blocked.html`.
- Create `blocked.html` (the lock screen) showing the current goal text and the message "Finish your work before you scroll."
- **Verify:** opening youtube.com redirects to the lock screen when work is not done.

### ✅ STEP 4 — Proof of work + the choice fork
- In `blocked.html` / `blocked.js`: a **"Mark Work Done ✅"** button (honor system for v1).
- After marking done, show TWO buttons:
  - 🟢 **Work More** → add points (see `DATA_MODEL.md`), stay on workspace/close tab.
  - 🔵 **View Social Media** → no points, then show a small picker of the blocked sites and open the chosen one (set a temporary "unlocked" flag so the redirect doesn't fire).
- **Verify:** the full loop works: blocked → mark done → choose → points only for "Work More".

### ✅ STEP 5 — Points + streak persistence
- Store points and a daily streak per `DATA_MODEL.md`. Reset the "done today" flag at midnight (compare stored date string to today's date).
- **Verify:** points accumulate; "done" resets on a new day.

### ✅ STEP 6 — Dashboard
- `dashboard.html` / `dashboard.js`: show total points, current streak, and a history list of completed goals. Show the coupon list (Step 7).
- **Verify:** dashboard reflects stored data accurately.

### ✅ STEP 7 — Coupons
- A static list of coupons (see `DATA_MODEL.md`), each with a point cost. A **Redeem** button that deducts points if the user has enough; show "Redeemed" state.
- **Verify:** redeeming deducts points and cannot go negative.

---

## 🔒 How blocking works (use this exact approach)

Simplest reliable v1 approach using `chrome.tabs.onUpdated`:

```javascript
// background.js — runs in the background, watches tabs
const BLOCKLIST = ["youtube.com","instagram.com","facebook.com","twitter.com","x.com","reddit.com","tiktok.com"];

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;                       // no URL yet, ignore
  const host = new URL(tab.url).hostname;     // get the site name
  const isBlocked = BLOCKLIST.some(b => host.includes(b));
  if (!isBlocked) return;                      // not a blocked site, allow

  const data = await chrome.storage.local.get(["goal","unlockUntil"]);
  const workDone = data.goal && data.goal.doneDate === todayString();
  const temporarilyUnlocked = data.unlockUntil && Date.now() < data.unlockUntil;

  if (!workDone && !temporarilyUnlocked) {
    // Redirect to the lock screen instead of the blocked site
    chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
  }
});
```

> Provide a `todayString()` helper returning e.g. `"2026-06-23"`.

---

## ✅ Definition of Done (v1)
- [ ] Extension loads with no errors.
- [ ] User can set & clear a daily goal.
- [ ] Opening a blocked site shows the lock screen.
- [ ] "Mark Work Done" unlocks the choice fork.
- [ ] "Work More" gives points; "View Social Media" gives none and opens the chosen site.
- [ ] Points + streak persist and reset daily.
- [ ] Dashboard shows points, streak, history.
- [ ] At least 3 coupons are redeemable.

---

## ❌ Do NOT do these (v1)
- ❌ No servers, no databases, no accounts, no login.
- ❌ No AI verification of work.
- ❌ No blocking of native apps/games (browser sites only).
- ❌ No frameworks or build tools.
- ❌ No new features beyond this document.

---

*If anything is unclear, prefer the simplest possible implementation that satisfies the Definition of Done.*
