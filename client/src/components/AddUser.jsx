import axios from "axios";
import React, { useState } from "react";

function AddUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [img, setImg] = useState("");

  const handlePost = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      username: username,
      age: age,
      img: img,
    };

    axios
      .post("http://localhost:5000/createUser", data)
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        alert("Kullanıcı başarıyla eklendi. 👍");
        setName("");
        setUsername("");
        setAge("");
        setImg("");
      })
      .catch((error) => {
        console.log(error);
        alert("Kullanıcı eklerken bir hata oluştu. 🚫");
      });
    /*********************************************************************** */
    // let data = JSON.stringify({
    //   name: name,
    //   age: age,
    //   username: username,
    //   img: img,
    // });

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "http://localhost:5000/createUser",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /*********************************************************************** */
  };
  return (
    <div className="h-80 d-flex align-items-center justify-content-center my-3">
      <form className="shadow w-25 rounded p-3" onSubmit={handlePost}>
        <div className="form-group my-3">
          <label htmlFor="name">İsim</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="İsminizi giriniz."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Kullancı adınızı giriniz."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Yaş</label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Yaşınızı giriniz."
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="img">Foto Url</label>
          <input
            type="text"
            className="form-control"
            id="img"
            placeholder="img url"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success mb-3">
          Kullanıcı Ekle
        </button>
      </form>
    </div>
  );
}

export default AddUser;
