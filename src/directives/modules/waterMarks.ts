import type { DirectiveOptions } from '../types';

const watermarksDirective: DirectiveOptions<'vWatermarks'> = {
  name: 'watermarks',
  directive: {
    mounted: (el: HTMLElement, binding) => {
      const { text, textColor = 'rgba(0, 0, 0, 0.4)', styles } = binding.value;
      const style = {
        width: 144,
        height: 66,
        rotate: -30,
        ...styles,
      };

      const canvas = document.createElement('canvas');
      canvas.width = style.width;
      canvas.height = style.height;
      canvas.style.display = 'none';
      el.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      ctx!.rotate((style.rotate * Math.PI) / 180);
      ctx!.fillStyle = textColor;
      ctx!.textAlign = 'left';
      ctx!.textBaseline = 'middle';
      ctx!.fillText(text, canvas.width / 10, canvas.height / 2);

      el.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
    },
  },
};

export default watermarksDirective;
