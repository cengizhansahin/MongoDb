import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function UserPage() {
  const [users, setUsers] = useState([]);
  const deleteHandle = (id) => {
    Swal.fire({
      title: "Emin misin?",
      text: "Bakın bu geri alınamaz ha!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/deleteUser/${id}`);
        Swal.fire("Silindi!", "Kullanıcı silindi.", "success");
      }
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          {users.map((user) => (
            <div
              className="card col-lg-3 col-md-4 col-sm-12 my-3 mx-3"
              key={user._id}
              style={{ width: "18rem" }}
            >
              <img src={user.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">İsim: {user.name}</h5>
                <h5>Yaş: {user.age}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandle(user._id)}
                >
                  SİL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
