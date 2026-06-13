import { jsPDF } from 'jspdf';

export interface PDFReportField {
  label: string;
  value: string;
}

export interface PDFReportData {
  title: string;
  filename: string;
  summary: PDFReportField;
  inputs: PDFReportField[];
  results: PDFReportField[];
  notes?: string[];
}

/**
 * Draws a clean vector Indian Rupee symbol (₹) at (x, y) with a given height/scale.
 * This avoids default PDF fonts text-rendering glitches (spacing issues, superscript 1, empty boxes).
 */
function drawRupeeSymbol(doc: jsPDF, x: number, y: number, size: number) {
  const w = size * 0.7; // width of symbol
  
  // Adjust line thickness relative to size
  doc.setLineWidth(size * 0.09);
  
  // 1. Top horizontal bar
  doc.line(x, y + size * 0.08, x + w, y + size * 0.08);
  
  // 2. Second horizontal bar
  doc.line(x, y + size * 0.35, x + w * 0.85, y + size * 0.35);
  
  // 3. Semicircle loop on left side
  const steps = 8;
  const cx = x + w * 0.12; // center X
  const cy = y + size * 0.31; // center Y
  const rx = w * 0.45; // radius X
  const ry = size * 0.22; // radius Y
  
  let prevX = cx;
  let prevY = y + size * 0.08;
  
  for (let i = 0; i <= steps; i++) {
    const angle = -Math.PI / 2 + (i / steps) * Math.PI; // -90 deg to +90 deg
    const nextX = cx + rx * Math.cos(angle);
    const nextY = cy + ry * Math.sin(angle);
    doc.line(prevX, prevY, nextX, nextY);
    prevX = nextX;
    prevY = nextY;
  }
  
  // 4. Left vertical stem (connects top bar to bottom of loop)
  doc.line(cx, y + size * 0.08, cx, cy + ry);
  
  // 5. Diagonal leg from bottom of loop down-right
  doc.line(cx, cy + ry, x + w * 0.85, y + size * 0.95);
}

/**
 * Renders a string line, replacing the Indian Rupee symbol (₹) with a vector-drawn equivalent
 * to prevent character metric spacing glitches in Helvetica.
 */
function drawTextWithRupee(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  isBold: boolean,
  color: number[]
) {
  doc.setFont('helvetica', isBold ? 'bold' : 'normal');
  doc.setFontSize(fontSize);
  doc.setTextColor(color[0], color[1], color[2]);

  if (!text.includes('₹')) {
    doc.text(text, x, y);
    return;
  }

  // Split text by '₹' and render segment-by-segment
  const segments = text.split('₹');
  let currentX = x;
  const symbolSize = fontSize * 0.28; // height of symbol in mm
  const yOffset = -symbolSize * 0.78; // baseline adjustment offset

  segments.forEach((seg, idx) => {
    // Draw the text segment
    if (seg.length > 0) {
      doc.text(seg, currentX, y);
      currentX += doc.getTextWidth(seg);
    }
    
    // Draw the Rupee symbol after each segment except the last one
    if (idx < segments.length - 1) {
      doc.setDrawColor(color[0], color[1], color[2]);
      drawRupeeSymbol(doc, currentX, y + yOffset, symbolSize);
      currentX += symbolSize * 0.95; // advance X by symbol width + spacing
    }
  });
}

/**
 * Generates and downloads a professional financial report as a PDF.
 */
