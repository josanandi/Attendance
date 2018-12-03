sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
	], function (Controller, MessageBox) {
		"use strict";

		return Controller.extend("com.work.attendance.controller.Input", {
			
			onInit : function () {   
	            var oModel= new sap.ui.model.json.JSONModel();
	            oModel.loadData("./Attendance.json");
	            oModel.setProperty();
			    this.getView().setModel(oModel,"attendances");
   
			},
			
			record : function(){
				var that = this;
				var currentData={
						"start":that.byId("logon").getValue(),
						"end":that.byId("logout").getValue(),
						"location":that.byId("location").getValue(),
						"dailyTask":{
									"title":that.byId("activityTitle").getValue(),
									"description":that.byId("activityDescription").getValue()
								},
					
						}
						this.getView().getModel("attendances").getData().attendances.unshift(currentData);
						this.getView().getModel("attendances").refresh();
				
			},
			
			reset: function(){
				var that = this;
				MessageBox.show(this.getView().getModel("i18n").getProperty("main.confirmation"), {
				    icon: sap.m.MessageBox.Icon.Warning,                   
				    title: this.getView().getModel("i18n").getProperty("main.confirmation.title"),                                         
				    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],                 
				    onClose: function(oAction){
				    	if (oAction==="YES"){
				    		that.byId("logon").setValue("");
				    		that.byId("logout").setValue("");
				    		that.byId("location").setValue("");
				    		that.byId("activityTitle").setValue("");
				    		that.byId("activityDescription").setValue("");
				    		}
				    	}                                     
				    });
				
				},
			
				
			
		});
    }
);