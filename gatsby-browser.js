import React from "react";
import "./src/styles/global.css";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>{element}</DndProvider>
    </Provider>
  );
};
