export default function WhatsAppButton({
  phone = "8618583246000",
  message = "Hello, I am interested in your products. Please send me more details.",
  label = "WhatsApp"
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a className="whatsapp-float" href={href} target="_blank" rel="noopener" aria-label="Chat with AXDCARE on WhatsApp">
      <span className="whatsapp-float__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M16 3.5A12.4 12.4 0 0 0 5.6 22.7L4 28.5l6-1.5A12.4 12.4 0 1 0 16 3.5Zm0 22.8c-2 0-3.9-.6-5.6-1.7l-.4-.2-3.5.9.9-3.4-.2-.4A10.2 10.2 0 1 1 16 26.3Zm5.8-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.4 8.4 0 0 1-4.2-3.7c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-.9-2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3 0 1.7 1.3 3.4 1.5 3.7.2.2 2.5 3.9 6.2 5.3 2.3.9 3.2 1 4.4.8 1-.2 1.8-1.1 2-1.6.2-.5.2-1 .2-1.2-.1-.1-.3-.2-.6-.4Z" />
        </svg>
      </span>
      <span className="whatsapp-float__text">{label}</span>
    </a>
  );
}
