
// Projects storage 
let projects = 
[
    {
        id:0,
        name: 'UI',
        code: 'WD12',
        summary: 'UI for the website',
        details:"To make the UI for the website"
    },
    {
        id:1,
        name: 'Backend',
        code: 'WD34',
        summary: 'Backend for the website',
        details:"To make the backend for the website"
    }
    
],base64Image= "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkDHQ4DDAwNDh8SFBcOFhQXFhYVFRUYHSggGBolHRUUITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NDg0NDy0ZFRkAKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOAA4AMBE..."    
// 15 People storage
let people = [
    
    { id: 0, FirstName: 'Jack',   LastName: 'Wiilem',   email: 'jack.w@gmail.com',   username: 'Jac0',  profilePhoto: base64Image },
    { id: 1, FirstName: 'Sara',   LastName: 'Sea',   email: 'sara.s@gmail.com',   username: 'Sar1',  profilePhoto: base64Image },
    { id: 2, FirstName: 'Lebo',   LastName: 'Mokoena',   email: 'lebo.m@gmail.com',   username: 'Leb2',  profilePhoto: base64Image },
    { id: 3, FirstName: 'Thabo',  LastName: 'Sithole',   email: 'thabo.s@gmail.com',  username: 'Tha3', profilePhoto: base64Image },
    { id: 4, FirstName: 'Amara',  LastName: 'Dube',      email: 'amara.d@gmail.com',  username: 'Ama4', profilePhoto: base64Image },
    { id: 5, FirstName: 'Ruan',   LastName: 'Pretorius', email: 'ruan.p@gmail.com',   username: 'Rua5',  profilePhoto: base64Image },
    { id: 6, FirstName: 'Fatima', LastName: 'Hassan',    email: 'fatima.h@gmail.com', username: 'Fat6',  profilePhoto: base64Image },
    { id: 7, FirstName: 'Dineo',  LastName: 'Molefe',    email: 'dineo.m@gmail.com',  username: 'Din7', profilePhoto: base64Image},
    { id: 8,  FirstName: 'Keanu',   LastName: 'Jacobs',  email: 'keanu.j@gmail.com',   username: 'Kea8',  profilePhoto: base64Image },
    { id: 9,  FirstName: 'Naledi',  LastName: 'Khumalo', email: 'naledi.k@gmail.com',  username: 'Nal9',  profilePhoto: base64Image },
    { id: 10, FirstName: 'Pieter',  LastName: 'van Zyl', email: 'pieter.v@gmail.com',  username: 'Pie10', profilePhoto: base64Image },
    { id: 11, FirstName: 'Ayasha',  LastName: 'Naidoo',  email: 'ayasha.n@gmail.com',  username: 'Aya11', profilePhoto: base64Image },
    { id: 12, FirstName: 'Sipho',   LastName: 'Ndlovu',  email: 'sipho.n@gmail.com',   username: 'Sip12', profilePhoto: base64Image },
    { id: 13, FirstName: 'Chloé',   LastName: 'Ferreira', email: 'chloe.f@gmail.com',   username: 'Chl13', profilePhoto: base64Image },
    { id: 14, FirstName: 'Marcus',  LastName: 'Swanepoel', email: 'marcus.s@gmail.com',  username: 'Mar14', profilePhoto: base64Image }
]
// 15 issues storage
let issues = [
    {
        id: "#101",
        title: "ASSET_MAPPING_MISALIGNMENT",
        subject: "Coordinates provided by satellite telemetry are offset by 4.2m on the Z-axis.",
        priority: "Medium",
        desc: "The mapping engine is failing to account for atmospheric refraction during high-angle passes, resulting in offset coordinate plots.",
        project: "ProjectCD85",
        assignedTo: "",
        dateReported: "2026-01-01",
        completed: false
    },
    {
        id: "#102",
        title: "MEMORY_LEAK_IN_RENDER_ENGINE",
        subject: "System slows significantly after 4 hours of continuous stream processing.",
        priority: "High",
        desc: "Memory usage climbs from 2GB to 14GB without release. Suspected unclosed event listeners in the render loop accumulating on each frame tick.",
        project: "ProjectAB12",
        assignedTo: "Thabo Sithole",
        dateReported: "2026-01-05",
        completed: false
    },
    {
        id: "#103",
        title: "LOGIN_TOKEN_EXPIRES_EARLY",
        subject: "Session tokens expire after 8 minutes instead of the configured 30 minutes.",
        priority: "High",
        desc: "A legacy environment variable is overriding the token expiry config. Affects all field operators logging in from mobile terminals.",
        project: "ProjectEF34",
        assignedTo: "Naledi Khumalo",
        dateReported: "2026-01-08",
        completed: true
    },
    {
        id: "#104",
        title: "UI_SCALING_ON_WIDE_HUD",
        subject: "Dashboard panels collapse incorrectly on displays wider than 2560px.",
        priority: "Low",
        desc: "Buttons overlap and text clips on ultra-wide monitor setups. Media queries are missing for screens above 2560px breakpoint.",
        project: "ProjectCD85",
        assignedTo: "Chloé Ferreira",
        dateReported: "2026-01-12",
        completed: true
    },
    {
        id: "#105",
        title: "POWER_GRID_VOLTAGE_FLUCTUATION",
        subject: "Core voltage drops intermittently during peak load causing system reboots.",
        priority: "High",
        desc: "Nodes 3 and 7 reboot under sustained load above 85%. Root cause linked to an unbalanced load distribution algorithm in the grid controller.",
        project: "ProjectGH56",
        assignedTo: "Pieter van Zyl",
        dateReported: "2026-01-15",
        completed: false
    },
    {
        id: "#106",
        title: "GPS_COORDINATE_DRIFT_AT_NIGHT",
        subject: "GPS module reports drifting coordinates between 22:00 and 04:00.",
        priority: "High",
        desc: "Suspected interference from low-orbit satellite repositioning during off-peak hours. Drift magnitude increases with elevation angle.",
        project: "ProjectCD85",
        assignedTo: "Sipho Ndlovu",
        dateReported: "2026-01-18",
        completed: false
    },
    {
        id: "#107",
        title: "NULL_REFERENCE_ON_REPORT_EXPORT",
        subject: "Exporting reports to PDF crashes when the assignedTo field is empty.",
        priority: "High",
        desc: "A null reference exception is thrown in the export service when no assignee is set. No null check exists before accessing the assignee object properties.",
        project: "ProjectAB12",
        assignedTo: "",
        dateReported: "2026-01-20",
        completed: false
    },
    {
        id: "#108",
        title: "LOGIN_LOOP_ON_EXPIRED_TOKEN",
        subject: "Users with expired tokens get stuck in an infinite redirect loop.",
        priority: "Medium",
        desc: "The auth guard redirects to login, but the login page immediately checks the token and redirects back to dashboard. No error message is shown to the user.",
        project: "ProjectEF34",
        assignedTo: "Keanu Jacobs",
        dateReported: "2026-01-23",
        completed: false
    },
    {
        id: "#109",
        title: "SENSOR_DATA_BATCH_DELAY",
        subject: "Sensor data batches delayed by up to 90 seconds during peak windows.",
        priority: "Medium",
        desc: "The message queue is saturating during peak hours. Batch processor is single-threaded and cannot keep up with inbound data volume from all active sensors.",
        project: "ProjectGH56",
        assignedTo: "Marcus Swanepoel",
        dateReported: "2026-01-26",
        completed: false
    },
    {
        id: "#110",
        title: "DARK_MODE_CONTRAST_FAILURE",
        subject: "Several text labels in dark mode fall below WCAG AA contrast ratio.",
        priority: "Low",
        desc: "Accessibility audit flagged 14 components where foreground and background color combinations produce a contrast ratio below 4.5:1 in dark mode.",
        project: "ProjectCD85",
        assignedTo: "Ayasha Naidoo",
        dateReported: "2026-02-01",
        completed: true
    },
    {
        id: "#111",
        title: "PROJECT_FILTER_RETURNS_ALL_ISSUES",
        subject: "Filtering tickets by project returns the full unfiltered list.",
        priority: "Medium",
        desc: "The filter uses loose equality when comparing project ids, causing all string-to-number comparisons to fail and fall through to showing everything.",
        project: "ProjectAB12",
        assignedTo: "Dineo Molefe",
        dateReported: "2026-02-04",
        completed: false
    },
    {
        id: "#112",
        title: "TERMINAL_REFRESH_RATE_STUTTER",
        subject: "Local display matrix stutters at 24fps instead of the expected 60fps.",
        priority: "Low",
        desc: "The display driver is falling back to a compatibility mode after a firmware update. Rolling back the firmware restores normal refresh rate.",
        project: "ProjectGH56",
        assignedTo: "Fatima Hassan",
        dateReported: "2026-02-07",
        completed: false
    },
    {
        id: "#113",
        title: "AUTHENTICATION_PROTOCOL_TIMEOUT",
        subject: "Admin auth requests time out after 3 seconds on slow connections.",
        priority: "Medium",
        desc: "The timeout threshold is hardcoded at 3000ms and does not account for network latency on remote field connections. Should be configurable per environment.",
        project: "ProjectEF34",
        assignedTo: "Lebo Mokoena",
        dateReported: "2026-02-10",
        completed: true
    },
    {
        id: "#114",
        title: "DUPLICATE_TICKET_ON_FORM_RESUBMIT",
        subject: "Submitting the add ticket form twice creates duplicate issues.",
        priority: "Medium",
        desc: "No debounce or submission lock is applied to the form submit button. Double-clicking or slow connections cause the form handler to fire multiple times.",
        project: "ProjectAB12",
        assignedTo: "Sara Sea",
        dateReported: "2026-02-13",
        completed: false
    },
    {
        id: "#115",
        title: "PROFILE_PHOTO_NOT_PERSISTING",
        subject: "Profile photos reset to default after page refresh.",
        priority: "Low",
        desc: "The base64 image string is being stored in a local variable instead of being saved to localStorage with the rest of the person object. Data is lost on reload.",
        project: "ProjectCD85",
        assignedTo: "",
        dateReported: "2026-02-16",
        completed: false
    }
]

let admin = {
    get uname() {
        return people[0].username;
    } ,
    get email() {
        return people[0].email;
    },
    password: "Jack1234"
},
data = [
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

//adds the arrays to local storage
localStorage.setItem('projects', JSON.stringify(projects));
localStorage.setItem('people', JSON.stringify(people));
localStorage.setItem('issues', JSON.stringify(issues));
localStorage.setItem('admin',JSON.stringify(admin));

// Adds person to local storage

