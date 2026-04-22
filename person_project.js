function ProjectChoiceDropDown() { //This code provides a dropdown to remove projects or assign them to a person. It acts as form validation as the user is forced to choose one of them
    let projects = JSON.parse(localStorage.getItem('projects')),PC = document.getElementById('ProjectCode');

    if (!PC) return;
    
    projects.forEach(element => {
        let projectChoice = document.createElement('option');
        projectChoice.value = element.code;
        projectChoice.innerText = element.code;
        PC.appendChild(projectChoice);        
    });
}
function PeopleChoiceDropDown() {
    let people = JSON.parse(localStorage.getItem('people')), PeC = document.getElementById('PeopleChoose'), message = document.getElementById('message');
    
    people.forEach(element => {
        let PeopleChoice = document.createElement('option');
        PeopleChoice.value = element.username;
        PeopleChoice.innerText = element.username;
        PeC.appendChild(PeopleChoice);  
    
    PeC.addEventListener ('change',function(){
        let index = people.findIndex(person=> person.username === PeC.value)
        
    message.innerHTML = `<a class="heading">Person Name:</a> ${people[index].FirstName}<br> <a class ="heading">Project:</a> ${people[index].project} <br>
    `       
    })
})
}

// For removing and adding people and projects
function addingperson() {
    
    let people = JSON.parse(localStorage.getItem('people')),successfullMsg = document.getElementById('successfullMsg'),
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
        FirstName = document.getElementById('fname').value,
        LastName = document.getElementById('lname').value,
        email = document.getElementById('email').value,
        emailStyle = document.getElementById('email')//to style the form input 
        
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
            project: document.getElementById('ProjectCode').value,
            username: FirstName.slice(0,3) +  (people[people.length-1].id+1).toString(),
            profilePhoto: base64Image
        };// stores them in a object and then add the project on.
        
        people.push(newdata);
        successfullMsg.innerHTML = "<br> Person added Succesfully";
        successfullMsg.style.color = 'green';
        successfullMsg.style.fontStyle = 'italic';
        successfullMsg.append(successfulMessage);
        personForm.reset();
        localStorage.setItem('people',JSON.stringify(people))
    })
 }

function removingperson(){
let PeC = document.getElementById('PeopleChoose'),people =  JSON.parse(localStorage.getItem('people')),removingpersonform = document.getElementById('removepersonform'),messageSuccess = document.getElementById(`messageSuccess`),index = people.findIndex(person=> person.username === PeC.value)


people.splice(index,1);
localStorage.setItem('people', JSON.stringify(people));
messageSuccess.innerHTML='<br>Person removed';
messageSuccess.style.color = 'green';
 messageSuccess.style.fontStyle = 'italic';
removingpersonform.reset();
}

function addproject(){
    let project = JSON.parse(localStorage.getItem(`projects`)), input = { pname: document.getElementById('pname').value,
    pcode: document.getElementById('cname').value,
    summary: document.getElementById('summary').value
    },test = project.findIndex(project => project.code === input.pcode),
    projectCMsg = document.getElementById('projectCMsg'),projectMsg = document.getElementById('projectMsg');


    if(test !== -1)
    {   
        projectCMsg.innerHTML = "<br> Project code already exits."
        projectCMsg.style.color = 'red';
        projectCMsg.style.fontStyle = 'italic';
    }
    else{
        project.push({id: project[project.length-1].id + 1, name: input.pname, code: input.cname, summary: input.summary});
        localStorage.setItem('projects', JSON.stringify(project));
        projectMsg.innerHTML = '<br>Project added successfully.';
        projectMsg.style.color = 'green';
        projectMsg.style.fontStyle = 'italic';
    }
}

function removingproject()
{
    let PC = document.getElementById('ProjectCode'),project =  JSON.parse(localStorage.getItem('projects')),removingProjectform = document.getElementById('removeProjectForm'),messageSuccess = document.getElementById(`messageSuccess`),index = project.findIndex(project=> project.code === PC.value)


    project.splice(index,1);
    localStorage.setItem('projects', JSON.stringify(project));   
    messageSuccess.innerHTML='<br>Project removed';
    messageSuccess.style.color = 'green';
    messageSuccess.style.fontStyle = 'italic';
    PeopleChoiceDropDown();
    removingProjectform.reset();
    }

addingperson();