export function generatePDFReport({ title, filename, summary, inputs, results, notes }: PDFReportData) {
  // Create a new A4 document in portrait mode, unit is 'mm'
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2); // 180mm

  // Colors (RGB)
  const colors = {
    primary: [67, 56, 202],      // Indigo #4338ca
    textDark: [30, 41, 59],       // Slate-800 #1e293b
    textLight: [100, 116, 139],   // Slate-500 #64748b
    bgLight: [248, 250, 252],     // Slate-50 #f8fafc
    border: [226, 232, 240],      // Slate-200 #e2e8f0
    highlightBg: [238, 242, 255], // Indigo-50 #eef2ff
    highlightBorder: [165, 180, 252] // Indigo-300 #a5b4fc
  };

  let y = margin;

  // 1. BRAND HEADER
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('ClearFinCalc', margin, y + 5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.text('Clear Calculations. Smarter Decisions.', margin, y + 10);

  // Metadata (Right Aligned)
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const reportId = `CFC-${Date.now().toString().slice(-8)}`;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Date: ${dateStr}`, pageWidth - margin, y + 5, { align: 'right' });
  doc.text(`Report ID: ${reportId}`, pageWidth - margin, y + 10, { align: 'right' });

  y += 14;

  // Divider Line
  doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 7;

  // 2. REPORT TITLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14.5);
  doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
  doc.text(title, margin, y);

  y += 6;

  // 3. HIGHLIGHTED SUMMARY SECTION
  if (summary) {
    if (y > pageHeight - 35) {
      doc.addPage();
      y = margin;
    }

    const bannerHeight = 15;
    
    // Draw Indigo Solid Background for the Summary Banner
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(margin, y, contentWidth, bannerHeight, 'F');

    // Draw Left Border accent in Indigo-300
    doc.setFillColor(165, 180, 252);
    doc.rect(margin, y, 1.5, bannerHeight, 'F');

    // Label inside the banner
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(224, 231, 255); // Indigo-100
    doc.text(summary.label.toUpperCase(), margin + 5, y + 4.5);

    // Value inside the banner
    const displayVal = summary.value && summary.value.trim() !== '' ? summary.value : 'Not Provided';
    drawTextWithRupee(doc, displayVal, margin + 5, y + 11.2, 14, true, [255, 255, 255]); // White text!

    y += bannerHeight + 5.5;
  }

  // 4. INPUT PARAMETERS SECTION
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('Input Details', margin, y);
  
  y += 3;

  // Inputs Table
  doc.setLineWidth(0.2);
  const rowHeight = 7.0;
  
  inputs.forEach((input) => {
    // Check page overflow
    if (y > pageHeight - 30) {
      doc.addPage();
      y = margin;
    }

    // Row Background (zebra striping)
    doc.setFillColor(colors.bgLight[0], colors.bgLight[1], colors.bgLight[2]);
    doc.rect(margin, y, contentWidth, rowHeight, 'F');

    // Row Border
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.rect(margin, y, contentWidth, rowHeight, 'D');

    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text(input.label, margin + 4, y + 4.6);

    // Value
    const displayVal = input.value && input.value.trim() !== '' ? input.value : 'Not Provided';
    drawTextWithRupee(doc, displayVal, margin + 80, y + 4.6, 8.2, false, colors.textDark);

    y += rowHeight;
  });

  y += 5.5;

  // 5. CALCULATION RESULTS SECTION (Highlighted Card)
  if (results && results.length > 0) {
    // Check page overflow
    if (y > pageHeight - 50) {
      doc.addPage();
      y = margin;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text('Calculation Results', margin, y);
    
    y += 3;

    const resultRowHeight = 7.0;
    const cardHeight = (results.length * resultRowHeight) + 4;
    
    // Draw Indigo Highlight Card Background & Border
    doc.setFillColor(colors.highlightBg[0], colors.highlightBg[1], colors.highlightBg[2]);
    doc.setDrawColor(colors.highlightBorder[0], colors.highlightBorder[1], colors.highlightBorder[2]);
    doc.setLineWidth(0.4);
    doc.rect(margin, y, contentWidth, cardHeight, 'FD');

    let cardY = y + 4.0;

    results.forEach((res) => {
      // Result Label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.2);
      doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
      doc.text(res.label, margin + 5, cardY + 1.6);

      // Result Value
      const displayVal = res.value && res.value.trim() !== '' ? res.value : 'Not Provided';
      drawTextWithRupee(doc, displayVal, margin + 80, cardY + 2.0, 10, true, colors.primary);

      cardY += resultRowHeight;
    });

    y += cardHeight + 5.5;
  }

  // 6. NOTES SECTION (If present)
  if (notes && notes.length > 0) {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = margin;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text('Additional Notes', margin, y);
    
    y += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);

    notes.forEach((note) => {
      const splitNote = doc.splitTextToSize(note, contentWidth - 6);
      splitNote.forEach((line: string) => {
        if (y > pageHeight - 25) {
          doc.addPage();
          y = margin;
        }
        drawTextWithRupee(doc, `• ${line}`, margin + 2, y, 7.5, false, colors.textLight);
        y += 3.8;
      });
    });
  }

  // 7. FOOTER (Drawn at the bottom of the page)
  let footerY = pageHeight - 15;
  
  if (y > footerY - 5) {
    doc.addPage();
    footerY = pageHeight - 15;
  }

  // Divider
  doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  
  const disclaimerText = 'This report is an estimate based on the inputs provided and is for informational purposes only.';
  doc.text(disclaimerText, pageWidth / 2, footerY + 4, { align: 'center' });

  // Website URL / Brand
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
  
  const brandText = 'Generated by ClearFinCalc – https://clearfincalc.com';
  doc.text(brandText, pageWidth / 2, footerY + 8, { align: 'center' });

  // Save the PDF
  doc.save(filename);
}
