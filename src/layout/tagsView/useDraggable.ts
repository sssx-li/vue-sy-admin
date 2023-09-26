import { ref, onMounted } from 'vue';

interface Position {
  top: number;
  left: number;
}

class Flip {
  elementNodes: Element[];
  duration: number;
  animateQueue: number[];
  initialPositions: { top: number; left: number }[];

  constructor(elementNodes: HTMLCollection, duration: number) {
    this.elementNodes = Array.from(elementNodes);
    this.duration = duration;
    this.animateQueue = [];
    this.count = 0;
    this.initialPositions = this.recordInitialPositions();
  }

  recordInitialPositions() {
    const positions: Position[] = [];
    this.elementNodes.forEach((item) => {
      const { top, left } = item.getBoundingClientRect();
      positions.push({ top, left });
    });
    return positions;
  }

  play() {
    for (let i = 0; i < this.elementNodes.length; i++) {
      const initialPosition = this.initialPositions[i];
      const rect = this.elementNodes[i].getBoundingClientRect();
      const currentPosition = { top: rect.top, left: rect.left };

      const translateX = initialPosition.left - currentPosition.left;
      const translateY = initialPosition.top - currentPosition.top;

      if (
        (translateX === 0 && translateY === 0) ||
        this.animateQueue.includes(i)
      ) {
        // 如果元素没有移动或者正在移动，就跳过
        continue;
      }

      this.animateQueue.push(i);
      console.log(
        this.animateQueue,
        'start',
        i,
        '----',
        'translateX',
        translateX,
        'translateY',
        translateY
      );
      const animation = this.elementNodes[i].animate(
        [
          { transform: `translate(${translateX}px, ${translateY}px)` },
          { transform: 'translate(0px, 0px)' },
        ],
        {
          duration: this.duration * 1000,
        }
      );

      animation.onfinish = () => {
        this.initialPositions[i] = currentPosition;
        this.animateQueue = this.animateQueue.filter((item) => item !== i);
        console.log(this.animateQueue, 'end');
      };
    }
  }
  raf(animationFrame: any) {
    requestAnimationFrame(() => {
      requestAnimationFrame(animationFrame);
    });
  }
}

export function useDraggable(duration = 3) {
  const dragRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    let sourceNode: HTMLElement | null = null;
    let flip: Flip | null = null;

    dragRef.value!.addEventListener('dragstart', (event: DragEvent) => {
      if (!event.target) return;

      setTimeout(() => {
        (event.target as HTMLElement).classList.add('moving');
      }, 0);

      sourceNode = event.target as HTMLElement;
      event.dataTransfer!.effectAllowed = 'move';
      flip = new Flip(dragRef.value!.children, duration);
    });

    dragRef.value!.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault();
    });

    dragRef.value!.addEventListener('dragenter', (event: DragEvent) => {
      event.preventDefault();

      if (
        event.target === dragRef.value ||
        event.target === sourceNode ||
        !Array.from(dragRef.value!.children).includes(
          event.target as HTMLElement
        )
      ) {
        return;
      }

      const children = Array.from(dragRef.value!.children);
      const sourceIndex = children.indexOf(sourceNode!);
      const targetIndex = children.indexOf(event.target as HTMLElement);

      if (sourceIndex < targetIndex) {
        dragRef.value!.insertBefore(
          sourceNode!,
          (event.target as HTMLElement).nextElementSibling
        );
      } else {
        dragRef.value!.insertBefore(sourceNode!, event.target as HTMLElement);
      }

      flip!.play();
    });

    dragRef.value!.addEventListener('dragend', (event: DragEvent) => {
      (event.target as HTMLElement).classList.remove('moving');
    });
  });

  return { dragRef };
}
