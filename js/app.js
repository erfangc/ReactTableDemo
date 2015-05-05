$(function () {
    $.get('bower_components/ReactTable/examples/sample_data_small.json').success(function (data) {
        var testData = data;
        // first table
        var groupBy = [{colTag: "nationality", text: "Nationality"}, {
            colTag: "fruit_preference",
            text: "Fruit Preference"
        }];
        var options = {
            disablePagination: true,
            groupBy: groupBy,
            rowKey: 'id',
            data: testData,
            onRightClick: function (row, event) {
                console.log(row);
                console.log(state);
                event.preventDefault();
            },
            height: "600px",
            presort: {score_weight_factor: 'desc'},
            columnDefs: basicTableColumnDefs,
            customMenuItems: {
                Description: {
                    infoBox: "formatInstructions"
                }
            },
            beforeColumnAdd: function () {
                console.log("beforeColumnAdd callback called!");
                addMe();
            },
            afterColumnRemove: function (a, b) {
                console.log("Hello There ... you tried to remove " + b.text);
            },
            onSelectCallback: function (row, state) {
                console.log("id = " + row.id + " clicked state:" + state);
            },
            onSummarySelectCallback: function (result, state) {
                console.log(result);
                console.log(state);
                console.log("Includes " + result.detailRows.length + " detail rows! state:" + state);
            }
        };
        var basicTable = React.render(React.createElement(ReactTable, options), document.getElementById("basic-table"));

        var customTemplateOptions = {
            disablePagination: true,
            rowKey: 'id',
            data: data,
            onRightClick: function (row, event) {
                console.log(row);
                console.log(state);
                event.preventDefault();
            },
            height: "600px",
            presort: {score_weight_factor: 'desc'},
            columnDefs: customTemplateColumnDefs,
            customMenuItems: {
                Description: {
                    infoBox: "formatInstructions"
                }
            }
        };
        var customTemplateTable = React.render(React.createElement(ReactTable, customTemplateOptions), document.getElementById("custom-template"));
    })
})

var basicTableColumnDefs = [
    {colTag: "first_name", text: "First Name"},
    {
        colTag: "last_name", text: "Last Name", customMenuItems: function (table, columnDef) {
        return [React.createElement(SummarizeControl, {table: table, columnDef: columnDef})];
    }
    },
    {colTag: "email", text: "Email"},
    {
        colTag: "nationality", text: "Nationality",
        sort: function (a, b) {
            return a.nationality.localeCompare(b.nationality);
        }
    },
    {
        colTag: "superlong",
        text: "Some header"
    },
    {
        colTag: "test_score",
        format: "number",
        formatInstructions: "multiplier:1 roundTo:0 unit:%",
        text: "Test Score",
        groupByRange: [0, 25, 50, 100],
        aggregationMethod: "average",
        weightBy: {colTag: "score_weight_factor"},
        cellClassCallback: function (row) {
            var classes = {green: false, red: false};
            classes.green = row.test_score > 50;
            classes.red = row.test_score <= 50;
            return classes;
        }
    },
    {colTag: "fruit_preference", text: "Fruit Preference"},
    {
        colTag: "score_weight_factor",
        format: "number",
        formatInstructions: "multiplier:1000 separator:true showZeroAsBlank:true",
        text: "Weight Factor",
        aggregationMethod: "most_data_points"

    }
];

var customTemplateColumnDefs = [
    {colTag: "first_name", text: "First Name"},
    {
        colTag: "last_name", text: "Last Name", customMenuItems: function (table, columnDef) {
        return [React.createElement(SummarizeControl, {table: table, columnDef: columnDef})];
    }
    },
    {
        colTag: "email", text: "Email",
        cellTemplate: function (content) {
            // this is equivalent to <div><a href='mailto{content.email}'>{content.email}</a> <i class='fa fa-envelope'></i></div>
            return React.createElement("div", {},
                React.createElement("a", {href: "mailto:" + content.email}, content.email != null ? content.email : ""),
                " ",
                content.email != "" ? React.createElement("i", {className: "fa fa-envelope"}) : null
            )
        }
    },
    {
        colTag: "nationality", text: "Nationality",
        sort: function (a, b) {
            return a.nationality.localeCompare(b.nationality);
        }
    },
    {
        colTag: "test_score",
        format: "number",
        formatInstructions: "multiplier:1 roundTo:0 unit:%",
        text: "Test Score",
        groupByRange: [0, 25, 50, 100],
        aggregationMethod: "average",
        weightBy: {colTag: "score_weight_factor"},
        cellClassCallback: function (row) {
            var classes = {green: false, red: false};
            classes.green = row.test_score > 50;
            classes.red = row.test_score <= 50;
            return classes;
        }
    },
    {colTag: "fruit_preference", text: "Fruit Preference"},
    {
        colTag: "score_weight_factor",
        format: "number",
        formatInstructions: "multiplier:1000 separator:true showZeroAsBlank:true",
        text: "Weight Factor",
        aggregationMethod: "most_data_points"

    }
];
