# ✅ FEATURES CHECKLIST — FocusFirst v1

> The AI ticks each box as it builds. Build top to bottom. Do not skip ahead.

---

## 🧱 Setup
- [ ] Create the `FocusFirst/` folder structure (see AI_BUILD_INSTRUCTIONS.md)
- [ ] Create `manifest.json` (Manifest V3) — loads with no errors
- [ ] Add a placeholder `assets/icon.png` (128x128)
- [ ] Create `styles/main.css` with the color palette from UI_DESIGN.md
- [ ] Extension loads via "Load unpacked" with Developer Mode on

## 🎯 Goal setting (popup)
- [ ] `popup.html` has a goal text input
- [ ] **Set Goal** button saves goal to `chrome.storage.local`
- [ ] **Clear Goal** button removes the goal
- [ ] Popup shows current goal + status (done / not done)
- [ ] Popup shows points and streak
- [ ] "Open Dashboard" button opens `dashboard.html`

## 🚫 Blocking (background)
- [ ] `background.js` listens to `chrome.tabs.onUpdated`
- [ ] Detects blocklisted sites (youtube, instagram, etc.)
- [ ] Redirects to `blocked.html` when goal is NOT done today
- [ ] Does NOT redirect when goal IS done today
- [ ] Does NOT redirect during the 15-min `unlockUntil` window

## 🔒 Lock screen (blocked.html)
- [ ] Shows the current goal text
- [ ] Shows "Finish your work before you scroll" message
- [ ] Handles the case where no goal is set
- [ ] **Mark Work Done** button sets `done = true`, `doneDate = today`

## 🔀 Choice fork
- [ ] After marking done, shows **Work More** + **View Social Media**
- [ ] **Work More** → +10 points, records `choice: "work_more"` in history
- [ ] **View Social Media** → 0 points, records `choice: "social_media"`
- [ ] **View Social Media** → shows the social media picker
- [ ] Picker opens the chosen site + sets 15-min `unlockUntil`

## 🪙 Points & streak
- [ ] Points persist in `chrome.storage.local`
- [ ] Streak increments correctly (yesterday → +1, gap → reset to 1)
- [ ] "Done today" resets automatically on a new day

## 📊 Dashboard
- [ ] Shows total points, streak, goals-done count
- [ ] Shows history list (text, date, choice)
- [ ] Shows coupon list

## 🎁 Coupons
- [ ] At least 3 coupons exist (from DATA_MODEL.md)
- [ ] **Redeem** deducts points if enough
- [ ] Points never go below 0
- [ ] Redeemed coupons show "Redeemed ✅"

## 🎨 Polish
- [ ] Matches the color palette in UI_DESIGN.md
- [ ] Buttons have hover effects
- [ ] Choice fork fades in smoothly
- [ ] Readable on dark background
- [ ] Important lines commented in simple English (for a beginner)

---

## 🏁 Final verification (Definition of Done)
- [ ] Open youtube.com → lock screen appears
- [ ] Mark work done → choice fork appears
- [ ] Work More → points go up
- [ ] View Social Media → no points, site opens, locks again after 15 min
- [ ] Dashboard reflects everything correctly
- [ ] Redeem a coupon → points deducted

✅ **When every box is ticked, FocusFirst v1 is DONE.**
