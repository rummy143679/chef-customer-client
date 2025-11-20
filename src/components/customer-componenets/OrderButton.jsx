import React from "react";

const OrderButton = ({ onClick }) => {
  return (
    <button
      className="btn btn-info text-white fw-bold shadow-lg"
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        borderRadius: "50px",
        padding: "12px 24px",
        zIndex: 9999
      }}
      onClick={onClick}
    >
      Order Now 🍽️
    </button>
  );
};

export default OrderButton;
