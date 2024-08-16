import FeedPosts from "../components/FeedPosts";
import FeedPostInput from "../components/FeedPostInput";
import Auth from "../utils/auth";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { uploadImage } from "../utils/images";
import NewPostModal from "../components/NewPostModal";

const DogFeed = () => {
  const [showNewPostModal, setShowNewPostModal] = useState(true);

  return (
    <>
      <div className="feedPage full-withradius border">
        {Auth.loggedIn() ? (
          <>
            <header className="d-flex w-100 justify-content-between">
              <h1 className="feed-title">Posts</h1>
              <Button onClick={() => setShowNewPostModal(true)}>
                New Post
              </Button>
            </header>

            <FeedPosts />
          </>
        ) : (
          <h2>You need to be logged in to see the feed.</h2>
        )}
      </div>

      {/* new post modal */}
      <NewPostModal show={showNewPostModal} setShow={setShowNewPostModal} />
    </>
  );
};

export default DogFeed;
