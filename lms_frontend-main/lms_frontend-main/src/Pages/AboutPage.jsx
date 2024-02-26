import mainAboutImg from "../Assests/Header.webp";
import CarouselSlide from '../components/carouselSlide'
import { famousPerson } from "../Constants/PersonData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutPage() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills,creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>
          <div className="w-1/2">
            <img src={mainAboutImg} id="test1" alt="" />
          </div>
        </div>

        <div className="carousel w-1/2 m-auto">
          {famousPerson && famousPerson.map(person=> <CarouselSlide {...person} key={person.slideNumber} totalSlide={famousPerson.length}/>)}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutPage;
