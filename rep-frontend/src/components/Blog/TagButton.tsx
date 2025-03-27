const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      href={href}
      className=" mb-3 mr-3 inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm duration-300 hover:text-white bg-[#2C303B] text-white hover:bg-[#1E3A8A]"
    >
      {text}
    </a>
  );
};

export default TagButton;
