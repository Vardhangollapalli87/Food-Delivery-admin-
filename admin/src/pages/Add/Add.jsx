import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import {toast} from 'react-toastify';

const Add = () => {


  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:'',
    description:'',
    price:'',
    category:"Salad",
  })

  const onChangeHandler = (event)=>{
    setData(data=>({...data,[event.target.name]:event.target.value}))
  }

  
  const onSubmitHandler = async(event)=>{
  

    event.preventDefault();


    if(image){
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = async ()=>{
        const base64Image = reader.result;

        const sendData = {
          name:data.name,
          description:data.description,
          price:Number(data.price),
          category:data.category,
          image:base64Image,
        }        

        const response = await axios.post(`/api/food/add`,sendData);

        if(response.data.success){
          setData({
            name:'',
            description:'',
            price:'',
            category:"Salad",
          });
          setImage(false);
          toast.success("FoodItem Added !")
        }
        else{
          toast.error("Failed !");
        }
      }
    } else {
      toast.error("Please add the foodPic");
    }
  
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={e=>onSubmitHandler(e)}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt='upload image' />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required/>
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write Content here' required/>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' required/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
