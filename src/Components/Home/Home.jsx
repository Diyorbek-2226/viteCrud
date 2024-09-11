import React, { useState, useEffect } from 'react';
import { Table } from 'antd'; // Import Table from Ant Design
import { Container, Box } from '@mui/material';

export const Home = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();
        setData(result.products); // Set the products array from the result
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/categories");
        const result = await response.json();
        setCategory(result);
    
         // Set the categories array directly from the result
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, []);

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
      title: 'Description',
      dataIndex: 'description', // This matches the key in the product object
      key: 'description',
      ellipsis: true, // Add ellipsis if the description is too long
    },
  ];

  return (
    <Container maxWidth="lg">
      <h2 className="text-2xl text-red-600">Product qismi uchun</h2>
      
      {/* Render Product Table */}
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
      />
      
      {/* Render Categories */}
      <Box mt={4}>
        <h2 className='text-2xl text-red-500'>Product Categories:</h2>
       {
        category.map((el, index)=>{
            return(
                <h1>
                    {
                        el.slug
                    }
                </h1>
            )
        })
       }
      </Box>
    </Container>
  );
};
