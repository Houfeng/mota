import { DependencyList, useEffect } from 'react';
import { autorun, watch } from 'ober';

export const useWatch = (
  selector: () => any,
  handler: () => void,
  immed = true,
  deps: DependencyList = []
) => {
  return useEffect(() => watch(selector, handler, immed), [immed, ...deps]);
}

export const useAutoRun = (
  handler: () => void,
  deps: DependencyList = []
) => {
  return useEffect(() => autorun(handler), deps);
}