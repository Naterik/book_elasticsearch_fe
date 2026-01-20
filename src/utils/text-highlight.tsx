

/**
 * Safely renders text with <em> tags as accented HTML.
 * @param text The raw string from Elasticsearch (e.g., "Harry <em>Potter</em>")
 * @param highlightClass Optional class for the identified match (default: font-bold text-blue-600)
 */
export const HighlightText = ({ text, highlightClass = "font-extrabold text-blue-600 not-italic" }: { text: string, highlightClass?: string }) => {
  if (!text) return null;

  // Split by <em> tags
  const parts = text.split(/(<em>.*?<\/em>)/g);

  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('<em>') && part.endsWith('</em>')) {
          const content = part.replace(/<\/?em>/g, '');
          return (
            <span key={i} className={highlightClass}>
              {content}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};
