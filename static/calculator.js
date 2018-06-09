function showTime(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

function errorBudgetCalculator() {

    var percentage = document.getElementById("availability");
    var sla = document.getElementById("sla")
    var currentAvailabilityLevel = percentage.value;
    var currentSLALevel = sla.value;
    var output;

    var errorBudgetPercentage = currentAvailabilityLevel - currentSLALevel;
    var errorBudget = (errorBudgetPercentage / 100) * 30 * 24 * 60 * 60

    if (currentAvailabilityLevel === "" || currentAvailabilityLevel < 0 || currentAvailabilityLevel > 100 || currentSLALevel === "" || currentSLALevel < 0 || currentSLALevel > 100) {
        output = "<em>Input not valid. Please input a number between 0 and 100.</em>";
    } else {

        output =
            "<table id='custom-table'>"
            + "<tr>"
            + "<th>Availability</th>"
            + "<th>SLA/SLO Target</th>"
            + "<th>Error Budget</th>"
            + "<th>Error Budget per Month (30 days)</th>"
            + "<th>Error Budget per Quarter</th>"
            + "</tr>";

        output += "<tr><td>" + currentAvailabilityLevel + "%</td>";
        output += "<td>" + currentSLALevel + "%</td>";
        output += "<td>" + errorBudgetPercentage + "%</td>";
        if (errorBudgetPercentage == 0) {
            output += "<td>There is no remaining error budget</td>";
            output += "<td>There is no remaining error budget</td>";
        } else if (errorBudgetPercentage < 0) {
            output += "<td>SLA/SLO has been exceeded</td>";
            output += "<td>SLA/SLO has been exceeded</td>";
        } else {
            output += "<td>" + showTime(errorBudget) + "</td>";
            output += "<td>" + showTime(errorBudget * 3) + "</td>";

        }
        output += "</tr></table>";
    }
    document.getElementById("error-budget-table").innerHTML = output;
};
