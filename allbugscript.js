const localString = localStorage.getItem('issues')
let localStorageData = JSON.parse(localString)

function ProjectChoiceDropDown() { //This code provides a dropdown to remove projects or assign them to a person. It acts as form validation as the user is forced to choose one of them
    let projects = JSON.parse(localStorage.getItem('projects')),PC = document.getElementById('ProjectChooice');

    if (!PC) return;
    
    projects.forEach(element => {
        let projectChoice = document.createElement('p');
        projectChoice.value = element.code;
        projectChoice.innerHTML = `<p><input type="checkbox" name="project" value="${element.code}" class="project-check filter-check">Project${element.code}</p>`;
        PC.appendChild(projectChoice);        
    });
}

function applyFilters(){
  const searchedTitles = document.getElementById('search').value;
  const searchTerm = searchedTitles.toLowerCase();

  const checkedPriorities = Array.from(document.querySelectorAll('.priority-check:checked'))
  .map(cb => cb.value)

  const checkedProjects = Array.from(document.querySelectorAll('.project-check:checked'))
  .map(cd => cd.value)

  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  const filteredData = localStorageData.filter(bug => {
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
    getAllProjects();
    getAllPeople();
});

const modal = document.getElementById('modalOverlay');
const c_modal = document.getElementById('createOverlay')
const e_modal = document.getElementById('editOverlay')

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
  if (event.target == modal || event.target == c_modal || event.target == e_modal) {
    closeModal();
    closeCreateModal();
    closeEditModal();
  }
}

function openCreateModal(){
  c_modal.style.display = 'flex'
}

function closeCreateModal(){
  c_modal.style.display = 'none'
}

function openEditModal(){
  e_modal.style.display = 'flex'
}

function closeEditModal(){
  e_modal.style.display = 'none'
}

getAllProjects = () => {
  const raw = localStorage.getItem('projects')
  let newstorage = JSON.parse(raw)

  const target = document.getElementById('P_Select')
  const target2 = document.getElementById('E_P_Select')

  newstorage.forEach(element => {
    let project = document.createElement('option')
    project.value = element.code;
    project.textContent = 'Project' + element.code
    target.appendChild(project)
  })
  newstorage.forEach(element => {
    let project = document.createElement('option')
    project.value = element.code;
    project.textContent = 'Project' + element.code
    target2.appendChild(project)
  })
}

getAllPeople = () => {
  const raw = localStorage.getItem('people')
  let newstorage = JSON.parse(raw)

  const target = document.getElementById('editAssigned')

  newstorage.forEach(element => {
    let person = document.createElement('option')
    person.value = element.FirstName + ' ' + element.LastName;
    person.textContent = element.FirstName + ' ' + element.LastName;
    target.appendChild(person)
  })
}

createTicket = (a=event) =>{
  a.preventDefault()

  const raw = localStorage.getItem('issues')
  let newstorage = JSON.parse(raw)

  const title = document.getElementById("titleinput").value
  const subject = document.getElementById("subjectinput").value
  const project = document.getElementById("P_Select").value
  const urgency = document.getElementById("U_Select").value
  const desc = document.getElementById("Desc").value

  let temp = {
    id: `#${(newstorage.length + 101)}`,
    title: title,
    subject: subject,
    priority: urgency,
    desc: desc,
    project: project,
    assignedTo: '',
    dateReported:  new Date().toISOString().split('T')[0],
    completed: false,
  }

  newstorage.push(temp)

  localStorage.setItem("issues", JSON.stringify(newstorage))
  localStorageData = newstorage;
  renderbugs()
  closeCreateModal()
};

deleteTicket = () => {
  const raw = localStorage.getItem('issues');
  let newstorage = JSON.parse(raw);

  let idToDelete = document.getElementById('modalID').textContent.trim()

  newstorage = newstorage.filter(ticket => ticket.id != idToDelete);

  localStorage.setItem('issues', JSON.stringify(newstorage));
  localStorageData = newstorage;
  renderbugs();
  closeModal();
}

completeTicket = () => {
  const raw = localStorage.getItem('issues');
  let newstorage = JSON.parse(raw);

  let idToDelete = document.getElementById('modalID').textContent

  newstorage = newstorage.filter(ticket => {
    if(ticket.id == idToDelete){
      ticket.completed = true
    }
    return ticket
  });

  localStorage.setItem('issues', JSON.stringify(newstorage));
  localStorageData = newstorage;
  renderbugs();
  closeModal();
}

editTicket = () => {
  const raw = localStorage.getItem('issues');
  let newstorage = JSON.parse(raw);

  let idToEdit = String(document.getElementById("modalID").textContent)

  const index = newstorage.findIndex(ticket => String(ticket.id) === idToEdit);
  document.getElementById('_id').textContent = newstorage[index].id
  document.getElementById('editTitle').value = newstorage[index].title
  document.getElementById('editSubject').value = newstorage[index].subject
  document.getElementById('E_P_Select').value = newstorage[index].project
  document.getElementById('E_U_Select').value = newstorage[index].priority
  document.getElementById('editDesc').value = newstorage[index].desc
  document.getElementById('editAssigned').value = newstorage[index].assignedTo

  openEditModal()
  closeModal()
}

saveChanges = () =>{
  const raw = localStorage.getItem('issues')
  let newstorage = JSON.parse(raw)

  const id = document.getElementById('_id').textContent
  const title = document.getElementById("editTitle").value
  const subject = document.getElementById("editSubject").value
  const project = document.getElementById("E_P_Select").value
  const urgency = document.getElementById("E_U_Select").value
  const desc = document.getElementById("editDesc").value
  const assign = document.getElementById("editAssigned").value

  const index = newstorage.findIndex(ticket => String(ticket.id) === String(id));

  let temp = {
    id: id,
    title: title,
    subject: subject,
    priority: urgency,
    desc: desc,
    dateReported: newstorage[index].dateReported,
    project: project,
    assignedTo: assign,
    completed: false,
  }


  newstorage[index] = temp

  localStorage.setItem("issues", JSON.stringify(newstorage))
  localStorageData = newstorage;
  renderbugs()
  closeCreateModal()
}