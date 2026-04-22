# Admin 

### Validation 

With admin all the input boxes are checked. If any of them are incorrect the box will turn red and a red message will appear under the box to notify the admin their information is incorrect.

# Adding person

### Validation

JS searches for the email address to check if the email exist it does this by retrieving the index of the entered email. When data is not found in a array it will return the index as -1. By checking if the given email is not -1 it means that the email exist and will notify the user the person exist.  

The form validation doesn't allow the first name to be shorter then 2, contain any characters that aren't ' or - any any spaces. The same applies for the last name but does not allow the last name to be lest then 3. 

For project entry we use a drop down to stop incorrect data and also shows all the project codes

### Profile Picture 

You cannot store a image in local storage as a image because local storage stores only strings but by using conversation we can change that.

``` 
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
```

When the file gets inserted it gets it's data turned into string data. By using the img src tag you can then display that data without having the file on your machine. 

### Notifying 

Since Only email is checked JS only notifies if the email matches up with data in the database, otherwise they use the browser notification to so where the user input is incorrect 
# Removing person

### Validation 

To ensure no incorrect data is entered a drop down box is used. When a person is selected is shows their name as well as which project their involved in 

# Adding Project 

### Validation 

The same way with people we validate if a project exist simply by checking if the code exist. If it does it will stop the user and notify that the project already exist. Some form validation is also applied 

| Element            | Validation                                                                 |
| ------------------ | -------------------------------------------------------------------------- |
| Project Name       | -> Only allows ' or - <br>- >Needs to be longer then 3 and shorter then 20 |
| Project Code       | -> Only two Capital letters are allowed followed by two numbers            |
| Project Summary    | -> Needs to be longer then 5 and shorter then 50                           |
| Project Desription | -> Needs to be longer then 15 and shorter then 200                         |
### Notifying

The only notifying the JS does is when a wrong code is entered otherwise the browser is used to notify them when their form input is wrong.
# Removing Project

Just like removing a Person a drop down is used to show all the projects codes.

