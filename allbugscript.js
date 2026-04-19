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
    title: "DB_DEADLOCK_ON_CONCURRENT_ORDER",
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

function applyFilters(){
  const searchedTitles = document.getElementById('search').value;
  const searchTerm = searchedTitles.toLowerCase();

  const checkedPriorities = Array.from(document.querySelectorAll('.priority-check:checked'))
  .map(cb => cb.value)

  const checkedProjects = Array.from(document.querySelectorAll('.project-check:checked'))
  .map(cb => cb.value)

  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  const filteredData = data.filter(bug => {
    const matchesTitles = searchTerm.length === 0 || bug.title.toLowerCase().includes(searchTerm);

    const matchesPriority = checkedPriorities.length === 0 || checkedPriorities.includes(bug.priority);

    const matchesProject = checkedProjects.length === 0 || checkedProjects.includes(bug.project);

    const bugdate = new Date(bug.dateReported);
    const minDate = startDate ? new Date(startDate): null;
    const maxDate = endDate ? new Date(endDate): null;

    let matchesDate = true;
    if (minDate && bugdate < minDate) matchesDate = false;
    if (maxDate && bugdate > maxDate) matchesDate = false;

    return matchesTitles && matchesPriority && matchesProject && matchesDate;
  });

  renderbugs(filteredData)
}

document.querySelectorAll('.filter-check').forEach(box => {
  box.addEventListener('change', applyFilters);
});

document.querySelectorAll('.date-filter').forEach(input => {
  input.addEventListener('change', applyFilters);
});

document.getElementById('search').addEventListener('input', applyFilters);

function renderbugs(listToDisplay = data) {
  const buglist = document.getElementById('buglist');
  buglist.innerHTML = '';

  listToDisplay.forEach(bug => {
    //Creates the overall card
    const bugcard = document.createElement('div');
    bugcard.className = 'bugcard';

    //Creates Heading for the card
    const titleTag = document.createElement('h5');
    titleTag.textContent = bug.title;

    //Creates the date of issue
    const dateTag = document.createElement('p')
    dateTag.className = 'date'
    dateTag.textContent = bug.dateReported;

    //Creates the priority targ
    const priorityTag = document.createElement('p')
    priorityTag.className = 'priority'
    priorityTag.textContent = bug.priority;

    const projectTag = document.createElement('p')
    projectTag.className = 'projectId'
    projectTag.textContent = bug.project

    bugcard.appendChild(titleTag);
    bugcard.appendChild(dateTag);
    bugcard.appendChild(priorityTag);
    bugcard.appendChild(projectTag);

    bugcard.onclick = () => openModal(bug);

    buglist.appendChild(bugcard);
  })
}

document.addEventListener('DOMContentLoaded', () => {
    renderbugs();
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
