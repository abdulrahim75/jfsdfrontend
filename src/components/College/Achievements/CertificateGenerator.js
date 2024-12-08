import { useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import './CertificateGenerator.css';

const CertificateGenerator = ({ achievement }) => {
    // Memoize the generateCertificate function
    const generateCertificate = useCallback(() => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Set background color
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

        // Add border
        doc.setDrawColor(0, 0, 238);
        doc.setLineWidth(2);
        doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);

        // Add inner border
        doc.setDrawColor(255, 0, 0);
        doc.setLineWidth(1);
        doc.rect(15, 15, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 30);

        // Add college logo placeholder
        doc.setDrawColor(0);
        doc.circle(40, 40, 15);

        // Add college name
        doc.setFontSize(40);
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold");
        doc.text(achievement.student.college.name, doc.internal.pageSize.width / 2, 40, { align: "center" });

        // Add "Certificate" text
        doc.setFontSize(30);
        doc.setFont("times", "bold");
        doc.text("Certificate", doc.internal.pageSize.width / 2, 70, { align: "center" });

        // Add "of" text
        doc.setFontSize(30);
        doc.text("of", doc.internal.pageSize.width / 2, 85, { align: "center" });

        // Add achievement type based on positions
        let certificateType = "Participation";
        if (achievement.firstPosition) certificateType = "Excellence (First Position)";
        else if (achievement.secondPosition) certificateType = "Excellence (Second Position)";
        else if (achievement.thirdPosition) certificateType = "Excellence (Third Position)";

        doc.text(certificateType, doc.internal.pageSize.width / 2, 100, { align: "center" });

        // Add student name
        doc.setFontSize(24);
        doc.setFont("helvetica", "bolditalic");
        doc.text(achievement.student.name, doc.internal.pageSize.width / 2, 130, { align: "center" });

        // Add achievement details
        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");
        const detailsText = `For successfully participating in ${achievement.activityName}`;
        doc.text(detailsText, doc.internal.pageSize.width / 2, 150, { align: "center" });

        // Add category and date
        doc.setFontSize(12);
        doc.text(`Category: ${achievement.activityCategory}`, doc.internal.pageSize.width / 2, 170, { align: "center" });
        doc.text(`Date: ${achievement.activityDate}`, doc.internal.pageSize.width / 2, 180, { align: "center" });

        // Add additional text
        doc.setFontSize(14);
        doc.setFont("helvetica", "italic");
        doc.text("We acknowledge your dedication and outstanding achievement!", doc.internal.pageSize.width / 2, 190, { align: "center" });

        // Save the PDF
        doc.save(`${achievement.activityName}_Certificate.pdf`);
    }, [achievement]); // Add achievement as a dependency

    useEffect(() => {
        if (achievement) {
            generateCertificate();
        }
    }, [achievement, generateCertificate]); // Include generateCertificate in the dependencies

    return null; // No need to render anything as the download starts automatically
};

export default CertificateGenerator;
