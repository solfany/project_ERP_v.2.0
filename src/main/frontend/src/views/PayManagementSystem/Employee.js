import React from "react";
import { CCol, CRow } from "@coreui/react";

import { DocsCallout } from "src/components";

const Employee = () => {
  const random = () => Math.round(Math.random() * 100);

  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Chart" content="근태정산 페이지 " />
      </CCol>
    </CRow>
  );
};

export default Employee;
