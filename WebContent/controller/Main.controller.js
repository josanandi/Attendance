/*global location history */
sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast"
	], function (Controller,MessageToast) {
		"use strict";

		return Controller.extend("com.work.attendance.controller.Main", {
			
			onInit : function () {
				
			    //var oModel = new sap.ui.model.json.JSONModel("file:///C:/Users/julia.gondocs/OneDrive%20-%20Accenture/SAPUI5/Project/Attendance/Attendance.json");
			    
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