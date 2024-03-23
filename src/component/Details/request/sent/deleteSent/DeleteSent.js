import React from "react";
import "./DeleteSent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import urlApi from "../../../../../configAPI/UrlApi";

export default function DeleteSent({ note, setUpdateDe }) {
  const token = localStorage.getItem("token");
  const handleDeSentReq = async () => {
    try {
      const response = await axios.delete(
        `${urlApi}/api/RequestOrder/delete-request?id=${note.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setUpdateDe(response);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data);
    }
  };
  return (
    <div className="deSentReq" onClick={() => handleDeSentReq()}>
      <button>
        <DeleteIcon />
      </button>
    </div>
  );
}
