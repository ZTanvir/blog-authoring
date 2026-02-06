import useSWR from "swr";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router";

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

      <div className="mt- flex space-x-2 text-2xl text-gray-700">
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
