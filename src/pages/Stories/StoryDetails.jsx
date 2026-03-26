import useSWRMutation from "swr/mutation";
import postService from "../../services/post";
import { Link } from "react-router";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlinePublish } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const StoryDetails = ({ post, mutatePosts, setIsModalOpen, setPost }) => {
  const { trigger } = useSWRMutation(
    `/api/posts/${post.id}`,
    postService.editPosts,
  );

  return (
    <div
      className="grid grid-cols-1 gap-4 rounded-xl border border-gray-300 p-4 sm:grid-cols-2"
      key={post.id}
    >
      <div>
        <h3>{post.title}</h3>
        <p>
          {post.published ? (
            <span className="flex items-center gap-1 text-green-600">
              <CiCircleCheck />
              publish
            </span>
          ) : (
            <span className="text-gray-600/60">unpublish</span>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <button
          onClick={async () => {
            const res = await trigger({ ...post, published: !post.published });
            if (res) {
              mutatePosts();
            }
          }}
          className={`rounded-xl border border-gray-300 py-1 ${post.published ? "bg-neutral-100 hover:bg-neutral-50" : "bg-gray-900/80 text-white hover:bg-gray-900/50"} text-gray-800 shadow-lg transition duration-200 hover:cursor-pointer md:w-30`}
        >
          <span className="flex items-center justify-center">
            <MdOutlinePublish />
            {post.published ? "publish" : "unpublish"}
          </span>
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setPost(post);
          }}
          className="rounded-xl border border-gray-300 bg-neutral-100 py-1 text-gray-800 shadow-lg transition duration-200 hover:cursor-pointer hover:bg-neutral-50 md:w-30"
        >
          <span className="flex items-center justify-center">
            <MdOutlineDeleteOutline />
            Delete
          </span>
        </button>
        <Link
          className="rounded-xl border border-gray-300 bg-neutral-100 py-1 text-gray-800 shadow-lg transition duration-200 hover:cursor-pointer hover:bg-neutral-50 md:w-30"
          to={`/edit/${post?.id}`}
        >
          <span className="flex items-center justify-center">
            <CiEdit />
            Edit
          </span>
        </Link>
      </div>
    </div>
  );
};

export default StoryDetails;
