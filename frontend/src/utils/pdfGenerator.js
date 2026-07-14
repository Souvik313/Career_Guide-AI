import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export const generatePDF = (report) => {

    const doc = new jsPDF();

    const PAGE_WIDTH = doc.internal.pageSize.getWidth();
    const PAGE_HEIGHT = doc.internal.pageSize.getHeight();

    let y = 20;

    // =====================================================
    // Helper Functions
    // =====================================================

    const divider = () => {

        checkPageBreak(10);

        doc.setDrawColor(220);

        doc.line(20, y, PAGE_WIDTH - 20, y);

        y += 10;

    };

    const heading = (title) => {

        checkPageBreak(20);

        doc.setFont("helvetica", "bold");

        doc.setFontSize(16);

        doc.setTextColor(37, 99, 235);

        doc.text(title, 20, y);

        y += 8;

        doc.setTextColor(0, 0, 0);

    };

    const paragraph = (text) => {

        doc.setFont("helvetica", "normal");

        doc.setFontSize(11);

        const lines = doc.splitTextToSize(text, 170);

        lines.forEach((line) => {

            checkPageBreak(8);

            doc.text(line, 20, y);

            y += 6;

        });

        y += 6;

    };

    const checkPageBreak = (requiredSpace = 20) => {

        if (y + requiredSpace > PAGE_HEIGHT - 20) {

            doc.addPage();

            y = 20;

        }

    };

    // =====================================================
    // Header
    // =====================================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);

    doc.text("CareerCompass AI", 20, y);

    y += 12;

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);

    doc.text("AI Career Assessment Report", 20, y);

     y += 4;

    doc.setDrawColor(37, 99, 235);

    doc.setLineWidth(1);

    doc.line(20, y, 90, y);

    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(120);

    doc.text(
        `Prepared for: ${report.candidate_name}`,
        20,
        y
    );

    y += 6
    doc.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        20,
        y
    );

    y += 10;

    divider();

    // =====================================================
    // Match Score
    // =====================================================

    heading("Overall Match Score");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(37, 99, 235);

    doc.text(
        `${report.career_report.match_score}%`,
        20,
        y + 5
    );

    y += 20;

    doc.setTextColor(0);

    divider();

    // =====================================================
    // Career Summary
    // =====================================================

    heading("Career Summary");

    paragraph(report.ai_report.career_summary);

    divider();

    // =====================================================
    // Resume Skills
    // =====================================================

    heading("Resume Skills");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const resumeSkills = report.resume_skills;

    resumeSkills.forEach((skill, index) => {

        checkPageBreak(10)

        const x = index % 2 === 0 ? 25 : 105;

        doc.text(`• ${skill}`, x, y);

        if (index % 2 === 1) {
            y += 8;
        }

    });

    // If odd number of skills
    if (resumeSkills.length % 2 !== 0) {
        y += 8;
    }

    y += 4;

    divider();

    // =====================================================
    // Missing Skills
    // =====================================================

    heading("Missing Skills");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const missingSkills = report.missing_skills.map(skill => skill[0]);

    missingSkills.forEach((skill, index) => {

        checkPageBreak(10)

        const x = index % 2 === 0 ? 25 : 105;

        doc.text(`• ${skill}`, x, y);

        if (index % 2 === 1) {
            y += 8;
        }

    });

    if (missingSkills.length % 2 !== 0) {
        y += 8;
    }

    y += 4;

    divider();

    // =====================================================
    // Recommended Jobs
    // =====================================================

    heading("Top Recommended Jobs");

    autoTable(doc, {

        startY: y,

        head: [[
            "Position",
            "Company",
            "Match"
        ]],

        body: report.recommended_jobs
            .slice(0, 5)
            .map(job => [

                job.Position.length > 40
                ? job.Position.substring(0, 40) + "..."
                : job.Position,

                job["Company Name"],

                `${Math.round(job["Similarity Score"] * 120)}%`

            ]),

        theme: "grid",

        headStyles: {

            fillColor: [37, 99, 235],

            textColor: 255,

            fontStyle: "bold"

        },

        styles: {

            font: "helvetica",

            fontSize: 10,

            cellPadding: 3

        },

        alternateRowStyles: {

            fillColor: [245, 247, 250]

        }

    });

    y = doc.lastAutoTable.finalY + 10;

    divider();

    // =====================================================
    // Best Career Paths
    // =====================================================

    heading("Best Career Paths");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    report.career_report.best_roles.forEach((role) => {

        checkPageBreak(10)

        doc.text(
            `• ${role.role}`,
            25,
            y
        );

        doc.setFont("helvetica", "bold");

        doc.text(
            `${role.score}%`,
            PAGE_WIDTH - 30,
            y,
            {
                align: "right"
            }
        );

        doc.setFont("helvetica", "normal");

        y += 8;

    });

    y += 4;

    divider();

    // =====================================================
    // Strength Analysis
    // =====================================================

    heading("Strength Analysis");

    paragraph(report.ai_report.strength_analysis);

    divider();

    // =====================================================
    // Learning Roadmap
    // =====================================================

    heading("Learning Roadmap");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    report.ai_report.learning_roadmap.forEach((step, index) => {

        checkPageBreak(12);

        const lines = doc.splitTextToSize(
            `${index + 1}. ${step}`,
            170
        );

        doc.text(lines, 20, y);

        y += lines.length * 6 + 4;

    });

    divider();

    // =====================================================
    // Final Thoughts
    // =====================================================

    heading("Final Thoughts");

    paragraph(report.ai_report.motivation);

    // =====================================================
    // Footer
    // =====================================================

    doc.setFontSize(10);

    doc.setTextColor(140);

    doc.text(
        `Generated by CareerCompass AI • ${new Date().toLocaleDateString()}\nAI-Powered Career Assessment Platform`,
        PAGE_WIDTH / 2,
        PAGE_HEIGHT - 10,
        {
            align: "center"
        }
    );

    const pageCount = doc.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {

        doc.setPage(i);

        doc.setFontSize(10);

        doc.setTextColor(150);

        doc.text(
            `Page ${i} of ${pageCount}`,
            PAGE_WIDTH - 20,
            PAGE_HEIGHT - 10,
            {
                align: "right"
            }
        );

    }
    const today = new Date();

    const filename =
    `CareerCompass_Report_${
    today.toISOString().split("T")[0]
    }.pdf`;

    doc.save(filename);

};