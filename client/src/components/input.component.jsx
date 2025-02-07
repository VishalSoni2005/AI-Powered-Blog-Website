import React from 'react';
import { useState } from 'react';

export default function InputBox({
  name,
  value,
  type,
  id,
  placeholder,
  icon,
}) {
  const [passwordVisibility, setPasswordVisibility] =
    useState(false);
  return (
    <div className='relative w-[100%] mb-4'>
      <input
        name={name}
        type={
          type == 'password'
            ? passwordVisibility
              ? 'text'
              : 'password'
            : type
        }
        id={id}
        placeholder={placeholder}
        className='input-box'
        defaultValue={value}
      />

      <i className={'fi ' + icon + ' input-icon'}></i>

      {type == 'password' ? (
        <i
          className={
            'fi fi-rr' +
            (!passwordVisibility ? '-crossed' : '-eye') +
            ' input-icon left-auto right-4 cursor-pointer'
          }
          onClick={() => {
            setPasswordVisibility(!passwordVisibility);
          }}
        ></i>
      ) : (
        ''
      )}
    </div>
  );
}
