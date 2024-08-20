import Card from "react-bootstrap/Card";
// import profile from '../../data/profile';
// import remi from "../../public/assets/remi.jpg";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import AddPetModal from "../components/AddPetModal";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import PetCard from "../components/PetCard";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return <h2>You must be signed in to view your profile.</h2>;
  }

  return (
    <>
      <h1>Your Profile</h1>

      <h4>
        {data.me.firstName} {data.me.lastName}
      </h4>
      <strong>Pet(s): {data.me.pets.length}</strong>

      <hr />

      <h3>Your Pets</h3>

      <Button
        style={{ marginBottom: "10px" }}
        onClick={() => setShowAddPetModal(true)}
      >
        Add Pet
      </Button>

      <div style={{ display: "flex", gap: "20px" }}>
        {data.me.pets.map((pet) => {
          return <PetCard pet={pet} />;
        })}
      </div>

      <AddPetModal show={showAddPetModal} setShow={setShowAddPetModal} />
    </>
  );
}
