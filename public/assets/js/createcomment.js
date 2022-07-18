const newPostHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('#commentText').value.trim();
  const comment_name = document.querySelector('#commentName').value.trim();


  if (comment_text && comment_name) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text, user_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("Response okay");
      document.location.replace('/');
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.create-comment').addEventListener('submit', newPostHandler);