"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var user_component_1 = require("./components/user.component");
//import { HomeComponent } from './components/home.component';
var user_service_1 = require("./Service/user.service");
//import { SupplierService } from './Service/supplier.service';
//import { SupplierComponent } from './components/supplier.component';
var product_service_1 = require("./Service/product.service");
var product_component_1 = require("./components/product.component");
var user_pipe_1 = require("./Filter/user.pipe");
var search_component_1 = require("./Shared/search.component");
var forms_2 = require("@angular/forms");
var product_pipe_1 = require("./Filter/product.pipe");
var company_pipe_1 = require("./Filter/company.pipe");
var company_component_1 = require("./components/company.component");
var company_service_1 = require("./Service/company.service");
var po_service_1 = require("./Service/po.service");
var po_component_1 = require("./components/po.component");
var cart_component_1 = require("./components/cart.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, forms_2.FormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule],
            declarations: [app_component_1.AppComponent, search_component_1.SearchComponent, company_component_1.CompanyComponent, cart_component_1.CartComponent, po_component_1.POComponent, product_component_1.ProductComponent, product_pipe_1.ProductFilterPipe, company_pipe_1.CompanyFilterPipe, user_pipe_1.UserFilterPipe, user_component_1.UserComponent],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, company_service_1.CompanyService, po_service_1.POService, product_service_1.ProductService, user_service_1.UserService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map