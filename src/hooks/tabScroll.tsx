import {RefObject} from 'react';

export interface IRefs {
    bunRef: RefObject<HTMLDivElement>;
    mainRef: RefObject<HTMLDivElement>;
    sauceRef: RefObject<HTMLDivElement>;
}

export function tabScroll({bunRef, mainRef, sauceRef, tabRef}: IRefs & { tabRef: RefObject<HTMLElement> }) {
    const bunPlace = bunRef.current?.getBoundingClientRect().top as number;
    const mainPlace = mainRef.current?.getBoundingClientRect().top as number;
    const saucePlace = sauceRef.current?.getBoundingClientRect().top as number;
    const menuPlace = tabRef.current?.getBoundingClientRect().bottom as number;

    let bunLocation = Math.abs(menuPlace - bunPlace);
    let mainLocation = Math.abs(menuPlace - mainPlace);
    let sauceLocation = Math.abs(menuPlace - saucePlace);

    if (bunLocation <= mainLocation && bunLocation <= sauceLocation) {
        return 'bun';
    } else if (sauceLocation <= bunLocation && sauceLocation <= mainLocation) {
        return 'sauce';
    } else {
        return 'main';
    }
}