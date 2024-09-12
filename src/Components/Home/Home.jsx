import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Container, Box, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {EditOutlined, DeleteOutlined } from "@ant-design/icons"

export const Home = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [editProduct, setEditProduct] = useState({ id: '', title: '', price: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editProduct.title,
        price: editProduct.price,
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        console.log(updatedProduct);
        setData((prevData) =>
          prevData.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditProduct({ id: '', title: '', price: '' });
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  // Handling the DELETE request to remove a product
  const handleDeleteProduct = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setData((prevData) => prevData.filter((product) => product.id !== id));
        console.log(`Product ${id} deleted successfully`);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  // Handling the search for products
  const handleSearch = () => {
    fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((result) => {
        setSearchResults(result.products); // Store search results in state
        console.log(result.products);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditProduct({ id: record.id, title: record.title, price: record.price })}
            style={{ marginRight: '8px' }}
          >
            <EditOutlined />
          </Button>
          <Button style={{backgroundColor:"red"}}
            variant="contained"
            color="secondary "
            onClick={() => handleDeleteProduct(record.id)}
          >
            <DeleteOutlined className='text-white' />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <h2 className="text-2xl text-red-600 font-mono">Product List</h2>

      {/* Search Bar */}
      <Box mb={4}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
      <Box className=''>
      <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginTop: '16px' }}
        >
          Search
        </Button> <div className='text-center w-full'>
        <Link className=' block w-[200px] pt-2 pb-2 rounded-md  bg-blue-600 text-white mt-8 mb-4 ms-8' to={'../'}>
        Log out
        </Link>
        </div>
      </Box>
      </Box>

      {/* Render Searched Products */}
      {searchResults.length > 0 && (
        <>
          <h3 className="text-xl text-blue-500 font-mono">Search Results</h3>
          <Table
            className="font-mono"
            columns={columns}
            dataSource={searchResults}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </>
      )}

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
