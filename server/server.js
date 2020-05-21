const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/config").get(process.env.NODE_ENV);
const mongoose = require("mongoose");

const crypto = require("crypto");

const fs = require("fs-extra");

const cors = require("cors");

const multer = require("multer");

const imagesMimeTypes = ["image/jpeg", "image/png", "image/gif"];

//INIT MULTER

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    callBack(null, date + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter: fileFilter,
});

const app = express();

app.use(cors({ origin: "*" }));

mongoose.connect(config.DATABASE);

//IMPORTING SCHEMAS
const { auth } = require("./middleware/auth");
const { User } = require("./models/user");
const { Annonce } = require("./models/annonce");
const { Marque } = require("./models/marques");
const { Message } = require("./models/message");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

////////////////////GET////////////////////

app.get("/", (req, res) => {
  res.json({
    success: 'ti barra nayek '
  });
});

app.get("/api/auth", auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
  });
});

app.get("/api/getAnnonce", (req, res) => {
  let id = req.query.id;

  Annonce.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

app.post("/api/getAnnonces", (req, res) => {
  let order = req.query.order;
  let filtre = req.body;

  Annonce.find(filtre)
    .sort({ _id: order })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

app.get("/api/logout", auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

app.get("/api/getUser", (req, res) => {
  let id = req.query.id;

  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      name: doc.name,
      lastName: doc.lastName,
    });
  });
});

app.get("/api/getUsers", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

app.get("/api/getMarques", (req, res) => {
  Marque.find({}, (err, marques) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(marques);
  });
});

////////////////////POST////////////////////

app.post("/api/annonce", upload.array("images"), (req, res, next) => {
  const images = req.files;
  const annonce = new Annonce(req.body);

  if (!images) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }

  images.map((image) => {
    annonce.images.push(image.path);
  });

  annonce.save().then((result) => {
    res.status(200).json({
      post: true,
    });
  });
});

app.post("/api/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err: err });
    res.status(200).json({
      success: true,
      user: doc,
    });
  });
});

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "Wrong password",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email,
        });
      });
    });
  });
});

app.post("/api/marques", (req, res) => {
  const marque = new Marque(req.body);

  marque.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      marqueId: doc._id,
    });
  });
});

app.post("/api/message", (req, res) => {
  const message = new Message(req.body);

  message.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      messageId: doc._id,
    });
  });
});

////////////////////UPDATE////////////////////

app.post("/api/annonceUpdate", (req, res) => {
  Annonce.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        success: true,
        doc,
      });
    }
  );
});

app.post("/api/marqueUpdate", (req, res) => {
  Marque.findByIdAndUpdate(
    req.body._id,
    { $push: { models: req.body.model } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        success: true,
        doc,
      });
    }
  );
});

app.post("/api/suppModele", (req, res) => {
  let id = req.body.id;
  let modelToDelete = req.body.models;

  Marque.findByIdAndUpdate(
    id,
    { $pullAll: { models: modelToDelete } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        success: true,
        doc,
      });
    }
  );
});

////////////////////DELETE////////////////////

app.delete("/api/deleteAnnonce", (req, res) => {
  let id = req.body.id;
  let images = [];
  Annonce.findById(id).then((doc) => {
    if (!doc) return res.status(404).end();
    images = doc.images;
  });

  Annonce.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    images.map((path) => {
      fs.remove(path, (err) => {
        if (err) return console.error(err);
      });
    });
    res.json({
      success: true,
    });
  });
});

app.delete("/api/deleteMarque", (req, res) => {
  let id = req.body.id;

  Marque.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({ success: true });
  });
});


app.delete("/api/deleteUser", (req, res) => {
  let id = req.body.id;

  User.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({ success: true });
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server Running");
});
