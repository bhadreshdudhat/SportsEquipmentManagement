"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { CartService } from '../Service/cart.service';
var global_1 = require("../Shared/global");
var forms_1 = require("@angular/forms");
var po_service_1 = require("../Service/po.service");
var CartComponent = /** @class */ (function () {
    function CartComponent(fb, _poService) {
        this.fb = fb;
        this._poService = _poService;
    }
    CartComponent.prototype.ngOnInit = function () {
        this.setLocalStorage();
        this.products = JSON.parse(localStorage.getItem("currentShoppingCart"));
        this.subtotal = 0;
        this.cartTax = 0;
        this.grandTotal = 0;
        this.updateGrandTotal();
    };
    CartComponent.prototype.setLocalStorage = function () {
        var cartData = [{ "id": 1, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 2, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 3, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }, { "id": 4, "ItemName": "ball", "productPrice": 10, "productQuantity": 1, "productSubTotal": 10 }];
        localStorage.setItem("currentShoppingCart", JSON.stringify(cartData));
    };
    CartComponent.prototype.editCart = function (id) {
        document.getElementById("productQuantity" + id).disabled = false;
        document.getElementById("updateBtn" + id).style.display = "block";
        document.getElementById("editBtn" + id).style.display = "none";
    };
    CartComponent.prototype.updateCart = function (id) {
        var newQuantity = parseInt(document.getElementById("productQuantity" + id).value);
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                this.products[i].productQuantity = newQuantity; //add two
                this.products[i].productSubTotal = this.products[i].productQuantity * this.products[i].productPrice;
                break; //exit loop since you found the person
            }
        }
        localStorage.setItem("currentShoppingCart", JSON.stringify(this.products)); //put the object back
        document.getElementById("productQuantity" + id).disabled = true;
        document.getElementById("updateBtn" + id).style.display = "none";
        document.getElementById("editBtn" + id).style.display = "block";
        this.updateGrandTotal();
    };
    CartComponent.prototype.updateGrandTotal = function () {
        this.subtotal = 0;
        this.grandTotal = 0;
        for (var i = 0; i < this.products.length; i++) {
            this.subtotal += this.products[i].productQuantity * this.products[i].productPrice;
        }
        this.cartTax = 0.04 * this.subtotal;
        this.grandTotal = this.cartTax + this.subtotal;
    };
    CartComponent.prototype.deleteCart = function (id) {
        var tmpCartString = "";
        tmpCartString = JSON.stringify(this.products);
        var tmpCart = [];
        tmpCart = JSON.parse(tmpCartString);
        for (var i = 0; i < tmpCart.length; i++) {
            console.log(tmpCart[i].id);
            console.log("id >> " + id);
            if (tmpCart[i].id === id) {
                //tmpCart[i].splice(1);
                //tmpCart[i].remove();
                delete tmpCart[i];
                console.log("Here");
                break; //exit loop since you found the person
            }
        }
        console.log(tmpCart);
        localStorage.setItem("currentShoppingCart", JSON.stringify(tmpCart)); //put the object back
        this.products = JSON.parse(localStorage.getItem("currentShoppingCart"));
    };
    CartComponent.prototype.checkout = function () {
        var _this = this;
        var ponumber = this.generatePONumber();
        var purchaseItemNameList = "";
        var purchaseItemQuantityList = "";
        var purchaseItemPriceList = "";
        for (var i = 0; i < this.products.length; i++) {
            if (i != this.products.length - 1) {
                purchaseItemNameList += this.products[i].ItemName + ",";
                purchaseItemQuantityList += this.products[i].productQuantity + ",";
                purchaseItemPriceList += this.products[i].productPrice + ",";
            }
            else {
                purchaseItemNameList += this.products[i].ItemName;
                purchaseItemQuantityList += this.products[i].productQuantity + "";
                purchaseItemPriceList += this.products[i].productPrice + "";
            }
        }
        var dataStore = { PONumber: ponumber, Buyer: "SportsAcademic", Supplier: "Saralee", BuyerUserID: "SA123", BuyerUserEmail: "SportsAcademic123@gmail.com", PurchaseItemNameList: purchaseItemNameList, PurchaseItemquantityList: purchaseItemQuantityList, PurchaseItempriceList: purchaseItemPriceList, Totalamount: this.grandTotal };
        this._poService.post(global_1.Global.BASE_PO_ENDPOINT, dataStore).subscribe(function (data) {
            if (data == 1) {
                _this.msg = "Data successfully added.";
                window.location.href = "/po?po=" + ponumber;
                //this.LoadPO();
            }
            else {
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            }
            //this.modal.dismiss();
        }, function (error) {
            _this.msg = error;
        });
    };
    CartComponent.prototype.generatePONumber = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return "PO" + s4() + s4();
    };
    CartComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/cart.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, po_service_1.POService])
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map