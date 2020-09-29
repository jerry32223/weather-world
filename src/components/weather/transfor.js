import moment from "moment";

// export const transforTemp = (value) => Math.floor((value - 32) * (5 / 9));

export const transforTemp = (value) => Math.round(value);

export const transforTime = (value, type) => {
  let display = "";
  switch (type) {
    case 1:
      display = "YY-MM-DD HH:mm:ss";
      break;
    case 2:
      display = "YY-MM-DD";
      break;
    case 3:
      display = "dddd";
      break;
    case 4:
      display = "YY-MM-DD HH:mm";
      break;
    case 5:
      display = "HH:mm";
      break;
    case 7:
      display = "ddd";
      break;
    default:
      display = "YY-MM-DD HH:mm:ss";
  }

  return moment(value).format(display);
};

export const transforIcon = (value) => value.replace(/-/g, "_").toUpperCase();
