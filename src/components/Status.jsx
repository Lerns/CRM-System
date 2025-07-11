export default function Status({ onFilter, status }) {
  return (
    <div>
      <ul className="status">
        <li>
          <button onClick={() => onFilter('all')}>Все({status.all})</button>
        </li>
        <li>
          <button onClick={() => onFilter('inWork')}>
            В работе({status.inWork})
          </button>
        </li>
        <li>
          <button onClick={() => onFilter('completed')}>
            Сделано({status.completed})
          </button>
        </li>
      </ul>
    </div>
  );
}
