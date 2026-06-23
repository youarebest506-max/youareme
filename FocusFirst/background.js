// Default list of distracting sites to block
const BLOCKLIST = [
  "youtube.com",
  "instagram.com",
  "facebook.com",
  "twitter.com",
  "x.com",
  "reddit.com",
  "tiktok.com"
];

// Default coupons list, if not set
const DEFAULT_COUPONS = [
  { id: "c1", title: "10% off Notion Premium", cost: 100, redeemed: false },
  { id: "c2", title: "Free month of Canva Pro", cost: 200, redeemed: false },
  { id: "c3", title: "20% off a Udemy course", cost: 150, redeemed: false }
];

// Helper to get today's date in YYYY-MM-DD
function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

// Initialize storage defaults if they don't exist
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["points", "streak", "history", "coupons", "blocklist"]);

  const updates = {};
  if (data.points === undefined) updates.points = 0;
  if (data.streak === undefined) updates.streak = { count: 0, lastDate: null };
  if (data.history === undefined) updates.history = [];
  if (data.coupons === undefined) updates.coupons = DEFAULT_COUPONS;
  if (data.blocklist === undefined) updates.blocklist = BLOCKLIST;

  if (Object.keys(updates).length > 0) {
    await chrome.storage.local.set(updates);
  }
});

// Watch for tab updates to block distracting sites
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return; // Wait for URL

  try {
    const urlObj = new URL(tab.url);
    const host = urlObj.hostname;

    const data = await chrome.storage.local.get(["goal", "unlockUntil", "blocklist"]);
    const blocklist = data.blocklist || BLOCKLIST;

    // Check if the current URL is in the blocklist
    const isBlocked = blocklist.some(b => host.includes(b));
    if (!isBlocked) return;

    // Check if work is done today
    const workDone = data.goal && data.goal.done && data.goal.doneDate === todayString();

    // Check if we are in the temporary unlock window (15 mins after choosing social media)
    const temporarilyUnlocked = data.unlockUntil && Date.now() < data.unlockUntil;

    // If work isn't done and we aren't temporarily unlocked, redirect to the lock screen
    if (!workDone && !temporarilyUnlocked) {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
    }
  } catch (e) {
    // Catch invalid URLs like chrome:// extensions pages
    console.log("Not a valid HTTP URL", e);
  }
});
