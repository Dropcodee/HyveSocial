import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/spinner";
import ProfileItems from "./ProfileItems";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItems key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles yet....</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4 text-center"> Developers </div>
              <p className="lead text-center">
                {" "}
                Browse and connect with diffrent developers.
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
