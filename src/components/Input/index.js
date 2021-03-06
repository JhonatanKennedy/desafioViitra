import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

const Input = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    clearError();
  }, [clearError]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20} />}

        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
