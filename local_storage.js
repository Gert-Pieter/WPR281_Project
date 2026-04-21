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
// People storage
let people = [
    {
        id:0,
        FirstName:"Jack",
        LastName:"Wiilem",
        email:"jack.w@gmail.com",
        username:"Jac0",
        project: "WD12",
        profilePhoto: base64Image
    },
    {id:1,
        FirstName:"Sara",
        LastName:"Sea",
        email:"sara.s@gmail.com",
        username:"Sar1",
            profilePhoto: base64Image
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
    {}
]

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

    let projects = JSON.parse(localStorage.getItem('projects')),
    projectC = document.getElementById('projectC')
    projects.forEach(element => {
        let projectChoice = document.createElement('option');
        projectChoice.value = element.code;
        projectChoice.innerText = element.code;
        projectC.appendChild(projectChoice);        
    });



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
        LastName = formdata.get('lname'),
        email = formdata.get('email'),
        emailStyle = document.getElementById('email'),//to style the form input 
        people = JSON.parse(localStorage.getItem('people'))
        
        if (people.some(person => person.email==email)){ //validation: ensures that the person does not exits by checking the email adress
            document.getElementById("email-wrong").innerText = 'email already exitsts';//will display if they typed in a email that already exits
            emailStyle.style.border = '1px solid red';//will make the input of email border red
            emailStyle.focus();//will focus on the email input field to show what is wrong 
            return;
        }

        
        let newdata = {
            id:people[people.length-1].id+1,
            FirstName: FirstName,
            LastName: LastName,
            email: email,
            project: formdata.get('projectC'),
            username: FirstName.slice(0,3) +  (people[people.length-1].id+1).toString(),
            profilePhoto: base64Image
        };
        
        people.push(newdata);
        document.getElementById('successful').innerText = "Person added succesfully!";
        document.getElementById('successful').style.color = 'green';
        personForm.reset();
        localStorage.setItem('people',JSON.stringify(people))
    })
 }

 function removingperson() {

     let removingpersonform = document.getElementById("removepersonform")
     
     removepersonform.addEventListener(`submit`,(e) => {
         e.preventDefault();
        let message = document.getElementById('message'),
        formdata = new FormData(removepersonform),
        uname = formdata.get('uname'),
        email = formdata.get('email'),
        people = JSON.parse(localStorage.getItem('people')),
        test = people.findIndex(person=> person.email === email),// we remove the person by checking their email adress 
        test1 = people.findIndex(person=> person.username === uname)
        
        if(test=== -1 && test1 === -1){
            message.innerText = 'Person does not exits try again'
            message.style.color = 'red';
            message.style.fontStyle = 'italic';
            return;
        }
        else{
            if(test===0 && test1 === 0){
                message.innerText = 'You cannot remove the admin.';
                message.style.color = 'red';
                message.style.fontStyle = 'italic';
                return;
            }
            else{
                if (test != test1)
                    {
                        message.innerText = 'Username or email is incorrect, try again'
                        message.style.color = 'red';
                        message.style.fontStyle = 'italic';
                    }
                    else{
                        people.splice(test,1);
                        localStorage.setItem('people', JSON.stringify(people));
                message='Person removed';
                message.style.color = 'green';
                message.style.fontStyle = 'italic';
            removingpersonform.reset();
        }
    }
}
    })

}

function addingproject() {
    let projectForm = document.getElementById('projectForm')
    
    projectForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        let projects = JSON.parse(localStorage.getItem('projects')),
        formdata = new FormData(projectForm),
        projectName = formdata.get('pname'),
        codeName = formdata.get('pcode'),
        summary = formdata.get('summary'),
        pdetails = formdata.get('pdetails'),
        projectCMsg = document.getElementById('projectCMsg'),
        test = projects.findIndex(project => project.code === codeName)//validation: ensures that the project code is unique by checking the code of each project in the projects array
        console.log(codeName);
        
        if(test !== -1)
        {
            projectCMsg.innerText = 'Project code already exists.';
            projectCMsg.style.color = 'red';
        }
        else{
            let newProject = {
                id: projects[projects.length-1].id + 1,
                name: projectName,
                code: codeName,
                summary: summary,
                details: pdetails
            };
            projects.push(newProject);
            localStorage.setItem('projects', JSON.stringify(projects));
            projectMsg.innerText = 'Project added successfully.';
            projectMsg.style.color = 'green';
            projectForm.reset();
        }
    })

}

function removingproject() {
    let removingprojectform = document.getElementById("removeProjectForm")

    removingprojectform.addEventListener('submit', (e) => {
        e.preventDefault();
        let projects = JSON.parse(localStorage.getItem('projects')),
        formData = new FormData(removingprojectform),
        codeName = formData.get('rcname'),
        codeNameStyle = document.getElementById('rcname'),
        projectrCMsg = document.getElementById('projectrMsg'),
        test = projects.findIndex(project => project.code === codeName);

        if(test === -1) {
            projectrCMsg.innerText = 'Project not found.';
            projectrCMsg.style.color = 'red';
            codeNameStyle.style.border = '1px solid red';
            return;
        } else {
            projects.splice(test, 1);
            localStorage.setItem('projects', JSON.stringify(projects));
            projectrsrMsg.innerText = 'Project removed successfully.';
            projectrsCMsg.style.color = 'green';
            removingprojectform.reset();
            return;
        }
    });
}

function checkingAdmin()
{
    let admin = JSON.parse(localStorage.getItem('admin')),
    input = {uname: document.getElementById('uname').value,
        email:document.getElementById('email').value,
        password: document.getElementById('password').value},
        pswMsg = document.getElementById('pswMsg'),
        unmMsg = document.getElementById('unmMsg'),
        emnMsg = document.getElementById('emnMsg'),
        sLg = document.getElementById('sLg')
    if(input.password!=admin.password) {
        pswMsg.innerText = 'Wrong password, try again.';
                   password.style.border = '1px solid red';
                   pswMsg.style.color = 'red';
                }
                else {
                    if(input.uname != admin.uname){
                        unmMsg.innerText = 'wrong username, try again.';    
                        uname.style.border = '1px solid red';
                        unmMsg.style.color = 'red';
                        return;
                    }
                    else{
                        if(input.email!=admin.email)
                            {
                                emnMsg.innerText = 'wrong email, try again.';    
                                email.style.border = '1px solid red';
                                emnMsg.style.color = 'red';
                                
                                return;
                            }
                            else{
                sLg.innerText = 'Welcome Admin.';    
                sLg.style.color = 'green';
                adminLogin.reset();
                return;
            }
        }
    }
}

addingperson();
removingperson();
addingproject();
removingproject();