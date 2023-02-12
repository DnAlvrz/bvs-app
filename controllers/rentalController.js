const Rental = require('../models/Rental');
const Customer = require('../models/Customer');
const Video = require('../models/Video');

const rentalList = async(req,res) => {
    try {
        const rentals = await Rental.find({status:'Out'}).populate('customer').populate('video');
        const customers = await Customer.find().sort();
        const videos = await Video.find().sort();
        const data = {
            title:'BVS - Rentals',
            path: 'rentals', 
            rentals,
            customers,
            videos,
            message:req.flash('message'), 
            error:req.flash('error'),
        }
        res.render('pages/rental', data)
    } catch (error) {
        console.error(error)
        req.flash('error', 'Something went wrong');
        res.redirect('/rentals');
    }
}

const newRental = async(req,res) => {
    try {
        const {
            customerId,
            videoId
        } = req.body
        const customer = await Customer.findOne({_id:customerId});
        const video = await Video.findOne({_id:videoId});
        // TODO: check number of available copies, Customers cannot match rent if all copies are out
        if( !customer || !video){
            req.flash('error', 'Please fill in all fields');
            res.redirect('/rentals');
        } else {
            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            var date = new Date();
            console.log(date.addDays(video.rentDays));
            const dueDate = date.addDays(video.rentDays);
            const newRental = await Rental.create({
                customer: customer._id,
                video:video._id,
                total:video.price,
                dueDate
            })
            req.flash('message', 'Rental added.')
            res.redirect('/rentals');
        }
    } catch (error) {
        console.error(error)
        req.flash('error', 'Something went wrong');
        res.redirect('/rentals');
    }
}

const updateRental = async(req,res)=> {
    try {
        const id = req.body.id;
        const rental = await Rental.findOne({_id:id});
        if(!rental) {
            req.flash('error', 'Rental not found');
            res.redirect('/rental');
            return;
        } else {
            rental.status = 'Returned';
            await rental.save();
            req.flash('message', 'Video was returned');
            res.redirect('/rentals');
        }
    } catch (error) {
        console.error(error)
        req.flash('error', 'Error! Something went wrong');
        res.redirect('/rentals');
    }
}


module.exports = {
    rentalList,
    updateRental,
    newRental
}