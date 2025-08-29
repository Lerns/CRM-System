import './Status.scss';
export default function Status({ loadTodos, status }) {
  return (
    <div>
      <ul className="status">
        <li>
          <button onClick={() => loadTodos('all')}>Все({status.all})</button>
        </li>
        <li>
          <button onClick={() => loadTodos('inWork')}>
            В работе({status.inWork})
          </button>
        </li>
        <li>
          <button onClick={() => loadTodos('completed')}>
            Сделано({status.completed})
          </button>
        </li>
      </ul>
    </div>
  );
}
