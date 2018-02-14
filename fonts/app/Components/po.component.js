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
var po_service_1 = require("../Service/po.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var POComponent = /** @class */ (function () {
    function POComponent(fb, _poService) {
        this.fb = fb;
        this._poService = _poService;
        this.indLoading = false;
    }
    POComponent.prototype.ngOnInit = function () {
        var index = document.URL.indexOf("=");
        this.poNumber = document.URL.slice(index + 1);
        this.poFrm = this.fb.group({
            Id: [''],
            PONumber: ['', forms_1.Validators.required],
            Buyer: ['', forms_1.Validators.required],
            Supplier: ['', forms_1.Validators.required],
            BuyerUserID: ['', forms_1.Validators.required],
            BuyerUserEmail: ['', forms_1.Validators.required],
            PurchaseItemNameList: ['', forms_1.Validators.required],
            PurchaseItemquantityList: ['', forms_1.Validators.required],
            PurchaseItempriceList: ['', forms_1.Validators.required],
            Totalamount: ['', forms_1.Validators.required]
        });
        this.LoadPO();
    };
    POComponent.prototype.LoadPO = function () {
        var _this = this;
        this.indLoading = true;
        this._poService.get(global_1.Global.BASE_PO_ENDPOINT)
            .subscribe(function (pos) { _this.pos = pos; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    POComponent.prototype.addPO = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New PO";
        this.modalBtnTitle = "Add";
        this.poFrm.reset();
        this.modal.open();
    };
    POComponent.prototype.editPO = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit PO";
        this.modalBtnTitle = "Update";
        this.po = this.pos.filter(function (x) { return x.Id == id; })[0];
        this.poFrm.setValue(this.po);
        this.modal.open();
    };
    POComponent.prototype.deletePO = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.po = this.pos.filter(function (x) { return x.Id == id; })[0];
        this.poFrm.setValue(this.po);
        this.modal.open();
    };
    POComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._poService.post(global_1.Global.BASE_PO_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadPO();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._poService.put(global_1.Global.BASE_PO_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadPO();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._poService.delete(global_1.Global.BASE_PO_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadPO();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    POComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.poFrm.enable() : this.poFrm.disable();
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], POComponent.prototype, "modal", void 0);
    POComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/po.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, po_service_1.POService])
    ], POComponent);
    return POComponent;
}());
exports.POComponent = POComponent;
//# sourceMappingURL=po.component.js.map