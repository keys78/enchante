import useWindowSize from "../hooks/useWindowSize";

interface IProps {
  tabList: string[];
  currentTab: (tab: string) => void;
  setActiveTab: (tab: any) => void;
  activeTab: string;
}

const Tabs = ({ tabList, currentTab, setActiveTab, activeTab }: IProps) => {
  const checkActive = (index: number) => (tabList.indexOf(activeTab) === index ? "tab-nav-active" : "");
  const { width } = useWindowSize();

  return (
    <div className="tab-nav-wrapper flex items-center s-480:space-x-10 space-x-5 s-480:mb-6 mb-2 mt-6">
      {tabList &&
        tabList.map((tab: string, i: number) => (
          <div
            className={`tab-nav ${checkActive(i)}`}
            key={i}
            onClick={() => {
              setActiveTab(i);
              currentTab(tab);
            }}
          >
            {tab === 'Product Description' && width < 480 ? 'Description' : tab === 'Comments & Discussions' && width < 480 ? 'C & D' : tab}
            {tabList.indexOf(activeTab) === i ? <div className="marky-active"></div> : <div className="marky"></div>}
          </div>
        ))}
    </div>
  );
};

export default Tabs;
