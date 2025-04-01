import React from "react";

const WompiButton: React.FC = () => {
  const goToUrl = () => {
    const url = "https://checkout.wompi.co/l/FRfRVa";
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={goToUrl}
      className="btnwompi flex items-center z-50 bg-[#FDC80A] text-white font-bold py-2 px-10 rounded-full hover:bg-[#FAA307] fixed right-5 bottom-0 mb-12 transform transition-transform hover:scale-105"
    >
      <img src="./img/boton-wompi.png" alt="Logo" className="w-20 h-20 mr-6 wompi" />
      Donar ❤️
    </button>
  );
};

export default WompiButton;