/*global location history */
sap.ui.define([
		"com/work/attendance/model/formatter",
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast"
	], function (formatter,Controller,MessageToast) {
		"use strict";

		return Controller.extend("com.work.attendance.controller.Main", {
			
			formatter: formatter,
			onInit : function () {   
	            var oModel= new sap.ui.model.json.JSONModel();
	            oModel.loadData("./Attendance.json");
			    this.getView().setModel(oModel,"attendances");
			    
			    
			},
			showHello : function() {
				MessageToast.show("helloka");
				
			}
		});
    }
);