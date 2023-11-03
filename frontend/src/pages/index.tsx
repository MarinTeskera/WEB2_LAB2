import { Button } from "@chakra-ui/react";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  const fetchDataFromBackend = () => {
    fetch("http://localhost:4200")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
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
    </>
  );
};

export default IndexPage;
