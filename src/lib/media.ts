import dims from "@/content/image-dims.json";

const D = dims as unknown as Record<string, [number, number]>;
export const dimsOf = (src: string): [number, number] => D[src] ?? [1200, 800];
export const ratioOf = (src: string) => {
  const [w, h] = dimsOf(src);
  return w / h;
};
