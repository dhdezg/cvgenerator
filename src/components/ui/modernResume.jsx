import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import { formatDate } from '../../helper';

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', display: 'flex', flexDirection: 'row' },
  mainContent: {
    flex: 2,
    paddingVertical: 75,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    color: '#2e3e51',
  },
  sidebar: {
    right: 0,
    width: '33%',
    height: '100%',
    backgroundColor: '#2e3e51',
    color: 'white',
    paddingTop: 120,
    paddingHorizontal: 10,
    textAlign: 'left',
    fontSize: 12,
  },
  name: { fontSize: 32, fontFamily: 'Helvetica-Bold' },
  sidebarSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
    color: 'white',
    gap: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  divider: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '80%',
  },
  workExperienceTitle: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 12,
  },
});

const ModernResume = ({ data, translations }) => {
  const { personalInfo, workExperience, skills, languages, studies } = data;
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.mainContent}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>

          <View>
            <Text style={styles.workExperienceTitle}>
              {translations.workExperienceTitle}
            </Text>
            {workExperience.map((work, index) => (
              <View key={index}>
                <Text style={styles.title}>
                  {work.position} - {work.companyName}
                </Text>
                <Text style={styles.text}>
                  {formatDate(work.startDate)} -{' '}
                  {work.endDate
                    ? formatDate(work.endDate)
                    : translations.present}
                </Text>
                <View style={{ marginLeft: 10 }}>
                  {work.tasks
                    .split('.')
                    .map(
                      (task, index) =>
                        task.trim() && <Text key={index}>- {task}</Text>
                    )}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.sidebar}>
          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>{translations.contact}</Text>
            <Text>{personalInfo.email}</Text>
            <Text>{personalInfo.phone}</Text>
            <Text>{personalInfo.address}</Text>
            <Text>{personalInfo.linkedin}</Text>
            <Text>{personalInfo.interestingLinks}</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>{translations.skills}</Text>
            {skills.map((skill, index) => (
              <Text key={index}>• {skill.name}</Text>
            ))}
            <View style={styles.divider} />
          </View>
          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>{translations.languages}</Text>
            {languages.map((language, index) => (
              <Text key={index}>
                • {language.language}: {language.level}
              </Text>
            ))}
            <View style={styles.divider} />
          </View>
          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>{translations.education}</Text>
            {studies.map((study, index) => (
              <View key={index}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                  {study.degree} - {study.schoolName}
                </Text>
                <Text>
                  {study.endDate
                    ? formatDate(study.endDate)
                    : translations.present}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

ModernResume.propTypes = {
  data: PropTypes.object.isRequired,
  translations: PropTypes.object,
};

export default ModernResume;
