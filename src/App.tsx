import React, { useState } from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardContent from "./components/PageContent/PageContent";
import ContentWrapper from "./components/ContentWrapper";

function App() {
  const [currentSection, setCurrentSection] = useState("Dashboard");

  return (
    <>
      <ContentWrapper>
        <Sidebar setCurrentSection={setCurrentSection} />
        <DashboardContent sectionName={currentSection} />
      </ContentWrapper>
    </>
  );
}

export default App;
