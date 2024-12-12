import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    color: "#000000",
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    fontSize: 11,
  },
  personalInfo: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  personalInfoText: {
    fontSize: 11,
    color: "#000000",
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 2,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  textBold: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
  },
  text: {
    fontSize: 11,
    color: "#000000",
  },
  listItem: {
    marginBottom: 4,
    paddingLeft: 10,
    textAlign: "left",
    textTransform: "capitalize",
  },
  divider: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
});

const ResumePDF = ({ data }) => {
  const { personalInfo, workExperience, skills, languages, studies } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal info */}
        <View style={styles.personalInfo}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.personalInfoText}>
            <Text>
              {personalInfo.email} • {personalInfo.phone}
            </Text>
            <Text>{personalInfo.linkedin}</Text>
            <Text>{personalInfo.address}</Text>
          </View>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View style={styles.divider} />
          {workExperience.map((work, workIndex) => (
            <View key={workIndex} style={{ marginBottom: 10 }}>
              <View style={styles.row}>
                <Text style={styles.textBold}>{work.companyName}</Text>
                <Text style={styles.text}>
                  {" "}
                  • {work.startDate} / {work.endDate}
                </Text>
              </View>
              <Text style={styles.text}>{work.position}</Text>

              <Text style={styles.textBold}>Skills required:</Text>
              <View style={{ marginLeft: 10 }}>
                {work.skills.split(",").map((skill, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {skill.trim()}
                  </Text>
                ))}
              </View>

              <Text style={styles.textBold}>Tasks:</Text>
              <View style={{ marginLeft: 10 }}>
                {work.tasks.split(".").map(
                  (task, index) =>
                    task.trim() && (
                      <Text key={index} style={styles.listItem}>
                        • {task}
                      </Text>
                    )
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.divider} />
          {skills.map((skill, index) => (
            <Text key={index} style={styles.listItem}>
              • {skill.name} - {skill.level}
            </Text>
          ))}
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.divider} />
          {languages.map((language, index) => (
            <Text key={index} style={styles.listItem}>
              • {language.language}: {language.level}
            </Text>
          ))}
        </View>

        {/* Studies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.divider} />
          {studies.map((study, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={[styles.textBold, { fontSize: 14 }]}>
                {study.schoolName}
              </Text>
              <Text style={styles.text}>{study.degree}</Text>
              <Text style={styles.text}>
                {study.startDate} - {study.endDate}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
