import React, { useEffect, useState } from "react";

//React Paginate
import ReactPaginate from "react-paginate";
import "./pagination.css";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  BsArrowDownUp,
  BsSortAlphaDownAlt,
  BsSortAlphaUp,
} from "react-icons/bs";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// import Bike from '../../../Images/Svgs/BikeSvg';
// import Scooter from '../../../Images/Svgs/ScooterSvg'

const Tab = ({ rowsPerPage }) => {
  const navigate = useNavigate();

  const handleMoreDetailsBtn = (id) => {
    navigate(`/getuserdetailsbyid/${id}`);
  };

  const [data, setData] = useState([]);

  console.log("data from useeffect", data);

  const getApiData = () => {
    axios
      .get("http://localhost:5000/users/all", {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getApiData();
  }, []);

  // for pagination
  const [users, setUsers] = useState(data);

  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
  const [nameSort, setNameSort] = useState({
    nameSorted: "a to z",
    reversedName: false,
  });

  const sortById = () => {
    const usersCopy = [...data];
    usersCopy.sort((userA, userB) => {
      const userAId = parseInt(userA.id);
      const userBId = parseInt(userB.id);
      if (sorted.reversed) {
        return userAId - userBId;
      }
      return userBId - userAId;
    });
    setData(usersCopy);
    setSorted({ sorted: "id", reversed: !sorted.reversed });
  };

  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  const sortingByNumber = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        parseInt(a[col]) < parseInt(b[col]) ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowDown className="text-black hover:text-gray-700" />;
    }
    return <FaArrowUp className="text-black hover:text-gray-700" />;
  };

  const renderAlphabetArrow = () => {
    if (nameSort.reversedName) {
      return (
        <BsSortAlphaUp className="text-black hover:text-gray-700" size={20} />
      );
    }
    return (
      <BsSortAlphaDownAlt
        className="text-black hover:text-gray-700"
        size={20}
      />
    );
  };

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = rowsPerPage;
  const pagesVisited = pageNumber * usersPerPage;
  const [pageCount, setPageCount] = useState(
    Math.ceil(data.length / usersPerPage)
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // for search
  const [searchterm, setSearchTerm] = useState("");

  return (
    <div className=" text-sm text-left ">
      {/* Search bar */}

      <div className="px-12 text-start sm:px-0">
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96 md:w-96 sm:w-96">
            <input
              type="text"
              className="
        form-control
        block
        w-full
        px-2
        py-1.5
        text-sm
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-500
        rounded
        transition
        ease-in-out
        my-3
        outline-none
      "
              id="Text"
              placeholder="Search Users"
              value={searchterm}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* Table */}

      <table className="w-[94%] text-sm text-left mx-10">
        {/* Table Heading */}
        <thead className="text-xs text-gray-600 uppercase bg-[#F9FAFB] border drop-shadow-lg text-center">
          <tr>
            <th scope="col" onClick={sortById} className="">
              <div className="flex flex-row space-x-2 justify-center">
                <div>id</div>
                <div>{sorted.sorted === "id" ? renderArrow() : null}</div>
              </div>
            </th>

            {/* <th onClick={() => sorting("companycode")} scope="col" className="">
              <div className="flex flex-row space-x-2 justify-center">
                <div>Company Code</div>
                <div>
                  <BsArrowDownUp
                    className="text-black hover:text-gray-600"
                    size={15}
                  />
                </div>
              </div>
            </th> */}

            <th
              onClick={function () {
                sorting("firstName");
                setNameSort({
                  nameSorted: "a to z",
                  reversedName: !nameSort.reversedName,
                });
              }}
              scope="col"
              className=""
            >
              <div className="flex flex-row space-x-2 justify-center">
                <div>Name</div>
                <div>
                  {nameSort.nameSorted === "a to z"
                    ? renderAlphabetArrow()
                    : null}
                </div>
              </div>
            </th>

            <th scope="col" className="px-3 py-3">
              Email
            </th>
            {/* <th scope="col" className="px-3 py-3">
              Address
            </th> */}
            <th scope="col" className="px-3 py-3">
              Phone
            </th>
            {/* <th scope="col" className="px-3 py-3">
              Contact Number
            </th> */}

            {/* <th
              onClick={() => sorting("registerdate")}
              scope="col"
              className=""
            >
              <div className="flex flex-row space-x-2 justify-center">
                <div>Register Date</div>
                <div>
                  <BsArrowDownUp
                    className="text-black hover:text-gray-600"
                    size={15}
                  />
                </div>
              </div>
            </th> */}
            {/* <th
              onClick={() => sortingByNumber("packagename")}
              scope="col"
              className=""
            >
              <div className="flex flex-row space-x-2 justify-center">
                <div>Package Name</div>
                <div>
                  <BsArrowDownUp
                    className="text-black hover:text-gray-600"
                    size={15}
                  />
                </div>
              </div>
            </th> */}

            {/* <th scope="col" className="px-3 py-3">
              Due Amount
            </th>
            <th
              onClick={() => sorting("licenseexpirydate")}
              scope="col"
              className=""
            >
              <div className="flex flex-row space-x-2 justify-center">
                <div>Licence Expiry Date</div>
                <div>
                  <BsArrowDownUp
                    className="text-black hover:text-gray-600"
                    size={15}
                  />
                </div>
              </div>
            </th> */}
            <th scope="col" className="px-6 py-3">
              View More Details
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className=" text-gray-800 text-center ">
          {users.length > 0 ? (
            <>
              {data &&
                data
                  .filter((val) => {
                    if (searchterm === "") {
                      return val;
                    } else if (
                      val.firstName
                        .toLowerCase()
                        .includes(searchterm.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchterm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((val) => (
                    <tr
                      key={val.id}
                      className="border border-gray-300 bg-white hover:bg-[#F9F9FA] text-gray-700"
                    >
                      <td className="px-6 py-4 ">{val.id}</td>
                      {/* <td className="px-6 py-4 font-medium">
                        {val.company_Code}
                      </td> */}
                      <td className="px-6 py-4 ">
                        {val.firstName} {val.lastName}
                      </td>

                      <td className="px-6 py-4 ">{val.email}</td>

                      {/* <td className="px-6 py-4 ">{val.address}</td> */}
                      <td className="px-6 py-4 ">{val.phone}</td>
                      {/* <td className="px-6 py-4 font-medium">
                        {val.contact_number}
                      </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                        {val.register_date}
                      </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                        {val.package_name}
                      </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                        {val.due_amount}
                      </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                        {val.licence_expiry_date}
                      </td> */}
                      <td className="px-6 py-4 font-medium">
                        <button
                          type="button"
                          className="bg-gray-700 text-gray-100 py-2 px-3 rounded "
                          onClick={() => {
                            handleMoreDetailsBtn(val.id);
                          }}
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
            </>
          ) : (
            <>
              {data &&
                data
                  .filter((val) => {
                    if (searchterm === "") {
                      return val;
                    } else if (
                      val.firstName
                        .toLowerCase()
                        .includes(searchterm.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchterm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((val) => (
                    <tr
                      key={val.id}
                      className="border border-gray-300 bg-white hover:bg-[#F9F9FA] text-gray-700"
                    >
                      <td className="px-6 py-4 ">{val.id}</td>
                      {/* <td className="px-6 py-4 font-medium">
                      {val.company_Code}
                    </td> */}
                      <td className="px-6 py-4 ">
                        {val.firstName} {val.lastName}
                      </td>

                      <td className="px-6 py-4 ">{val.email}</td>

                      {/* <td className="px-6 py-4 ">{val.address}</td> */}
                      <td className="px-6 py-4 ">{val.phone}</td>
                      {/* <td className="px-6 py-4 font-medium">
                      {val.contact_number}
                    </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                      {val.register_date}
                    </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                      {val.package_name}
                    </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                      {val.due_amount}
                    </td> */}
                      {/* <td className="px-6 py-4 font-medium">
                      {val.licence_expiry_date}
                    </td> */}
                      <td className="px-6 py-4 font-medium">
                        <button
                          type="button"
                          className="bg-gray-700 text-gray-100 py-2 px-3 rounded "
                          onClick={() => {
                            handleMoreDetailsBtn(val.id);
                          }}
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
            </>
          )}
        </tbody>
      </table>

      {/* <TableFooter range={range} slice={slice} setPage={setPage} page={page} /> */}
      {searchterm === "" && users.length > 0 ? (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      ) : (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={
            data.filter((val) => {
              if (
                val.firstName
                  .toLowerCase()
                  .includes(searchterm.toLowerCase()) ||
                val.email.toLowerCase().includes(searchterm.toLowerCase())
              ) {
                return val;
              }
            }).length / usersPerPage
          }
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      )}
    </div>
  );
};

export default Tab;
