import { useSearchParams, useNavigate } from 'react-router-dom';
import Tab from '@/components/common/Tab';
import { groupTabList, GROUP_PARAMS } from '@/utils/constants';

export default function GroupTab() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabName = searchParams.get(GROUP_PARAMS) || 'Public';

  const handleChangeTab = (type) => {
    setSearchParams({ [GROUP_PARAMS]: type });
  };

  return (
    <Tab
      tabList={groupTabList}
      selectValue={tabName}
      onChangeValue={handleChangeTab}
    >
      <button
        type="button"
        onClick={() => navigate()} // TODO: 추후 그룹 만들기 추가
        className="cursor-pointer whitespace-pre px-4 pb-[19px] text-center text-normalGray hover:text-normalGray-hover active:text-normalGray-active"
      >
        그룹 만들기
      </button>
    </Tab>
  );
}
