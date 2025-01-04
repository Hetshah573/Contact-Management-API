const express=require("express");

const router=express.Router();
const {getContact,createContact,getContacts,deleteContact,updateContact}=require('../controllers/contactController');
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);//validateToken here is thus applied for all routes below
// router.route('/').get(getContacts);
// router.route('/').post(createContact);
router.route('/').get(getContacts).post(createContact);
// router.route('/:id').get(getContact);
// router.route('/:id').delete(deleteContact);
// router.route('/:id').put(updateContact);
router.route('/:id').get(getContact).delete(deleteContact).put(updateContact);

module.exports=router;

