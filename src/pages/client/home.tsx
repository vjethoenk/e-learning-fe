import Banner from "./banner";
import PopularCategories from "./categories/PopularCategories";
import FeaturedCourses from "./courses/FeaturedCourses";
import Features from "./features";
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
