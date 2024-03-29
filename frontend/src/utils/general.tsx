export const characterLimit = (text: string | undefined, limit: number) => {
  if (typeof text === 'undefined') {
    return undefined;
  }

  return text.length > limit ? text.substr(0, limit - 1).trim() + '...' : text;
};
