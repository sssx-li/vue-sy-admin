import type { ElScrollbar } from 'element-plus';

export interface Tag {
  name: string;
  path: string;
}

export const SPACING = 4;
export const firstTag: Tag = { name: 'dashboard', path: '/dashboard' };
export class TagView {
  tags = ref<Tag[]>([]);
  addTag(tag: Tag) {
    if (this.hasTag(tag)) return;
    this.tags.value.push(tag);
  }
  deleteTag(tag: Tag) {
    if (this.isEmpty() || !this.hasTag(tag)) return;
    const index = this.findTagIndex(tag);
    this.tags.value.splice(index, 1);
  }
  deleteAll() {
    this.tags.value = [];
  }
  deleteRightTags(tag: Tag) {
    if (this.isEmpty() || !this.hasTag(tag)) return;
    this.tags.value.splice(this.findTagIndex(tag) + 1);
  }
  deleteOtherTags(tag: Tag) {
    if (this.isEmpty() || !this.hasTag(tag)) return;
    this.tags.value = [tag];
  }
  hasTag(tag: Tag) {
    return !!this.tags.value.find((item) => item.path === tag.path);
  }
  findTagIndex(tag: Tag) {
    return this.tags.value.findIndex((item) => item.path === tag.path);
  }
  findLastTag() {
    return this.tags.value[this.tags.value.length - 1];
  }
  isEmpty() {
    return this.tags.value.length === 0;
  }
}

export function useTags() {
  const route = useRoute();
  const router = useRouter();

  const tagsView = new TagView();
  const scrollTagsRef = ref<InstanceType<typeof ElScrollbar>>();

  const scrollWrapWidth = computed(
    () => scrollTagsRef.value!.wrapRef!.scrollWidth - SPACING * 2
  );

  // 关闭tag
  function closeTag(tag: Tag) {
    tagsView.deleteTag(tag);
    // 如果为空 则跳转到首页
    if (tagsView.isEmpty()) {
      tagsView.addTag(firstTag);
      router.push(firstTag.path);
      return;
    }
    // 如果删除的标签为当前路由所在标签 则跳转最后一个标签
    if (route.path === tag.path) {
      router.push(tagsView.findLastTag().path);
    }
  }

  // 位移到当前标签
  function moveToTag(tag: Tag) {
    const tagItems = document.querySelectorAll<HTMLSpanElement>('.tag-item');
    const curTagIndex = tagsView.findTagIndex(tag);
    let scrollLeft = 0;
    if (curTagIndex > 0) {
      const curTag = tagItems[curTagIndex];
      const { offsetLeft, offsetWidth } = curTag;
      const scrollWidth = offsetLeft + offsetWidth;
      scrollLeft = scrollWidth - scrollWrapWidth.value <= 0 ? 0 : offsetLeft;
    }
    scrollTagsRef.value!.wrapRef!.scrollLeft = scrollLeft;
  }

  watch(
    route,
    () => {
      const tag = {
        name: `${route.meta.title}`,
        path: route.path,
      };
      tagsView.addTag(tag);
      nextTick(() => moveToTag(tag));
    },
    { deep: true, immediate: true }
  );

  return {
    tagsView,
    scrollTagsRef,
    closeTag,
    moveToTag,
  };
}
