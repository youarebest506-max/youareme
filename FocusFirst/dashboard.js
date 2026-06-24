document.addEventListener('DOMContentLoaded', async () => {
  const dashPoints = document.getElementById('dash-points');
  const dashStreak = document.getElementById('dash-streak');
  const dashGoals = document.getElementById('dash-goals');
  const historyContainer = document.getElementById('history-container');
  const couponsContainer = document.getElementById('coupons-container');

  const data = await chrome.storage.local.get(['points', 'streak', 'history', 'coupons']);

  // Set stats
  let points = data.points || 0;
  dashPoints.textContent = points;
  dashStreak.textContent = (data.streak ? data.streak.count : 0) + " days";

  const history = data.history || [];
  dashGoals.textContent = history.length;

  // Render History
  if (history.length === 0) {
    historyContainer.innerHTML = '<p class="text-muted">No goals completed yet.</p>';
  } else {
    historyContainer.innerHTML = history.map(item => {
      const icon = item.choice === 'work_more' ? '🟢 Worked more' : '🔵 Social media';
      return `
        <div class="history-item">
          <div style="font-weight: bold;">${item.text}</div>
          <div class="text-muted">${item.date} &nbsp;—&nbsp; ${icon}</div>
        </div>
      `;
    }).join('');
  }

  // Render Coupons
  function renderCoupons(couponsList, currentPoints) {
    couponsContainer.innerHTML = '';
    couponsList.forEach(coupon => {
      const card = document.createElement('div');
      card.className = 'coupon-card';

      const info = document.createElement('div');
      info.innerHTML = `<strong>${coupon.title}</strong><br><span class="text-muted">${coupon.cost} pts</span>`;

      const btn = document.createElement('button');
      if (coupon.redeemed) {
        btn.className = 'btn-ghost';
        btn.textContent = 'Redeemed ✅';
        btn.disabled = true;
      } else {
        btn.className = 'btn-primary';
        btn.textContent = 'Redeem';
        btn.disabled = currentPoints < coupon.cost;

        btn.addEventListener('click', async () => {
          // Double check point balance
          const latestData = await chrome.storage.local.get(['points', 'coupons']);
          let currentPts = latestData.points || 0;
          let currentCps = latestData.coupons || couponsList;

          if (currentPts >= coupon.cost) {
            currentPts -= coupon.cost;
            const updatedCoupons = currentCps.map(c =>
              c.id === coupon.id ? { ...c, redeemed: true } : c
            );

            await chrome.storage.local.set({
              points: currentPts,
              coupons: updatedCoupons
            });

            // Re-render
            points = currentPts;
            dashPoints.textContent = points;
            renderCoupons(updatedCoupons, points);
          }
        });
      }

      card.appendChild(info);
      card.appendChild(btn);
      couponsContainer.appendChild(card);
    });
  }

  const coupons = data.coupons || [];
  renderCoupons(coupons, points);
});
