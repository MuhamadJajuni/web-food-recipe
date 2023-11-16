import { Fragment } from "react";
import Main from "../../Components/Elements/Form/Recipes/DetailRecipes";
import Footer from "../../Components/Footer/Index";
import Navigation from "../../Components/Navbar/Index";

const DetailMenu = () => {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Footer />
    </Fragment>
  );
};

export default DetailMenu;
