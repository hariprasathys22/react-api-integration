import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SingleProduct.css';

const SingleProduct = () => {
  const [newData, setNewData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setNewData(res);
      });
  }, [id]);

  return (
    <div className='singleproduct-container'>
      <div className='image-container'>
        <img src={newData.image} alt={newData.title} />
      </div>
      <div className='details-container'>
        <p className='h-text'>{newData.title}</p>
        <p>{newData.description}</p>
        <p><strong>Category:</strong> {newData.category}</p>
        <p><strong>Price:</strong> $ {newData.price}</p>
        {newData.rating && (
          <p>
            <strong>Rating:</strong> {newData.rating.rate} out of 5 (based on{" "}
            <span style={{ color: "red" }}>{newData.rating.count}</span> ratings)
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
