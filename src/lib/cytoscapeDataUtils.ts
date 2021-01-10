import { MarkdownRemark } from '../@types/graphql-types';

const generateCytoscapeData = (markdown: MarkdownRemark[]) => {
  const data = markdown.map(({ frontmatter: { path, title, prevStep = [], tag = [], category = [] } }, _, array) => {
    const result = [{ data: { id: path, label: title, tag, category } }];
    if (!prevStep) return result;
    const edges = prevStep.map(step => {
      const {
        frontmatter: { category: otherCategory },
      } = array.find(({ frontmatter: { path } }) => path === step);
      const intersection = category.filter(ctg => otherCategory.includes(ctg));
      return { data: { id: `${step}->${path}`, source: path, target: step, category: intersection } };
    });
    return [...result, ...edges];
  });
  return data.reduce((acc: any, val: any) => acc.concat(val), []);
};

export default generateCytoscapeData;
