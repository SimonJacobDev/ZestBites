import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }

  const handleQty = (e) => {
    setQty(e.target.value);
  }

  const handleOptions = (e) => {
    setSize(e.target.value);
  }

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
        return;
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        return;
      }
      return;
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
  }

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div 
        className="card mt-3" 
        style={{ 
          width: "16rem", 
          maxHeight: "380px", 
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out" 
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "none"}
      >
        <img 
          src={props.ImgSrc} 
          className="card-img-top" 
          alt="..." 
          style={{ 
            height: "200px", 
            objectFit: "cover",
            borderTopLeftRadius: "0.25rem", 
            borderTopRightRadius: "0.25rem" 
          }} 
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select 
              className="m-2 h-100 w-20 bg-success text-white rounded" 
              style={{ border: "none", transition: "background-color 0.3s ease" }} 
              onClick={handleClick} 
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select 
              className="m-2 h-100 w-20 bg-success text-white rounded" 
              ref={priceRef} 
              onClick={handleClick} 
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className='d-inline ms-2 h-100 w-20 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button 
            className="btn btn-success justify-center ms-2" 
            onClick={handleAddToCart} 
            style={{
              backgroundColor: "#28a745", 
              borderColor: "#28a745", 
              transition: "background-color 0.3s ease, transform 0.2s",
              padding: "10px 20px"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"} 
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
            onFocus={(e) => e.target.style.transform = "scale(1.05)"}
            onBlur={(e) => e.target.style.transform = "scale(1)"}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
