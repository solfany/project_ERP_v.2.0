import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <strong>3ERP</strong>
        <span className="ms-1">&copy; 2023 3ERP.</span>
      </div>
      <div>
        <a
          href="https://github.com/solfany/project03"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      <div className="ms-auto">
        <span className="me-1">Created by 🧑‍💻</span>
        <a
          href="https://github.com/solfany/project03"
          target="_blank"
          rel="noopener noreferrer"
        >
          3ERP &amp; Admin System
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
