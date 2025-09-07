const express = require('express')
const AdminController = require('../controller/Admin/AdminController')
const checkAuth = require('../middleware/auth')
const contactController = require('../controller/Contact/ContactController')
const TechnologyController = require('../controller/Technology/TechnologyController')
const EventController = require('../controller/Event/EventController')
const TeamController = require('../controller/Team/TeamController')
const PlacementController = require('../controller/Placement/PlacementController')
const PorfolioController = require('../controller/Portfolio/PortfolioController')
const silderController = require('../controller/slider/sliderController')
const courseController = require('../controller/Course/courseController')
const CourseBookController = require('../controller/Course/BookingController')
const WorkshopController = require('../controller/Workshop/workshopController')
const route = express.Router()


//////////////////  Admin  /////////////////// 
route.post('/register', AdminController.CreateRegistration)
route.post('/login', AdminController.verifyLogin)
route.get('/admin/dashboard',checkAuth, AdminController.dashboard)
route.get('/getuser', checkAuth, AdminController.getUsers)
route.post('/admin/logout', checkAuth, AdminController.logout)
//profile
route.post('/changepassword', checkAuth, AdminController.changePassword)
route.post('/profileupdate', checkAuth, AdminController.Updateprofile)
route.post('/forget-password',AdminController.forgotPassword)
//////////////////  Admin  /////////////////// 


//////////////////  Contact  ///////////////////
route.post('/contactInsert', contactController.createContact)
route.get('/contactdisplay', contactController.contactDisplay)
route.delete('/deleteContact/:id', contactController.deleteContact)
//////////////////  Contact  ///////////////////


//////////////////  Technology  ///////////////////
route.post('/technologyInsert', TechnologyController.createTechnology)
route.get('/technologydisplay', TechnologyController.technologyDisplay)
route.get('/technologyview/:id', TechnologyController.technologyView)
route.put('/technologyupdate/:id', TechnologyController.technologyEdit)
route.delete('/technologydelete/:id', TechnologyController.technologyDelete)
//////////////////  Technology  ///////////////////


//////////////////  Event  ///////////////////
route.post('/eventInsert', EventController.createEvent)
route.get('/eventdisplay', EventController.eventDisplay)
route.get('/eventview/:id', EventController.eventView)
route.put('/eventupdate/:id', EventController.eventEdit)
route.delete('/eventdelete/:id', EventController.eventDelete)
//////////////////  Event  ///////////////////


///////////////////  Course  /////////////////////
route.post('/courseInsert', courseController.AddCourse)
route.get('/coursedisplay', courseController.courseDisplay)
route.get('/courseview/:id', courseController.courseView)
route.put('/courseupdate/:id', courseController.courseEdit)
route.delete('/coursedelete/:id', courseController.courseDelete)
///////////////////  Course  /////////////////////


///////////////////  CourseBook  /////////////////////
route.post('/courseBookInsert', CourseBookController.CourseBookingInsert)
route.get('/courseBookdisplay', CourseBookController.CourseBookDisplay)
route.delete('/courseBookdelete/:id', CourseBookController.CourseBookDelete)
///////////////////  CourseBook  /////////////////////


//////////////////  Team  ///////////////////
route.post('/teamInsert', TeamController.createTeam)
route.get('/teamdisplay', TeamController.teamDisplay)
route.get('/teamview/:id', TeamController.teamView)
route.put('/teamupdate/:id', TeamController.teamEdit)
route.delete('/teamdelete/:id', TeamController.teamDelete)
//////////////////  Team  ///////////////////


//////////////////  Placement  ///////////////////
route.post('/placementInsert', PlacementController.createPlacement)
route.get('/placementdisplay', PlacementController.placeDisplay)
route.get('/placementview/:id', PlacementController.placeView)
route.put('/placementupdate/:id', PlacementController.placeEdit)
route.delete('/placementdelete/:id', PlacementController.placeDelete)
//////////////////  Placement  ///////////////////


/////////////////   WorkShop  ////////////////////
route.post("/college", WorkshopController.createCollege); // One time insert
route.get("/collegedisplay", WorkshopController.getAllColleges)
// Update by slug
route.post("/upload/:slug", WorkshopController.uploadImage); // Upload by slug
route.delete("/imagedelete/:slug", WorkshopController.deleteImage);
route.put("/college/:slug", WorkshopController.updateCollege);
route.get("/collegeview/:slug", WorkshopController.getBySlug); // Get data by slug
route.delete("/college/:slug", WorkshopController.deleteCollege);// Delete by slug
/////////////////   WorkShop  ////////////////////


//////////////////  Portfolio  ///////////////////
route.post('/portfolioInsert', PorfolioController.createPortfolio)
route.get('/portfoliodisplay', PorfolioController.portDisplay)
route.get('/portfolioview/:id', PorfolioController.portView)
route.put('/portfolioupdate/:id', PorfolioController.portEdit)
route.delete('/portfoliodelete/:id', PorfolioController.portDelete)
//////////////////  Portfolio  ///////////////////




///////////////////  Slider  /////////////////////
route.post('/sliderInsert', silderController.createSlide)
route.get('/sliderdisplay', silderController.silderDisplay)
route.get('/sliderview/:id', silderController.Sliderview)
route.put('/sliderupdate/:id', silderController.sliderUpdate)
route.delete('/sliderdelete/:id', silderController.sliderDelete)
///////////////////  Slider  /////////////////////


module.exports = route