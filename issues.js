let DEFAULT_ISSUES = [
  {
    id: "#101",
    title: "ASSET_MAPPING_MISALIGNMENT",
    subject: "Coordinates provided by satellite telemetry are offset by 4.2m on the Z-axis.",
    priority: "Medium",
    desc: "The mapping engine is failing to account for atmospheric refraction during high-angle passes, resulting in offset coordinate plots.",
    project: "ProjectCD85",
    assignedTo: "Ryan Reynolds",
    identifiedBy: "Ryan Reynolds",
    dateReported: "2026-01-01",
    targetDate: "2026-02-01",
    resolvedDate: "",
    resolutionSummary: "",
    status: "open"
  },
  {
    id: "#102",
    title: "AUTH_TOKEN_EXPIRY_RECURSION",
    subject: "User session refresh loop when token expires during active upload.",
    priority: "Critical",
    desc: "When a JWT expires exactly during a multipart file upload, the refresh interceptor enters an infinite loop, crashing the browser tab.",
    project: "ProjectMD12",
    assignedTo: "Scarlett Johansson",
    identifiedBy: "Tom Hardy",
    dateReported: "2026-04-05",
    targetDate: "2026-04-10",
    resolvedDate: "2026-04-08",
    resolutionSummary: "Added guard flag to prevent re-entrant refresh calls.",
    status: "resolved"
  },
  {
    id: "#103",
    title: "UI_HYDRATION_MISMATCH",
    subject: "React hydration error on product landing page under slow 3G conditions.",
    priority: "Low",
    desc: "Server-side rendered HTML does not match client-side state when dynamic pricing modules load after initial paint.",
    project: "ProjectCD85",
    assignedTo: "Tom Hardy",
    identifiedBy: "Zendaya",
    dateReported: "2026-04-10",
    targetDate: "2026-04-20",
    resolvedDate: "",
    resolutionSummary: "",
    status: "open"
  },
  {
    id: "#104",
    title: "DB_DEADLOCK_ON_CONCURRENT_ORDER",
    subject: "Database deadlock occurring during flash sale peak traffic.",
    priority: "Critical",
    desc: "The 'inventory' and 'order_items' tables are locking in reverse order when two users purchase the last item simultaneously.",
    project: "ProjectMD12",
    assignedTo: "",
    identifiedBy: "",
    dateReported: "2026-04-12",
    targetDate: "2026-04-14",
    resolvedDate: "",
    resolutionSummary: "",
    status: "overdue"
  },
  {
    id: "#105",
    title: "CSS_GRID_OVERFLOW_SAFARI",
    subject: "Dashboard layout collapses on Safari versions older than 15.4.",
    priority: "Medium",
    desc: "The sidebar 'fr' units are being calculated as 0px because of a lack of support for certain aspect-ratio properties.",
    project: "ProjectCD85",
    assignedTo: "Zendaya",
    identifiedBy: "Scarlett Johansson",
    dateReported: "2026-04-15",
    targetDate: "2026-04-22",
    resolvedDate: "2026-04-20",
    resolutionSummary: "Added aspect-ratio polyfill and fallback grid values.",
    status: "resolved"
  }
];

let DEFAULT_PROJECTS = [
  { id: 0, name: "ProjectCD85", details: "Frontend and mapping interface work." },
  { id: 1, name: "ProjectMD12", details: "Backend and API services." }
];

let DEFAULT_PEOPLE = [
  { id: 0, FirstName: "Ryan",     LastName: "Reynolds",  email: "ryan.r@bugtracker.com",     username: "Rya0" },
  { id: 1, FirstName: "Scarlett", LastName: "Johansson", email: "scarlett.j@bugtracker.com", username: "Sca1" },
  { id: 2, FirstName: "Tom",      LastName: "Hardy",      email: "tom.h@bugtracker.com",      username: "Tom2" },
  { id: 3, FirstName: "Zendaya",  LastName: "Coleman",   email: "zendaya.c@bugtracker.com",  username: "Zen3" }
];

