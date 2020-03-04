import React from "react";
import * as queryString from "query-string";
import { Menu } from "../components/Menu";
const Setting = props => {
  let params = queryString.parse(props.location.search);

  function render() {
    if (params["section"]) {
      return `Setting page - Section: ${params["section"]}`;
    }
    return "Setting page";
  }

  return (
    <div>
      <Menu {...props} />
      {render()}
    </div>
  );
};

export default Setting;
