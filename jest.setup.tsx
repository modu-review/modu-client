import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({priority, fill, ...props}: {priority: boolean; fill: boolean}) => (
    <img {...props} loading={priority ? 'eager' : 'lazy'} className={fill ? 'absolute' : 'static'} />
  ),
}));

window.HTMLElement.prototype.setPointerCapture = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// https://stackoverflow.com/questions/68023284/react-testing-library-user-event-throws-error-typeerror-root-elementfrompoint/77219899#77219899
// Tiptap이 기반하고 있는 Prosemirror가 참조하는 레이아웃 정보를 jsdom에서 지원하지 않음.
// 해당 레이아웃 관련 정보를 stub 처리
function getBoundingClientRect(): DOMRect {
  const rec = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
  return {...rec, toJSON: () => rec};
}

class FakeDOMRectList extends Array<DOMRect> implements DOMRectList {
  item(index: number): DOMRect | null {
    return this[index];
  }
}

document.elementFromPoint = (): null => null;
HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
HTMLElement.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
Range.prototype.getBoundingClientRect = getBoundingClientRect;
Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
window.scrollBy = jest.fn();
