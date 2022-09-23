import classNames from "classnames";
import Image from "next/image";
import { author } from "../blog.config";
import { blurBg, borderColor } from "../styles/common.styles";
import profileImage from "../_content/profile.png";

export type ProfileProps = {};

const Profile: React.FC<ProfileProps> = ({}) => {
  return (
    <div
      className={classNames(
        "profile-grow",
        "flex flex-col md:flex-row justify-center items-center",
        "m-4",
      )}
    >
      <div
        className={classNames(
          "flex-shrink-0",
          "rounded-full p-1 border",
          borderColor,
          "w-24 h-24 md:w-36 md:h-36",
        )}
      >
        <Image
          {...profileImage}
          layout="responsive"
          alt={`${author}'s profile`}
          placeholder="blur"
        />
      </div>
      <div className="flex flex-col justify-center items-center md:items-start md:ml-4">
        <h1 className="text-2xl font-bold">{author}</h1>
        <p>🎢 To become a better developer...!</p>
      </div>
    </div>
  );
};

export default Profile;
