import { Fragment } from "react";
import FormUpdate from "../../Components/Elements/Form/Recipes/UpdateRecipes";
import Footer from "../../Components/Footer/Index";
import Navigation from "../../Components/Navbar/Index";

const UpdateMenu = () => {
  return (
    <Fragment>
      <Navigation />
      <FormUpdate />
      <Footer />
    </Fragment>
  );
};

export default UpdateMenu;
