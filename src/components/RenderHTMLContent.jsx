import React from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

const RenderHTMLContent = ({ htmlContent }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent); // Sanitize HTML content

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  );
};

export default RenderHTMLContent;