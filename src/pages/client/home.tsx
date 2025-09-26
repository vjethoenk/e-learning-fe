import Banner from "./banner";
import PopularCategories from "../../components/client/categories/home.category";
import FeaturedCourses from "../../components/client/courses/home.course";
import Features from "./review/features";
import CallToAction from "./review/callAction";
import SuccessStories from "./review/stories";
const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <FeaturedCourses></FeaturedCourses>
      <PopularCategories></PopularCategories>
      <SuccessStories></SuccessStories>
      <CallToAction></CallToAction>
    </div>
  );
};
export default HomePage;
