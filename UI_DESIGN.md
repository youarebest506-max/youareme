# 🎨 UI DESIGN — FocusFirst

> What every screen looks like, the colors, and the layout. The AI should make it clean, modern, and motivating. Keep it simple but polished.

---

## 🎨 Color Palette

| Use | Color | Hex |
|---|---|---|
| Primary (focus / action) | Deep indigo | `#4F46E5` |
| Success / Work More | Green | `#22C55E` |
| Social Media / neutral | Blue | `#3B82F6` |
| Warning / Blocked | Red | `#EF4444` |
| Background | Soft dark | `#0F172A` |
| Card background | Slate | `#1E293B` |
| Text | Off-white | `#F1F5F9` |
| Muted text | Gray | `#94A3B8` |
| Points / reward accent | Gold | `#FACC15` |

**Font:** system sans-serif (`system-ui, -apple-system, Segoe UI, Roboto, sans-serif`). Rounded corners (`border-radius: 12px`). Soft shadows. Smooth transitions on buttons (`transition: all 0.2s`).

---

## 🖼️ Screen 1 — Popup (toolbar icon)

Small window (~320px wide). Shown when the user clicks the extension icon.

```
┌──────────────────────────────┐
│  🎯 FocusFirst                │
│                               │
│  What will you work on today? │
│  ┌─────────────────────────┐ │
│  │ [ text input ]          │ │
│  └─────────────────────────┘ │
│  [   Set Goal   ]             │
│                               │
│  Current goal:                │
│  "Finish Python project"      │
│  Status: 🔒 Not done          │
│                               │
│  🪙 Points: 120   🔥 Streak: 3 │
│  [ Open Dashboard ]  [ Clear ]│
└──────────────────────────────┘
```

- The **Set Goal** button is indigo `#4F46E5`.
- Points in gold, streak with a 🔥 emoji.
- If a goal exists, show it with its status.

---

## 🚫 Screen 2 — Blocked / Lock Screen (`blocked.html`)

Full page. This replaces the blocked website. Should feel firm but encouraging.

```
┌────────────────────────────────────────────┐
│                                            │
│                  🔒                         │
│        Finish your work before you scroll.  │
│                                            │
│   Your goal today:                          │
│   ┌──────────────────────────────────────┐ │
│   │  "Finish my Python project"          │ │
│   └──────────────────────────────────────┘ │
│                                            │
│          [ ✅ Mark Work Done ]              │
│                                            │
│   🪙 120 points   🔥 3 day streak           │
│                                            │
└────────────────────────────────────────────┘
```

- Big red lock 🔒 at top. Background dark `#0F172A`.
- Goal shown in a card `#1E293B`.
- **Mark Work Done** button = green `#22C55E`.
- If NO goal is set, show: "You haven't set a goal yet. Open FocusFirst and set one."

---

## 🔀 Screen 3 — The Choice Fork (after "Mark Work Done")

Appears on `blocked.html` after marking done (hide the lock, show this).

```
┌────────────────────────────────────────────┐
│            🎉 Work done! Nice.              │
│                                            │
│        What do you want to do now?          │
│                                            │
│   ┌──────────────┐   ┌──────────────────┐  │
│   │ 🟢 Work More  │   │ 🔵 View Social    │  │
│   │  +10 points   │   │  Media (0 points) │  │
│   └──────────────┘   └──────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

- **Work More** = green, shows "+10 points".
- **View Social Media** = blue, makes clear it gives NO points (this is the motivating contrast).

---

## 📱 Screen 4 — Social Media Picker (after choosing "View Social Media")

```
┌────────────────────────────────────────────┐
│   Pick what to open (no points earned):     │
│                                            │
│   [ YouTube ] [ Instagram ] [ Reddit ]      │
│   [ Twitter/X ] [ TikTok ]                  │
│                                            │
│   You have 15 minutes before FocusFirst     │
│   locks again.                              │
└────────────────────────────────────────────┘
```

- Each button opens that site in a new tab and sets the 15-min `unlockUntil`.

---

## 📊 Screen 5 — Dashboard (`dashboard.html`)

```
┌──────────────────────────────────────────────────────┐
│  🎯 FocusFirst Dashboard                              │
│                                                      │
│  ┌────────────┐ ┌────────────┐ ┌──────────────────┐  │
│  │ 🪙 Points   │ │ 🔥 Streak   │ │ ✅ Goals done     │  │
│  │   120       │ │   3 days   │ │   8               │  │
│  └────────────┘ └────────────┘ └──────────────────┘  │
│                                                      │
│  📜 History                                           │
│  • Finish math homework — Jun 22 — 🟢 Worked more     │
│  • Write 500 words — Jun 23 — 🔵 Social media          │
│                                                      │
│  🎁 Rewards (redeem points)                           │
│  ┌──────────────────────────────────────────────┐    │
│  │ 10% off Notion Premium — 100 pts  [ Redeem ]  │    │
│  │ Free month Canva Pro  — 200 pts  [ Redeem ]   │    │
│  │ 20% off Udemy course  — 150 pts  [ Redeem ]   │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

- Three stat cards at top (`#1E293B` cards, gold numbers for points).
- History list below.
- Coupon cards with **Redeem** buttons (disabled/greyed if not enough points; "Redeemed ✅" once claimed).

---

## ✨ Polish details (make it feel real)
- Buttons grow slightly on hover (`transform: scale(1.03)`).
- Smooth fade-in when the choice fork appears.
- Use emojis as simple icons (no icon library needed).
- Keep spacing generous; don't cram.
- Everything readable on the dark background.

---

*Goal: clean, modern, motivating. Simple enough for a beginner to build, polished enough to feel like a real product.*
