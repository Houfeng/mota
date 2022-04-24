/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { autorun, watch } from "ober";

import { useEffect } from "react";

export const useWatch = (
  selector: () => any,
  handler: () => void,
  immed = true
) => {
  return useEffect(() => watch(selector, handler, immed), [immed]);
};

export const useAutoRun = (handler: () => void) => {
  return useEffect(() => autorun(handler), []);
};
