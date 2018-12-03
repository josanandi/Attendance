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
			    
				var oViewModel = new sap.ui.model.json.JSONModel({
					date : "2018-12-03"
				});
			    this.getView().setModel(oViewModel,"attendanceModel");

			},
			onAfterRendering: function() {
				var aData = this.getView().getModel("attendances").getData().attendance;
				alert(aData);
			},
			showHello : function() {
				MessageToast.show("helloka");
				
			}
		});
    }
);