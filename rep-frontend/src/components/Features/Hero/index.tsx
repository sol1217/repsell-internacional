const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 mt-32 flex h-96  w-screen items-center justify-center overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:h-screen md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="video-repsell absolute inset-0 z-0 flex  h-full w-full items-center justify-center">
          <video
            className="absolute inset-0 h-full w-full object-contain md:object-cover"
            autoPlay
            loop
            playsInline
            muted
          >
            <source src="/images/video/repsell.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
};

export default Hero;