function getIssues() {
  return JSON.parse(localStorage.getItem('DEFAULT_ISSUES')) || DEFAULT_ISSUES;
}

function getProjects() {
  return JSON.parse(localStorage.getItem('DEFAULT_PROJECTS')) || DEFAULT_PROJECTS;
}

function getPeople() {
  return JSON.parse(localStorage.getItem('DEFAULT_PEOPLE')) || DEFAULT_PEOPLE;
}

function saveIssues(data) {
  localStorage.setItem('issues', JSON.stringify(data));
}

if (!localStorage.getItem('issues'))   localStorage.setItem('issues',   JSON.stringify(DEFAULT_ISSUES));
if (!localStorage.getItem('projects')) localStorage.setItem('projects', JSON.stringify(DEFAULT_PROJECTS));
if (!localStorage.getItem('people'))   localStorage.setItem('people',   JSON.stringify(DEFAULT_PEOPLE));


let deletePendingId = null;

function priorityBadge(p) {
  let cls = '';
  if (p === 'Critical') {
    cls = 'badge-critical';
  } else if (p === 'Medium') {
    cls = 'badge-medium';
  } else {
    cls = 'badge-low';
  }
  return '<span class="badge ' + cls + '">' + p + '</span>';
}

function statusBadge(s) {
  let cls = 'status-' + s;
  let label = s.charAt(0).toUpperCase() + s.slice(1);
  return '<span class="status-badge ' + cls + '">' + label + '</span>';
}

function fmtDate(d) {
  if (d) return d;
  return '—';
}

function renderStats() {
  let issues = getIssues();
  let total    = issues.length;
  let open     = 0;
  let resolved = 0;
  let overdue  = 0;

  
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].status === 'open')     open++;
    if (issues[i].status === 'resolved') resolved++;
    if (issues[i].status === 'overdue')  overdue++;
  }

  let html = '';
  html += '<div class="stat-card"><span class="stat-label">Total Issues</span><span class="stat-val">' + total + '</span></div>';
  html += '<div class="stat-card"><span class="stat-label">Open</span><span class="stat-val" style="color:#FFB800">' + open + '</span></div>';
  html += '<div class="stat-card"><span class="stat-label">Resolved</span><span class="stat-val" style="color:#4caf50">' + resolved + '</span></div>';
  html += '<div class="stat-card"><span class="stat-label">Overdue</span><span class="stat-val" style="color:#ff4d4d">' + overdue + '</span></div>';

  document.getElementById('statsRow').innerHTML = html;
}


function populateProjectFilter() {
  let sel = document.getElementById('filterProject');
  let projects = getProjects();
  let opts = '<option value="">All</option>';
  for (let i = 0; i < projects.length; i++) {
    opts += '<option value="' + projects[i].name + '">' + projects[i].name + '</option>';
  }
  sel.innerHTML = opts;
}

// ---- TABLE ----

function renderTable() {
  let issues  = getIssues();
  let search  = document.getElementById('searchInput').value.toLowerCase();
  let priority = document.getElementById('filterPriority').value;
  let status  = document.getElementById('filterStatus').value;
  let project = document.getElementById('filterProject').value;

  
  let filtered = [];
  for (let i = 0; i < issues.length; i++) {
    let bug = issues[i];
    let matchSearch  = !search   || bug.title.toLowerCase().indexOf(search) !== -1 || bug.subject.toLowerCase().indexOf(search) !== -1;
    let matchPri     = !priority || bug.priority === priority;
    let matchStatus  = !status   || bug.status   === status;
    let matchProject = !project  || bug.project  === project;

    if (matchSearch && matchPri && matchStatus && matchProject) {
      filtered.push(bug);
    }
  }

  let tbody = document.getElementById('issuesBody');

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9"><div class="no-results">No issues found matching your filters.</div></td></tr>';
    return;
  }

  let rows = '';
  for (let j = 0; j < filtered.length; j++) {
    let bug = filtered[j];
    let assignedHtml = bug.assignedTo ? bug.assignedTo : '<span style="color:var(--muted)">Unassigned</span>';

    rows += '<tr onclick="openDetail(\'' + bug.id + '\')">';
    rows += '<td style="color:var(--muted);font-size:12px;">' + bug.id + '</td>';
    rows += '<td style="font-weight:600;max-width:200px;word-break:break-word;">' + bug.title + '</td>';
    rows += '<td style="color:#aaa;font-size:12px;max-width:220px;">' + bug.subject + '</td>';
    rows += '<td>' + priorityBadge(bug.priority) + '</td>';
    rows += '<td>' + statusBadge(bug.status || 'open') + '</td>';
    rows += '<td style="font-size:12px;">' + bug.project + '</td>';
    rows += '<td style="font-size:12px;">' + assignedHtml + '</td>';
    rows += '<td style="font-size:12px;color:var(--muted);">' + bug.dateReported + '</td>';
    rows += '<td onclick="event.stopPropagation()">';
    rows += '<div class="action-btns">';
    rows += '<button class="btn-icon edit" onclick="openEditModal(\'' + bug.id + '\')"> Edit</button>';
    rows += '<button class="btn-icon delete" onclick="openDeleteConfirm(\'' + bug.id + '\')">Delete</button>';
    rows += '</div></td></tr>';
  }

  tbody.innerHTML = rows;
}

