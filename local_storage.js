// Projects storage 
let projects = 
[
    {
        id:0,
        name: 'UI',
        details:"To make the UI for the website"
    },
    {},
]    
// People storage
let people = [
    {
        id:0,
        FirstName:"Jack",
        LastName:"Wiilem",
        email:"jack.w@gmail.com",
        username:"Jac123",
         profilePhoto: ""
    },
    {id:1,
        FirstName:"Sara",
        LastName:"Sea",
        email:"sara.s@gmail.com",
        username:"Sar1",
        profilePhoto: ""
    }
]
// issues storage
let issues = [
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

let admin = {
    get uname() {
        return people[0].username;
    } ,
    get email() {
        return people[0].email;
    },
    password: "Jack1234"
}

//adds the arrays to local storage
localStorage.setItem('projects', JSON.stringify(projects));
localStorage.setItem('people', JSON.stringify(people));
localStorage.setItem('issues', JSON.stringify(issues));
localStorage.setItem('admin',JSON.stringify(admin));

// Adds person to local storage

function addingperson() {
    let personForm = document.getElementById(`personForm`),
    profilepicture = document.getElementById("pPic"),
    preview = document.getElementById("preview"),
    base64Image= "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkDHQ4DDAwNDh8SFBcOFhQXFhYVFRUYHSggGBolHRUUITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NDg0NDy0ZFRkAKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOAA4AMBE..." //defualt profile picture

    // since local storage can't store images we will be converting it in lon string file to store the data.
    profilepicture.addEventListener('change',function() {
        let file = this.files[0];
        if (file){
            let reader = new FileReader();

            reader.onload = function (e) {
                base64Image = e.target.result;//this converts it into a string
                preview.src = base64Image; //this show the person the profile picture
                preview.style.display = "block";
            }
            reader.readAsDataURL(file)
        }
    })
    
    personForm.addEventListener('submit', (e) => {
        e.preventDefault(); //stops refreshing
    
        // Getting the data from the form
        let formdata = new FormData(personForm), //Instead of getting each input manually formdata takes all input elements and we can then just use it 
        FirstName = formdata.get('fname'),
        email = formdata.get('email'),
        people = JSON.parse(localStorage.getItem('people'))
        
        if (people.some(person => person.email==email)){ //validation: ensures that the person does not exits by checking the email adress
            alert('person already exisits')
            return;
        }

        
        let newdata = {
            id:people[people.length-1].id+1,
            FirstName: FirstName,
            LastName: LastName,
            email: email,
            username: FirstName.slice(0,3) +  (people[people.length-1].id+1).toString(),
            profilePhoto: base64Image
        };
        
        people.push(newdata);
        alert("Person added succesfully!");
        personForm.reset();
        localStorage.setItem('people',JSON.stringify(people))
    })
 }

 function removingperson() {

     let removingpersonform = document.getElementById("removepersonform")
     
     removepersonform.addEventListener(`submit`,(e) => {
         e.preventDefault();
        let formdata = new FormData(removepersonform),
        uname = formdata.get('uname'),
        email = formdata.get('email'),
        people = JSON.parse(localStorage.getItem('people')),
        test = people.findIndex(person=> person.email === email)// we remove the person by checking their email adress 
        
        if(test === -1){
            alert(`this person doesn't exits`);
            return;
        }
        else{
            if(test=0){
                alert(`you can't remove a admin`);
                return;
            }
            else{
            people.splice(test,1);
            localStorage.setItem('people', JSON.stringify(people));
            alert(`person removed`);
            removingpersonform.reset();
        }
        }
    })

}

function addingproject() {
    
}

function checkingAdmin()
{
    // let admin = JSON.parse(localStorage.getItem('admin'));
    let input = {uname: document.getElementById('uname').value,
        email:document.getElementById('email').value,
        password: document.getElementById('password').value};
    let message = document.getElementById('message');
    let test = document.getElementById('test')
        test.innerText=input.uname, admin.uname;
    if(input.password!=admin.password) {
        message.innerText ='wrong password. Try again'
    }
    else {
        if(!(input.uname == admin.uname)){
            message.innerText = 'wrong username. Try again'
        }
        else{
            if(!(input.email==admin.email))
                {
                message.innerText = 'wrong email. Try again'
            }
            else{
                message.innerText = 'welcome'
            }
        }
    }
}

addingperson();
removingperson();