import { Fragment } from "react";
import Main from "../../Components/Elements/Form/Recipes/AddRecipes";
import Footer from "../../Components/Footer/Index";
import Navigation from "../../Components/Navbar/Index";

const EditProfile = () => {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Footer />
    </Fragment>
  );
};

export default EditProfile;
