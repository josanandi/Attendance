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
			onUpdateFinished: function() {
				var oTable = this.getView().byId("attendanceTable");
				var row;
				var cells = [];
				for(row = 0; row < oTable.getItems().length; row++)
				{
				        cells = oTable.getItems()[row].getCells()[4].getText(); // Would contain all cells in the table
				        oTable.getItems()[row].addStyleClass("overtime");

				}
			},
			showHello : function() {
				MessageToast.show("helloka");
				
			}
		});
    }
);