export default function Error({ title, message }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>

      <div id="confirmation-actions">
        <button onClick={() => window.location.reload()} className="button">
          Okay
        </button>
      </div>
    </div>
  );
}
