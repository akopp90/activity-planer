import React from "react";
import Button from "./Button";

function InstallPrompt({ showInstallPrompt, install, showInstallButton }) {
  return (
    <div>
      {showInstallPrompt && (
        <InstallPrompt>
          <p>Install Super Activities for a better experience!</p>
          <Button onClick={install} isPrimary>
            Add to Home Screen
          </Button>
        </InstallPrompt>
      )}

      {showInstallButton && <Button onClick={install}>Install App</Button>}
    </div>
  );
}

export default InstallPrompt;
