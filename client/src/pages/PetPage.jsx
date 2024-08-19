import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_PET, QUERY_PET_POSTS } from "../utils/queries";
import Post from "../components/Post";
import Posts from "../components/Posts";

export default function PetPage() {
  const { petId } = useParams();
  const petQuery = useQuery(QUERY_PET, { variables: { petId } });
  const pet = petQuery?.data?.pet;

  const postsQuery = useQuery(QUERY_PET_POSTS, { variables: { petId } });
  const posts = postsQuery?.data?.petPosts;

  if (petQuery.loading || postsQuery.loading) return <p>Loading...</p>;
  if (!petQuery.data) return <p>Pet not found.</p>;

  return (
    <>
      <h1>{pet.petName}</h1>

      {pet.photoUrl && (
        <img
          src={pet.photoUrl}
          alt="pet photo"
          style={{
            maxWidth: "inherit",
            maxHeight: "300px",
            marginBottom: "10px",
          }}
        />
      )}

      <section style={{ marginBottom: "10px" }}>
        <h3>About {pet.petName}</h3>
        <p style={{ marginBottom: "0px" }}>Size: {pet.size}</p>
        <p style={{ marginBottom: "0px" }}>Breed: {pet.breed}</p>
        <p style={{ marginBottom: "0px" }}>Gender: {pet.gender}</p>
        <p style={{ marginBottom: "0px" }}>Adopted: {pet.gotchaDate}</p>
        <p style={{ marginBottom: "0px" }}>
          Spayed/Neutered: {pet.altered ? "Yes" : "No"}
        </p>
        <p style={{ marginBottom: "0px" }}>Energy Level: {pet.energyLevel}/5</p>
      </section>

      <section>
        <h3>Owners</h3>
        <ul>
          {pet.owners.map((owner) => (
            <li>
              <a href={"/profile/" + owner._id}>
                {owner.firstName} {owner.lastName}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Posts</h3>
        <Posts posts={posts} />
        {/* {posts.map((post) => (
          <Post post={post} />
        ))} */}
      </section>
    </>
  );
}
