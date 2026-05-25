import { Project } from "./api";

interface DvsZoneData {
  id: string;
  range: string;
  zone: string;
  frequency: string;
  interpretation: string;
  issues: string[];
  interventions: string[];
}

export async function generateAuditReport(
  project: Project | null,
  dvsScore: number,
  currentZone: DvsZoneData | undefined,
  kpis: {
    nrwPercentage: number;
    revenueWaterRatio: number;
    economicalLeakageLevel: number;
    infrastructureLeakageIndex: number;
    coverageOfConnections: number;
    perCapitaWaterSupply: number;
  },
  dataValues: Record<string, string>
) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  let currentY = 20;

  // Header
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42);
  doc.text("Water Audit Official Report", pageWidth / 2, currentY, { align: "center" });
  currentY += 15;

  // Project Details
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  
  if (project) {
    const details = [
      `Project Name: ${project.title || "N/A"}`,
      `Lead Auditor: ${project.lead_auditor_name || "N/A"}`,
      `Date: ${project.created_at ? new Date(project.created_at).toLocaleDateString() : new Date().toLocaleDateString()}`,
      `Population: ${project.population?.toLocaleString() || "N/A"}`,
      `System Capacity: ${project.capacity || "N/A"}`,
      `Location: ${project.location || "N/A"}`
    ];
    
    // Left column
    doc.text(details[0], 20, currentY);
    doc.text(details[1], 20, currentY + 7);
    doc.text(details[2], 20, currentY + 14);
    
    // Right column
    doc.text(details[3], pageWidth / 2 + 10, currentY);
    doc.text(details[4], pageWidth / 2 + 10, currentY + 7);
    doc.text(details[5], pageWidth / 2 + 10, currentY + 14);
    
    currentY += 25;
  } else {
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, currentY);
    currentY += 15;
  }

  doc.setDrawColor(200, 200, 200);
  doc.line(20, currentY, pageWidth - 20, currentY);
  currentY += 15;

  // Data Validity Score Section
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text("1. Data Validity Score (DVS)", 20, currentY);
  currentY += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Overall Score: ${Math.round(dvsScore)} / 100`, 20, currentY);
  currentY += 7;
  
  if (currentZone) {
    doc.text(`Reliability Zone: ${currentZone.zone}`, 20, currentY);
    currentY += 7;
    doc.text(`Interpretation: ${currentZone.interpretation}`, 20, currentY);
    currentY += 7;
    doc.text(`Recommended Audit Frequency: ${currentZone.frequency}`, 20, currentY);
    currentY += 15;
    
    // Recommended Action Plan
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("Recommended Action Plan", 20, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    currentZone.interventions.forEach((intervention, idx) => {
      const splitText = doc.splitTextToSize(`• ${intervention}`, pageWidth - 40);
      doc.text(splitText, 20, currentY);
      currentY += splitText.length * 5;
    });
    currentY += 10;
  }

  // Key Performance Indicators (KPIs)
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text("2. Key Performance Indicators", 20, currentY);
  currentY += 5;

  autoTable(doc, {
    startY: currentY,
    head: [["Indicator", "Value"]],
    body: [
      ["Non-Revenue Water (NRW)", `${Math.round(kpis.nrwPercentage)}%`],
      ["Revenue Water Ratio", `${Math.round(kpis.revenueWaterRatio)}%`],
      ["Infrastructure Leakage Index (ILI)", kpis.infrastructureLeakageIndex.toFixed(2)],
      ["Coverage of Connections", `${Math.round(kpis.coverageOfConnections)}%`],
      ["Per Capita Water Supply", `${Math.round(kpis.perCapitaWaterSupply)} LPCD`],
    ],
    theme: "striped",
    headStyles: { fillColor: [2, 132, 199] },
  });
  
  currentY = (doc as any).lastAutoTable.finalY + 20;

  // Raw Data Annex
  doc.addPage();
  currentY = 20;
  
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text("3. Raw Data Annex", 20, currentY);
  
  const rawDataBody = Object.entries(dataValues).map(([key, value]) => {
    // Format keys (e.g. TotalHouseholds -> Total Households)
    const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
    return [formattedKey, value || "N/A"];
  });

  autoTable(doc, {
    startY: currentY + 10,
    head: [["Data Input Field", "Value"]],
    body: rawDataBody,
    theme: "grid",
    headStyles: { fillColor: [15, 23, 42] },
    styles: { fontSize: 9 }
  });

  // Save the PDF
  const filename = project ? `WaterAudit_Report_${project.title.replace(/\s+/g, '_')}.pdf` : "WaterAudit_Report.pdf";
  doc.save(filename);
}
