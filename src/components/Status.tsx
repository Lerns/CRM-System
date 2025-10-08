interface StatusProps {
  loadTodos: (filter: Filter) => Promise<void>;
  status: Stats;
  filterColor: Filter;
}

import type { Filter, Stats } from '../types/todo';
import './Status.scss';

export default function Status({
  loadTodos,
  status,
  filterColor,
}: StatusProps) {
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
