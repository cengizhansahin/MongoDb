import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function UserPage() {
  const [users, setUsers] = useState([]);
  const [newName, setName] = useState("");
  const [newUsername, setUsername] = useState("");
  const [newAge, setAge] = useState("");
  const [newImg, setImg] = useState("");

  const updateHandle = (id) => {
    const updatedData = {
      name: newName,
      username: newUsername,
      age: newAge,
      img: newImg,
    };

    // const updatedData = {};

    // if (newName) {
    //   updatedData.name = newName;
    // }
    // if (newUsername) {
    //   updatedData.username = newUsername;
    // }
    // if (newAge) {
    //   updatedData.age = newAge;
    // }
    // if (newImg) {
    //   updatedData.img = newImg;
    // }

    axios
      .put(`http://localhost:5000/updateUser/${id}`, updatedData)
      .then((res) => {
        console.log(res);
        alert("Kullanıcu güncellendi.");
      })
      .catch((err) => console.log(err));
  };

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
                <h5>Username: {user.username}</h5>
                <h5>Yaş: {user.age}</h5>
                <div>
                  <input
                    className="form-control my-1"
                    placeholder="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="form-control my-1"
                    placeholder="username"
                    type="text"
                    // value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="form-control my-1"
                    placeholder="age"
                    type="number"
                    // value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <input
                    className="form-control my-1"
                    placeholder="img"
                    type="text"
                    // value={img}
                    onChange={(e) => setImg(e.target.value)}
                  />
                  <button
                    className="btn btn-success mb-1"
                    onClick={() => updateHandle(user._id)}
                  >
                    GÜNCELLE
                  </button>
                </div>
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
