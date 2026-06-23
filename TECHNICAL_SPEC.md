# ⚙️ TECHNICAL SPEC — FocusFirst (Manifest V3 Extension)

> Exact technical details so the AI builds it right. Pure HTML/CSS/JS. No build tools.

---

## 1. manifest.json (use this as the base)

```json
{
  "manifest_version": 3,
  "name": "FocusFirst — Work Before Play",
  "version": "1.0",
  "description": "Blocks distracting sites until you finish your work. Earn points for working more.",
  "permissions": ["storage", "tabs"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "assets/icon.png"
  },
  "icons": {
    "128": "assets/icon.png"
  },
  "web_accessible_resources": [
    {
      "resources": ["blocked.html", "dashboard.html"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

> Note: `tabs` + `host_permissions: <all_urls>` is enough to read tab URLs and redirect. We avoid `declarativeNetRequest` to keep v1 simple and readable for a beginner.

---

## 2. Chrome APIs used (only these)

| API | Why | Where |
|---|---|---|
| `chrome.tabs.onUpdated` | Detect when a blocked site is opened | `background.js` |
| `chrome.tabs.update` | Redirect a tab to the lock screen | `background.js` |
| `chrome.storage.local.get/set` | Save & read goals, points, coupons | everywhere |
| `chrome.runtime.getURL` | Get the in-extension URL for `blocked.html` | `background.js` |
| `chrome.tabs.create` | Open the chosen social media site | `blocked.js` |

---

## 3. Storage keys (chrome.storage.local) — DO NOT RENAME

| Key | Type | Meaning |
|---|---|---|
| `goal` | object | Current work goal (see DATA_MODEL.md) |
| `points` | number | Total points the user has |
| `streak` | object | `{ count, lastDate }` |
| `history` | array | List of completed goals |
| `coupons` | array | Coupon list with redeemed state |
| `blocklist` | array of strings | Sites to block |
| `unlockUntil` | number (timestamp ms) | Temporary unlock after choosing "View Social Media" |

---

## 4. Default blocklist

```js
["youtube.com","instagram.com","facebook.com","twitter.com","x.com","reddit.com","tiktok.com"]
```

User can edit this later (Version 2). For v1 it can be a constant.

---

## 5. Date handling (important)

Use a helper so "work done today" resets at midnight:

```js
function todayString() {
  const d = new Date();
  // returns like "2026-06-23"
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}
```

- A goal counts as "done today" only if `goal.doneDate === todayString()`.
- On a new day, the lock screen returns automatically (no manual reset needed).

---

## 6. Temporary unlock logic

When the user chooses **"View Social Media"**:
1. Set `unlockUntil = Date.now() + 15 * 60 * 1000` (15 minutes).
2. Open the chosen site with `chrome.tabs.create`.
3. `background.js` skips blocking while `Date.now() < unlockUntil`.

This prevents an infinite redirect loop and gives a sane scroll window.

---

## 7. Points rules

| Action | Points |
|---|---|
| Choose **Work More** after finishing | +10 |
| Choose **View Social Media** | +0 |
| Maintain a daily streak | +5 bonus on day 2+ (optional) |

Points can never go below 0 when redeeming coupons.

---

## 8. No build step

The extension must run by:
1. Going to `chrome://extensions`
2. Enabling **Developer mode**
3. Clicking **Load unpacked**
4. Selecting the `FocusFirst` folder

No npm, no webpack, no compilation.

---

*Keep the code small, readable, and heavily commented for a beginner.*
