import { Link } from "react-router-dom";
import SinglePostModal from "./SinglePostModal";
import { useState } from "react";
import Post from "./Post";

export default function Posts({ posts }) {
  const [modalTargetPost, setModalTargetPost] = useState(undefined);
  const [showPostModal, setShowPostModal] = useState(false);

  function handleSelectPost(post) {
    setModalTargetPost(post);
    setShowPostModal(true);
  }

  return (
    <>
      <div className="feed-posts">
        {posts.map((post) => (
          <Post post={post} handleSelectPost={handleSelectPost} />
        ))}
      </div>

      {modalTargetPost && (
        <SinglePostModal
          post={modalTargetPost}
          show={showPostModal}
          setShow={setShowPostModal}
        />
      )}
    </>
  );
}
