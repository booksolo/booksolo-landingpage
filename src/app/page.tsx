import Hero from "@/components/Hero";
// import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
// import FAQ from "@/components/FAQ";
// import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import Section from "@/components/Section";
// import Stats from "@/components/Stats";
// import CTA from "@/components/CTA";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      {/* <Logos /> */}
      <Container>
        <Benefits />
        <Gallery />

        <Section
          id="pricing"
          title="Simple, conversational subscription"
          description="Activate your Booksolo subscription in seconds through our intelligent chat. No forms, no complexity—just a natural conversation."
        >
          <Pricing />
        </Section>

        {/* <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section> */}

        {/* <FAQ /> */}

        {/* <Stats /> */}

        {/* <CTA /> */}
      </Container>
      <Newsletter />
    </>
  );
};

export default HomePage;
