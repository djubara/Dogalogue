import { useQuery } from "@apollo/client";
import { QUERY_PETS } from "../utils/queries";
import PetCard from "../components/PetCard";

export default function PetsPage() {
  const petsQuery = useQuery(QUERY_PETS);
  const pets = petsQuery?.data?.pets;

  if (petsQuery.loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Pets</h1>
      <div className="d-flex flex-row gap-4">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </>
  );
}
