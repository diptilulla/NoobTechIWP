import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrashAlt } from "react-icons/fa";

function Item({ item, index, moveItem, status, deletetask }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "ITEM",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index; //whatever col we are hovering over

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // const [show, setShow] = useState(false);
  // const onOpen = () => setShow(true);
  // const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <div
        ref={ref}
        className={`${isDragging && "opacity-0"} item`}
        // onClick={onOpen}
      >
        <FaTrashAlt
          className="cursor-pointer text-small block ml-auto text-gray"
          onClick={() => deletetask(item._id)}
        />
        <div
          className={"color-bar"}
          style={{ backgroundColor: status.color }}
        />
        <p className={"item-title"}>{item.title}</p>
        <p className="text-xs">{item.content}</p>
        <p className={"item-status"}>{item.icon}</p>
      </div>
      {/* <Window item={item} onClose={onClose} show={show} /> */}
    </Fragment>
  );
}

export default Item;
