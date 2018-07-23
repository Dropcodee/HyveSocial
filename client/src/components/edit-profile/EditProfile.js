import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // change skills back to comma seperated value
      const skillsCSV = profile.skills.join(",");
      // if profile field data is empty, change the field to an empty string
      profile.company = !isEmpty(profile.company) ? profile.comapny : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.locoation = !isEmpty(profile.locoation) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    };
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div className="mt-3">
          <InputGroup
            placeholder="FaceBook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
          />

          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
          />

          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
          />

          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
          />

          <InputGroup
            placeholder="Youtube channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
          />
        </div>
      );
    }
    // select options for developer status
    const options = [
      { label: "* Select Your Developer Status ", value: 0 },
      { label: " Member and Learning ", value: "Member" },
      { label: "Developer", value: "Developer" },
      { label: " Front-End Developer", value: "Front-End Developer" },
      { label: " Back-End Developer", value: "Back-End Developer" },
      { label: " Full Stack Developer", value: "Full Stack Developer" },
      { label: " Designer", value: "Designer" },
      { label: " Graphics Designer", value: "Graphic Designer" },
      { label: " Software Developer", value: "Software Developer" },
      { label: " Software Engineer", value: "Software Engineer" }
    ];
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-4 text-center">Edit Profile</h2>
              <p className="lead text-muted">Make Your profile better.</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder=" Enter Profile Handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Enter your preffered name, nick names etc."
                />

                <SelectFieldGroup
                  name="status"
                  placeholder=" Member Status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Let us know where you are at in your career as a developer or designer, 
                  and if you are new to development be truthful about your choice in order for us to know 
                  who we are to help and how to help you grow. Thanks"
                />

                <TextFieldGroup
                  name="company"
                  placeholder=" Enter Hidden Hyve here"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextFieldGroup
                  name="website"
                  placeholder=" Enter your website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="this could basically be your portfolio site"
                />

                <TextFieldGroup
                  name="location"
                  placeholder=" Enter location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Address of where you live."
                />

                <TextFieldGroup
                  name="skills"
                  placeholder=" * Skills "
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="please enter comma seperated values(eg: HTML,css,js,php) in order to prevent errors."
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder=" Enter Your GitHub Username"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info=" GitHub username(eg: John Doe)"
                />

                <TextAreaGroup
                  name="bio"
                  placeholder=" Tell other developer about yourself"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Let the family know more about you, hobbys, books you read etc."
                />
                <div className="mb-5">
                  <button
                    type="button"
                    className="btn btn-dark btn-custom"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    {" "}
                    Add Social Accounts
                  </button>
                  <span className="text-muted mb-5"> Optional</span>
                  {socialInputs}

                  <input
                    type="submit"
                    value="Create Profile"
                    className="btn btn-info btn-custom btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
