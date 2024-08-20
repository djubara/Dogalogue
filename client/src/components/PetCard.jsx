import { Card } from "react-bootstrap";

export default function PetCard({ pet }) {
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

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={pet.photoUrl} />
      <Card.Body>
        <Card.Title>
          <a href={"/pets/" + pet.id}>{pet.petName}</a>
          <br />
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
}
