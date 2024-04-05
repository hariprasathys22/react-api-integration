import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleEdit = (productId) => {
    const productToEdit = data.find((prod) => prod.id === productId);
    setEditData(productToEdit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = () => {
    fetch(`https://fakestoreapi.com/products/${editData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(data.map(item => (item.id === editData.id ? editData : item)));
        setEditData(null);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleDelete = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete product');
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setData(data.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      <div className="input-container">
        {editData && (
          <div>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              value={editData.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              value={editData.category}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleInputChange}
            />
            <button onClick={handleUpdate}>Save Changes</button>
          </div>
        )}
      </div>
      <div className="products-container">
        {data.map((prod) => (
          <div className="card product-card" key={prod.id}>
            <div className="product-image">
              <img
                src={prod.image}
                style={{ width: "100%", height: "300px", marginTop: "10px" }}
                className="card-img-top object-fit-contain"
                alt="..."
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{prod.title}</h5>
              <p className="card-text">{prod.description}</p>
              <p className="card-text">{prod.category}</p>
              <p className="card-title">$ {prod.price}</p>
              <Link to={`/product/${prod.id}`} className="button-link">Know More</Link>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(prod.id)}
              
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(prod.id)}
                style={{marginLeft: "20px"}}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
