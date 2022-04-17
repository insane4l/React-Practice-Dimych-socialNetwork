export const calcBrowserScrollWidth = () => {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll'; // for add browser scroll standard
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth; // size with scroll - size without scroll
    div.remove();

    return scrollWidth;
}