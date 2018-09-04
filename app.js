let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//required for passport
let ensure = require('connect-ensure-login');
let session = require('express-session');
let flash = require('connect-flash');

let passport = require('./app/config/passport');
let loginController = require('./app/controllers/login_controller');
let studentController = require('./app/controllers/student_controller');
let hal1Controller = require('./app/controllers/hal1_controller');
let hal2Controller = require('./app/controllers/hal2_controller');
let hal3Controller = require('./app/controllers/hal3_controller');

let memberController = require('./app/controllers/admin/member_controller');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({secret: 'ilovenodejs'}));
app.use(passport.init());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
  // passing status atau role, biar bisa dipanggil langsung di view tanpa passing data lewat controller
  if (req.user) {
    res.locals.role = req.user.status;
  }
  next();
});

app.get('/', ensure.ensureLoggedIn(), loginController.myIndex);
app.get('/login', loginController.login);
app.post('/login', passport.auth());


app.get('/data_student',ensure.ensureLoggedIn(), studentController.pageDataStudent);
app.get('/get-all-student', ensure.ensureLoggedIn(), studentController.getAllStudent);
app.post('/save_student',  ensure.ensureLoggedIn(), studentController.saveStudent);
app.post('/update_student',  ensure.ensureLoggedIn(), studentController.updateStudent);
app.get('/student_detail/:code',  ensure.ensureLoggedIn(), studentController.getStudent);
app.get('/delete_student/:code',  ensure.ensureLoggedIn(), studentController.deleteStudent);

app.get('/hal1', ensure.ensureLoggedIn(), hal1Controller.pageDataHal1);
app.get('/get-all-hal1', ensure.ensureLoggedIn(), hal1Controller.getAllHal1);

app.get('/hal2', ensure.ensureLoggedIn(), hal2Controller.pageDataHal2);
app.get('/get-all-hal2', ensure.ensureLoggedIn(), hal2Controller.getAllHal2);

app.get('/hal3', ensure.ensureLoggedIn(), hal3Controller.pageDataHal3);
app.get('/get-all-hal3', ensure.ensureLoggedIn(), hal3Controller.getAllHal3);

app.get('/admin', ensure.ensureLoggedIn(), memberController.pageDataMember);
app.get('/admin/member_crud', ensure.ensureLoggedIn(), memberController.pageDataMember);
app.get('/admin/member_crud/get-all-member', ensure.ensureLoggedIn(), memberController.getAllMember);
app.post('/admin/member_crud/save_member',  ensure.ensureLoggedIn(), memberController.saveMember);
app.post('/admin/member_crud/update_member',  ensure.ensureLoggedIn(), memberController.updateMember);
app.get('/admin/member_crud/detail_member/:id',  ensure.ensureLoggedIn(), memberController.getMember);
app.get('/admin/member_crud/delete_member/:id',  ensure.ensureLoggedIn(), memberController.deleteMember);

app.get('/logout', loginController.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
