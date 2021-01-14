import { MarkdownRemark } from '../@types/graphql-types';

const findByStepName = (step: string) => ({ parent }: MarkdownRemark) => {
  const { name } = parent as any;
  return name === step;
};

const generateCytoscapeData = (markdown: MarkdownRemark[]) => {
  const data = markdown.map(({ frontmatter: { title, prevStep = [], tag = [], category = [] }, parent }, _, markdownArray) => {
    const { name } = parent as any;
    const result = [{ data: { id: name, label: title, tag, category } }];
    if (!prevStep) return result;
    const edges = prevStep.map(step => {
      const {
        frontmatter: { category: otherCategory },
      } = markdownArray.find(findByStepName(step));
      const intersection = category.filter(ctg => otherCategory.includes(ctg));
      return { data: { id: `${step}->${name}`, source: name, target: step, category: intersection } };
    });
    return [...result, ...edges];
  });
  return data.reduce((acc: any, val: any) => acc.concat(val), []);
};

export default generateCytoscapeData;
