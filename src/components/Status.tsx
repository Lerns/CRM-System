import { memo } from 'react';

import type { Filter, Stats } from '../helpers/types';

import { Flex, Radio, RadioChangeEvent } from 'antd';

interface StatusProps {
  filter: Filter;
  setFilter: (value: Filter) => void;
  status: Stats;
}

const Status = memo(({ filter, setFilter, status }: StatusProps) => {
  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value);
  };

  return (
    <Flex vertical gap="middle">
      <Radio.Group
        name="status"
        value={filter}
        onChange={handleFilterChange}
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
});
export default Status;
