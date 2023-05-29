import React from "react";
import "./DashboardContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";

type MemberItemProps = {
  name: string;
  quantity: number;
  background: string;
  iconType: any;
};

const MemberItem: React.FC<MemberItemProps> = (props) => {
  const animatedCount = useSpring({
    from: { number: 0 },
    to: { number: props.quantity },
    delay: 200,
    config: { duration: 500 },
  });

  return (
    <div
      className="memberitem__container"
      style={{ backgroundColor: `${props.background}` }}
    >
      <h2>{props.name}</h2>
      <div className="quantity__container">
        <animated.p>
          {animatedCount.number.interpolate((value) => Math.floor(value))}
        </animated.p>
        <p className="plusign">+</p>
      </div>
      <FontAwesomeIcon icon={props.iconType} className="background-icon" />
    </div>
  );
};
export default MemberItem;
