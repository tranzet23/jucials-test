const OPTIONS_SPLIT_CHANNEL = {
  splitChannels: true,
  height: 28,
};

const OPTIONS_MONO_CHANNEL = {
  splitChannels: false,
  // height: 140,
};

const OPTIONS_HIDE_CHANNEL = {
  splitChannels: false,
  height: 12,
  cursorColor: 'transparent',
};

export const getOptions = (type: 'split' | 'mono' | 'hide') => {
  switch (type) {
    case 'split': {
      return OPTIONS_SPLIT_CHANNEL;
    }
    case 'hide': {
      return OPTIONS_HIDE_CHANNEL;
    }
    default: {
      return OPTIONS_MONO_CHANNEL;
    }
  }
};
