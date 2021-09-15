import axios from 'axios';
import React, { useState,useEffect} from 'react';
import {useParams } from 'react-router-dom';
import logo from './logo192.png';

const Profile = () => {
    const { id } = useParams();

    const [user, setUser] = useState({
        name:"",
        rollno:"",
        email:"",
        image:[]
     
    });
    useEffect(() => {
        loadUser();
    },[])
    const loadUser = async () => {
        const result = await axios.get(`/users/edit-user/${id}`);
        setUser(result.data);
    }
    const addDefaultSrc=(ev)=> {
        ev.target.src = logo; 
      };
    return (
        <div className="container w-25 p-3 mt-5">
        <div className="card">
            <div className="card-header">Details</div>
                <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item"><b>Name</b> :- {user.name}</li>
                    <li className="list-group-item"><b>Roll no</b> :- {user.rollno}</li>
                    <li className="list-group-item"><b>Email</b> :- {user.email}</li>
                   { user.image.map((image, index) => (
                    <li className="list-group-item"><b>Image {index +1 }</b> :-
                        <img src={"http://localhost:5000/images/"+ user.image[index]} height="50px" width="50px" onError={addDefaultSrc}/>
                    </li>

                   ))}
                   
                </ul>
            </div>
            <div className="card-footer">By Dhiraj</div>
            </div>
        </div>
    )
}
export default Profile;