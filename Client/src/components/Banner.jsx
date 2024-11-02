import { useSelector } from "react-redux";
const Banner = () => {
  const { name, username } = useSelector((state) => state.user);
  return (
    <div className="relative bg-blue-500 h-64 flex items-center justify-center text-center rounded-lg shadow-lg overflow-hidden mb-2 mt-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-75"></div>
      {username ? (
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            {`Welcome, ${name}!`}
          </h1>
          <p className="text-lg text-white">We are glad to have you back!</p>
        </div>
      ) : (
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome!</h1>
          <p className="text-lg text-white">Please Register or Login!</p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
    </div>
  );
};

export default Banner;
