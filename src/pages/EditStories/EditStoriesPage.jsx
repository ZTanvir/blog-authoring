import { useState, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router";
import WriteStoryForm from "../../components/WriteStoryForm";
import postService from "../../services/post";
import Loading from "../../components/Loading";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import SuccessDialog from "../../components/SuccessDialog";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router";
import helperFunction from "../../utils/helperFunction";

const EditStoriesPage = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { postId } = useParams();
  const { data, isLoading } = useSWR(
    `/api/posts/${postId}?status="any"`,
    postService.getPosts,
  );

  const { trigger, isMutating } = useSWRMutation(
    `/api/posts/${postId}`,
    postService.editPosts,
  );

  const handleSubmitForm = async (e) => {
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
  useLayoutEffect(() => {
    if (data) {
      setTitle(helperFunction.unsanitized(data.title));
      setDescription(helperFunction.unsanitized(data.excerpt));
      setTag(helperFunction.unsanitized(data.tag.join()));
      setInitialContent(helperFunction.unsanitized(data.content));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="m-2 rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
      <h2 className="mb-2 text-2xl">Edit story</h2>
      <WriteStoryForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        initialValue={initialContent}
        editorRef={editorRef}
        tag={tag}
        setTag={setTag}
        isMutating={isMutating}
        handleSubmit={handleSubmitForm}
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
          <Link className="text-sky-500 underline hover:cursor-pointer" to="/">
            See all of your stories
          </Link>
        </div>
      </SuccessDialog>
    </div>
  );
};
export default EditStoriesPage;
