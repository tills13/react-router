import {
  Action,
  Basename,
  CreateHistory,
  History,
  HistoryBasename,
  HistoryBasenameOptions,
  HistoryQueries,
  Href,
  Location,
  LocationDescriptor,
  LocationKey,
  LocationState,
  Path,
  Pathname,
  Query,
  Search
} from "history";

import {
  ComponentClass,
  ClassAttributes,
  CSSProperties,
  HTMLProps,
  ReactNode,
  Requireable,
  StatelessComponent,
  Validator
} from "react";

import { default as createMemoryHistory } from "history/lib/createMemoryHistory";

declare module "react-router" {
  /* browser history */
  const browserHistory: History;

  /* history */

  // export createMemoryHistory;
  const hashHistory: History;

  /* IndexLink */

  type ToLocationFunction = (location: Location) => LocationDescriptor;

  interface IndexLinkProps extends HTMLProps<any> {
    to: LocationDescriptor | ToLocationFunction;
    activeClassName?: string;
    activeStyle?: CSSProperties;
  }

  type IndexLink = ComponentClass<IndexLinkProps>;

  const IndexLink: IndexLink;

  interface IndexRedirectProps extends ClassAttributes<any> {
    to: RoutePattern;
    query?: Query;
  }

  type IndexRedirect = ComponentClass<IndexRedirectProps>;
  const IndexRedirect: IndexRedirect;

  type ComponentCallback = (err: any, component: RouteComponent) => any;
  type ComponentsCallback = (err: any, components: RouteComponents) => any;

  interface IndexRouteProps {
    component?: RouteComponent;
    components?: RouteComponents;
    getComponent?(nextState: RouterState, callback: ComponentCallback): void;
    getComponents?(nextState: RouterState, callback: ComponentsCallback): void;
    onEnter?: EnterHook;
    onChange?: ChangeHook;
    onLeave?: LeaveHook;
  }

  type IndexRoute = ComponentClass<IndexRouteProps>;
  const IndexRoute: IndexRoute;

  /* Link */
  export interface LinkProps extends IndexLinkProps {
    onlyActiveOnIndex?: boolean;
  }

  type Link = ComponentClass<LinkProps>;
  const Link: Link;

  /* match */
  interface MatchArgs {
    routes: RouteConfig;
    basename?: Basename;
    parseQueryString?: ParseQueryString;
    stringifyQuery?: StringifyQuery;
  }

  interface MatchLocationArgs extends MatchArgs {
    location: LocationDescriptor;
    history?: History;
  }

  interface MatchHistoryArgs extends MatchArgs {
    location?: LocationDescriptor;
    history: History;
  }

  type MatchCallback = (error: any, redirectLocation: Location, renderProps: any) => void;
  function match(args: MatchLocationArgs | MatchHistoryArgs, cb: MatchCallback): void;

  /* pattern */
  function formatPattern(pattern: RoutePattern, params: any): string;

  /* prop types */
  interface RouterShape extends Validator<any> {
    push: Requireable<any>;
    replace: Requireable<any>;
    go: Requireable<any>;
    goBack: Requireable<any>;
    goForward: Requireable<any>;
    setRouteLeaveHook: Requireable<any>;
    isActive: Requireable<any>;
  }

  interface LocationShape extends Validator<any> {
    pathname: Requireable<any>;
    search: Requireable<any>;
    state: any;
    action: Requireable<any>;
    key: any;
  }

  const routerShape: RouterShape;
  const locationShape: LocationShape;

  /* redirect */
  interface RedirectProps extends IndexRedirectProps {
    from: RoutePattern;
  }

  type Redirect = ComponentClass<RedirectProps>;
  const Redirect: Redirect;

  /* route */
  interface RouteProps extends IndexRouteProps {
    path?: RoutePattern;
  }

  type Route = ComponentClass<RouteProps>;
  const Route: Route;

  type RouteCallback = (err: any, route: PlainRoute) => void;
  type RoutesCallback = (err: any, routesArray: PlainRoute[]) => void;

