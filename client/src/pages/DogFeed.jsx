import Posts from "../components/Posts";
import Auth from "../utils/auth";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import NewPostModal from "../components/NewPostModal";
import { QUERY_POSTS } from "../utils/queries";

const DogFeed = () => {
  const { loading, error, data } = useQuery(QUERY_POSTS);

  const [showNewPostModal, setShowNewPostModal] = useState(false);
  console.log(data);

  if (!Auth.loggedIn()) {
    return <h2>You need to be logged in to see the feed.</h2>;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (!data) {
    console.log(data, error);
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="feedPage full-withradius">
        {/* <pre>{JSON.stringify(Auth.getProfile())}</pre> */}
        <header className="d-flex w-100 justify-content-between">
          <h1 className="feed-title">Posts</h1>
          <Button onClick={() => setShowNewPostModal(true)}>New Post</Button>
        </header>

        <Posts posts={data.posts} />
      </div>

      {/* new post modal */}
      <NewPostModal show={showNewPostModal} setShow={setShowNewPostModal} />
    </>
  );
};

export default DogFeed;
