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
        username:"Jac123"
    },
    {}
]
// issues storage
let issues = [
    {
        id:"1232fdfd",
        Summary:"UI is not working",
        Details:"When clicking the button it does not work",
        projectsRelatedTo:"also get",
        PidentifiedIssue: "use get",
        PassignedTofix:"also get",
        status:""
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
    let personForm = document.getElementById(`personForm`);
    
    personForm.addEventListener('submit', (e) => {
        e.preventDefault(); //stops refreshing
    
        // Getting the data from the form
        let formdata = new FormData(personForm) //Instead of getting each input manually formdata takes all input elements and we can then just use it 
    
        let FirstName = formdata.get('fname'),
        LastName = formdata.get('lname'),
        email = formdata.get('email'),
        username = FirstName.slice(0,3) + "123"
        let newdata = {
            FirstName: FirstName,
            LastName: LastName,
            email: email,
            username: username
        };
    
        people.push(newdata);
        localStorage.setItem('people',JSON.stringify(people))
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
    if(!(input.password==admin.password)) {
    }
    else {
        if(!(input.uname === admin.username)){
            message.innerText = 'wrong username. Try again'
        }
        else{
            if(!(input.email===admin.email))
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
