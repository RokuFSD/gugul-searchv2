import React from "react";

type ProfileCardProps = {
  email: string;
  name: string;
  pictureSrc: string;
};

function ProfileCard({ email, name, pictureSrc }: ProfileCardProps) {
  return (
    <div className="w-full flex shadow-md h-36 items-center justify-center lg:pl-64">
      <div className="text-center">
        <picture>
          <source srcSet={pictureSrc} type="image/webp" />
          <img
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            alt="user placeholder"
            className="w-20 h-20 rounded-full mx-auto"
          />
        </picture>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="italic text-neutral-300 text-xs">{email}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
