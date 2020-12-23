import { MarkdownRemark } from '../@types/graphql-types';

const formatString = (text: string) => text.replace(/\//g, '').replace(/ /g, '-');

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

export const data = [
  {
    data: {
      id: 'Post01',
      label: 'Post01',
      tag: ['mongodb', 'nodejs', 'html5'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post02',
      label: 'Post02',
      tag: ['gulp', 'pug'],
      category: 'book',
    },
  },
  {
    data: {
      id: 'Post03',
      label: 'Post03',
      tag: ['django'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post04',
      label: 'Post04',
      tag: ['mongodb'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post05',
      label: 'Post05',
      tag: ['reactjs', 'css3'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post06',
      label: 'Post06',
      tag: [],
      category: 'book',
    },
  },
  {
    data: {
      id: 'Post07',
      label: 'Post07',
      tag: ['gulp'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post08',
      label: 'Post08',
      tag: ['python'],
      category: 'book',
    },
  },
  {
    data: {
      id: 'Post08',
      label: 'Post08',
      tag: ['gulp'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post09',
      label: 'Post09',
      tag: ['django', 'reactjs', 'css3'],
      category: 'book',
    },
  },
  {
    data: {
      id: 'Post10',
      label: 'Post10',
      tag: [],
      category: 'book',
    },
  },
  {
    data: {
      id: 'Post11',
      label: 'Post11',
      tag: ['reactjs', 'css3', 'mongodb'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post12',
      label: 'Post12',
      tag: ['javascript', 'mongodb', 'graphql'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post13',
      label: 'Post13',
      tag: ['python', 'pug'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post14',
      label: 'Post14',
      tag: ['typescript', 'django', 'go'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post15',
      label: 'Post15',
      tag: [],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post16',
      label: 'Post16',
      tag: ['graphql', 'typescript', 'go'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post17',
      label: 'Post17',
      tag: ['graphql', 'html5'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post18',
      label: 'Post18',
      tag: ['pug', 'mongodb'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post19',
      label: 'Post19',
      tag: ['mongodb'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post20',
      label: 'Post20',
      tag: ['django', 'python', 'javascript'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post21',
      label: 'Post21',
      tag: ['graphql', 'html5'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post22',
      label: 'Post22',
      tag: ['css3', 'html5'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post23',
      label: 'Post23',
      tag: ['html5', 'javascript'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post24',
      label: 'Post24',
      tag: ['graphql', 'gulp'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post25',
      label: 'Post25',
      tag: ['gulp', 'html5'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post26',
      label: 'Post26',
      tag: ['django'],
      category: 'theory',
    },
  },
  {
    data: {
      id: 'Post27',
      label: 'Post27',
      tag: ['django', 'nodejs'],
      category: 'project',
    },
  },
  {
    data: {
      id: 'Post01->Post02',
      source: 'Post02',
      target: 'Post01',
    },
  },
  {
    data: {
      id: 'Post01->Post12',
      source: 'Post12',
      target: 'Post01',
    },
  },
  {
    data: {
      id: 'Post01->Post15',
      source: 'Post15',
      target: 'Post01',
    },
  },
  {
    data: {
      id: 'Post02->Post03',
      source: 'Post03',
      target: 'Post02',
    },
  },
  {
    data: {
      id: 'Post02->Post04',
      source: 'Post04',
      target: 'Post02',
    },
  },
  {
    data: {
      id: 'Post04->Post05',
      source: 'Post05',
      target: 'Post04',
    },
  },
  {
    data: {
      id: 'Post04->Post06',
      source: 'Post06',
      target: 'Post04',
    },
  },
  {
    data: {
      id: 'Post06->Post07',
      source: 'Post07',
      target: 'Post06',
    },
  },
  {
    data: {
      id: 'Post07->Post08',
      source: 'Post08',
      target: 'Post07',
    },
  },
  {
    data: {
      id: 'Post08->Post09',
      source: 'Post09',
      target: 'Post08',
    },
  },
  {
    data: {
      id: 'Post08->Post10',
      source: 'Post10',
      target: 'Post08',
    },
  },
  {
    data: {
      id: 'Post10->Post11',
      source: 'Post11',
      target: 'Post10',
    },
  },
  {
    data: {
      id: 'Post10->Post12',
      source: 'Post12',
      target: 'Post10',
    },
  },
  {
    data: {
      id: 'Post11->Post13',
      source: 'Post13',
      target: 'Post11',
    },
  },
  {
    data: {
      id: 'Post12->Post14',
      source: 'Post14',
      target: 'Post12',
    },
  },
  {
    data: {
      id: 'Post15->Post16',
      source: 'Post16',
      target: 'Post15',
    },
  },
  {
    data: {
      id: 'Post15->Post17',
      source: 'Post17',
      target: 'Post15',
    },
  },
  {
    data: {
      id: 'Post16->Post20',
      source: 'Post20',
      target: 'Post16',
    },
  },
  {
    data: {
      id: 'Post17->Post18',
      source: 'Post18',
      target: 'Post17',
    },
  },
  {
    data: {
      id: 'Post18->Post19',
      source: 'Post19',
      target: 'Post18',
    },
  },
  {
    data: {
      id: 'Post19->Post24',
      source: 'Post24',
      target: 'Post19',
    },
  },
  {
    data: {
      id: 'Post20->Post21',
      source: 'Post21',
      target: 'Post20',
    },
  },
  {
    data: {
      id: 'Post20->Post22',
      source: 'Post22',
      target: 'Post20',
    },
  },
  {
    data: {
      id: 'Post20->Post23',
      source: 'Post23',
      target: 'Post20',
    },
  },
  {
    data: {
      id: 'Post23->Post24',
      source: 'Post24',
      target: 'Post23',
    },
  },
];
