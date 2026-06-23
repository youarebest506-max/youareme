// Helpers
function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

document.addEventListener('DOMContentLoaded', async () => {
  const lockSection = document.getElementById('lock-section');
  const choiceSection = document.getElementById('choice-section');
  const socialPickerSection = document.getElementById('social-picker-section');

  const displayGoalText = document.getElementById('display-goal-text');
  const displayPoints = document.getElementById('display-points');
  const displayStreak = document.getElementById('display-streak');

  const btnMarkDone = document.getElementById('btn-mark-done');
  const btnWorkMore = document.getElementById('btn-work-more');
  const btnViewSocial = document.getElementById('btn-view-social');
  const socialButtonsContainer = document.getElementById('social-buttons');

  let storageData = await chrome.storage.local.get(['goal', 'points', 'streak', 'history', 'blocklist']);

  // Check if there is no goal
  if (!storageData.goal || !storageData.goal.text) {
    displayGoalText.textContent = "You haven't set a goal yet. Open FocusFirst and set one.";
    btnMarkDone.disabled = true;
    btnMarkDone.textContent = "Set a goal to continue";
  } else {
    displayGoalText.textContent = `"${storageData.goal.text}"`;
  }

  displayPoints.textContent = storageData.points || 0;
  displayStreak.textContent = storageData.streak ? storageData.streak.count : 0;

  // Show lock section first
  lockSection.style.display = 'block';

  // Mark Work Done Action
  btnMarkDone.addEventListener('click', async () => {
    // Update goal done status
    const goal = storageData.goal;
    goal.done = true;
    goal.doneDate = todayString();

    await chrome.storage.local.set({ goal: goal });

    // Transition to choice fork
    lockSection.style.display = 'none';
    choiceSection.style.display = 'block';
  });

  // Action: Work More
  btnWorkMore.addEventListener('click', async () => {
    await processCompletion('work_more');
    // Close this block screen and return to whatever they were doing
    // For a tab, close it. Or we could redirect to a nice page. For MVP, we close the tab so they stay in their workspace.
    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.remove(tab.id);
    });
  });

  // Action: View Social Media
  btnViewSocial.addEventListener('click', async () => {
    await processCompletion('social_media');

    // Transition to social picker
    choiceSection.style.display = 'none';
    socialPickerSection.style.display = 'block';

    const blocklist = storageData.blocklist || [
      "youtube.com", "instagram.com", "facebook.com", "twitter.com", "x.com", "reddit.com", "tiktok.com"
    ];

    socialButtonsContainer.innerHTML = '';
    blocklist.forEach(site => {
      const btn = document.createElement('button');
      btn.className = 'btn-neutral social-btn';
      btn.textContent = site;
      btn.addEventListener('click', async () => {
        // Unlock for 15 minutes
        const unlockUntil = Date.now() + 15 * 60 * 1000;
        await chrome.storage.local.set({ unlockUntil });

        // Open the site
        chrome.tabs.create({ url: `https://${site}` });

        // Close the block screen tab
        chrome.tabs.getCurrent((tab) => {
          chrome.tabs.remove(tab.id);
        });
      });
      socialButtonsContainer.appendChild(btn);
    });
  });

  async function processCompletion(choice) {
    // Re-fetch in case it changed
    let data = await chrome.storage.local.get(['points', 'streak', 'history', 'goal']);

    let points = data.points || 0;
    let streak = data.streak || { count: 0, lastDate: null };
    let history = data.history || [];

    const today = todayString();
    const yesterday = getYesterdayString();

    // Streak logic
    if (streak.lastDate !== today) {
      if (streak.lastDate === yesterday) {
        streak.count += 1;
      } else {
        streak.count = 1;
      }
      streak.lastDate = today;
    }

    // Points logic
    if (choice === 'work_more') {
      points += 10;
    }

    // History logic
    history.unshift({
      text: data.goal.text,
      date: today,
      choice: choice
    });

    await chrome.storage.local.set({ points, streak, history });
  }
});
