'use client';

import { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0); // Default to first item open

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="accordion" id="maintenanceAccordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button ${openIndex !== index ? 'collapsed' : ''}`} 
              type="button" 
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
            >
              {item.title}
            </button>
          </h2>
          <div 
            className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
          >
            <div className="accordion-body">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}