const newPostHandler = async (event) => {
    event.preventDefault();
  
    const postTitle = document.querySelector('#postTitle').value.trim();
    const postBody = document.querySelector('#postBody').value.trim();
  
    if (postTitle && postBody) {
      const response = await fetch(`/`, {
        method: 'POST',
        body: JSON.stringify({ title, post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('#create-post-form')
  .addEventListener('submit', newPostHandler);