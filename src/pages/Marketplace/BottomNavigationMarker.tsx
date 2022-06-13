const NavigationTab = ({ index, currentPage }) => {
  return (
    <div
      className={"navigation-tab" + (currentPage === index ? " current" : "")}
    ></div>
  );
};

const BottomNavigationMarker = ({ length, currentPage }) => {
  // USed for marking the current page in the given style
  const tabs = [];
  for (let i = 0; i < length; ++i) {
    tabs.push(
      <NavigationTab index={i} currentPage={currentPage} key={`nt${i}`} />
    );
  }
  return <div className="navigation-marker">{tabs}</div>;
};

export default BottomNavigationMarker;
