const asyncHandler=require('express-async-handler');//To handle the errors by avoiding the try catch blcok writing

const Contact=require("../models/contactmodel");


// @desc Get all contacts
// @routes GET /api/contacts
// @access private
const getContacts= asyncHandler(async (req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

// @desc Create New contact
// @routes POST /api/contacts
// @access private
const createContact=asyncHandler( async (req,res)=>{
    // console.log(req.body); this will give error if middleware express.json is not included as it wont be able to parse the stream of data
    console.log(req.body);
    // Error handling for improper input
    const {name,email,phone}=req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact=await Contact.create({
        name,email,phone,
        user_id:req.user.id,
    });
    res.status(201).json(contact);
});

// @desc Get contact
// @routes GET /api/contacts/:id
// @access private
const getContact= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Error: Contact not Found");
    }
    // Authorization
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to access other user contact");
    }
    res.status(200).json(contact);
});

// @desc Delete contact
// @routes DELETE /api/contacts/:id
// @access private
const deleteContact=asyncHandler( async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    // Authorization
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const deletedContact=await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedContact);
});

// @desc Update contact
// @routes PUT /api/contacts/:id
// @access private
const updateContact=asyncHandler( async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    // Authorization
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )

    res.status(200).json(updatedContact);
});

module.exports={getContacts,createContact,getContact,deleteContact,updateContact};

