const Customer = require('../models/Customer');


const customerList = async(req,res) => {
    try {
        const customers = await Customer.find();
        const data = {
            title:'BVS - Customers',
            path: 'Customer', 
            customers,
            message:req.flash('message'), 
            error:req.flash('error'),
        }
        res.render('pages/customers', data)
    } catch (error) {
        console.error(error)
        req.flash('error', 'Something went wrong');
        res.redirect('/customers');
    }
}

const newCustomer = async(req,res) => {
    try {
        const {
            givenName,
            lastName,
            middleName,
            contactNum,
            occupation,
            dob,
            address
        } = req.body
        if(
            !givenName,
            !lastName,
            !middleName,
            !contactNum,
            !occupation,
            !dob,
            !address
        ){
            req.flash('error', 'Please fill in all fields');
            res.redirect('/customers');
        } else {
            const newCustomer = await Customer.create({
                givenName,
                lastName,
                middleName,
                contactNum,
                occupation,
                dob,
                address
            })
            req.flash('message', 'Customer added.')
            res.redirect('/customers');
        }
    } catch (error) {
        console.error(error)
        req.flash('error', 'Something went wrong');
        res.redirect('/customers');
    }
}

const updateCustomer = async(req,res)=> {
    try {
        const id = req.body.id;
        const customer = await Customer.findOne({_id:id});
        if(!customer) {
            req.flash('error', 'Customer not found');
            res.redirect('/customers');
            return;
        } else {
            for(const key of Object.keys(req.body)) {
                customer[key] = req.body[key]
            }
            await customer.save();
            req.flash('message', 'Customer was updated');
            res.redirect('/customers');
        }
    } catch (error) {
        console.error(error)
        req.flash('error', 'Something went wrong');
        res.redirect('/customers');
    }
}



module.exports = {
    customerList,
    updateCustomer,
    newCustomer
}