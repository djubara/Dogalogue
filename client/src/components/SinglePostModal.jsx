import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NewCommentModal from "./NewCommentModal";

export default function SinglePostModal({ post, show, setShow }) {
  const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {post.postingAs ? (
              <h4>Post by {post.postingAs.petName}</h4>
            ) : (
              <h4>
                Post by {post.author.firstName} {post.author.lastName}
              </h4>
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <section>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {post.photoUrl && (
                <img
                  src={post.photoUrl}
                  alt="post image"
                  style={{ maxWidth: "400px" }}
                />
              )}

              <div
                style={{ paddingTop: "10px", display: "block", width: "90%" }}
              >
                <p>{post.content}</p>
              </div>
            </div>

            <p>Posted on {new Date(post.created).toLocaleString()}</p>
          </section>

          <section>
            <header className="d-flex justify-content-between align-items-center">
              <strong>Comments</strong>

              <Button size="sm" onClick={() => setShowCreateCommentModal(true)}>
                Create Comment
              </Button>
            </header>

            {post.comments.map((comment) => (
              <div>
                <h6 style={{ marginBottom: "0px" }}>
                  {comment.postingAs
                    ? comment.postingAs.petName
                    : comment.author.firstName + " " + comment.author.lastName}
                  &nbsp;
                  <span style={{ fontSize: "10pt" }}>
                    {new Date(comment.created).toLocaleString()}
                  </span>
                </h6>
                <p>{comment.content}</p>
                {/* <pre>{JSON.stringify(comment)}</pre> */}
              </div>
            ))}
          </section>
        </Modal.Body>
      </Modal>

      <NewCommentModal
        post={post}
        postId={post.id}
        show={showCreateCommentModal}
        setShow={setShowCreateCommentModal}
      />
    </>
  );
}
