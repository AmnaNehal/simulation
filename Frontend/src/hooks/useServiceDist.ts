import { useState } from 'react';
import { ServiceDist, ServiceDistParams } from '../pages/simulate/SimEngine';

export function useServiceDist(initial: ServiceDist = 'exponential') {
  const [dist, setDist] = useState<ServiceDist>(initial);
  const [uniformMin, setUniformMin] = useState('');
  const [uniformMax, setUniformMax] = useState('');
  const [normalStd, setNormalStd] = useState('');
  const [gammaShape, setGammaShape] = useState('2');

  function getParams(meanSvc: number): ServiceDistParams | undefined {
    switch (dist) {
      case 'uniform': {
        const min = uniformMin === '' ? meanSvc * 0.5 : parseFloat(uniformMin);
        const max = uniformMax === '' ? meanSvc * 1.5 : parseFloat(uniformMax);
        return { uniformMin: Math.min(min, max), uniformMax: Math.max(min, max) };
      }
      case 'normal': {
        const std = normalStd === '' ? meanSvc * 0.3 : parseFloat(normalStd);
        return { normalMean: meanSvc, normalStd: std };
      }
      case 'gamma': {
        const shape = gammaShape === '' ? 2 : parseFloat(gammaShape);
        return { gammaShape: shape, gammaScale: meanSvc / shape };
      }
      default:
        return undefined;
    }
  }

  return {
    dist, setDist,
    uniformMin, setUniformMin, uniformMax, setUniformMax,
    normalStd, setNormalStd, gammaShape, setGammaShape,
    getParams,
  };
}

export type ServiceDistState = ReturnType<typeof useServiceDist>;
