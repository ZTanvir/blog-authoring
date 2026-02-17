import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import postService from "../../services/post";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router";
import StoryDetails from "./StoryDetails";
import SuccessDialog from "../../components/SuccessDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiWarning } from "react-icons/ci";

const Stories = () => {
  const { user } = useAuth();
  const [postStatus, setPostStatus] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const { data, mutate } = useSWR(
    `/api/posts/user/${user?.id}?status=${postStatus}`,
    postService.getPosts,
  );
  const { trigger } = useSWRMutation(
    `/api/posts/${post?.id}`,
    postService.deletePosts,
  );

  const handleDeleteStories = () => {
    trigger().then(() => {
      // post delete correctly
      mutate();
    });
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-5xl">Hello, {user?.username}</h1>
      <p className="py-2 text-xl">Here are your stories</p>

      <div className="flex space-x-2 text-2xl text-gray-700">
        <button
          className={`border-b-2 transition-colors duration-200 hover:cursor-pointer ${postStatus === "all" ? "border-b-gray-600" : "border-b-transparent"}`}
          onClick={() => setPostStatus("all")}
        >
          All
        </button>
        <button
          className={`border-b-2 transition-colors duration-200 hover:cursor-pointer ${postStatus === "published" ? "border-b-gray-600" : "border-b-transparent"}`}
          onClick={() => setPostStatus("published")}
        >
          Published
        </button>
        <button
          className={`border-b-2 transition-colors duration-200 hover:cursor-pointer ${postStatus === "unpublished" ? "border-b-gray-600" : "border-b-transparent"}`}
          onClick={() => setPostStatus("unpublished")}
        >
          Unpublished
        </button>
      </div>

      {data && (
        <div className="py-2">
          {postStatus === "all" && (
            <div className="">
              {data.length ? (
                data.map((post) => (
                  <StoryDetails
                    key={post.id}
                    post={post}
                    mutatePosts={mutate}
                    setIsModalOpen={setIsOpen}
                    setPost={setPost}
                  />
                ))
              ) : (
                <div>
                  <p>No stories found.</p>
                  <Link className="text-sky-600 hover:text-sky-400" to="/write">
                    Write your first story.
                  </Link>
                </div>
              )}
            </div>
          )}

          {postStatus === "published" && (
            <div>
              {data.length ? (
                data.map((post) => (
                  <Link
                    key={post.id}
                    className="pb-2 text-sky-600 hover:text-sky-500"
                    to={`http://localhost:5174/posts/${post.id}`}
                  >
                    {post.title}
                  </Link>
                ))
              ) : (
                <p>No published stories.</p>
              )}
            </div>
          )}

          {postStatus === "unpublished" && (
            <div>
              {data.length ? (
                data.map((post) => (
                  <div key={post.id} className="pb-2">
                    {post.title}
                  </div>
                ))
              ) : (
                <p>No unpublished stories.</p>
              )}
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirm={handleDeleteStories}
        btnText="Delete Stories"
      >
        <div className="mb-8 flex flex-col items-center gap-2">
          <CiWarning
            className="rounded bg-red-200 text-shadow-white"
            color="red"
            size="50"
          />
          <h3 className="text-3xl">Are you sure?</h3>
          <div className="text-center text-gray-600">
            <p>Are you sure you want to delete this stories</p>
            <p>This action cannot be undone</p>
          </div>
        </div>
      </ConfirmDialog>
    </div>
  );
};
export default Stories;
