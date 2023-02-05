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
import { RouteStateService } from '../services/route-state.service';
import { WorkflowRoutes } from './models/workflow-routes.model';
import { WorkflowService } from './services/workflow.service';

@Injectable({
  providedIn: 'any',
})
export class WorkflowGuard implements CanActivate {
  previousRoute: string;

  constructor(
    private workflow: WorkflowService,
    private router: Router,
    private routeState: RouteStateService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const navigationAllowed = this.allowNavigation(
      route.routeConfig.path,
      this.workflow
    );

    if (navigationAllowed) {
      return navigationAllowed;
    }

    const tree: UrlTree = this.router.parseUrl(
      this.routeState.currentRoute.value
    );
    return tree;
  }

  allowNavigation(route: string, workflow: WorkflowService) {
    switch (route) {
      case WorkflowRoutes.OVERVIEW:
        return true;
      case WorkflowRoutes.PREPROCESSING:
        return workflow.overviewImages !== undefined;
      case WorkflowRoutes.WRAPPER:
        return workflow.preprocessingImages !== undefined;
      case WorkflowRoutes.RESULTS:
        return workflow.wrapperImages !== undefined;
    }

    return false;
  }
}
