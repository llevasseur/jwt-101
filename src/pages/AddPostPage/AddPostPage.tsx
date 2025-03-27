import PostForm from "../../components/PostForm/PostForm";
import "./AddPostPage.scss";

function AddPostPage() {
  return (
    <div className="add-post-page">
      <div className="title-block-pp">
        <h2 className="title-block-pp__title">Add a Post</h2>
      </div>
      <PostForm />
    </div>
  );
}

export default AddPostPage;
