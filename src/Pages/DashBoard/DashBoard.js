import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { menuContext } from "../../Components/Hooks/MenuContext";

const DashBoard = () => {
  const { hamBurger } = useContext(menuContext);
  const [initialCount ,setInitialCount] = useState(null);

  useEffect(() => {
   axios.get('http://localhost:5000/dashboard/initialCount',{
    headers: {
      accessToken: localStorage.getItem("authtoken"),
    },
   }).then((res) => {
    setInitialCount(res.data);
   })
  }, []);

  return (
    <>
      <div
        className={
          hamBurger
            ? "absolute top-[75px] right-[5px] left-[100px] transition-all"
            : "absolute top-[75px] right-[5px] left-[300px] transition-all"
        }
      >
        <div>
         
        </div>
      </div>
    </>
  );
};

export default DashBoard;
