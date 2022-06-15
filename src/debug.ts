/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { ReactiveCurrent, nextTick } from "ober";

/**
 * 在调试控制显示当前组件依赖的数据（状态），
 * 不要在生产环境使用，请在部署在生产环境前移除。
 * @param subject 摘要信息
 */
export function printDependencies(subject?: string) {
  const reactiver = ReactiveCurrent.value;
  nextTick(() => {
    if (!reactiver || !reactiver.dependencies) return;
    const list: string[] = [];
    reactiver.dependencies.forEach((key) => list.push(key));
    if (subject) console.log(`%c${subject}`, "color:red;");
    return console.table ? console.table(list) : console.log(list);
  });
}
