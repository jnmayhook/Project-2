const deletePostHandler = async (event) => {
  event.preventDefault();



const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
console.log(window.location.toString().split('/'))
console.log(post_id);

    const response = await fetch(`/api/posts/` + post_id, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log("Response okay");
      document.location.href="/";
    } else {
      alert('Failed to delete post.  You cannot delete a post unless you are logged-in and created the post.');
    }
};



document
  .querySelector('.delete-post').addEventListener('submit', deletePostHandler);
  console.log(window.location.toString().split('/'))