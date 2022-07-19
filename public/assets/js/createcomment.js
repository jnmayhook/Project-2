const newPostHandler = async (event) => {
  event.preventDefault();
alert("some text")
  const comment_text = document.querySelector('#commentText').value.trim();
  const comment_name = document.querySelector('#commentName').value.trim();
console.log(comment_text, comment_name)
const post_id = location.search
console.log(post_id)
  if (comment_text && comment_name) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text }),
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