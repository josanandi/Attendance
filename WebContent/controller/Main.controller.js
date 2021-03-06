/*global location history */
sap.ui.define([
		"com/work/attendance/model/formatter",
		"sap/ui/model/odata/ODataModel",
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/FilterType",
		"sap/ui/model/Sorter"
	], function (formatter,ODataModel,Controller,MessageToast, Filter,FilterOperator,FilterType,Sorter) {
		"use strict";

		return Controller.extend("com.work.attendance.controller.Main", {
			formatter: formatter,
			onInit : function () {  
				this.bOrder = false;
	            var oModel= new sap.ui.model.json.JSONModel();
	            oModel.loadData("./Attendance.json");
			    this.getView().setModel(oModel,"attendances");
			    
				var oViewModel = new sap.ui.model.json.JSONModel({
					date : "2018-12-03"
				});
			    this.getView().setModel(oViewModel,"attendanceModel");
			    
	            var oMonthModel = new sap.ui.model.json.JSONModel();			    
	            this.getView().setModel(oMonthModel,"monthModel");
	            
	            this._getMonthModel = this.getView().getModel("monthModel");
			    
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
				var oView = this.getView();
				var oTable = oView.byId("attendanceTable").getBinding("items");
					oTable.sort(new Sorter("attendances>location", this.bOrder));

				this.bOrder = !this.bOrder;
				
			},
			
			
			
			goTo2: function() {
				var oView = this.getView();
				var oIconTab = oView.byId("iconTabBar");

				if(oView.byId("firstInput").getValue() > 10) {
					oIconTab.getItems()[4].setEnabled(true);
					oIconTab.setSelectedKey("2"); // enter to the next tab
					this._refreshIndicator("33%",33,"Error");
				} else {
					oView.byId("firstInput").setValueState("Error");
				}
				
			},
			goTo3: function() {
				var oView = this.getView();
				var oIconTab = oView.byId("iconTabBar");
				
				if(oView.byId("secondInput").getValue() === "envelope") {
					oIconTab.getItems()[5].setEnabled(true);
					oIconTab.setSelectedKey("3"); // enter to the next tab
					this._refreshIndicator("66%",66,"Warning");
				} else {
					oView.byId("secondInput").setValueState("Error");
				}
				
			},
			goTo4: function() {
				var oView = this.getView();
				var oIconTab = oView.byId("iconTabBar");
				
				if(oView.byId("thirdQuestion").getSelectedKey() === "neither") {
					oIconTab.getItems()[6].setEnabled(true);
					oIconTab.setSelectedKey("4"); // enter to the next tab
					this._refreshIndicator("100%",100,"Success")
				} else {
					oView.byId("thirdInput").setValueState("Error");
				}
				
			},
			_refreshIndicator: function(sValue, fValue, sState) {
				var oView = this.getView();
				oView.byId("indicator").setDisplayValue(sValue);
				oView.byId("indicator").setPercentValue(fValue);
				oView.byId("indicator").setState(sState);
			},
			back: function() {
				var oView = this.getView();
				var oIconTab = oView.byId("iconTabBar");
				var iCurrentTab = parseInt(oIconTab.getSelectedKey());
				console.log( iCurrentTab, typeof iCurrentTab);
				if( iCurrentTab-1 > 0 ){
					oIconTab.setSelectedKey(iCurrentTab-1 + "");
				}
			},
			_getDialog : function () {					
			         if (!this._oDialog) {
			             this._oDialog = sap.ui.xmlfragment("fragmentId","com.work.attendance.view.SummaryPopover",this);
			             this.getView().addDependent(this._oDialog);


			          }
			          return this._oDialog;
			},
		    onOpenDialog : function () {
		          this._getDialog().open();

		          this._getMonthModel.setProperty("/month", this._getAvailableMonths());
	              var oSelect = sap.ui.core.Fragment.byId("fragmentId", "monthSelection");
	              oSelect.setModel(this._getMonthModel);

		    },
		    closeDialog : function() {
		    	this._getDialog().close();
		    },
		    _getAvailableMonths : function() {
		    	var oData = this.getView().getModel("attendances").getData().attendances;
		    	var aMonths= [];
		    	var oObject;
		    	for ( var i = 0; i < oData.length; i++){
		    		var date = new Date(oData[i].start), 
		    		  locale = "en-us",
		    		  month = date.toLocaleString(locale, {
		    		    month: "long"
		    		  });	
    			
					var nPos = aMonths.map(function(e){
						return e.name;
					}).indexOf(month);
		    	
		    		if(nPos == -1) {
		    			oObject = { "name" : month };
		    			aMonths.push(oObject);
		    		}
		    	}
		    	return aMonths;
		    },
		    onChangeSelected : function(oEvent) {
		    	var object = oEvent.getParameter("selectedItem");
		    	//logika
		    	var oMonth = {"month" : object.getText(),
		    					"overtime" : 45,
		    					"location" : "Budapest",
		    					"country"  : "Hungary"};

		    	this._getMonthModel .setProperty("/selectedMonth",oMonth);
		        var oForm = sap.ui.core.Fragment.byId("fragmentId", "SimpleFormDisplay354");
		        oForm.setModel(this._getMonthModel);
		    } 
		});
    }
);