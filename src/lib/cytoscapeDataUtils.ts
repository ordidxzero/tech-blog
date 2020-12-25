import { MarkdownRemark } from '../@types/graphql-types';

export const formatString = (text: string) => text.replace(/\//g, '').replace(/ /g, '-');

const generateCytoscapeData = (array: MarkdownRemark[]) => {
  const data = array.map(({ frontmatter: { path, title, prevStep = [], tag = [], category = [] } }) => {
    const result = [];
    const formattedPath = path ? formatString(path) : formatString(title);
    result.push({ data: { id: formattedPath, label: title, tag, category } });
    if (!prevStep) return result;
    const edges = prevStep.map(step => {
      return { data: { id: `${step}->${formattedPath}`, source: formattedPath, target: step } };
    });
    return [...result, ...edges];
  });
  return data.reduce((acc: any, val: any) => acc.concat(val), []);
};

export default generateCytoscapeData;
