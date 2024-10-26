import React, { useState, useCallback, useEffect } from 'react';
import './simpleModal.css';
import { BsXLg, BsList } from "react-icons/bs";
 interface modal{
    isOpen:boolean;
    onClose:()=> void;
    children:React.ReactElement
 }
const SimpleModal = ({ isOpen, onClose, children }:modal) => {
  const [dragState, setDragState] = useState({
    isDragging: false,
    startX: 0,
    startY: 0,
    left: 0,
    top: 0,
  });

  const handleDragStart = useCallback((e:any) => {
    // Prevent dragging behavior for certain elements like buttons or inputs
    if (['BUTTON', 'INPUT', 'A', 'SELECT'].includes(e.target.tagName)) {
      return;
    }
    
    setDragState((prevState) => ({
      ...prevState,
      isDragging: true,
      startX: e.clientX - prevState.left,
      startY: e.clientY - prevState.top,
    }));
    // Prevent text selection while dragging
    e.preventDefault();
  }, []);

  const handleDragging = useCallback((e:any) => {
    if (!dragState.isDragging) return;
    setDragState((prevState) => ({
      ...prevState,
      left: e.clientX - prevState.startX,
      top: e.clientY - prevState.startY,
    }));
  }, [dragState.isDragging, dragState.startX, dragState.startY]);

  const handleDragEnd = useCallback(() => {
    setDragState((prevState) => ({ ...prevState, isDragging: false }));
  }, []);

  // Attach event listeners to window
  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleDragging);
      window.addEventListener('mouseup', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragging);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [dragState.isDragging, handleDragging, handleDragEnd]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-30 flex justify-center items-center " onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleDragStart}
        style={{ left: `${dragState.left}px`, top: `${dragState.top}px` }}
      >
        <div className="modal-header">
          <span className="modal-more">
            <BsList />
          </span>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <BsXLg />
          </button>
        </div>
        <div className="">
        {children}
        </div>
          
      </div>
    </div>
  );
};

export default SimpleModal;
