import React, { useState, useEffect } from 'react';
import { Table } from 'antd'; // Import Table from Ant Design
import { Container, Box, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [editProduct, setEditProduct] = useState({ id: '', title: '', price: '' });

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const result = await response.json();
        setData(result.products); // Set the products array from the result
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const result = await response.json();
        setCategory(result); // Set the categories array directly from the result
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategory();
  }, []);

  // Handling the PUT request to update a product
  const handleUpdateProduct = () => {
    fetch(`https://dummyjson.com/products/${editProduct.id}`, {
      method: 'PUT', // or 'PATCH' for partial updates
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editProduct.title,
        price: editProduct.price, // You can add other fields you want to update here
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        console.log(updatedProduct);
        // Update the product in the list dynamically
        setData((prevData) =>
          prevData.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditProduct({ id: '', title: '', price: '' }); // Reset the form after updating
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title', // This matches the key in the product object
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand', // This matches the key in the product object
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price', // This matches the key in the product object
      key: 'price',
      render: (price) => `$${price}`, // Render price with a dollar sign
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditProduct({ id: record.id, title: record.title, price: record.price })}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <h2 className="text-2xl text-red-600 font-mono">Product List</h2>

      {/* Render Product Table */}
      <Table
        className="font-mono"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Form to edit existing product */}
      <Box mt={4}>
        <h2 className="text-2xl text-red-500 font-mono">Edit Product:</h2>
        <TextField
          label="Product ID"
          value={editProduct.id}
          onChange={(e) => setEditProduct({ ...editProduct, id: e.target.value })}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Product Title"
          value={editProduct.title}
          onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Product Price"
          value={editProduct.price}
          onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
          variant="outlined"
          margin="normal"
          fullWidth
          type="number"
        />
        <Button variant="contained" color="primary" onClick={handleUpdateProduct} style={{ marginTop: '16px' }}>
          Update Product
        </Button>
      </Box>

      {/* Render Category Section */}
      <Box mt={4}>
        <h2 className="text-2xl text-red-500 font-mono">Product Categories:</h2>
        <Box className="font-mono">
          {category?.map((el, index) => {
            return (
              <div className="sm:flex sm:items-center sm:justify-between" key={index}>
                <h1 className="mb-2 mt-2">{el.slug}</h1>
                <h1 className="mb-2 mt-2">{el.name}</h1>
                <Link className="pt-1 pb-1 ps-3 pe-3 bg-blue-500 text-white" to={el.url}>
                  Backend Link
                </Link>
              </div>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};
