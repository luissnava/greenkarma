"use client"
import React, { useState } from 'react';
const CounterNumber = ({ ids, valor, contador, setCount, categorie }) => {
  let maximo = 0;
  if (categorie == "paquetes") {
    maximo = 3
  }else{
    maximo = 10
  }

  const increment = () => {
   
    if (contador < maximo) {
      setCount(contador + 1);
    }
  };

  const decrement = () => {
    if (contador > 1) {
      setCount(contador - 1);
    }
  };

  return (
    <>
      <div className={`flex flex-row h-8 ${valor == 'carrito' ? 'w-full' : (valor === 'carritosmall' ? 'w-[50%]' : 'w-[30%]')} rounded-lg relative bg-transparent mt-1`} id={ids}>
        <button data-action="decrement" onClick={decrement} className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="text"
          className="outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value={contador}
          id={`counter${ids}`}
          readOnly
        />
        <button data-action="increment" onClick={increment} className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </>
  );
};

export default CounterNumber;
