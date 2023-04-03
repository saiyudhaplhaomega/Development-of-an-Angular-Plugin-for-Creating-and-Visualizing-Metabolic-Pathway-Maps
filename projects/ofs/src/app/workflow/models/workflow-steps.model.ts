import { WorkflowRoutes } from './workflow-routes.model';

export interface Step {
  index: number;
  label: string;
  route: string;
}

export const steps: Step[] = [
  {
    index: 0,
    label: 'Data Overview',
    route: WorkflowRoutes.OVERVIEW,
  },
  {
    index: 1,
    label: 'Preprocessing',
    route: WorkflowRoutes.PREPROCESSING,
  },
  {
    index: 2,
    label: 'Wrapper',
    route: WorkflowRoutes.WRAPPER,
  },
  {
    index: 3,
    label: 'Results',
    route: WorkflowRoutes.RESULTS,
  },
];
