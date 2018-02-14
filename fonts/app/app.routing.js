"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var user_component_1 = require("./components/user.component");
//import { HomeComponent } from './components/home.component';
var cart_component_1 = require("./components/cart.component");
var po_component_1 = require("./components/po.component");
var product_component_1 = require("./components/product.component");
var company_component_1 = require("./components/company.component");
var appRoutes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home', component: HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'company', component: company_component_1.CompanyComponent },
    { path: 'product', component: product_component_1.ProductComponent },
    { path: 'cart', component: cart_component_1.CartComponent },
    { path: 'po', component: po_component_1.POComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map