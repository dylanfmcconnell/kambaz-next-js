"use client";
import "./index.css";
import { Container } from "react-bootstrap";

import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import ReactIconsSampler from "./ReactIcons";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
  return (
    <Container>
      <h2>Lab 2 - Cascading Style Sheets</h2>

      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the
          elements of the same name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Heres another paragraph using a different ID and a different look and
          feel
        </p>
      </div>

      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an elements CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
      </div>

      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Corners />
      <Dimensions />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />

      <ReactIconsSampler />
      <BootstrapGrids />
      <ScreenSizeLabel />
      <BootstrapTables />
      <BootstrapLists />
      <BootstrapForms />

      <BootstrapNavigation />
    </Container>
  );
}