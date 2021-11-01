function Story({ username, img }) {
  return (
    <div className="">
      <img
        className="h-14 w-14 rounded-full border-2 border-red-400 p-[1.5px] cursor-pointer hover:scale-110 transition-all ease-out"
        src={img}
        alt=""
      />
      <p className="text-xs w-14 truncate"> {username}</p>
    </div>
  );
}

export default Story;