  interface PlainRoute extends RouteProps {
    childRoutes?: PlainRoute[];
    getChildRoutes?(partialNextState: LocationState, callback: RoutesCallback): void;
    indexRoute?: PlainRoute;
    getIndexRoute?(partialNextState: LocationState, callback: RouteCallback): void;
  }

  /* router */
  interface Params {
    [key: string]: string;
  }

  export type RoutePattern = string;
  export type RouteComponent = ComponentClass<any> | StatelessComponent<any>;
  export interface RouteComponents {
    [name: string]: RouteComponent;
  }
  export type RouteConfig = ReactNode | PlainRoute | PlainRoute[];

  export type ParseQueryString = (queryString: Search) => Query;
  export type StringifyQuery = (queryObject: Query) => Search;

  type AnyFunction = (...args: any[]) => any;

  export type EnterHook = (nextState: RouterState, replace: RedirectFunction, callback?: AnyFunction) => any;
  export type LeaveHook = (prevState: RouterState) => any;
  export type ChangeHook = (prevState: RouterState, nextState: RouterState, replace: RedirectFunction, callback?: AnyFunction) => any;
  export type RouteHook = (nextLocation?: Location) => any;

  export interface RedirectFunction {
    (location: LocationDescriptor): void;
    (state: LocationState, pathname: Pathname | Path, query?: Query): void;
  }

  export interface RouterState {
    location: Location;
    routes: PlainRoute[];
    params: Params;
    components: RouteComponent[];
  }

  type LocationFunction = (location: LocationDescriptor) => void;
  type GoFunction = (n: number) => void;
  type NavigateFunction = () => void;
  type ActiveFunction = (location: LocationDescriptor, indexOnly?: boolean) => boolean;
  type LeaveHookFunction = (route: any, callback: RouteHook) => void;
  type CreatePartFunction<Part> = (path: Path, query?: any) => Part;

  export interface InjectedRouter {
    push: LocationFunction;
    replace: LocationFunction;
    go: GoFunction;
    goBack: NavigateFunction;
    goForward: NavigateFunction;
    setRouteLeaveHook: LeaveHookFunction;
    createPath: CreatePartFunction<Path>;
    createHref: CreatePartFunction<Href>;
    isActive: ActiveFunction;
  }

  export interface RouteComponentProps<P, R> {
    location: Location;
    params: P & R;
    route: PlainRoute;
    router: InjectedRouter;
    routes: PlainRoute[];
    routeParams: R;
  }

  export interface RouterProps extends ClassAttributes<any> {
    routes?: RouteConfig;
    history?: History;
    createElement?(component: RouteComponent, props: any): any;
    onError?(error: any): any;
    onUpdate?(): any;
    render?(props: any): ReactNode;
  }

  type Router = ComponentClass<RouterProps>;
  const Router: Router;

  /* router context */
  type RouterContext = ComponentClass<any>;
  const RouterContext: RouterContext;

  /* route utils */
  function createRoutes(routes: RouteConfig): PlainRoute[];

  /* use router history */
  function useRouterHistory<O, H>(createHistory: CreateHistory<O, H>): CreateHistory<O & HistoryBasenameOptions, H & HistoryBasename & HistoryQueries>;

  /* withRouter */
  interface Options {
    withRef?: boolean;
  }

  type ComponentConstructor<P> = ComponentClass<P> | StatelessComponent<P>;

  function withRouter<P, S>(component: ComponentConstructor<P> & S, options?: Options): ComponentClass<P> & S;
  function withRouter<P>(component: ComponentConstructor<P>, options?: Options): ComponentClass<P>;

  /* middleware */
  interface Middleware {
    renderRouterContext?(previous: RouterContext, props: any): RouterContext;
    renderRouteComponent?(previous: RouteComponent, props: any): RouteComponent;
  }

  function applyRouterMiddleware(...middlewares: Middleware[]): (renderProps: any) => RouterContext;
}
