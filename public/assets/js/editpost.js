const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#postTitle').value.trim();
    const post_text = document.querySelector('#postBody').value.trim();
  
    if (title && post_text) {
      const response = await fetch(`/`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to edit post');
      }
    }
  };

  document
//   .querySelector('#create-post-form')
  .addEventListener('submit', editPostHandler);