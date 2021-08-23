import React from 'react';

export default function Image(props) {
  const wrongUrl = `https://starwars-visualguide.com/assets/img/big-placeholder.jpg`;
  let trueUrl = `https://starwars-visualguide.com/assets/img/${props.type}s/${props.id}.jpg`,
    wrongArr = [],
    finalUrl = wrongUrl,
    check = true;

  switch (props.type) {
    case 'planet':
      wrongArr = [1];
      break;
    case 'starship':
      wrongArr = [
        5, 9, 10, 11, 12, 13, 15, 21, 22, 23, 27, 28, 29, 31, 39, 40, 41, 43,
        47, 48,
      ];
      check = false;
      break;
    default:
      wrongArr = [];
      break;
  }

  if (check) {
    if (wrongArr.includes(props.id)) {
      finalUrl = wrongUrl;
    } else {
      finalUrl = trueUrl;
    }
  } else {
    if (wrongArr.includes(props.id)) {
      finalUrl = trueUrl;
    } else {
      finalUrl = wrongUrl;
    }
  }

  return (
    <img
      className={props.class}
      src={finalUrl}
      alt={`imageNumber${props.id}`}
    />
  );
}
