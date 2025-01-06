/* eslint-disable @next/next/no-img-element */
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import {
  SearchIcon,
} from "@/components/icons";
export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center">
      {/*hero Section*/}
      <div className="relative flex flex-col">
        <img alt="banner" src={'/images/hero.jpeg'} />
        <div className="absolute inset-0 flex flex-col flex-grow justify-center items-start mx-auto max-w-7xl container">
          <div className="flex justify-center">
            <Image alt='hero' height={300} src={'/images/FoodMood.svg'} width={600} />
          </div>

          <br />
          <span className='font-sans text-gray-100 text-wrap'>
            Welcome to our exquisite salon, where beauty meets expertise.
          </span>
          <span className='font-sans text-gray-100 text-wrap'>
            Step into a world of luxury and indulgence, where we are
          </span>
          <span className='font-sans text-gray-100 text-wrap'>
            dedicated to enhancing your natural beauty and leaving
          </span>
          <span className='font-sans text-gray-100 text-wrap'>
            you feeling radiant.
          </span>

          <Input aria-label="Search"
            className="mt-4 w-64"
            classNames={{ inputWrapper: "bg-default-100", input: "text-sm", }}
            endContent={<SearchIcon className="flex-shrink-0 text-base text-default pointer-events-none" />}
            labelPlacement="outside"
            placeholder="Search..."
            type="search"
          />

        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between items-center gap-12 bg-white py-12">
        {/* Images Section */}
        <div className="relative flex lg:flex-row flex-col items-center gap-8">
          {/* First Image */}
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Image
              alt="Serving food"
              className="w-full h-full object-cover"
              height={400}
              src="/images/frame2.png"
              width={300}
            />
          </div>
          {/* Second Image */}
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/images/frame1.png"
              alt="Smiling waiter"
              height={400}
              width={300}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative Line */}
          <div className="-top-4 lg:-left-8 absolute bg-brown-500 w-32 h-1 lg:rotate-0 rotate-45"></div>
        </div>

        {/* Text Section */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="mb-4 font-bold text-3xl text-center text-gray-800 lg:text-4xl">
            Welcome TO Our
          </h1>
          <h1 className="mb-4 font-bold text-3xl text-center text-gray-800 lg:text-4xl">
            Luxury Restaurant
          </h1>
          <p className="mb-6 text-center text-gray-600">
            Welcome to our exquisite salon, where beauty meets expertise. Step
            into a world of luxury and indulgence, where we are dedicated to
            enhancing your natural beauty and leaving you feeling radiant.
          </p>
          <div className="flex justify-center mt-12 w-full">
          <button className="bg-default hover:bg-yellow-600 shadow-md px-6 py-2 rounded-full font-semibold text-white">View All</button>
          </div>
        </div>
      </div>






      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
