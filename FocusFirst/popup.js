// Get today's date string in YYYY-MM-DD format
function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

document.addEventListener('DOMContentLoaded', async () => {
  const goalInput = document.getElementById('goal-input');
  const btnSetGoal = document.getElementById('btn-set-goal');
  const btnClearGoal = document.getElementById('btn-clear-goal');
  const btnDashboard = document.getElementById('btn-dashboard');

  const setupSection = document.getElementById('setup-section');
  const statusSection = document.getElementById('status-section');
  const currentGoalText = document.getElementById('current-goal-text');
  const currentGoalStatus = document.getElementById('current-goal-status');
  const pointsDisplay = document.getElementById('points-display');
  const streakDisplay = document.getElementById('streak-display');

  // Load state from storage
  const data = await chrome.storage.local.get(['goal', 'points', 'streak']);

  // Update points and streak
  pointsDisplay.textContent = data.points || 0;
  streakDisplay.textContent = data.streak ? data.streak.count : 0;

  // Check if there is an active goal for today
  if (data.goal) {
    // Show status section
    setupSection.style.display = 'none';
    statusSection.style.display = 'block';

    currentGoalText.textContent = `"${data.goal.text}"`;

    // Check if done today
    const isDoneToday = data.goal.done && data.goal.doneDate === todayString();

    if (isDoneToday) {
      currentGoalStatus.textContent = '✅ Done';
      currentGoalStatus.className = 'status-done';
    } else {
      currentGoalStatus.textContent = '🔒 Not done';
      currentGoalStatus.className = 'status-not-done';
    }
  } else {
    // Show setup section
    setupSection.style.display = 'block';
    statusSection.style.display = 'none';
  }

  // Set goal action
  btnSetGoal.addEventListener('click', async () => {
    const text = goalInput.value.trim();
    if (!text) return;

    const newGoal = {
      text: text,
      createdDate: todayString(),
      done: false,
      doneDate: null
    };

    await chrome.storage.local.set({ goal: newGoal });

    // Refresh UI
    setupSection.style.display = 'none';
    statusSection.style.display = 'block';
    currentGoalText.textContent = `"${text}"`;
    currentGoalStatus.textContent = '🔒 Not done';
    currentGoalStatus.className = 'status-not-done';
    goalInput.value = '';
  });

  // Clear goal action
  btnClearGoal.addEventListener('click', async () => {
    await chrome.storage.local.remove('goal');

    // Refresh UI
    setupSection.style.display = 'block';
    statusSection.style.display = 'none';
  });

  // Open Dashboard action
  btnDashboard.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
  });
});
