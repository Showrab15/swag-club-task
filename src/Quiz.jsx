


import React, { useState } from 'react';
import classnames from 'classnames';
import logo from '../src/assets/0f252ee7-46c0-4859-a7c9-c91d21f3a7cb._CR0,0,500,500_SX500_.jpeg.jpg'
const Quiz = ({ setDiscountStart, discountStart }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const correctAnswer = 'd';
  const handleOptionSelect = (option) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedOption == correctAnswer) {
      setDiscountStart(true)
      localStorage.setItem('Discount', true)
    }
  };

  const renderOptions = () => {
    const options = [
      { id: 'a', text: 'baby' },
      { id: 'b', text: 'train' },
      { id: 'c', text: 'country' },
      { id: 'd', text: 'dog' },
    ];

    return (
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={classnames(
              'btn btn-sm btn-secondary rounded text-center cursor-pointer transition-colors duration-300',
              isSubmitted && {
                'btn btn-success btn-sm text-white': option.id === correctAnswer,
                'btn btn-error btn-sm text-white': option.id === selectedOption && option.id !== correctAnswer,
              },
              selectedOption === option.id && ''
            )}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-between">
      <div className="mt-30 mr-auto  flex items-center">
        <button className="btn ">
          <img src={logo} alt="" className="h-6 w-12 rounded" />
          <span className="text-xs text-left text-secondary">This quiz is sponsored by Pet Max</span>
        </button>
      </div>
      <div className="container bg-glass bg-red-50 bg-blend-overlay p-8 rounded shadow-lg bg-opacity-5 mb-40 my-auto">
        <p className="mb-4 text-white font-semibold">What is a German Shepherd?</p>
        <div className="flex flex-col">{renderOptions()}</div>
        <div className="flex mt-4 justify-center">
          {isSubmitted ? (
            <button
              className="btn btn-sm btn-primary hover:bg-red-500 text-white py-2 px-4 rounded "
              disabled={isSubmitted}
            >
              Submitted
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary md:ml-0 ml-12 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
