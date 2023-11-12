import { Button } from "@chakra-ui/react";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  const fetchDataFromBackend = () => {
    fetch("http://localhost:4200/auth/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response;
      })
      .then((data) => {
        console.log(data); // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const register = () => {
    fetch("http://localhost:4200/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "test" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response;
      })
      .then((data) => {
        console.log(data); // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const login = () => {
    fetch("http://localhost:4200/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "test" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response;
      })
      .then((data) => {
        console.log(data); // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>Index Page</div>
      <Button onClick={fetchDataFromBackend}>button</Button>
      <Button onClick={register}>register</Button>
      <Button onClick={login}>login</Button>
    </>
  );
};

export default IndexPage;
