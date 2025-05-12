'use client';

import React from 'react';
const PricingToggle = ({ isToggled, handleToggle }) => {
  return (
    <div className='flex items-center border-2 border-gray-700 rounded-full px-4 py-2  w-1-3'>
      <span
        id='yearlyText'
        className='font-nunito text-gray-700 text-lg font-bold'
      >
        Yearly <span className='text-sm'>(Save 15%)</span>
      </span>
      <div className='relative mx-4'>
        <label
          style={{
            display: 'inline-block',
            width: '60px',
            height: '30px',
            borderRadius: '8px',
            backgroundColor: '#49B974',
            position: 'relative',
            cursor: 'pointer',
            border: '1px solid white',
          }}
        >
          <input
            type='checkbox'
            checked={isToggled}
            onChange={handleToggle}
            style={{ display: 'none' }}
          />
          <span
            style={{
              position: 'absolute',
              top: '3px',
              left: isToggled ? '30px' : '3px',
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              backgroundColor: 'white',
              transition: '0.3s',
            }}
          ></span>
        </label>
      </div>
      <span
        id='monthlyText'
        className='font-nunito text-gray-700 text-lg font-bold'
      >
        Monthly
      </span>
    </div>
  );
};

export default PricingToggle;
