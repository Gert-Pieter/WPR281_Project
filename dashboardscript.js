const localString = localStorage.getItem('issues')
let localStorageData = JSON.parse(localString)

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