import useSWR from "swr";
import postService from "../../services/post";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { Link } from "react-router";

const StoryDetails = ({ post, mutatePosts }) => {
  const { trigger } = useSWRMutation(
    `/api/posts/${post.id}`,
    postService.editPosts,
  );

  return (
    <div className="mb-2" key={post.id}>
      <span className="mr-2">{post.title}</span>
      <button
        onMouseEnter={(e) => {
          if (post.published) {
            e.target.textContent = "unpublish";
          } else {
            e.target.textContent = "publish";
          }
        }}
        onMouseLeave={(e) => {
          if (post.published) {
            e.target.textContent = "publish";
          } else {
            e.target.textContent = "unpublish";
          }
        }}
        onClick={async () => {
          const res = await trigger({ ...post, published: !post.published });
          if (res) {
            mutatePosts();
          }
        }}
        className={`rounded border ${post.published ? " bg-green-200 hover:bg-red-200" : "bg-red-200 hover:bg-green-200"} w-30 px-3 py-2 text-gray-800 shadow-lg transition duration-200 hover:cursor-pointer`}
      >
        {post.published ? "publish" : "unpublish"}
      </button>
    </div>
  );
};

const Stories = () => {
  const { user } = useAuth();
  const [postStatus, setPostStatus] = useState("all");
  const { data, mutate } = useSWR(
    `/api/posts/user/${user?.id}?status=${postStatus}`,
    postService.getPosts,
  );

  return (
    <div>
      <h1 className="text-3xl sm:text-5xl">Hello, {user?.username}</h1>
      <p className="py-2 text-xl">Here are your stories</p>

      <div className="mt-6 flex space-x-2 text-2xl text-gray-700">
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
            <div>
              {data.length ? (
                data.map((post) => (
                  <StoryDetails
                    key={post.id}
                    post={post}
                    mutatePosts={mutate}
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
    </div>
  );
};
export default Stories;
