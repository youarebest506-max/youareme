# 🗃️ DATA MODEL — FocusFirst

> The **exact shape** of every piece of saved data. The AI must use these shapes and key names **exactly**. All data lives in `chrome.storage.local`.

---

## 1. `goal` (the current work goal)

```json
{
  "text": "Finish my Python project",
  "createdDate": "2026-06-23",
  "done": false,
  "doneDate": null
}
```

| Field | Type | Meaning |
|---|---|---|
| `text` | string | What the user wants to do |
| `createdDate` | string `YYYY-MM-DD` | When the goal was set |
| `done` | boolean | Whether work is marked complete |
| `doneDate` | string or null | The day it was completed (used to reset daily) |

When the user clicks **Mark Work Done**: set `done = true` and `doneDate = todayString()`.

---

## 2. `points` (number)

```json
120
```

Just a single number. Starts at `0`.

---

## 3. `streak`

```json
{
  "count": 3,
  "lastDate": "2026-06-23"
}
```

| Field | Type | Meaning |
|---|---|---|
| `count` | number | How many days in a row work was finished |
| `lastDate` | string | The last date a goal was completed |

**Logic:** when work is finished:
- If `lastDate` was yesterday → `count + 1`.
- If `lastDate` was today already → no change.
- Otherwise → reset `count = 1`.

---

## 4. `history` (array of completed goals)

```json
[
  { "text": "Finish math homework", "date": "2026-06-22", "choice": "work_more" },
  { "text": "Write 500 words",      "date": "2026-06-23", "choice": "social_media" }
]
```

| Field | Type | Meaning |
|---|---|---|
| `text` | string | The goal that was completed |
| `date` | string | When it was completed |
| `choice` | `"work_more"` or `"social_media"` | What the user chose after finishing |

Newest items can be added to the front of the array.

---

## 5. `coupons` (array)

```json
[
  { "id": "c1", "title": "10% off Notion Premium", "cost": 100, "redeemed": false },
  { "id": "c2", "title": "Free month of Canva Pro", "cost": 200, "redeemed": false },
  { "id": "c3", "title": "20% off a Udemy course",  "cost": 150, "redeemed": false }
]
```

| Field | Type | Meaning |
|---|---|---|
| `id` | string | Unique id |
| `title` | string | What the coupon gives |
| `cost` | number | Points needed to redeem |
| `redeemed` | boolean | Whether the user has claimed it |

**Redeem logic:** if `points >= cost` → `points -= cost`, set `redeemed = true`. Otherwise show "Not enough points".

> These are placeholder coupons for v1. Real affiliate/partner coupons come later.

---

## 6. `blocklist` (array of strings)

```json
["youtube.com","instagram.com","facebook.com","twitter.com","x.com","reddit.com","tiktok.com"]
```

For v1 this can be a constant. Editing it from the UI is a Version 2 feature.

---

## 7. `unlockUntil` (number — timestamp in milliseconds)

```json
1750684800000
```

Set to `Date.now() + 15*60*1000` when the user chooses "View Social Media". Blocking is skipped while `Date.now() < unlockUntil`.

---

## 8. Example: full storage snapshot

```json
{
  "goal": { "text": "Finish Python project", "createdDate": "2026-06-23", "done": true, "doneDate": "2026-06-23" },
  "points": 120,
  "streak": { "count": 3, "lastDate": "2026-06-23" },
  "history": [
    { "text": "Finish math homework", "date": "2026-06-22", "choice": "work_more" }
  ],
  "coupons": [
    { "id": "c1", "title": "10% off Notion Premium", "cost": 100, "redeemed": true }
  ],
  "blocklist": ["youtube.com","instagram.com"],
  "unlockUntil": 0
}
```

---

*Use these shapes exactly. Do not add or rename fields in v1.*