// ---- DETAIL MODAL ----

function openDetail(id) {
  let issues = getIssues();
  let bug = null;

  
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      bug = issues[i];
      break;
    }
  }

  if (!bug) return;

  
  let pBadge = '';
  if (bug.priority === 'Critical') {
    pBadge = 'badge-critical';
  } else if (bug.priority === 'Medium') {
    pBadge = 'badge-medium';
  } else {
    pBadge = 'badge-low';
  }

  document.getElementById('d-priority').textContent = bug.priority;
  document.getElementById('d-priority').className   = 'badge ' + pBadge;

  let s = bug.status || 'open';
  document.getElementById('d-status').textContent = s.charAt(0).toUpperCase() + s.slice(1);
  document.getElementById('d-status').className   = 'status-badge status-' + s;

  document.getElementById('d-title').textContent      = bug.title;
  document.getElementById('d-id').textContent         = 'ID: ' + bug.id;
  document.getElementById('d-project').textContent    = bug.project;
  document.getElementById('d-assigned').textContent   = bug.assignedTo || 'Unassigned';
  document.getElementById('d-date').textContent       = fmtDate(bug.dateReported);
  document.getElementById('d-target').textContent     = fmtDate(bug.targetDate);
  document.getElementById('d-resolved').textContent   = fmtDate(bug.resolvedDate);
  document.getElementById('d-identified').textContent = bug.identifiedBy || '—';
  document.getElementById('d-subject').textContent    = bug.subject;
  document.getElementById('d-desc').textContent       = bug.desc;

  let resWrap = document.getElementById('d-resolution-wrap');
  if (bug.resolutionSummary) {
    document.getElementById('d-resolution').textContent = bug.resolutionSummary;
    resWrap.style.display = 'block';
  } else {
    resWrap.style.display = 'none';
  }

  
  document.getElementById('d-edit-btn').onclick = function() {
    closeModal('detailOverlay');
    openEditModal(id);
  };
  document.getElementById('d-delete-btn').onclick = function() {
    closeModal('detailOverlay');
    openDeleteConfirm(id);
  };

  openModal('detailOverlay');
}

// ---- FORM MODAL ----

function populateFormDropdowns() {
  let projects = getProjects();
  let people   = getPeople();

  
  let pOpts = '';
  for (let i = 0; i < projects.length; i++) {
    pOpts += '<option value="' + projects[i].name + '">' + projects[i].name + '</option>';
  }
  document.getElementById('fProject').innerHTML = pOpts;

  
  let personOpts = '<option value="">— Unassigned —</option>';
  for (let j = 0; j < people.length; j++) {
    let fullName = people[j].FirstName + ' ' + people[j].LastName;
    personOpts += '<option value="' + fullName + '">' + fullName + '</option>';
  }
  document.getElementById('fAssigned').innerHTML   = personOpts;
  document.getElementById('fIdentified').innerHTML = personOpts;
}

