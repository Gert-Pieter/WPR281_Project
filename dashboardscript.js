const localString = localStorage.getItem('issues')
let localStorageData = JSON.parse(localString)

function setNumbers(){
  const newnum = document.getElementById('newbugs')
  const progressnum = document.getElementById('progressbugs')
  const completenum = document.getElementById('completebugs')

  let count1 = 0
  let count2 = 0
  let count3 = 0

  localStorageData.forEach(element => {
    if(element.assignedTo === '' && element.completed === false) count1++
    if(element.assignedTo !== '' && element.completed === false) count2++
    if(element.completed === true) count3++

    return count1, count2, count3
  });

  newnum.textContent = count1
  progressnum.textContent = count2
  completenum.textContent = count3
}

function renderNewBugs(listToDisplay){
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
    renderNewBugs(localStorageData);
    renderInProgressBugs(localStorageData);
    renderCompleteBugs(localStorageData)
    setNumbers()

});

renderbugs = () =>{
  renderNewBugs(localStorageData);
  renderInProgressBugs(localStorageData);
  renderCompleteBugs(localStorageData)
}

const modal = document.getElementById('modalOverlay');
const e_modal = document.getElementById('editOverlay')

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

function openEditModal(){
  e_modal.style.display = 'flex'
}

function closeEditModal(){
  e_modal.style.display = 'none'
}

// Close the modal if the user clicks ANYWHERE outside the white box
window.onclick = function(event) {
  if (event.target == modal || event.target == e_modal) {
    closeModal();
    closeEditModal();
  }
}

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