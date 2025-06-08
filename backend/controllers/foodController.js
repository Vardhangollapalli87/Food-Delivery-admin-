import foodModel from '../models/foodModel.js';
import cloudinary from "../lib/cloudinary.js";


//add food item

const addFood = async (req,res) =>{


    try{

        const foodPic = req.body.image;


        if (!foodPic) {
            return res.json({success:false, message: "Food pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(foodPic);

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: uploadResponse.secure_url ,
        })

        await food.save();
        res.json({success:true,message: "Food Added"});
    }catch(e){
        console.log(e);
        res.json({success: false,message:"Error"});
    }

}

//all food list

const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


// remove food item
const removeFood = async(req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);

        // Extract public ID from the Cloudinary URL
        if (food && food.image) {
            // Example: https://res.cloudinary.com/your_cloud/image/upload/v1234567890/abc123.jpg
            const urlParts = food.image.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const publicId = fileName.split('.')[0]; // Remove extension

            // Remove from Cloudinary
            await cloudinary.uploader.destroy(publicId);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food Removed"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addFood,listFood,removeFood}