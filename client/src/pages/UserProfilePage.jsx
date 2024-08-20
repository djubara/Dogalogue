import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";

export default function UserProfilePage() {
  const { userId } = useParams();
}
