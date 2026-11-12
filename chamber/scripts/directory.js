const container = document.querySelector('#members');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const levels = { 1: ['Member', ''], 2: ['Silver', 'silver'], 3: ['Gold', 'gold'] };

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    displayMembers(await response.json());
  } catch (error) {
    console.error('Could not load members:', error);
    container.innerHTML = '<p>Sorry, the member directory could not be loaded. Please try again later.</p>';
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach((m, index) => {
    const [label, cls] = levels[m.level] ?? levels[1];
    const card = document.createElement('section');
    card.className = 'member-card';
    card.dataset.level = m.level;

    // Optimize LCP image: first image loads eagerly with high priority, others lazy-load
    const imgLoading = index === 0 ? 'eager' : 'lazy';
    const fetchPriorityAttr = index === 0 ? 'fetchpriority="high"' : '';

    card.innerHTML = `
      <img src="images/${m.image}" alt="${m.name} logo" width="300" height="200" loading="${imgLoading}" ${fetchPriorityAttr}>
      <div class="card-body">
        <h2>${m.name}</h2>
        <span class="badge ${cls}">${label}</span>
        <p class="tagline">${m.tagline}</p>
        <address>${m.address}</address>
        <p><a href="tel:+55${m.phone.replace(/\D/g, '')}" aria-label="Call ${m.name} at ${m.phone}">${m.phone}</a></p>
        <p><a href="${m.website}" target="_blank" rel="noopener" aria-label="Visit ${m.name} website (opens in a new tab)">Visit website</a></p>
      </div>`;
    container.appendChild(card);
  });
}

function setView(view) {
  container.classList.toggle('list', view === 'list');
  gridBtn.setAttribute('aria-pressed', view === 'grid');
  listBtn.setAttribute('aria-pressed', view === 'list');
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

getMembers();