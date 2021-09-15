import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from './logo192.png';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [users, setUser] = useState([]);
    let History = useHistory();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get('/users');
        setUser(result.data.reverse());
    }
    const deleteUser = async (id,img1,img2,img3) => {
        await axios.delete(`/users/delete-user/${id}/${img1}/${img2}/${img3}`);
        loadUsers();
    }
    const addDefaultSrc=(ev)=> {
        ev.target.src = logo; 
    };
    return (

        <div className="container">
            <br />
            <h1>Student List</h1>
            <br />
            <table class="responsive-table">

                <thead>
                    <tr>
                        <th scope="col">Sr.no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Roll No</th>
                        <th scope="col">Image1</th>
                        <th scope="col">Image2</th>
                        <th scope="col">Image3</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.rollno}</td>
                                <td><img src={"http://localhost:5000/images/"+ user.image[0]} height="50px" width="50px"  onError={addDefaultSrc}/></td>
                                <td><img src={"http://localhost:5000/images/"+ user.image[1]} height="50px" width="50px"  onError={addDefaultSrc}/></td>
                                <td><img src={"http://localhost:5000/images/"+ user.image[2]} height="50px" width="50px"  onError={addDefaultSrc}/></td>
                                
                                <td>
                                    <Link className="btn btn-outline-warning mr-2" to={`/student-view/${user._id}`}><i className="fa fa-eye"></i></Link>
                                    <Link className="btn btn-outline-primary mr-2" to={`/edit-user/${user._id}`}><i className="fa fa-edit"></i></Link>
                                    <Link class="btn btn-outline-danger mr-2" onClick={() => deleteUser(user._id,user.image[0],user.image[1],user.image[2])}><i className="fa fa-trash-o"></i></Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
              

            </table>
        </div>
    )
}
export default Home;