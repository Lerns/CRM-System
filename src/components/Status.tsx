interface StatusProps {
  loadTodos: (filter: Filter) => Promise<void>;
  status: Stats;
  filterColor: Filter;
}
import { Flex, Radio, Space } from 'antd';

import type { Filter, Stats } from '../types/todo';

export default function Status({
  loadTodos,
  status,
  filterColor,
}: StatusProps) {
  return (
    <Flex vertical gap="middle">
      <Radio.Group
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
