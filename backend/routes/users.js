express = require('express'),
router = express.Router();
const multer = require('multer');
const fs = require('fs');
let User = require('../models/User');

const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
      callback(null, './public/images');
    },
  
    //add back the extension
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });

// CREATE User
router.route('/create-user').post(async(req, res, next) => {
		
	let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3}, }).array('image');
	upload(req, res, async function(err) {
			
		const { name,email,rollno } = req.body;
		var image = []; 

		for(var x = 0; x<req.files.length; x++) {
			image.push(req.files[x].filename)
		  }

		const Data = await User.create({
			name,
			email,
			rollno,
			image
		})

		if(!Data) {
			return next(error)
		} else {
			console.log(Data)
			res.json(Data)
		}
	});
})

// READ Users
router.route('/').get(async(req, res) => {
		try {
			const Data = await User.find({});
			res.status(200).send(Data);
		} catch(error) {
			res.status(500).send(error);
		}
})

// Get Single User
router.route('/edit-user/:id').get(async(req, res) => {
	try {
		const data = await User.findById(req.params.id);
		if(!data) {
			return res.status(404);
		}
		res.status(200).send(data);
	} catch(error) {
		res.status(500).send(error);
	}
})

// Update User
router.route('/update-user/:id/:img1/:img2/:img3').post(async(req, res, next) => {
	let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3}, }).fields(
        [
            {
                name:'image1',maxCount:1
            },
            {
                name: 'image2', maxCount:1
            },
            {
                name: 'image3', maxCount:1
            }
        ]
    );

	var image = [req.params.img1,req.params.img2,req.params.img3]; 
	
	upload(req, res,async function(err) {
		const { name,email,rollno } = req.body;

		if(req.files.image1) {
			image[0]=req.files.image1[0].filename;
			if (fs.existsSync(`public/images/${req.params.img1}`)) {
				fs.unlinkSync(`public/images/${req.params.img1}`);
			}
		}
		if(req.files.image2) {
			image[1]=req.files.image2[0].filename;
			if (fs.existsSync(`public/images/${req.params.img2}`)) {
				fs.unlinkSync(`public/images/${req.params.img2}`);
			}
		}
		if(req.files.image3) {
			image[2]=req.files.image3[0].filename;
			if (fs.existsSync(`public/images/${req.params.img3}`)) {
				fs.unlinkSync(`public/images/${req.params.img3}`);
			}
		}

		try {
			await User.updateOne({_id:req.params.id},{
				name:name,
				email:email,
				rollno:rollno,
				image:image
				},function (err, data) {
					if (err) {
						res.send("err"+err);
					} else {
						res.status(200).send(data);
					}
			});
		}catch(error) {
			res.status(500).send(error);
		}
			
	});	
})

// Delete User
router.route('/delete-user/:id/:img1/:img2/:img3').delete(async(req, res, next) => {
	try {

		const data = await User.findByIdAndDelete(req.params.id);
		if(!data) {
			return res.status(404).send();
		}
		if (fs.existsSync(`public/images/${req.params.img1}`)) {
			fs.unlinkSync(`public/images/${req.params.img1}`);
		}
		if (fs.existsSync(`public/images/${req.params.img2}`)) {

		fs.unlinkSync(`public/images/${req.params.img2}`);
		}
		if (fs.existsSync(`public/images/${req.params.img3}`)) {
			fs.unlinkSync(`public/images/${req.params.img3}`);
		}
		res.send(data);
	} catch(error) {
		res.status(500).send(error);
	}
	console.log(req.params.id);
})

module.exports = router;