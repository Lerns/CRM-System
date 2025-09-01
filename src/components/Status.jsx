import './Status.scss';

export default function Status({ loadTodos, status, filterColor }) {
  return (
    <div>
      <ul className="status">
        <li>
          <button
            className={filterColor === 'all' ? 'active' : ''}
            onClick={() => loadTodos('all')}
          >
            Все({status.all})
          </button>
        </li>
        <li>
          <button
            className={filterColor === 'inWork' ? 'active' : ''}
            onClick={() => loadTodos('inWork')}
          >
            В работе({status.inWork})
          </button>
        </li>
        <li>
          <button
            className={filterColor === 'completed' ? 'active' : ''}
            onClick={() => loadTodos('completed')}
          >
            Сделано({status.completed})
          </button>
        </li>
      </ul>
    </div>
  );
}
