import { WorkflowRoutes } from './workflow-routes.model';

export interface Step {
  label: string;
  route: string;
}

export const steps: Step[] = [
  { label: 'Data Overview', route: WorkflowRoutes.OVERVIEW },
  { label: 'Preprocessing', route: WorkflowRoutes.PREPROCESSING },
  { label: 'Wrapper', route: WorkflowRoutes.WRAPPER },
  { label: 'Results', route: WorkflowRoutes.RESULTS },
];
