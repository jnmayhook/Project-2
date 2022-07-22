const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('#commentText').value.trim();

console.log(comment_text);

const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

console.log(post_id);

if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id, comment_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("Response okay");
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.create-comment').addEventListener('submit', newCommentHandler);
