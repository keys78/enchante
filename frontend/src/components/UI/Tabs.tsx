
interface IProps {
  tabList: string[],
  currentTab: any,
  setActiveTab: any,
  activeTab: any
}


const Tabs = ({ tabList, currentTab, setActiveTab, activeTab }: IProps) => {
  const checkActive = (index: number) => (tabList.indexOf(activeTab) === index ? "tab-nav-active" : "");

  return (
    <div className="tab-nav-wrapper flex items-center s-480:space-x-10 space-x-0 s-480:mb-6 mb-2 mt-6">
      {tabList &&
        tabList.map((tab: any, i: number) => (
          <div
            className={`tab-nav ${checkActive(i)}`}
            key={i}
            onClick={() => { setActiveTab(i); currentTab(tab); }}
          >
            {tab}
            {tabList.indexOf(activeTab) === i ? <div className="marky-active"></div> : <div className="marky"></div>}
          </div>
        ))}
    </div>
  );
};

export default Tabs;