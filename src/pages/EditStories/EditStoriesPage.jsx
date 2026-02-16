import WriteStoryForm from "../../components/WriteStoryForm";
import { useState, useRef } from "react";
import { useParams } from "react-router";

const EditStoriesPage = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { postId } = useParams();
  console.log(postId);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-2 rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
      <h2 className="mb-2 text-2xl">Edit story</h2>
      <WriteStoryForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        initialValue="<p>What's on your mind?</p>"
        editorRef={editorRef}
        tag={tag}
        setTag={setTag}
        isMutating={false}
        handleSubmit={handleSubmitForm}
        errorMsg={errorMsg}
      />
    </div>
  );
};
export default EditStoriesPage;
