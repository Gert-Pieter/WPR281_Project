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

    pswMsg.innerText = "",
    unmMsg.innerText = "",
    emnMsg.innerText = "",
    sLg.innerText = ""

    uname.style.border = "1px solid #ccc"; 
    email.style.border = "1px solid #ccc";
    password.style.border = "1px solid #ccc";

    if(input.password!=admin.password) {
        pswMsg.innerHTML = '<br>Wrong password, try again.';
        password.style.border = '1px solid red';
        pswMsg.style.color = 'red';
    }
    else {
        if(input.uname != admin.uname){
            unmMsg.innerHTML = '<br>wrong username, try again.';    
            uname.style.border = '1px solid red';
            unmMsg.style.color = 'red';
            return;
        }
        else{
            if(input.email!=admin.email)
            {
                emnMsg.innerHTML = 'wrong email, try again.';    
                email.style.border = '1px solid red';
                emnMsg.style.color = 'red';
                
                return;
            }
            else{
                sLg.innerHTML = '<br>Welcome Admin. Please wait';    
                sLg.style.color = 'green';
                adminLogin.reset();
                setTimeout(()=>{
                    window.location.assign('dashboard.html')
                }, 2000)
            }
        }
    }
}
