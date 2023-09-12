import { UserController } from "./controller/UserController"

const AppRoutes: {
    method: "get" | "post" | "put" | "delete";
    route: string;
    controller: any; // You should ideally use the correct type for your controller
    action: string;
  }[] = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update"
},{
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]

export{AppRoutes};

