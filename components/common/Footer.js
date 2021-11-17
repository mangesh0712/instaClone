import React from "react";

function Footer({ itemClass, containerClass, bottomClass }) {
  return (
    <div className={containerClass}>
      <div className={itemClass}>
        <p>About</p>
        <p>Help</p>
        <p>Press</p>
        <p>API</p>
        <p>Jobs</p>
        <p>Privacy</p>
        <p>Locations</p>
        <p>Hashtags</p>
        <p>Top Accounts</p>
        <p>Language</p>
      </div>
      <div className={bottomClass}>2021 INSTAGRAM CLONE</div>
    </div>
  );
}

export default Footer;
