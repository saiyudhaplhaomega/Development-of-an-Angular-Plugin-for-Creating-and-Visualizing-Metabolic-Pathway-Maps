import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WorkflowRoutes } from './models/workflow-routes.model';
import { WorkflowService } from './services/workflow.service';

@Injectable({
  providedIn: 'any',
})
export class WorkflowGuard implements CanActivate {
  constructor(private workflow: WorkflowService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;

    switch (route.routeConfig.path) {
      case WorkflowRoutes.OVERVIEW:
        return true;
      case WorkflowRoutes.PREPROCESSING:
        if (this.workflow.overviewImages !== undefined) {
          return true;
        }
        break;
      case WorkflowRoutes.WRAPPER:
        if (this.workflow.preprocessingImages !== undefined) {
          return true;
        }
        break;
      case WorkflowRoutes.RESULTS:
        if (this.workflow.wrapperImages !== undefined) {
          return true;
        }
        break;
    }

    console.log(state);

    const url = 'workflow/overview';
    const tree: UrlTree = this.router.parseUrl(url);
    return tree;
  }
}
