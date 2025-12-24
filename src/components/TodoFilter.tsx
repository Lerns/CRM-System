import { memo } from 'react';

import type { Filter, Stats } from '../helpers/types';

import { Flex, Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface TodoFilterProps {
  filter: Filter;
  setFilter: (value: Filter) => void;
  status: Stats;
}
const isFilter = (value: string): value is Filter => {
  return value === 'all' || value === 'inWork' || value === 'completed';
};

const TodoFilter = memo(({ filter, setFilter, status }: TodoFilterProps) => {
  const items: TabsProps['items'] = [
    { key: 'all', label: `Все(${status.all} )` },
    { key: 'inWork', label: `В работе (${status.inWork} )` },
    { key: 'completed', label: `Сделано(${status.completed})` },
  ];
  const handleFilterChange = (key: string) => {
    if (isFilter(key)) {
      setFilter(key);
    }
  };
  return (
    <Flex vertical gap="middle">
      <Tabs activeKey={filter} items={items} onChange={handleFilterChange} />
    </Flex>
  );
});
export default TodoFilter;
