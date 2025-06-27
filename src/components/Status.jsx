import { statsTodo } from '../API/http';
import { useState, useEffect } from 'react';
export default function Status({ onFilter }) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await statsTodo();
        setStatus(data);
      } catch (error) {
        console.error('Ошибка загрузки', error.message);
      }
    };
    fetchStatus();
  }, []);
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
