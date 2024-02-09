export interface OverviewResponse {
  classDistribution: string;
  dataSparsity: string;
  testGroups: string[];
  controlGroup: string;
}

export class OverviewResponse implements OverviewResponse {
  constructor() {}
}
