function Story({ username, img, size, titleStyle, storyStyle }) {
  return (
    <div>
      <img
        className={`w-${size} h-${size} ${storyStyle} `}
        src={img}
        alt="Picture of the author"
      />
      <p className={`w-${size} truncate ${titleStyle}`}> {username}</p>
    </div>
  );
}

export default Story;