function openCreateModal() {
  populateFormDropdowns();
  document.getElementById('formTitle').textContent = 'New Issue';
  document.getElementById('formId').value          = '';
  document.getElementById('fTitle').value          = '';
  document.getElementById('fSubject').value        = '';
  document.getElementById('fDesc').value           = '';
  document.getElementById('fPriority').value       = 'Low';
  document.getElementById('fStatus').value         = 'open';
  document.getElementById('fDate').value           = new Date().toISOString().split('T')[0];
  document.getElementById('fTarget').value         = '';
  document.getElementById('fResolved').value       = '';
  document.getElementById('fResolution').value     = '';
  openModal('formOverlay');
}

function openEditModal(id) {
  let issues = getIssues();
  let bug = null;

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      bug = issues[i];
      break;
    }
  }

  if (!bug) return;

  populateFormDropdowns();
  document.getElementById('formTitle').textContent = 'Edit Issue';
  document.getElementById('formId').value          = bug.id;
  document.getElementById('fTitle').value          = bug.title;
  document.getElementById('fSubject').value        = bug.subject;
  document.getElementById('fDesc').value           = bug.desc;
  document.getElementById('fPriority').value       = bug.priority;
  document.getElementById('fStatus').value         = bug.status || 'open';
  document.getElementById('fProject').value        = bug.project;
  document.getElementById('fAssigned').value       = bug.assignedTo   || '';
  document.getElementById('fIdentified').value     = bug.identifiedBy || '';
  document.getElementById('fDate').value           = bug.dateReported || '';
  document.getElementById('fTarget').value         = bug.targetDate   || '';
  document.getElementById('fResolved').value       = bug.resolvedDate || '';
  document.getElementById('fResolution').value     = bug.resolutionSummary || '';
  openModal('formOverlay');
}

function saveIssue() {
  let title   = document.getElementById('fTitle').value.trim();
  let  subject = document.getElementById('fSubject').value.trim();
  let desc    = document.getElementById('fDesc').value.trim();

  
  if (!title || !subject || !desc) {
    alert('Please fill in Title, Subject, and Description.');
    return;
  }

  let issues = getIssues();
  let editId = document.getElementById('formId').value;

  let issueData = {
    title:             title,
    subject:           subject,
    desc:              desc,
    priority:          document.getElementById('fPriority').value,
    status:            document.getElementById('fStatus').value,
    project:           document.getElementById('fProject').value,
    assignedTo:        document.getElementById('fAssigned').value,
    identifiedBy:      document.getElementById('fIdentified').value,
    dateReported:      document.getElementById('fDate').value,
    targetDate:        document.getElementById('fTarget').value,
    resolvedDate:      document.getElementById('fResolved').value,
    resolutionSummary: document.getElementById('fResolution').value.trim()
  };

  if (editId) {
    
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id === editId) {
        
        for (let key in issueData) {
          issues[i][key] = issueData[key];
        }
        break;
      }
    }
  } else {
    
    let maxNum = 100;
    for (let i = 0; i < issues.length; i++) {
      var n = parseInt(issues[i].id.replace('#', ''));
      if (!isNaN(n) && n > maxNum) {
        maxNum = n;
      }
    }
    issueData.id = '#' + (maxNum + 1);
    issues.push(issueData);
  }

  saveIssues(issues);
  closeModal('formOverlay');
  renderStats();
  renderTable();
}

// ---- DELETE ----

function openDeleteConfirm(id) {
  deletePendingId = id;
  openModal('deleteOverlay');
}

function confirmDelete() {
  if (!deletePendingId) return;

  let issues = getIssues();
  let newList = [];

  
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id !== deletePendingId) {
      newList.push(issues[i]);
    }
  }

  saveIssues(newList);
  deletePendingId = null;
  closeModal('deleteOverlay');
  renderStats();
  renderTable();
}

// ---- MODAL ---

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function handleOverlayClick(e, id) {
  
  if (e.target.id === id) {
    closeModal(id);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  populateProjectFilter();
  renderStats();
  renderTable();
});

