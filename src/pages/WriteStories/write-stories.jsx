import { useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import postService from "../../services/post";
import WriteStoryForm from "../../components/WriteStoryForm";
import SuccessDialog from "../../components/SuccessDialog";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router";

const WriteStories = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { trigger, isMutating } = useSWRMutation(
    "/api/posts",
    postService.createPosts,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatTag = tag.split(",");
    const formData = {};
    if (title) formData["title"] = title;
    if (description) formData["excerpt"] = description;
    if (editorRef.current) formData["content"] = editorRef.current.getContent();
    if (tag) formData["tag"] = formatTag;

    try {
      const result = await trigger(formData);
      if (result) {
        setTitle("");
        setDescription("");
        editorRef.current.resetContent("");
        editorRef.current.setDirty(false);
        setTag("");
        setErrorMsg(null);
        setIsOpen(true);
      }
    } catch (err) {
      setErrorMsg(err.errors);
    }
  };
  return (
    <div className="m-2 rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
      <h2 className="mb-2 text-2xl">Write story</h2>
      <WriteStoryForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        initialValue="<p>What's on your mind?</p>"
        editorRef={editorRef}
        tag={tag}
        setTag={setTag}
        isMutating={isMutating}
        handleSubmit={handleSubmit}
        errorMsg={errorMsg}
      />
      <SuccessDialog isOpen={isOpen} setIsOpen={setIsOpen} btnText="Got it">
        <div className="flex flex-col items-center gap-2">
          <IoIosCheckmarkCircleOutline
            className="rounded bg-green-200 text-shadow-white"
            color="green"
            size="50"
          />
          <h3 className="text-3xl font-bold text-gray-600">Story Added</h3>
          <Link
            className="text-sky-500 underline hover:cursor-pointer"
            to="/stories"
          >
            See all of your stories
          </Link>
        </div>
      </SuccessDialog>
    </div>
  );
};
export default WriteStories;
