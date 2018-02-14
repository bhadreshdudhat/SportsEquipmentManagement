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
var company_service_1 = require("../Service/company.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var CompanyComponent = /** @class */ (function () {
    function CompanyComponent(fb, _companyService) {
        this.fb = fb;
        this._companyService = _companyService;
        this.indLoading = false;
        this.searchTitle = "";
    }
    CompanyComponent.prototype.ngOnInit = function () {
        this.companyFrm = this.fb.group({
            CompanyId: [''],
            Name: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.required],
            Phone: ['', forms_1.Validators.required],
            Owner: [''],
            Street: [''],
            City: [''],
            State: ['', forms_1.Validators.required],
            Country: ['', forms_1.Validators.required],
            DUNS: ['', forms_1.Validators.required],
            Type: ['', forms_1.Validators.required]
        });
        this.LoadCompanies();
    };
    CompanyComponent.prototype.LoadCompanies = function () {
        var _this = this;
        this.indLoading = true;
        this._companyService.get(global_1.Global.BASE_COMPANY_ENDPOINT)
            .subscribe(function (companies) { _this.companies = companies; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    CompanyComponent.prototype.addCompany = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Company";
        this.modalBtnTitle = "Add";
        this.companyFrm.reset();
        this.modal.open();
    };
    CompanyComponent.prototype.editCompany = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Company";
        this.modalBtnTitle = "Update";
        this.company = this.companies.filter(function (x) { return x.CompanyId == id; })[0];
        this.companyFrm.setValue(this.company);
        this.modal.open();
    };
    CompanyComponent.prototype.deleteCompany = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.company = this.companies.filter(function (x) { return x.CompanyId == id; })[0];
        this.companyFrm.setValue(this.company);
        this.modal.open();
    };
    CompanyComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._companyService.post(global_1.Global.BASE_COMPANY_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadCompanies();
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
                this._companyService.put(global_1.Global.BASE_COMPANY_ENDPOINT, formData._value.CompanyId, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadCompanies();
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
                this._companyService.delete(global_1.Global.BASE_COMPANY_ENDPOINT, formData._value.CompanyId).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadCompanies();
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
    CompanyComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.companyFrm.enable() : this.companyFrm.disable();
    };
    CompanyComponent.prototype.criteriaChange = function (value) {
        if (value != '[object Event]')
            this.listFilter = value;
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], CompanyComponent.prototype, "modal", void 0);
    CompanyComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/company.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, company_service_1.CompanyService])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map