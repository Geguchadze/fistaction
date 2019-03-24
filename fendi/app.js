const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      helmet         = require("helmet"),
      flash          = require("connect-flash"),
      session        = require("express-session"),
      moment         = require("moment"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      User           = require("./models/user");
      seedDB         = require("./seed");

// requiring routes     
const indexRoute      = require("./routes/index"),
      campgroundRoute = require("./routes/campgrounds"),
      commentRoute    = require("./routes/comments"),
      userRoute       = require("./routes/user"),
      passwordRoute   = require("./routes/password");

// connect to the DB
let url = process.env.DATABASEURL || "mongodb://huevos:123123a@ds119449.mlab.com:19449/yelpcamp"; // fallback in case global var not working
mongoose.connect(url, {useMongoClient: true});
//app.use(cors());

app.set("view engine", "ejs");
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = moment; // create local variable available for the application
    seedDB(); //seed the database
//passport configuration
app.use(session({
  secret: "aberalsinepvto",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let sendAlert=()=>{
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACa41535c5a5d12d68295807683097d619';
const authToken = '9c59e19fdc7c37df2d410d99d8dc4a3d';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Threat of sexual violence in progress',
     from: '+19179708513',
     to: '+16462877624'
   })
  .then(message => console.log(message.sid));


}
// pass currentUser to all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // req.user is an authenticated user
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// use routes
app.use("/", indexRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use("/users", userRoute);
app.use("/", passwordRoute);
app.get("/map", function (req, res) {
  res.render("maps");
})
app.get("/security", function (req, res) {
  res.render("security");
})

app.get("/surveillance", function (req, res) {
  res.render("surveillance");
})

app.get("/blindAccessibility", function (req, res) {
  res.render("blindAccessibility");
})

app.get("/harassmentPrevention", function (req, res) {
  res.render("harassmentPrevention");
})

app.get("/virtualReality", function (req, res) {
  res.render("virtualReality");
})

// app.post('/harassmentPrevention', (req,res) => {
//   var URL = req.query.URL;
//   res.header('Content-Disposition', 'attachment; filename="video.mp4"');
//   ytdl(URL, {
//     format: 'mp4'
//   }).pipe(res);
// });
app.post("/harassmentPrevention",(req,res)=>{
  if(req.body){
    console.log(req.body)
  //sendAlert();
}
})
app.listen(3000, process.env.IP, () => console.log("The FistAction Server Has Started!"));
