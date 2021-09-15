import axios from 'axios';
import React, {  useState,useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import $ from 'jquery';
import _ from "lodash";
import logo from './logo192.png';

const EditUser = () => {
    let History = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        rollno: '',
        image:[]
    });
  
    const [image, setImage] = useState([]);
    const [oldimage, setOldImage] = useState([]);
    const { name, rollno, email } = user;
    
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
 
    const onChangeHandler=e=>{
        var num=e.target.id;
        let newArr = [...image]; 
        newArr[num] = e.target.files[0]; 
        setImage(newArr);

        var file=(e.target.files[0]);

        if(file)
        {
            var reader = new FileReader();
            reader.onload = function(){
                $('#show'+num).attr("src",reader.result).attr("width",'100px').attr("height",'100px');
            }
            reader.readAsDataURL(file); 
        }
    }

    useEffect(() => {
        loadUser();
    },[])

    const onsubmit = async e => {
        e.preventDefault();
        
        let data = new FormData();
        data.set('name',user.name);
        data.set('email',user.email);
        data.set('rollno',user.rollno);
        data.append('image1', image[0]);
        data.append('image2', image[1]);
        data.append('image3', image[2]);
        
        await axios.post(`/users/update-user/${id}/${oldimage[0]}/${oldimage[1]}/${oldimage[2]}`, data);
        History.push('/');
    }
    
    const loadUser = async () => {
        const result = await axios.get(`/users/edit-user/${id}`);
        setUser(result.data);
        setImage(result.data.image);
        setOldImage(result.data.image);
    }
    const addDefaultSrc=(ev)=> {
        ev.target.src = logo; 
    };
    return (
      <div className="container">
      <br /><br />
      <div className="card">
        <div className="card-header">Edit Details</div>
        <div className="card-body">
          <form onSubmit={e => onsubmit(e)}>
            <div className="form-group">
              <label for="name">Name :-</label>
              <input type="text" className="form-control" placeholder="Enter Name" value={name} name="name" onChange={e => onInputChange(e)} />
            </div>
            <div className="form-group">
              <label for="email">Email :- </label>
              <input type="email" className="form-control" placeholder="Enter Email" value={email} name="email" onChange={e => onInputChange(e)} />
            </div>
            <div className="form-group">
              <label for="Roll No">Roll Number :-</label>
              <input type="number" class="form-control" placeholder="Enter Roll Number" value={rollno} name="rollno" onChange={e => onInputChange(e)} />
            </div>
           
            {_.times(3, (i) => (
                <div className="form-group">
                    <label for="Roll No" id="img">Image {i +1 } :- &nbsp;</label>
                    <img src={"http://localhost:5000/images/"+ user.image[i]} height="100px" width="100px" id={"show"+ i} onError={addDefaultSrc}/>&nbsp; &nbsp;
                    <input type="file" name="image" onChange={onChangeHandler} id={i}/>
                </div>
            ))}
            <button type="submit" className="btn btn-warning ">Update</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
export default EditUser;


