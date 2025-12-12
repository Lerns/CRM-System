import { memo } from 'react';

import type { Filter, Stats } from '../helpers/types';

import { Flex, Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface StatusProps {
  filter: Filter;
  setFilter: (value: Filter) => void;
  status: Stats;
}

const Status = memo(({ filter, setFilter, status }: StatusProps) => {
  const items: TabsProps['items'] = [
    { key: 'all', label: `Все(${status.all} )` },
    { key: 'inWork', label: `В работе (${status.inWork} )` },
    { key: 'completed', label: `Сделано(${status.completed})` },
  ];

  return (
    <Flex vertical gap="middle">
      <Tabs
        activeKey={filter}
        items={items}
        onChange={(key) => setFilter(key as Filter)}
      />
    </Flex>
  );
});
export default Status;
