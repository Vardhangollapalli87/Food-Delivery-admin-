import orderModel  from "../models/orderModel.js";

// listing orders for admin panel

const listOrders = async  (req,res)=>{
    try {
        
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// api for updating order status

const updateStatus = async (req,res)=>{
    try {
        
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {listOrders,updateStatus}