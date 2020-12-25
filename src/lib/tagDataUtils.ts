import { File } from '../@types/graphql-types';

export const flattenArray = (array: string[][]): string[] => array.reduce((a, b) => a.concat(b), []);

export const filterOverlap = (array: string[]): string[] => Array.from(new Set(array));

export const findLogoByName = (array: File[], nameToNeed: string) =>
  array.find(({ childImageSharp: { fluid } }) => {
    const { originalName } = fluid;
    const name = originalName.split('_')[0];
    return name === nameToNeed;
  });
