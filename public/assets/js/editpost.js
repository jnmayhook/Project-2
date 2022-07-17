const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#postTitle').value.trim();
    const post_text = document.querySelector('#postBody').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (title && post_text) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/viewpost/:id');
      } else {
        alert('Failed to edit post');
      }
    }
  };

  document
//   .querySelector('#create-post-form')
  .addEventListener('submit', editPostHandler);