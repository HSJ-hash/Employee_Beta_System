import { useState, useEffect } from "react";
import axios from "axios";

// AUTHENTICATION HEADER
const token = localStorage.getItem("token");

function useGetRole() {
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/user/getRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRole(res.data);  // Set role data from response
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return role; // Return the role for use in other components
}

export { useGetRole };
