function ProfilePost({ id, img }) {
  return (
    <div>
      <img src={img} alt="p" className=" lg:w-78 lg:h-72 object-cover" />
    </div>
  );
}

export default ProfilePost;
