/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * ProfileForm Form
 *
 */

import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { FormattedMessage } from 'react-intl';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { Card, Button } from 'antd';
import { stateToHTML } from 'draft-js-export-html';
import FileUpload from 'components/FileUpload/Loadable';
import InlineEdit from 'components/InlineEdit';
import { CardExtraContainer } from './StyledProfile';
import { DATA_TEST_IDS, PROFILE_PLACEHOLDER } from './constants';
import { options } from './helper';
import messages from './messages';
import RichTextEditor from '../../components/RichTextEditor';

function ProfileForm() {
  const [nameContent, setNameContent] = useState('John Doe');
  const [designationContent, setDesignationContent] = useState(
    'Software Engineer at GrowExx',
  );
  const [locationContent, setLocationContent] = useState('Ahmedabad, India');
  const [aboutContent, setAboutContent] = useState(EditorState.createEmpty());
  const [experienceContent, setExperienceContent] = useState(
    EditorState.createEmpty(),
  );
  const [educationContent, setEducationContent] = useState(
    EditorState.createEmpty(),
  );
  const [
    licensesAndCertificationsContent,
    setLicensesAndCertificationsContent,
  ] = useState(EditorState.createEmpty());
  const [editAbout, setEditAbout] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editEducation, setEditEducation] = useState(false);
  const [editLicensesAndCertifications, setEditLicensesAndCertifications] =
    useState(false);

  const isContentEdited = state =>
    state.getCurrentContent().getPlainText('\u0001').length > 0
      ? stateToHTML(state.getCurrentContent(), options)
      : PROFILE_PLACEHOLDER;

  return (
    <div>
      <Helmet>
        <title>Profile Form</title>
        <meta name="description" content="Description of ProfileForm" />
      </Helmet>
      <div className="u-mb-1">
        <InlineEdit
          value={nameContent}
          onSave={value => setNameContent(value)}
          placeholder="Enter Name"
        />
      </div>
      <div className="u-mb-1">
        <InlineEdit
          value={designationContent}
          onSave={value => setDesignationContent(value)}
          placeholder="Enter Designation"
        />
      </div>
      <div className="u-mb-5">
        <InlineEdit
          value={locationContent}
          onSave={value => setLocationContent(value)}
          placeholder="Enter Location"
        />
      </div>
      <Card
        hoverable
        type="inner"
        title="About"
        extra={
          <CardExtraContainer>
            {editAbout ? (
              <Button
                data-testid={DATA_TEST_IDS.ABOUT_SAVE}
                onClick={() => {
                  setEditAbout(false);
                }}
              >
                <FormattedMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.ABOUT_EDIT}
                onClick={() => {
                  setEditAbout(true);
                }}
              >
                <FormattedMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {editAbout ? (
          <RichTextEditor
            testId={DATA_TEST_IDS.ABOUT_EDITOR}
            value={aboutContent}
            onChange={value => {
              setAboutContent(value);
            }}
          />
        ) : (
          parse(`${isContentEdited(aboutContent)}`)
        )}
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Experience"
        extra={
          <CardExtraContainer>
            {editExperience ? (
              <Button
                data-testid={DATA_TEST_IDS.EXPERIENCE_SAVE}
                onClick={() => {
                  setEditExperience(false);
                }}
              >
                <FormattedMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.EXPERIENCE_EDIT}
                onClick={() => {
                  setEditExperience(true);
                }}
              >
                <FormattedMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {editExperience ? (
          <RichTextEditor
            value={experienceContent}
            onChange={value => {
              setExperienceContent(value);
            }}
          />
        ) : (
          parse(`${isContentEdited(experienceContent)}`)
        )}
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Education"
        extra={
          <CardExtraContainer>
            {editEducation ? (
              <Button
                data-testid={DATA_TEST_IDS.EDUCATION_SAVE}
                onClick={() => {
                  setEditEducation(false);
                }}
              >
                <FormattedMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.EDUCATION_EDIT}
                onClick={() => {
                  setEditEducation(true);
                }}
              >
                <FormattedMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {editEducation ? (
          <RichTextEditor
            value={educationContent}
            onChange={value => {
              setEducationContent(value);
            }}
          />
        ) : (
          parse(`${isContentEdited(educationContent)}`)
        )}
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Licenses and Certificates"
        extra={
          <CardExtraContainer>
            {editLicensesAndCertifications ? (
              <Button
                data-testid={DATA_TEST_IDS.LICENSEANDCERTIFICATION_SAVE}
                onClick={() => {
                  setEditLicensesAndCertifications(false);
                }}
              >
                <FormattedMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.LICENSEANDCERTIFICATION_EDIT}
                onClick={() => {
                  setEditLicensesAndCertifications(true);
                }}
              >
                <FormattedMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {editLicensesAndCertifications ? (
          <RichTextEditor
            value={licensesAndCertificationsContent}
            onChange={value => {
              setLicensesAndCertificationsContent(value);
            }}
          />
        ) : (
          parse(`${isContentEdited(licensesAndCertificationsContent)}`)
        )}
      </Card>
      <br />
      <Card hoverable type="inner" title="Upload Resume">
        <FileUpload />
      </Card>
    </div>
  );
}

export default ProfileForm;
