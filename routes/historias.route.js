


module.exports = app => {

  const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
  const historia = require("../controller/historias.controller.js");

  // Create a new User
  app.post("/historia", upload.single('productImage') , historia.create);

  // Retrieve all Users
  app.get("/historia", historia.findAll);

  // Retrieve a single User with UserId
  app.get("/historia/:historiaId", historia.findOne);

  // Update a Customer with UserId
  app.put("/historia/:historiaId", historia.update);

  // Delete a Customer with UserId
  app.delete("/historia/:historiaId", historia.delete);

  // Delete all
  app.delete("/historia", historia.deleteAll);
};