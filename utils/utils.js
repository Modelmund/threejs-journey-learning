import { join, resolve } from 'path';
import { readdirSync } from 'fs';

const FOLDER_NAME_REGEX = /(^\d+.)|(index\.html)$/i;
/**
 * 遍历文件目录，自动生成多页面文件路径
 * @returns routes
 */
export function generateRoutes() {
  let routes = {};
  const rootDir = join(__dirname, '../');
  const filteredPath =  readdirSync(rootDir).filter((file) => {
    return FOLDER_NAME_REGEX.test(file)
  })
  filteredPath.map(file => {
    if(file.includes('index.html')) {
      routes['index'] = resolve(rootDir, file)
    } else {
      routes[`${file.split('-').pop()}`] = resolve(rootDir, `${file}/index.html`)
    }
  })
  return routes;
}