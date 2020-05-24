// Copyright (C) Microsoft Corporation. All rights reserved.
define("Test/TestSummary/Resources", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RunDurationHeading = "Run duration";
    exports.TestsNotReportedHeading = "Tests not reported";
    exports.TotalTestsText = "Total tests";
    exports.PassPercentHeading = "Pass percentage";
    exports.ErrorFetchingResults = "Error occurred while trying to fetch test results data.";
    exports.TestSummaryTitle = "Summary";
    exports.ResultStateInProgress = "InProgress";
    exports.CommaSeparator = ",";
    exports.TestRunStateCompleted = "Test Run Completed";
    exports.TestRunStateAborted = "Test Run Aborted";
    exports.TestOutcome_NotExecuted = "Not executed";
    exports.ResultStateNotImpacted = "Not Impacted";
    exports.OthersText = "Others";
    exports.TestOutcome_Passed = "Passed";
    exports.TestOutcome_Failed = "Failed";
    exports.TestOutcome_Aborted = "Aborted";
    exports.TestOutcome_Inconclusive = "Inconclusive";
    exports.TestOutcome_None = "None";
    exports.RunsAborted = "Run(s) Aborted";
    exports.TotalTestsHeading = "Total tests";
    exports.FailedTestsHeading = "Failed tests";
    exports.ExistingFailuresLegendText = "Existing";
    exports.PassedText = "Passed";
    exports.FailedText = "Failed";
    exports.PartiallySucceededText = "Partially succeeded";
    exports.PassedOnRerunLegendText = "Passed on rerun ({0})";
    exports.NewFailuresLegendText = "New";
    exports.NotImpactedLegendText = "Not Impacted";
    exports.RunsSummaryStatus = "{0} Run(s) Completed ( {1} Passed, {2} Failed )";
    exports.RunsSummaryStatusWithImpactedAndOtherRuns = "{0} Run(s) Completed ( {1} Passed, {2} Failed, {3} Not impacted, {4} Others )";
    exports.RunsSummaryStatusWithImpactedRunsOnly = "{0} Run(s) Completed ( {1} Passed, {2} Failed, {3} Not impacted )";
    exports.RunsSummaryStatusWithOtherRunsOnly = "{0} Run(s) Completed ( {1} Passed, {2} Failed, {3} Others )";
    exports.TestsTabInBuild = "Tests";
    exports.BuildDoesNotHaveTestReports = "No test runs are available for this build. Run tests and get rich reports by using an appropriate built-in task such as the \u003ca class=\u0027bolt-link\u0027 href=\u0027https://go.microsoft.com/fwlink/?linkid=835764\u0027 rel=\u0027nofollow noopener noreferrer\u0027 target=\u0027_blank\u0027\u003eVisual Studio Test task\u003c/a\u003e. Alternately, run tests using a runner of your choice such as \u003ca class=\u0027bolt-link\u0027 href=\u0027https://junit.org\u0027 rel=\u0027nofollow noopener noreferrer\u0027 target=\u0027_blank\u0027\u003eJUnit\u003c/a\u003e, \u003ca class=\u0027bolt-link\u0027 href=\u0027https://xunit.github.io/\u0027 rel=\u0027nofollow noopener noreferrer\u0027 target=\u0027_blank\u0027\u003exUnit\u003c/a\u003e, \u003ca class=\u0027bolt-link\u0027 href=\u0027https://go.microsoft.com/fwlink/?linkid=2081227\u0027 rel=\u0027nofollow noopener noreferrer\u0027 target=\u0027_blank\u0027\u003emocha, jest, \u003c/a\u003e\u003ca class=\u0027bolt-link\u0027 href=\u0027https://go.microsoft.com/fwlink/?linkid=2081228\u0027 rel=\u0027nofollow noopener noreferrer\u0027 target=\u0027_blank\u0027\u003epytest, \u003c/a\u003e\u003ca class=\u0027bolt-link\u0027 href=\u0027https://go.microsoft.com/fwlink/?linkid=2080895\u0027 rel=\u0027nofollow noopener noreferrer\u0027 target=\u0027_blank\u0027\u003erspec, \u003c/a\u003eetc. and use the \u003ca class=\u0027bolt-link\u0027 href=\u0027https://go.microsoft.com/fwlink/?LinkId=857107\u0027 rel=\u0027nofollow noopener noreferrer\u0027 target=\u0027_blank\u0027\u003ePublish Test Results\u003c/a\u003e task to get rich reports.";
    exports.BuildDetailsSummaryNoTestRuns = "No test runs are available for this build. \u003cbr\u003e";
    exports.NoTestsMessageWhileBuildInProgress = "Build is in progress. No tests results available at this stage!";
    exports.BuildHasNotCompletedText = "The build is in progress. Test results will appear here when the build completes.";
    exports.BuildDeletedNoTestResults = "No test runs are available for this build as this build has been deleted.";
    exports.Runs = "Runs";
    exports.NoTestResultsMessage = "Test results are not yet available.";
    exports.RunDurationInfoMessage = "Effective run duration for all tests";
    exports.TestAnalyticsLinkMessage = "{0} unique failing {1} in the last 14 days";
    exports.TestPluralText = "tests";
    exports.TestSingularText = "test";
});