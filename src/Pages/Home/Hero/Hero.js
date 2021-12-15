import React from "react";

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage:
          'url("https://i.postimg.cc/26r0c4h3/bannerbackground.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[500px]"
    >
      <div className="max-w-6xl xl:mx-auto mx-5">
        <div className="flex justify-center items-center flex-col h-80">
          <h1 className="text-3xl mb-4">Best food waiting for your belly</h1>

          {/* input search */}
          <div className="relative w-full md:2/6 lg:w-2/6 ">
            <input type="text" className="border-0 rounded-full w-full py-4" />
            <button className="absolute rounded-full right-0 bg-red-500 py-4 px-5 text-white">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
