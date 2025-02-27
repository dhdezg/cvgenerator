import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import {
  formatDate,
  hasValidLanguages,
  hasValidPersonalInfo,
  hasValidSkills,
  hasValidStudies,
  hasValidWorkExperience,
} from '../../helper';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    color: '#000000',
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    fontSize: 11,
  },
  personalInfo: {
    textAlign: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  personalInfoText: {
    fontSize: 11,
    color: '#000000',
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 1,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  textBold: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
  },
  text: {
    fontSize: 11,
    color: '#000000',
  },
  listItem: {
    marginBottom: 4,
    paddingLeft: 4,
    textAlign: 'left',
  },
  divider: {
    marginVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  columnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 2,
  },
  columnItem: {
    width: '33%',
    marginBottom: 2,
  },
});

const HarvardResume = ({ data, translations }) => {
  const { personalInfo, workExperience, skills, languages, studies } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal info */}
        {hasValidPersonalInfo(personalInfo) && (
          <View style={styles.personalInfo}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <View style={styles.personalInfoText}>
              <Text>
                {personalInfo.email} • {personalInfo.phone}
              </Text>
              <Text>{personalInfo.linkedin}</Text>
              <Text>{personalInfo.interestingLinks}</Text>
              <Text>{personalInfo.address}</Text>
            </View>
          </View>
        )}

        {/* Work Experience */}
        {hasValidWorkExperience(workExperience) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {translations.workExperienceTitle}
            </Text>
            <View style={styles.divider} />
            {workExperience.map((work, workIndex) => (
              <View key={workIndex} style={{ marginBottom: 10 }}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                  <Text style={styles.textBold}>{work.companyName}</Text>
                  <Text style={styles.text}>
                    {formatDate(work.startDate)} -{' '}
                    {work.endDate
                      ? formatDate(work.endDate)
                      : translations.present}
                  </Text>
                </View>
                <Text
                  style={(styles.text, { fontFamily: 'Helvetica-Oblique' })}>
                  {work.position}
                </Text>

                {work.technologies &&
                  work.technologies.trim().length > 0 &&
                  work.technologies !== ',' && (
                    <>
                      <Text style={styles.textBold}>
                        {translations.usedTechs}:
                      </Text>
                      <View
                        style={[styles.columnContainer, { marginLeft: 10 }]}>
                        {work.technologies
                          .split(',')
                          .filter((tech) => tech.trim().length > 0)
                          .map((technology, index) => (
                            <Text key={index} style={styles.columnItem}>
                              • {technology.trim()}
                            </Text>
                          ))}
                      </View>
                    </>
                  )}

                <Text style={styles.textBold}>{translations.tasks}:</Text>
                <View style={{ marginLeft: 10 }}>
                  {work.tasks.split('.').map(
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
        )}

        {/* Skills */}
        {hasValidSkills(skills) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations.skills}</Text>
            <View style={styles.divider} />
            <View style={styles.columnContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.columnItem}>
                  • {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {hasValidLanguages(languages) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations.languages}</Text>
            <View style={styles.divider} />
            {languages.map((language, index) => (
              <Text key={index} style={styles.listItem}>
                • {language.language}: {language.level}{' '}
                {language.institution ? `(${language.institution})` : ''}
              </Text>
            ))}
          </View>
        )}

        {/* Studies */}
        {hasValidStudies(studies) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations.education}</Text>
            <View style={styles.divider} />
            {studies.map((study, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.textBold}>{study.schoolName}</Text>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                  <Text style={styles.text}>{study.degree}</Text>
                  <Text style={styles.text}>
                    {study.endDate
                      ? formatDate(study.endDate)
                      : translations.present}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

HarvardResume.propTypes = {
  data: PropTypes.object.isRequired,
  translations: PropTypes.object,
};

export default HarvardResume;
