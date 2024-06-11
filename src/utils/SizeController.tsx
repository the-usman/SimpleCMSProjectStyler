"use client";
import { position } from "@/app/types";

interface SizeControllerProps {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  id: string;
  initialValues: position;
}

export const sizeController = ({ e, id, initialValues }: SizeControllerProps): void => {
  const element = document.getElementById(id);
  if (!element) return;

  const handleMouseMove = (e: MouseEvent): void => {
    const clientX = e.clientX;
    const currentSize = parseFloat(getComputedStyle(element).width);
    element.style.width = currentSize + (clientX - initialValues.clientX) + 'px';
  };

  const handleMouseUp = (): void => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  e.preventDefault(); 
};
