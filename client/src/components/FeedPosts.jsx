import { Link } from "react-router-dom";
import SinglePostModal from "./SinglePostModal";
import { useState } from "react";

export default function FeedPosts({ posts }) {
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
          <div className="post individualpostborder" key={post.id}>
            <div className="postbox align-items-center">
              <Link
                to={`/profile/${post.author.id}`}
                className="text-decoration-none"
              >
                {post.postingAs ? (
                  <img className="postimage" src={post.postingAs.photoUrl} />
                ) : post.author.photoUrl ? (
                  <img className="postimage" src={post.author.photoUrl} />
                ) : (
                  <img
                    className="postimage"
                    src={`https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}`}
                  />
                )}
              </Link>
              <div
                className="talk-bubble tri-right left-in round talk-bubble-border text-decoration-none"
                onClick={() => handleSelectPost(post)}
              >
                <div className="talktext">
                  {post.postingAs ? (
                    <h2>{post.postingAs.petName}</h2>
                  ) : (
                    <h2>{post.author.firstName}</h2>
                  )}

                  <p>{post.content}</p>
                </div>
              </div>
            </div>
          </div>
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
