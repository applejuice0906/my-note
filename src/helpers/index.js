export const calcUniqueID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const setCaretToEnd = (element) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  element.focus();
};

export const getCaretCoordinates = (fromStart = true) => {
  const isSupported = typeof window.getSelection !== 'undefined';
  if (isSupported) {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(fromStart);
      // const scrollY = document.getElementById('editablePage').scrollTop;
      const rect = range.getClientRects()[0];
      if (rect) {
        return { x: rect.left, y: rect.top };
      }
    }
  }
};
