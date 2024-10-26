'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const foodItems = [
  "Pizza", "Burger", "Sushi", "Tacos", "Ice Cream", "Salad", "Pasta", "Steak",
  "Chicken Wings", "Fries", "Nachos", "Popcorn", "Chocolate", "Fruit Salad"
];

export default function DynamicFoodQR() {
  const [qrCode, setQRCode] = useState('');

  const generateQRCode = async () => {
    try {
      const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)];
      const url = await QRCode.toDataURL(randomFood, {
        width: 300, // Smaller size
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQRCode(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  useEffect(() => {
    generateQRCode();
    const interval = setInterval(generateQRCode, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-500">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-xl font-semibold text-center mb-4">Mystery Snack QR Code</h2>
        {qrCode && (
          <div className="bg-blue-200 p-4 rounded-md flex items-center justify-center">
            <img
              src={qrCode}
              alt="QR Code for a mystery snack"
              className="w-48 h-48 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
