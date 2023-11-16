import { Fragment } from "react";
import Main from "../../Components/Elements/Form/Home/Index";
import Footer from "../../Components/Footer/Index";
import Navigation from "../../Components/Navbar/Index";

const Home = () => {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Footer />
    </Fragment>
  );
};

export default Home;
