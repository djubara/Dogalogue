import { Modal } from "react-bootstrap";

export default function SinglePostModal({ post, show, setShow }) {
  return (
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

          <div style={{ paddingTop: "10px", display: "block", width: "90%" }}>
            <p>{post.content}</p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-block">
        <p>Posted on {new Date(post.created).toLocaleString()}</p>
      </Modal.Footer>
    </Modal>
  );
}
