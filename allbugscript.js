const localString = localStorage.getItem('issues')
let localStorageData = JSON.parse(localString)

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

function renderbugs(listToDisplay = localStorageData) {
  const buglist = document.getElementById('buglist');
  buglist.innerHTML = '';

  listToDisplay.forEach(bug => {
    const bugcard = document.createElement('div');
    bugcard.className = 'bugcard';

    const titleTag = document.createElement('h5');
    titleTag.textContent = bug.title;

    const dateTag = document.createElement('p')
    dateTag.className = 'date'
    dateTag.textContent = bug.dateReported;

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

    bugcard.onclick = () => openBugModal(bug);

    buglist.appendChild(bugcard);
  })
}

document.addEventListener('DOMContentLoaded', () => {
    renderbugs();
});

const modal = document.getElementById('modalOverlay');
const c_modal = document.getElementById('createOverlay')

function openBugModal(bug) {
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

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

function openCreateModal(){
  c_modal.style.display = 'flex'
}

function closeCreateModal(){
  c_modal.style.display = 'none'
}

window.onclick = function(event) {
  if (event.target == c_modal) {
    closeCreateModal();
  }
}

createTicket = () =>{
  
};