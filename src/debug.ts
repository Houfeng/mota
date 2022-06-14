/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { ReactiveCurrent, nextTick } from "ober";

export function printDependencies(subject?: string) {
  const reactive = ReactiveCurrent.value;
  nextTick(() => {
    if (!reactive) return;
    const list: string[] = [];
    reactive.dependencies.forEach((key) => list.push(key));
    if (subject) console.log(`%c${subject}`, "color:red;");
    return console.table ? console.table(list) : console.log(list);
  });
}
