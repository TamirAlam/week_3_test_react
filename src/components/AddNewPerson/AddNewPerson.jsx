import React, { useState, useEffect, useRef } from "react";
import "../../componentsCSS/AddNewPerson/AddNewPerson.css";
import { MdDelete } from "react-icons/md";
function AddNewPerson() {
  const [newRow, setNewRow] = useState([]);
  const [userData, setUserData] = useState(null);
  const nameRef = useRef();
  const birthRef = useRef();
  const aadharRef = useRef();
  const mobileRef = useRef();
  const ageRef = useRef();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("user"));
    setUserData(localData);
  }, []);

  function AddRow() {
    const emptyRow = [
      { Name: "", Date_of_birth: "", Aadhar_Number: "", Mobile_Number: "" },
    ];
    setNewRow(emptyRow);
  }

  function calculateAge(e) {
    const datearr = e.target.value.split("-");
    ageRef.current.value = new Date().getFullYear() - datearr[0];
  }

  function saveData(e) {
    e.preventDefault();
    let newData = {
      Name: nameRef.current.value,
      Date_of_birth: birthRef.current.value,
      Aadhar_Number: aadharRef.current.value,
      Mobile_Number: mobileRef.current.value,
      Age: ageRef.current.value,
    };
    const sessionData = JSON.parse(localStorage.getItem("user"));
    if (sessionData === null) {
      localStorage.setItem("user", JSON.stringify([newData]));
    } else {
      const updateSessionData = [...sessionData, newData];

      localStorage.setItem("user", JSON.stringify(updateSessionData));
      setUserData(updateSessionData);
      setNewRow([]);
    }
  }

  function handleDelete(aadhar) {
    const allData = JSON.parse(localStorage.getItem("user"));
    const searchedResult = allData.filter(
      (item) => item.Aadhar_Number !== aadhar
    );
    localStorage.setItem("user", JSON.stringify(searchedResult));
    setUserData(searchedResult);
  }

  return (
    <div className="AddNewPerson">
      <div>
        <h4 className="page-title" style={{color:"#339966"}}>Add New Person</h4>
      </div>

      <table frame="box" rules="all">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData === null ? (
            <>{/* <th colSpan="6">No data</th> */}</>
          ) : (
            userData.map((item) => {
              return (
                <tr key={item.Aadhar_Number} style={{color:"#0fad5e"}}>
                  <td style={{color:"#0fad5e",fontWeight:"bold"}}>{item.Name}</td>
                  <td style={{color:"#0fad5e",fontWeight:"bold"}}>{item.Date_of_birth}</td>
                  <td style={{color:"#0fad5e",fontWeight:"bold"}}>{item.Aadhar_Number}</td>
                  <td style={{color:"#0fad5e",fontWeight:"bold"}}>{item.Mobile_Number}</td>
                  <td style={{color:"#0fad5e",fontWeight:"bold"}}>{item.Age}</td>
                  <td style={{color:"#0fad5e",fontWeight:"bold"}}>
                    <button
                      className="row-btns"
                      onClick={() => handleDelete(item.Aadhar_Number)}
                       style={{fontSize:"x-large"}}>
                     <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })
            // <hi>HI</hi>
          )}
        </tbody>
      </table>

      {newRow.length === 0
        ? ""
        : newRow.map((item, index) => {
            return (
              <div key={index} className="form-container">
                <h3 style={{ textAlign: "center" }}>
                  Fill below form for New Entry
                </h3>
                <form onSubmit={(e) => saveData(e)}>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="Name"
                    defaultValue={item.Name}
                    required
                    style={{color:"#11954c"}}
                  />
                  <input
                    onChange={(e) => calculateAge(e)}
                    defaultValue={item.Date_of_birth}
                    type="date"
                    ref={birthRef}
                    style={{color:"#11954c"}}
                    required

                  />
                  <input
                    defaultValue={item.Aadhar_Number}
                    type="number"
                    placeholder="Aadhar number"
                    min="100000000000"
                    max="999999999999"
                    ref={aadharRef}
                    style={{color:"#11954c"}}
                    required
                  />
                  <input
                    defaultValue={item.Mobile_Number}
                    type="number"
                    placeholder="Mobile number"
                    min="1000000000"
                    max="9999999999"
                    required
                    ref={mobileRef}
                    style={{color:"#339966"}}
                  />
                  <input
                    ref={ageRef}
                    placeholder="Age"
                    defaultValue={item.Age}
                    disabled={true}
                    style={{color:"#11954c"}}
                  />
                  <input type="submit" className="row-btns" value="Save" />
                </form>
              </div>
            );
          })}
      <button className="Add-btn" onClick={() => AddRow()} style={{fontWeight:"bold"}}>
        Add
      </button>
    </div>
  );
}

export default AddNewPerson;
