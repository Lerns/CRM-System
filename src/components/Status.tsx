import { Flex, Radio } from 'antd';

import type { Filter, Stats } from '../types/todo';

interface StatusProps {
  filter: Filter;
  setFilter: (value: Filter) => void;
  status: Stats;
}

export default function Status({ filter, setFilter, status }: StatusProps) {
  return (
    <Flex vertical gap="middle">
      <Radio.Group
        name="status"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
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
