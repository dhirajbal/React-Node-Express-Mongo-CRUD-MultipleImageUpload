import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddUser = () => {
	let History = useHistory();
	const [user, setUser] = useState({
		name: '',
		email: '',
		rollno: '',
	});
	const [image, setImage] = useState(null);

	const { name, rollno, email } = user;

	const onInputChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
		console.log(user);

	}

  	const onChangeHandler=e=>{
		let files=e.target.files
		if (files.length > 3) { 
			const msg = 'Only 3 images can be uploaded at a time'
			e.target.value = null // discard selected file
			console.log(msg)
		return false;
		}

    	setImage(e.target.files);
	}
	const onsubmit = async (e) => {
		e.preventDefault();
		let data = new FormData();
		
		data.set('name',user.name);
		data.set('email',user.email);
		data.set('rollno',user.rollno);
		for(var x = 0; x<image.length; x++) {
			data.append('image', image[x])
		}
		
		await axios.post('/users/create-user', data);
		History.push('/');
	}
  return (
	<div className="container">
		<br /><br />
		<div className="card">
			<div className="card-header">Add Details</div>
			<div className="card-body">
			<form onSubmit={e => onsubmit(e)} enctype="multipart/form-data" id="formElem">
				<div className="form-group">
				<label for="name">Name :-</label>
				<input type="text" className="form-control" placeholder="Enter Name" value={name} id="name" name="name" onChange={e => onInputChange(e)} />
				</div>
				<div className="form-group">
				<label for="email">Email :- </label>
				<input type="email" className="form-control" placeholder="Enter Email" value={email} name="email" onChange={e => onInputChange(e)} />
				</div>
				<div className="form-group">
				<label for="Roll No">Roll Number :-</label>
				<input type="number" class="form-control" placeholder="Enter Roll Number" value={rollno} name="rollno" onChange={e => onInputChange(e)} />
				</div>
				<div className="form-group form-check">
				<label className="form-check-label">Image</label>
				<input type="file" name="image" multiple onChange={onChangeHandler}/>
				
				<p>Maximum 3 files can be Uploaded</p>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
			</div>
		</div>
	</div>
  )
}
export default AddUser;

