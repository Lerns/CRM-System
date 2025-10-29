import { Flex, Radio } from 'antd';

import type { Filter, Stats } from '../types/todo';

interface StatusProps {
  loadTodos: (filter: Filter) => Promise<void>;
  status: Stats;
  filterColor: Filter;
}

export default function Status({ loadTodos, status }: StatusProps) {
  return (
    <Flex vertical gap="middle">
      <Radio.Group
        name="status"
        onChange={(e) => loadTodos(e.target.value)}
        buttonStyle="solid"
        size="large"
      >
        <Radio.Button value="all">Все({status.all})</Radio.Button>

        <Radio.Button value="inWork">В работе({status.inWork})</Radio.Button>

        <Radio.Button value="completed">
          Сделано({status.completed})
        </Radio.Button>
      </Radio.Group>
    </Flex>
  );
}
