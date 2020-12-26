import fs from 'fs';
import yaml from 'js-yaml';
import { formatString } from './cytoscapeDataUtils';

const filterEmptyString = (array: string[]) => array.filter(item => !!item);

const MARKDOWN_FILE_PATH = `${process.cwd()}/posts`;
const CMS_CONFIG_FILE_PATH = `${process.cwd()}/static/admin/config.yml`;

const fileList = fs.readdirSync(MARKDOWN_FILE_PATH);

const markdown = fileList.map(file => {
  const fileData = fs.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, {
    encoding: 'utf-8',
  });

  const metaData = fileData.split('---')[1].split('\n');

  const formatMetaData = filterEmptyString(metaData);

  const removeColon = formatMetaData.map(item => filterEmptyString(item.trim().split(':')));

  const extractTitleAndPath = removeColon.filter(item => item[0] === 'title' || item[0] === 'path');

  return extractTitleAndPath.reduce((obj, curr) => {
    const key = curr[0] as string;
    obj[key] = curr[1].trim();
    return obj;
  }, {} as { [key: string]: any });
});

const data = markdown.map(({ title, path }) => {
  if (path) return { label: title, value: path };
  const newPath = formatString(title);
  return { label: title, value: newPath };
});

const file = yaml.safeLoad(fs.readFileSync(CMS_CONFIG_FILE_PATH, { encoding: 'utf-8' })) as any;

const prevStep = file.collections[0].fields.find((item: any) => item.name === 'prevStep');

prevStep.options = data;

fs.writeFileSync(CMS_CONFIG_FILE_PATH, yaml.safeDump(file));
