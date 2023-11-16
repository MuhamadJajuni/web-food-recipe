import { Fragment } from "react";
import ProfileDetail from "../../Components/Elements/Form/Profile/DetailProfile";
import Footer from "../../Components/Footer/Index";
import Navigation from "../../Components/Navbar/Index";

const DetailProfile = () => {
  return (
    <Fragment>
      <Navigation />
      <ProfileDetail />
      <Footer />
    </Fragment>
  );
};

export default DetailProfile;
