import React, { Component, useState } from "react";

const ConfigurationContext = React.createContext({
  savedList: [],
  mode: false,
  pagein: "Home",
  handleSavedList: () => {},
  handleMode: () => {},
  handlePage: () => {},
});
export default ConfigurationContext;
