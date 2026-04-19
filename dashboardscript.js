let data = [
  {
    id: "#101",
    title: "ASSET_MAPPING_MISALIGNMENT",
    subject: "Coordinates provided by satellite telemetry are offset by 4.2m on the Z-axis.",
    priority: "Medium",
    desc: "The mapping engine is failing to account for atmospheric refraction during high-angle passes, resulting in offset coordinate plots.",
    project: "ProjectCD85",
    assignedTo: "Ryan Reynolds",
    dateReported: "2026-01-01",
    completed: false
  },
  {
    id: "#102",
    title: "AUTH_TOKEN_EXPIRY_RECURSION",
    subject: "User session refresh loop when token expires during active upload.",
    priority: "Critical",
    desc: "When a JWT expires exactly during a multipart file upload, the refresh interceptor enters an infinite loop, crashing the browser tab.",
    project: "ProjectMD12",
    assignedTo: "Scarlett Johansson",
    dateReported: "2026-04-05",
    completed: true
  },
  {
    id: "#103",
    title: "UI_HYDRATION_MISMATCH",
    subject: "React hydration error on product landing page under slow 3G conditions.",
    priority: "Low",
    desc: "Server-side rendered HTML does not match client-side state when dynamic pricing modules load after initial paint.",
    project: "ProjectCD85",
    assignedTo: "Tom Hardy",
    dateReported: "2026-04-10",
    completed: false
  },
  {
    id: "#104",
    title: "DB_DEADLOCK_CONCURRENT_ORDER",
    subject: "Database deadlock occurring during flash sale peak traffic.",
    priority: "Critical",
    desc: "The 'inventory' and 'order_items' tables are locking in reverse order when two users purchase the last item simultaneously.",
    project: "ProjectMD12",
    assignedTo: "",
    dateReported: "2026-04-12",
    completed: false
  },
  {
    id: "#105",
    title: "CSS_GRID_OVERFLOW_SAFARI",
    subject: "Dashboard layout collapses on Safari versions older than 15.4.",
    priority: "Medium",
    desc: "The sidebar 'fr' units are being calculated as 0px because of a lack of support for certain aspect-ratio properties.",
    project: "ProjectCD85",
    assignedTo: "Zendaya",
    dateReported: "2026-04-15",
    completed: true
  }
];

function renderNewBugs(listToDisplay = data){
  const card = document.getElementById("new-row");
  card.innerHTML = '';

  const newList = listToDisplay.filter(bug => {
    return bug.assignedTo === '' && bug.completed === false
  })

  newList.forEach(bug => {
    let x = 'low';
    if(bug.priority === 'Critical') {
      x = 'crit';
    } else if (bug.priority === 'Medium') {
      x = 'med';
    } else {
      x = 'low';
    }

    const bugcard = document.createElement('div');
    bugcard.className = 'card new';

    const title =  document.createElement('h4');
    title.textContent = bug.title;
    
    const subject = document.createElement('p');
    subject.textContent = bug.subject;

    const tag = document.createElement('div');
    tag.className = 'importance ' + x
    tag.textContent = bug.priority

    bugcard.appendChild(title);
    bugcard.appendChild(subject);
    bugcard.appendChild(tag);

    bugcard.onclick = () => openModal(bug)

    card.appendChild(bugcard)
  })
}

function renderInProgressBugs(listToDisplay = data){
  const card = document.getElementById("inprogress");
  card.innerHTML = '';

  const inProgressList = listToDisplay.filter(bug => {
    return bug.assignedTo !== '' && bug.completed === false
  });

  inProgressList.forEach(bug => {
    let x = 'low';
    if(bug.priority === 'Critical') {
      x = 'crit';
    } else if (bug.priority === 'Medium') {
      x = 'med';
    } else {
      x = 'low';
    }

    const bugcard = document.createElement('div');
    bugcard.className = 'card active';

    const title =  document.createElement('h4');
    title.textContent = bug.title;
    
    const subject = document.createElement('p');
    subject.textContent = bug.subject;

    const tag = document.createElement('div');
    tag.className = 'importance ' + x
    tag.textContent = bug.priority

    bugcard.appendChild(title);
    bugcard.appendChild(subject);
    bugcard.appendChild(tag);

    bugcard.onclick = () => openModal(bug)

    card.appendChild(bugcard)
  })
}

function renderCompleteBugs(listToDisplay = data){
  const card = document.getElementById("archived");
  card.innerHTML = '';

  const archivedList = listToDisplay.filter(bug => {
    return bug.completed === true
  })

  archivedList.forEach(bug => {
    let x = 'low';
    if(bug.priority === 'Critical') {
      x = 'crit';
    } else if (bug.priority === 'Medium') {
      x = 'med';
    } else {
      x = 'low';
    }

    const bugcard = document.createElement('div');
    bugcard.className = 'card archived';

    const title =  document.createElement('h4');
    title.textContent = bug.title;
    
    const subject = document.createElement('p');
    subject.textContent = bug.subject;

    const tag = document.createElement('div');
    tag.className = 'importance ' + x
    tag.textContent = bug.priority

    bugcard.appendChild(title);
    bugcard.appendChild(subject);
    bugcard.appendChild(tag);

    bugcard.onclick = () => openModal(bug)

    card.appendChild(bugcard)
  })
}

document.addEventListener('DOMContentLoaded', () => {
    renderNewBugs();
    renderInProgressBugs();
    renderCompleteBugs()
});

const modal = document.getElementById('modalOverlay');

function openModal(bug) {
  modal.querySelector('#modalTitle').textContent = bug.title;
  modal.querySelector('#modalID').textContent = bug.id;
  modal.querySelector('#modalSub').textContent = bug.subject;
  modal.querySelector('#modalProject').textContent = bug.project;
  modal.querySelector('#modalPriority').textContent = bug.priority;
  modal.querySelector('#modalDesc').textContent = bug.desc;
  modal.querySelector('#modalAssigned').textContent = bug.assignedTo;

  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

// Close the modal if the user clicks ANYWHERE outside the white box
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}