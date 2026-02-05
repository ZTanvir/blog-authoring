import useSWR from "swr";
import postService from "../../services/post";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Stories = () => {
  const { user } = useAuth();
  const [postStatus, setPostStatus] = useState("all");
  const { data } = useSWR(
    `/api/posts/user/${user?.id}?status=${postStatus}`,
    postService.getPosts,
  );

  return (
    <div>
      <h1 className="text-4xl">Hello {user?.username}</h1>
      <p>Here are your stories</p>

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
        <div>
          {postStatus === "all" && (
            <div>
              {data.map((post) => (
                <div className="mb-3" key={post.id}>
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
                    onClick={(e) => {}}
                    className={`rounded border ${post.published ? " bg-green-200 hover:bg-red-200" : "bg-red-200 hover:bg-green-200"} w-30 px-3 py-2 text-gray-800 shadow-lg transition duration-200 hover:cursor-pointer`}
                  >
                    {post.published ? "publish" : "unpublish"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {postStatus === "published" && (
            <div>
              {data.map((post) => (
                <div key={post.id}>{post.title}</div>
              ))}
            </div>
          )}

          {postStatus === "unpublished" && (
            <div>
              {data.map((post) => (
                <div key={post.id}>{post.title}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Stories;
