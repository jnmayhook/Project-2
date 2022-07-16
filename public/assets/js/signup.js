const signupForm= async(event)=> {
    event.preventDefault();

    const username=document.querySelector('#email_signup').value.trim();
    const password=document.querySelector('#password_signup').value.trim();

    if(username&&password){
        const response= await fetch('/api/users',{
            method:'POST',
            body:JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });
        
        if(response.ok){
            document.location.replace('/createpost');
        }else{
            alert(response.statusText);
        }
    }
};

document.querySelector('#sign-up-form').addEventListener('submit', signupForm);