import { useState, useEffect, useRef } from 'react';

export const usePrevious = (value) => {
  const ref = useRef(value);
  return ref.current;
};
