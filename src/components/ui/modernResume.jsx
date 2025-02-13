import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import {
  formatDate,
  getUniqueWorkSkills,
  hasValidLanguages,
  hasValidPersonalInfo,
  hasValidSkills,
  hasValidStudies,
  hasValidWorkExperience,
} from '../../helper';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'row',
    lineHeight: 1.5,
  },
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
    paddingTop: 100,
    paddingHorizontal: 10,
    textAlign: 'left',
    fontSize: 12,
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    whiteSpace: 'pre-wrap',
  },
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
    marginBottom: 8,
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
  headerDivider: {
    paddingTop: 2,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#2e3e51',
    width: '100%',
  },
  workExperienceBlock: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  workExperienceTitle: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  workTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    paddingBottom: 5,
  },
  workDate: {
    fontSize: 12,
    paddingBottom: 5,
  },
  workTasks: {
    marginLeft: 10,
    fontSize: 12,
  },
  position: {
    paddingTop: '8',
    fontSize: '13',
    textTransform: 'uppercase',
  },
  columnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  columnItem: {
    width: '45%',
  },
});

const ModernResume = ({ data, translations }) => {
  const { personalInfo, workExperience, skills, languages, studies } = data;
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.mainContent}>
          <View style={styles.nameContainer}>
            {personalInfo.fullName.split(' ').map((word, index) => (
              <Text key={index} style={styles.name}>
                {word}{' '}
              </Text>
            ))}
          </View>
          <Text style={styles.position}>{personalInfo.workPosition}</Text>
          <View style={styles.headerDivider} />
          <View>
            <Text style={styles.workExperienceTitle}>
              {translations.workExperienceTitle}
            </Text>
            {workExperience.map((work, index) => (
              <View style={styles.workExperienceBlock} key={index}>
                <Text style={styles.workTitle}>
                  {work.position} - {work.companyName}
                </Text>
                <Text style={styles.workDate}>
                  {formatDate(work.startDate)} -{' '}
                  {work.endDate
                    ? formatDate(work.endDate)
                    : translations.present}
                </Text>
                <View style={styles.workTasks}>
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
          {/*Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>{translations.contact}</Text>
            <Text>{personalInfo.email}</Text>
            <Text>{personalInfo.phone}</Text>
            <Text>{personalInfo.address}</Text>
            <Text>{personalInfo.linkedin}</Text>
            <Text>{personalInfo.interestingLinks}</Text>
            <View style={styles.divider} />
          </View>

          {/*About me */}
          {hasValidPersonalInfo(personalInfo.aboutMe) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>{translations.aboutMe}</Text>
              <Text>{personalInfo.aboutMe}</Text>
              <View style={styles.divider} />
            </View>
          )}

          {/*Skills */}
          {hasValidSkills(skills) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>{translations.skills}</Text>
              <View style={styles.columnContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.columnItem}>
                    • {skill.name}
                  </Text>
                ))}
              </View>
              <View style={styles.divider} />
            </View>
          )}

          {/*Tech stack */}
          {hasValidWorkExperience(workExperience) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>{translations.techStack}</Text>
              <View style={styles.columnContainer}>
                {getUniqueWorkSkills(workExperience).map((skill, index) => (
                  <Text key={index} style={styles.columnItem}>
                    • {skill}
                  </Text>
                ))}
              </View>
              <View style={styles.divider} />
            </View>
          )}

          {/*Languages */}
          {hasValidLanguages(languages) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>{translations.languages}</Text>
              {languages.map((language, index) => (
                <Text key={index}>
                  • {language.language}: {language.level}{' '}
                  {language.institution && `(${language.institution})`}
                </Text>
              ))}
              <View style={styles.divider} />
            </View>
          )}

          {/*Studies */}
          {hasValidStudies(studies) && (
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
          )}
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
