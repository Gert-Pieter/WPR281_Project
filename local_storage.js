// Projects storage 
let projects = 
[
    {
        id:0,
        name: 'UI'
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
        username:"123Jack"
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

//adds the arrays to local storage
calStorage.setItem('projects', JSON.stringify(projects));
localStorage.setItem('people', JSON.stringify(people));
localStorage.setItem('issues', JSON.stringify(issues));