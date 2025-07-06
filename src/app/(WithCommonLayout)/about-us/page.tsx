import about_mission from "@/assets/images/about-us/about-us-1.jpg";
import about_vision from "@/assets/images/about-us/about-us-2.jpg";
import about_career from "@/assets/images/about-us/about-us-3.jpg";
import about_hero from "@/assets/images/about-us/about-us-hero.jpg";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import check_icom from "/public/check-icon.svg";

const AboutUsPage = () => {
  return (
    <div className="container-md mx-auto px-4 py-8 lg:py-16">
      <section className="mb-6 space-y-4 lg:mb-24 lg:space-y-6">
        <p className="font-bold text-primary">About Us</p>
        <h2 className="text-2xl font-semibold lg:text-4xl lg:leading-[50px]">
          Empowering Financial Freedom for <br className="hidden lg:block" />{" "}
          Bangladesh
        </h2>
        <p className="w-full lg:w-4/5">
          At FinupsBD, we are on a mission to simplify financial decisions for
          every Bangladeshi. We understand that navigating loans, credit cards,
          and other financial products can be overwhelming. That’s why we’ve
          created a one-stop platform to help you make informed choices, check
          your eligibility, and apply for financial products with ease.
        </p>
        <p className="w-full lg:w-4/5">
          Our team of financial experts and tech enthusiasts is dedicated to
          providing you with transparent, reliable, and user-friendly solutions.
          Whether you’re looking for a personal loan, a credit card, or guidance
          on improving your financial health, we’re here to help you every step
          of the way.
        </p>
        <Image src={about_hero} alt="Description of the image" />
      </section>

      <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Our Mission (Why We Exist)
          </h2>
          <p>
            To provide transparent, easy-to-understand financial comparisons
            that empower individuals to achieve their financial goals
          </p>
          <h2 className="mt-5 text-xl font-semibold lg:mt-14 lg:text-2xl">
            What We Do:
          </h2>
          <ul className="mt-4 space-y-4 pl-4">
            <li className="flex items-center gap-2">
              <Image src={check_icom} alt="Check Icon" width={20} height={20} />
              <span>
                Help users compare loans, credit cards, and insurance in minute
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={check_icom} alt="Check Icon" width={20} height={20} />
              <span>
                Provide real-time credit score tracking and improvement tip
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={check_icom} alt="Check Icon" width={20} height={20} />
              <span>
                Offer educational resources to improve financial literacy.
              </span>
            </li>
          </ul>
        </div>
        <div>
          <Image src={about_mission} alt="Our Mission" />
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Image src={about_vision} alt="Our Vision" />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Our Vision (Where We’re Headed)
          </h2>
          <p>
            To be Bangladesh’s leading financial comparison platform, helping
            millions make better financial decisions with confidence.
          </p>
          <h2 className="mt-5 text-xl font-semibold lg:mt-14 lg:text-2xl">
            Core Values:
          </h2>
          <ul className="mt-4 space-y-4 pl-4">
            <li className="flex items-center gap-2">
              <Image src={check_icom} alt="Check Icon" width={20} height={20} />
              <span>
                Transparency: We provide unbiased comparisons and accurate
                information.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={check_icom} alt="Check Icon" width={20} height={20} />
              <span>
                Empowerment: We give users the tools to take control of their
                finances.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={check_icom} alt="Check Icon" width={20} height={20} />
              <span>Simplicity: We make finance easy to understand.</span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={check_icom} alt="Check Icon" width={20} height={20} />
              <span>
                Innovation: We continuously improve our platform to meet user
                needs.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="font-bold text-primary">Join our team</p>
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            We’re just getting started
          </h2>
          <p>
            Our philosophy is simple, hire a team of diverse, passionate people
            and foster a culture that empowers you to do your best work.
          </p>
          <Button>
            <Link href="#">Join With Us</Link>
          </Button>
        </div>
        <div>
          <Image src={about_career} alt="Our Mission" />
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
