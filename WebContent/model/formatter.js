sap.ui.define([
	] , function () {
		"use strict";

		return {
			
			workDuration: function(sStart, sEnd) {
				var iResult;
				var myStartDate = new Date(sStart);
				var myEndDate = new Date(sEnd);
				iResult=(myEndDate.getHours())-(myStartDate.getHours());
				
				return iResult;
			}
		};
	}
);