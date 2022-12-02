import React, { useContext, useEffect, useState } from "react";

//Axios
import axios from "axios";

//Users Details Table Import
import Table from "./Table";

//HamBurger import Using useContext
import { menuContext } from "../../Components/Hooks/MenuContext";

const UsersTab = () => {
  //HamBurger import Using useContext
  const { hamBurger } = useContext(menuContext);

  //Get All Users
  const [usersDetails, setUsersDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/all", {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        setUsersDetails(res.data);
      })
      .catch((error) => {
        // API call failed
        window.alert(error);
      });
  }, []);

  return (
    <div className={`${hamBurger ? "ml-24" : "ml-72"} transition-all mt-20`}>
      {usersDetails && usersDetails ? (
        <Table data={usersDetails} rowsPerPage={7} />
      ) : (
        "loading.."
      )}
    </div>
  );
};

export default UsersTab;
