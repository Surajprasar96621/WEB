import { useReducer, useState } from "react";
import "./App.css";
import { UserRow } from "./Component/UserRow";

const initialState = {
  name: "",
  gender: "Male",
  role: "FrontEnd Developer",
  maritalStatus: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
    case "gender":
    case "role":
    case "maritalStatus":
      return { ...state, [action.type]: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const payload = type === "checkbox" ? checked : value;
    dispatch({ type: name, payload });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData((prevData) => [...prevData, state]);
    dispatch({ type: "reset" });
  };

  return (
    <div className="App">
      <div>
        <h1>User Form</h1>
        <h3>useReducer</h3>
        <div className="form-wrapper" data-testid="form-wrapper">
          <form data-testid="form-element" onSubmit={handleSubmit}>
            <div className="name-wrapper" data-testid="name-wrapper">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div className="gender-wrapper" data-testid="gender-wrapper">
              <label>Gender</label>
              <select
                name="gender"
                value={state.gender}
                onChange={handleChange}
                data-testid="gender-select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </div>
            <div className="role-wrapper" data-testid="role-wrapper">
              <label>Role</label>
              <select
                name="role"
                value={state.role}
                onChange={handleChange}
                data-testid="role-select"
              >
                <option value="FrontEnd Developer">FrontEnd Developer</option>
                <option value="BackEnd Developer">BackEnd Developer</option>
                <option value="FullStack Developer">FullStack Developer</option>
              </select>
            </div>
            <div
              className="marital-status-wrapper"
              data-testid="marital-status-wrapper"
            >
              <legend>Martial Status</legend>
              <div>
                <input
                  type="checkbox"
                  name="maritalStatus"
                  checked={state.maritalStatus}
                  onChange={handleChange}
                />
                <label>Married</label>
              </div>
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>

        {submittedData.length ? (
          <table data-testid="user-container">
            <thead>
              <tr>
                <th>S.no</th>
                <th>User</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Marital Status</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((userData, index) => (
                <UserRow
                  key={index}
                  name={userData.name}
                  gender={userData.gender}
                  role={userData.role}
                  maritalStatus={userData.maritalStatus ? "Married" : "Unmarried"}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <h2 data-testid="no-user-container">No users found</h2>
        )}
      </div>
    </div>
  );
}

export default App;
