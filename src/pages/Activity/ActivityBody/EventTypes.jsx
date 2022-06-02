// Images
import chevronDown from "../../../assets/svgs/chevronDown.svg";

const EventTypeButton = ({
  eventType,
  activeFilters,
  onClickAdd,
  onClickRemove,
}) => {
  const className = activeFilters.find((filter) => filter === eventType)
    ? " active"
    : "";
  const onClick = className === " active" ? onClickRemove : onClickAdd;
  return (
    <button
      className={"event-type" + className}
      onClick={() => onClick(eventType)}
    >
      {eventType}
    </button>
  );
};

const EventTypes = ({
  ifOpen,
  setIfOpen,
  activeFilters,
  setActiveFilters,
  eventTypes,
}) => {
  const onClickAdd = (rmFilter) => {
    const temp = activeFilters.concat(rmFilter);
    setActiveFilters(temp);
  };
  const onClickRemove = (rmFilter) => {
    const temp = activeFilters.filter((filter) => filter != rmFilter);
    setActiveFilters(temp);
  };

  return (
    <div className="event-types">
      <h2 className="event-types-heading">
        <div className="text">Event Types</div>
        <button onClick={() => setIfOpen(!ifOpen)}>
          <img src={chevronDown} alt="Expand List" />
        </button>
      </h2>
      <div
        className="event-types-holder"
        style={
          !ifOpen
            ? {
                height: 0,
              }
            : null
        }
      >
        {eventTypes.map((eventType, i) => (
          <EventTypeButton
            key={`evt${i}`}
            eventType={eventType}
            activeFilters={activeFilters}
            onClickAdd={onClickAdd}
            onClickRemove={onClickRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default EventTypes;
