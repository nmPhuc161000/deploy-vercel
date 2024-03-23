import React, { useState } from "react";
import urlApi from "../../../../../../configAPI/UrlApi";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function UpdateStaus({ dataRequestById, setUpdateOrder }) {
  const [statusRequest, setStatusRequest] = useState(
    dataRequestById.statusRequest || ""
  );
  console.log(statusRequest);
  const handleStatusRequest = (event) => {
    const selectedOption = event.target.value;
    setStatusRequest(selectedOption);
  };
  const token = localStorage.getItem("token");
  const handleUpdateStatus = async () => {
    if(statusRequest === dataRequestById.statusRequest){
      alert("You cannot choose the same status!")
      return;
    }
    const data = {
      statusRequest: statusRequest,
    };
    try {
      const response = await axios.patch(
        `${urlApi}/api/RequestOrder/update-status-request?id=${dataRequestById.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setUpdateOrder(response);
      alert("Change status request successful!");
    } catch (error) {
      console.log(error.request);
    }
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        style={{ margin: "0 0 5px 0", width: "100%" }}
      >
        <InputLabel id="demo-simple-select-helper-label">
        Status request
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={statusRequest}
          onChange={handleStatusRequest}
          label="Status request"
        >
          <MenuItem value={"Waiting"} disabled={dataRequestById.statusRequest === "Processing" || dataRequestById.statusRequest === "Completed"}>Waiting</MenuItem>
          <MenuItem value={"Processing"} disabled={dataRequestById.statusRequest === "Completed"}>Processing</MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
        </Select>
      </FormControl>
      <section>
        <button className="custom-btn btn-3" onClick={(e) => handleUpdateStatus(e.target.value)}>Submit</button>
      </section>
    </div>
  );
}
