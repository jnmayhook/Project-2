const loginForm = async (event) => {
  
  //prevent page refreshing upon enter
  event.preventDefault();

  //grabbing from handlebars
  const username = document.querySelector('#email_log').value.trim();
  const password = document.querySelector('#password_log').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    //if response is acceptable, replace the doc link with /
    if (response.ok) {
      document.location.replace('/user');
    } else {
      alert('Failed to log in');
    }
  }
};

document.querySelector('#log-form').addEventListener('submit', loginForm);
