import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ReactPortal = ({ children, wrapperId }) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    setMounted(true);
    containerRef.current = document.querySelector(`${wrapperId}`);
    return () => setMounted(false);
  }, [wrapperId]);

  return mounted && Boolean(containerRef.current)
    ? createPortal(children, containerRef.current)
    : null;
};

export default ReactPortal;
