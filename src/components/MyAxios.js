import React, { useEffect, useState } from "react";
import axios from "axios";

let API = "https://jsonplaceholder.typicode.com";

export const FetchingData = async () =>
  await axios
    .get(`${API}/posts`)
    .then((data) => data)
    .catch((error) => error.message);

const MyAxios = () => {
  const [newData, setNewData] = useState([]);
  const fetchingData = async () => {
    try {
      const { data } = await axios.get(`${API}/posts`);
      setNewData(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div data-testid="fetchData">
      {newData.slice(0, 20).map(({ body }) => (
        <p
          style={{
            textAlign: "center",
            border: "1px solid black",
            padding: "10px 5px",
            margin: "10px",
          }}
        >
          {body}
        </p>
      ))}
    </div>
  );
};

export default MyAxios;
