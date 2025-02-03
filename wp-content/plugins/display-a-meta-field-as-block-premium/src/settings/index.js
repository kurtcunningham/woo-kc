/**
 * External dependencies
 */
import { findKey } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { render } from "@wordpress/element";
import domReady from "@wordpress/dom-ready";
import { TabPanel } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { SearchParams, DataContext, useGlobalData } from "./utils";
import { GettingStarted, ProContent } from "./sections";

// Styles
import "./index.scss";

const TabContent = ({ children }) => (
  <div className="metabox-holder">{children}</div>
);

const SettingsBody = () => {
  const tabs = [
    {
      name: "getting-started",
      title: "Getting Started",
      className: "setting-tabs__getting-started",
    },
    {
      name: "mfb-pro",
      title: "MFB Pro",
      className: "setting-tabs__mfb-pro",
    },
  ];

  const searchParams = new SearchParams();
  const tabParam = searchParams.get("tab");
  const initialTabName = findKey(tabs, ["name", tabParam])
    ? tabParam
    : "getting-started";

  const globalData = useGlobalData();
  return (
    <DataContext.Provider value={globalData}>
      <TabPanel
        tabs={tabs}
        className="settings-tabs"
        activeClass="is-active"
        initialTabName={initialTabName}
        onSelect={(tabName) => {
          searchParams.set("tab", tabName);
        }}
      >
        {(tab) => {
          switch (tab.name) {
            case "getting-started":
              return (
                <TabContent>
                  <GettingStarted />
                </TabContent>
              );

            case "mfb-pro":
              return (
                <TabContent>
                  <ProContent />
                </TabContent>
              );

            default:
              break;
          }
        }}
      </TabPanel>
    </DataContext.Provider>
  );
};

/**
 * Kick start
 */
domReady(() => {
  render(<SettingsBody />, document.querySelector(".js-mfb-settings-root"));
});
