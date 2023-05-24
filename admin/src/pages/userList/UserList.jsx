
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { userRows } from "../../dummyData";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { userRequest } from "../../requestMethods";
import { deleteUser } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

    return (
      <div className="widgetSm">
        <span className="widgetSmTitle">Members</span>
        <ul className="widgetSmList">
          {users.map((user) => (
            <li className="widgetSmListItem" key={user._id}>
              <img
                src={
                  user.img ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.email}</span>
              </div>
              {/* <button className="widgetSmButton"> */}
                {/* <Visibility className="widgetSmIcon" /> */}
                {/* Display */}
              {/* </button> */}
              {/* <Link to={"/user/" + user.username}>
              <button className="userListEdit">Edit</button>
            </Link> */}
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(user._id)}
            />
            </li>
          ))}
        </ul>
      </div>
    );
  }

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "user",
//       headerName: "User",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="userListUser">
//             <img className="userListImg" src={params.row.avatar} alt="" />
//             {params.row.username}
//           </div>
//         );
//       },
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       width: 200,
//       renderCell: (params) => {
//         <div className="userListUser">
//           <img className="userListImg" src={params.row.avatar} alt="" />
//           {params.row.username}
//         </div>;
//       },
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 120,
//     },
//     {
//       field: "transaction",
//       headerName: "Transaction Volume",
//       width: 160,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={"/user/" + params.row.username}>
//               <button className="userListEdit">Edit</button>
//             </Link>
//             <DeleteOutline
//               className="userListDelete"
//               onClick={() => handleDelete(params.row.id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="userList">
//       <DataGrid
//         rows={data}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={20}
//         checkboxSelection
//       />
//     </div>
//   );
// }

