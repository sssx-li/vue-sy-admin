import type { DirectiveOptions } from '../types';

const watermarksDirective: DirectiveOptions<'vWatermarks'> = {
  name: 'watermarks',
  directive: {
    mounted: (el: HTMLElement, { value: { text, styles = {} } }) => {
      const {
        width = 144,
        height = 66,
        rotate = -30,
        font = '12px Microsoft JhengHei',
        fillStyle = 'rgba(0, 0, 0, 0.4)',
      } = styles;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.display = 'none';
      el.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      ctx!.rotate((rotate * Math.PI) / 180);
      ctx!.fillStyle = fillStyle;
      ctx!.textAlign = 'left';
      ctx!.font = font;
      ctx!.textBaseline = 'middle';
      ctx!.fillText(text, canvas.width / 10, canvas.height / 2);

      el.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
    },
  },
};

export default watermarksDirective;
