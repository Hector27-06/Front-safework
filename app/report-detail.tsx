// app/report-detail.tsx
import React from "react";
// IMPORTANTE: Usamos llaves { ReportDetailView } porque es una exportación nombrada
import { ReportDetailView } from "../src/views/ReportDetailView";

export default function ReportDetailRoute() {
  return <ReportDetailView />;
}
