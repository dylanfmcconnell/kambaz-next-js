"use client";
import { Button, Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="secondary" size="lg" id="wd-collapse-all">Collapse All</Button>
      <Button variant="secondary" size="lg" className="ms-2" id="wd-view-progress">View Progress</Button>

      <Dropdown className="float-end">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <div id="wd-publish-all" className="dropdown-item"><GreenCheckmark /> Publish All</div>
          <div id="wd-publish-all-modules-and-items" className="dropdown-item"><GreenCheckmark /> Publish all modules and items</div>
          <div id="wd-publish-modules-only" className="dropdown-item"><GreenCheckmark /> Publish modules only</div>
          <div id="wd-unpublish-all-modules-and-items" className="dropdown-item">Unpublish all modules and items</div>
          <div id="wd-unpublish-modules-only" className="dropdown-item">Unpublish modules only</div>
        </DropdownMenu>
      </Dropdown>

      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Module
      </Button>
    </div>
  );
}
