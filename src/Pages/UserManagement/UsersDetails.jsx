import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

//HamBurger import Using useContext
import { menuContext } from "../../Components/Hooks/MenuContext";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersDetails = () => {
  //HamBurger import Using useContext
  const { hamBurger } = useContext(menuContext);

  const navigate = useNavigate();
  const { id } = useParams();

  //Get User Data
  const [userDetails, setUserDetails] = useState();
  const [actionBtn, setActionBtn] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/single/${id}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((response) => {
        setUserDetails(response.data.data);
        // console.log(response.data);
      });
  }, [id, actionBtn]);

  //User Delete Action
  const HandleIsDeleteBtn = () => {
    if (userDetails.isDeleted === 0) {
      axios
        .get(`http://localhost:5000/users/deleteuser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.warn(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:5000/users/activeuser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.success(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    }
  };

  //User Block Action
  const HandleIsBlockBtn = () => {
    if (userDetails.isBlocked === 0) {
      axios
        .get(`http://localhost:5000/users/blockuser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.warn(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:5000/users/unblockuser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.success(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    }
  };

  //User Comfirm Action
  const HandleIsConfirmBtn = () => {
    if (userDetails.isConfirmed === 0) {
      axios
        .get(`http://localhost:5000/users/confirmuser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.success(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:5000/users/unconfirmuser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.warn(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    }
  };

  //User Comfirm Action
  const HandleIsSuspended = () => {
    if (userDetails.isSuspended === 0) {
      axios
        .get(`http://localhost:5000/users/suspenduser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.success(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:5000/users/unsuspenduser/${id}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          toast.warn(res.data);
          setActionBtn(!actionBtn);
        })
        .catch((error) => {
          window.alert(error);
          console.log(error);
        });
    }
  };

  return (
    <div className={`${hamBurger ? "ml-24" : "ml-72"} transition-all`}>
      <div className="mx-32 mt-20">
        <div>
          <div className="relative flex justify-center items-center py-5  rounded-full mt-7">
            {/* <button
              className="text-3xl text-white absolute left-5 top-5"
              onClick={() => navigate(-1)}
            >
              <i class="fa-solid fa-arrow-left"></i>
            </button> */}
            <span className=" font-extabold text-4xl text-center font-bold text-gray-500 uppercase">
              User Details
            </span>
          </div>
        </div>

        {/* Users Details Section */}
        <div className=" mt-8">
          <p className="text-2xl text-gray-700 font-semibold border-b-2 border-gray-600 mb-2">
            <span className="font-bold uppercase text-xl text-gray-800">
              Name :{" "}
            </span>
            {userDetails && userDetails.firstName}{" "}
            {userDetails && userDetails.lastName}
          </p>
          <p className="text-2xl text-gray-700 font-semibold border-b-2 border-gray-600 mb-2">
            <span className="font-bold uppercase text-xl text-gray-800">
              email :{" "}
            </span>
            {userDetails && userDetails.email}
          </p>
          <p className="text-2xl text-gray-700 font-semibold border-b-2 border-gray-600 mb-2">
            <span className="font-bold uppercase text-xl text-gray-800">
              phone :{" "}
            </span>
            {userDetails && userDetails.phone}
          </p>
          <p className="text-2xl text-gray-700 font-semibold border-b-2 border-gray-600 mb-2">
            <span className="font-bold uppercase text-xl text-gray-800">
              role :{" "}
            </span>
            {userDetails && userDetails.role}
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-10">
          <button
            onClick={HandleIsDeleteBtn}
            className="bg-gray-700 text-white text-lg font-extrabold uppercase px-[47px] py-[10px] rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          >
            {userDetails && userDetails.isDeleted === 0 ? "Delete" : "Activate"}
          </button>
          <button
            onClick={HandleIsBlockBtn}
            className="bg-gray-700 text-white text-lg font-extrabold uppercase px-[47px] py-[10px] rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          >
            {userDetails && userDetails.isBlocked === 0 ? "Block" : "UnBlock"}
          </button>
          <button
            onClick={HandleIsConfirmBtn}
            className="bg-gray-700 text-white text-lg font-extrabold uppercase px-[47px] py-[10px] rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          >
            {userDetails && userDetails.isConfirmed === 0
              ? "Confirm"
              : "UnConfirm"}
          </button>
          <button
            onClick={HandleIsSuspended}
            className="bg-gray-700 text-white text-lg font-extrabold uppercase px-[47px] py-[10px] rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          >
            {userDetails && userDetails.isSuspended === 0
              ? "Suspended"
              : "UnSuspended"}
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UsersDetails;
