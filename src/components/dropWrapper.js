import React from "react";
import { useDrop } from "react-dnd";

function DropWrapper({ onDrop, children, status }) {
  const statuses = [
    {
      status: "open",
      icon: "⭕️",
      color: "#EB5A46"
    },
    {
      status: "in progress",
      icon: "⏳",
      color: "#00C2E0"
    },
    {
      status: "done",
      icon: "✅",
      color: "#3981DE"
    }
  ];
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });
  return (
    <div ref={drop} className="drop-wrapper">
      {React.cloneElement(children, { isOver })}
    </div>
  );
}

export default DropWrapper;
