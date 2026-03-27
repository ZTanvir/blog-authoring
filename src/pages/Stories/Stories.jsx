import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import postService from "../../services/post";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router";
import StoryDetails from "./StoryDetails";
import ConfirmDialog from "../../components/ConfirmDialog";
import { CiWarning } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

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
      <section className="mb-4 rounded-xl border border-gray-300 p-4">
        <h1 className="text-2xl sm:text-4xl">Welcome back, {user?.username}</h1>
        <p className="mt-1 text-xl">
          Manage your blog posts below. You can publish, edit, or delete your
          posts.
        </p>
      </section>

      <div className="rounded-xl border border-gray-300 p-4">
        <div className="flex space-x-2 rounded-xl bg-gray-200 font-bold text-gray-700">
          <button
            className={`m-1 flex-1 rounded-xl p-1 transition-colors duration-200 hover:cursor-pointer ${postStatus === "all" ? "bg-white" : "bg-none"}`}
            onClick={() => setPostStatus("all")}
          >
            All {postStatus === "all" && <span>({data?.length})</span>}
          </button>
          <button
            className={`m-1 flex-1 rounded-xl p-1 transition-colors duration-200 hover:cursor-pointer ${postStatus === "published" ? "bg-white" : "bg-none"}`}
            onClick={() => setPostStatus("published")}
          >
            Published{" "}
            {postStatus === "published" && <span>({data?.length})</span>}
          </button>
          <button
            className={`m-1 flex-1 rounded-xl p-1 transition-colors duration-200 hover:cursor-pointer ${postStatus === "unpublished" ? "bg-white" : "bg-none"}`}
            onClick={() => setPostStatus("unpublished")}
          >
            Unpublished{" "}
            {postStatus === "unpublished" && <span>({data?.length})</span>}
          </button>
        </div>

        {data && (
          <div className="py-2">
            {postStatus === "all" && (
              <div className="">
                <h2 className="my-4 text-2xl font-bold">All stories</h2>
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
                    <p className="text-sm">No stories found.</p>
                    <Link
                      className="flex items-center space-x-2 text-sky-600 hover:text-sky-400"
                      to="/write"
                    >
                      <span> Write your first story from here</span>
                      <span>
                        <FaLongArrowAltRight />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {postStatus === "published" && (
              <div className="flex flex-col space-y-2">
                {data.length ? (
                  <div>
                    <h2 className="my-4 text-2xl font-bold">Published</h2>
                    {data.map((post) => (
                      <Link
                        key={post.id}
                        className="text-sky-600 hover:text-sky-500"
                        to={`${import.meta.env.VITE_HOME_WEBPAGE_URL}/posts/${post.id}`}
                      >
                        {post.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p>No published stories.</p>
                )}
              </div>
            )}

            {postStatus === "unpublished" && (
              <div>
                {data.length ? (
                  <div>
                    <h2 className="my-4 text-2xl font-bold">Unpublished</h2>

                    {data.map((post) => (
                      <div key={post.id} className="pb-2">
                        {post.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No unpublished stories.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

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
