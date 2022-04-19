import { calcBrowserScrollWidth } from "./calcBrowserScrollWidth";

// body without scroll: body margin stub, header padding stub
export const toggleBodyScroll = (mode: BodyScrollModeType) => {
    const browserScrollWidth = calcBrowserScrollWidth();

    const bodyOverflow = mode === 'show' ? 'unset' : 'hidden';
    const stubWidth = mode === 'show' ? '0' : `${browserScrollWidth}px`;

    document.body.style.overflow = bodyOverflow;
    document.body.style.marginRight = stubWidth;
    document.querySelector<HTMLElement>('header.header')!.style.paddingRight = stubWidth;
}

type BodyScrollModeType = 'show' | 'hide'