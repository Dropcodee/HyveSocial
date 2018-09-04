import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileCredential from "./ProfileCredencial";
import ProfileAbout from "./ProfileAbout";
import ProfileGit from "./ProfileGit";
import { getProfileByHandle } from "../../actions/profileActions";
import Spinner from "../common/spinner";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/notfound");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    // checking if the profile is null or its fetching data
    if (profile === null || profile === loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles">
                <button className="btn btn-custom"> Back to profiles.</button>
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCredential
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGit username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
