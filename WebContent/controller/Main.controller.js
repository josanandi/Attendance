/*global location history */
sap.ui.define([
		"com/work/attendance/model/formatter",
		"sap/ui/model/odata/ODataModel",
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/FilterType"
	], function (formatter,ODataModel,Controller,MessageToast, Filter,FilterOperator,FilterType) {
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
			    
//				var oOdataModel= new ODataModel("proxy/http/madap8033.accenture.tsap:8001/sap/opu/odata/sap/ZATTENDANCE_SRV"); 
//				oOdataModel.read("/ATTENDANCESet",
//						{
//						success: function(oData, oResponse) {
//							console.log(oData);
//						}
//						});
//				this.getView().setModel(oOdataModel,"attendances");

			},
			onUpdateFinished: function() {
				var oTable = this.getView().byId("attendanceTable");
				var row;
				var cell ;
				for(row = 0; row < oTable.getItems().length; row++)
				{
				        cell = oTable.getItems()[row].getCells()[4].getText(); // Would contain all cells in the table
				        if(cell > 8 ){ 
				        	oTable.getItems()[row].addStyleClass("overtime");
				        } 
				}
			},
			showHello : function() {
				MessageToast.show("helloka");
				
			},
			onFilterInvoices : function(){
				var oView = this.getView(),
					sValue = oView.byId("searchField").getValue(),
					oFilter = new Filter("dailyTask/title",FilterOperator.Contains,sValue);
				oView.byId("attendanceTable").getBinding("items").filter(oFilter,FilterType.Appliacation);
				MessageToast.show("Filtered for: " + sValue);
			},
			onPressSorting: function() {
				
			}
		});
    }
);