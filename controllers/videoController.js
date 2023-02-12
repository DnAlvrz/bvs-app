const Video = require('../models/Video');

const videoList = async(req, res)=> {
    try {
        const videos = await Video.find();
        const data = {
            title:'BVS - Videos',
            path: 'video', 
            videos,
            message:req.flash('message'), 
            error:req.flash('error'),
        }
        res.render('pages/videos', data)
    } catch (error) {
        console.error(error)
        req.flash('error', 'something went wrong');
        res.redirect('/videos');
    }
}

const newVideo = async(req,res) => {
    try {
        const {
            title,
            category,
            description,
            rentDays,
            copies
        } = req.body
        if(
            !title,
            !category,
            !description,
            !rentDays,
            !copies
        ){
            req.flash('error', 'Error! Please fill in all fields');
            res.redirect('/customers');
        } else {
            let price;
            if(category === 'DVD') {
                price = 50;
            } else {
                price = 25;
            }
            const newVideo = await Video.create({
                title,
                category,
                description,
                rentDays,
                copies,
                price
            });

            req.flash('message', 'New video added.')
            res.redirect('/videos');
        }
    } catch (error) {
        console.error(error)
        req.flash('error', 'something went wrong');
        res.redirect('/videos');
    }
}
const updateVideo = async(req,res) => {
    try {
        const id = req.body.id;
        const video = await Video.findOne({_id:id});
        if(!video) {
            req.flash('error', 'Error! Video not found');
            res.redirect('/videos');
            return;
        } else {
            for(const key of Object.keys(req.body)) {
                video[key] = req.body[key]
            }
            if(req.body.category === 'DVD'){
                price = 50;
            } else {
                price = 25;
            }
            video.price = price;
            await video.save();
            req.flash('message', 'Success! Video was updated');
            res.redirect('/videos');
        }
    } catch (error) {
        console.error(error)
        req.flash('error', 'Error! Something went wrong');
        res.redirect('/videos');
    }
}

const deleteVideo = async(req,res) => {
    try {
        const id = req.body.id
        const video = await Video.findOne({_id:id});
        await video.remove();
        req.flash("message", "Video has been deleted")
        res.redirect('/videos');
    } catch (error) {
        console.error(error)
        req.flash('error', 'something went wrong');
        res.redirect('/videos');
    }
}

module.exports = {
    videoList,
    newVideo,
    updateVideo,
    deleteVideo
}