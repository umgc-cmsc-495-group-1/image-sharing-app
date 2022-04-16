function determinBarHeight(width: number): number {
  let barHeight = 0;

  if (width >= 1536) {
    barHeight = 222.086;
  } else if (width >= 1200 && width < 1536) {
    barHeight = 240.086;
  } else if (width >= 900 && width < 1200) {
    barHeight = 220.086;
  } else if (width >= 600 && width < 900) {
    barHeight = 234.086;
  } else if (width >= 400 && width < 600) {
    barHeight = 248.086;
  } else if (width >= 300 && width < 400) {
    barHeight = 268.086;
  } else if (width >= 250 && width < 300) {
    barHeight = 386.086;
  } else {
    barHeight = 400;
  }

  return barHeight;
}

function determineIconSize(margin: number): number {
  let fontSize = 0;

  switch (margin) {
    case 20:
      fontSize = 70;
      break;
    case 15:
      fontSize = 50;
      break;
    case 10:
      fontSize = 40;
      break;
    case 5:
      fontSize = 30;
      break;
    case 3:
      fontSize = 25;
      break;
    default:
      fontSize = 20;
      break;
  }

  return fontSize;
}

function determineMarginAndPadding(width: number) {
  let currentMargin = 0;
  let currentPadding = 0;

  if (width < 1200 && width > 800) {
    currentMargin = 15;
    currentPadding = 5;
  } else if (width < 800 && width > 600) {
    currentMargin = 10;
    currentPadding = 5;
  } else if (width < 600 && width > 400) {
    currentMargin = 5;
    currentPadding = 2;
  } else if (width < 400 && width > 275) {
    currentMargin = 3;
    currentPadding = 2;
  } else {
    currentMargin = 20;
    currentPadding = 5;
  }
  return { margin: currentMargin, padding: currentPadding };
}

export {
  determinBarHeight,
  determineIconSize,
  determineMarginAndPadding
}