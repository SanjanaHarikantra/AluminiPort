import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserList from "../Components/UserList";
import SearchUsers from "../Components/SearchUsers";

function Home() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/users`;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchData, setSearchData] = useState({
    searchType: "fullName",
    searchInput: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(baseUrl);
        setUsers(response.data);

        if (response.data.length === 0) {
          Swal.fire({
            title: "No users found",
            text: "Do you want to add a new user?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Add User",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/add-user");
            }
          });
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleSearch = async (data) => {
    try {
      const response = await axios.get(`${baseUrl}/search`, { params: data });
      if (response.data.length === 0) {
        setError("No users found.");
        setUsers([]);
      } else {
        setUsers(response.data);
        setError("");
      }
      setSearchData(data);
    } catch (err) {
      console.error("Error searching users:", err);
      setError("Search failed.");
    }
  };

  return (
    <section>
      <div className="container text-center">
        <h2 className="text-dark pt-5">All Alumni Users</h2>
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            {error && <div className="alert alert-danger">{error}</div>}
            <SearchUsers searchData={searchData} onSearch={handleSearch} />
            <UserList currentUsers={currentUsers} />
          </div>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Home;
