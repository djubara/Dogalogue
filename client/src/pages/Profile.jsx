import Card from "react-bootstrap/Card";
// import profile from '../../data/profile';
// import remi from "../../public/assets/remi.jpg";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import AddPetModal from "../components/AddPetModal";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  function renderEnergyLevel(energyLevel) {
    switch (energyLevel) {
      case 5:
        return "High";
      case 4:
        return "Medium-High";
      case 3:
        return "Medium";
      case 2:
        return "Medium-Low";
      case 1:
        return "Low";
      default:
        return "Unknown";
    }
  }

  function renderSize(size) {
    switch (size) {
      case "xl":
        return "Giant";
      case "lg":
        return "Big";
      case "md":
        return "Medium";
      case "sm":
        return "Small";
      case "xs":
        return "Petite";
      default:
        return "Unknown";
    }
  }

  function renderAltered(altered) {
    if (altered === true) {
      return "I am spayed/neutered";
    } else {
      return "I am not spayed/neutered";
    }
  }

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
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={pet.photoUrl} />
              <Card.Body>
                <Card.Title>
                  {pet.petName} <br />
                  <i style={{ fontSize: "12pt" }}>
                    {pet.breed}, {pet.age} yrs. old
                  </i>
                </Card.Title>
                <Card.Text>
                  <p>I have {renderEnergyLevel(pet.energyLevel)} energy!</p>
                  <p>I was adopted on {pet.gotchaDate}!</p>
                  <p>I am {renderSize(pet.size)} in size!</p>
                  <p>{renderAltered(pet.altered)}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <AddPetModal show={showAddPetModal} setShow={setShowAddPetModal} />
    </>
  );
}
