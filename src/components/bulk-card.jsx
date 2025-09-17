"use client";
import React, { useEffect } from "react";

const BulkCard = ({ enterpriseSection, isMonthly }) => {
  const initialQuantity = 5;

  const [values, setValues] = React.useState([
    initialQuantity,
    initialQuantity,
  ]);
  const [totalPrices, setTotalPrices] = React.useState([]);

  const getPricePerItem = (pricingTiers, quantity) => {
    const tier = pricingTiers.find((tier) => quantity <= tier.quantity);

    return tier && isMonthly ? tier.pricePerMonth : tier.pricePerYear;
  };

  useEffect(() => {
    const initialPrices = enterpriseSection.enterprise.map((card) =>
      (
        getPricePerItem(card.pricingTiers, initialQuantity) * initialQuantity
      ).toFixed(2)
    );
    setTotalPrices(initialPrices);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMonthly]);

  const handleChange = (index) => (event) => {
    const quantity = parseInt(event.target.value, 10);
    const updatedValues = [...values];
    updatedValues[index] = quantity;
    setValues(updatedValues);

    const pricePerItem = getPricePerItem(
      enterpriseSection.enterprise[index].pricingTiers,
      quantity
    );

    const updatedTotalPrices = [...totalPrices];
    updatedTotalPrices[index] = (pricePerItem * quantity).toFixed(2);
    setTotalPrices(updatedTotalPrices);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center px-4 md:px-8 lg:px-0 py-6">
      {enterpriseSection.enterprise.map((card, index) => (
        <div
          className="flex flex-col justify-between bg-white rounded-2xl shadow-lg w-full border border-solid border-[#b3dfc4] p-6"
          key={index}
        >
          <div className="w-full">
            <p className="text-2xl sm:text-3xl text-[#3F4E41] font-semibold mb-2">
              {card.title}
            </p>
            <p className="text-sm sm:text-base font-normal text-[#908AA0] mb-4">
              {card.description}
            </p>
            <div className="flex justify-between items-center mb-4">
              <p className="text-primary-400 text-sm sm:text-base">
                Quantity: {values[index]}
              </p>
              <p className="text-primary-400 text-sm sm:text-base">Max: 50</p>
            </div>

            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={values[index]}
              className="slider w-full mb-4"
              onChange={handleChange(index)}
              style={{
                background: `linear-gradient(to right, #48bb78 ${
                  ((values[index] - 5) / (50 - 5)) * 100
                }%, #e5e7eb ${((values[index] - 5) / (50 - 5)) * 100}%)`,
              }}
            />

            <div className="my-4">
              <span className="text-sm sm:text-base text-[#908AA0]">$</span>
              <span className="text-3xl sm:text-4xl font-bold text-[#3F4E41]">
                {totalPrices[index]}
              </span>
              <span className="text-sm sm:text-base text-[#908AA0]">USD</span>
              <span className="text-sm sm:text-base text-[#908AA0]">
                /{card.forMonth}
              </span>
              {!isMonthly && (
                <p className="text-sm sm:text-base text-[#908AA0]">
                  {card.forYear}{" "}
                </p>
              )}
            </div>
            <div>
              {" "}
              <a
                className="flex justify-center rounded-md border border-solid py-2 bg-primary-500 text-[#3F4E41 hover:bg-primary-600 transition duration-200"
                href="#"
                target="_blank"
              >
                {card.btn}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BulkCard;
