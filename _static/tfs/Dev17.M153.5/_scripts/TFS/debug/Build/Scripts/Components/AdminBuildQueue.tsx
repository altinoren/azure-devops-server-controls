import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Contribution_Services from "VSS/Contributions/Services";
import { FeatureAvailabilityService } from "VSS/FeatureAvailability/Services";
import * as Service from "VSS/Service";
import * as VSS from "VSS/VSS";

import { FeatureAvailabilityFlags } from "Presentation/Scripts/TFS/Generated/TFS.Server.WebAccess.Constants";

import * as SDK_Shim from "VSS/SDK/Shim";
import * as VSS_Controls from "VSS/Controls";
import DistributedTask = require("TFS/DistributedTask/Contracts");
import BuildResources = require("Build/Scripts/Resources/TFS.Resources.Build");
import AdminBuildAndReleaseHub = require("Build/Scripts/AdminBuildAndRelease/Components/AdminBuildAndReleaseHub");

import "Admin/Scripts/TFS.Admin.Security";
import "Build/Scripts/Controls.Admin";
import "Build/Scripts/AdminView"
import "Build/Scripts/KnockoutExtensions";

import "VSS/LoaderPlugins/Css!Build/FilterPanel";
import "VSS/LoaderPlugins/Css!BuildStyles";
import "VSS/LoaderPlugins/Css!VSS.Controls";

SDK_Shim.registerContent("buildQueueView.initialize", (context: SDK_Shim.InternalContentContextData): IDisposable => {

    const pageDataService = Service.getService(Contribution_Services.WebPageDataService);
    const pageData = pageDataService.getPageData<AdminBuildQueueComponentProps>("ms.vss-build-web.build-queue-hub-data-provider");

    if (pageData.includeConcurrentJobsSection) {
        AdminBuildAndReleaseHub.load(context.container);
    }
    else {           
        ReactDOM.render(<AdminBuildQueueComponent {...pageData} />, context.container);
    }

    const disposable = {
        dispose: () => {
            ReactDOM.unmountComponentAtNode(context.container);
        }
    };

    return disposable;
});

export interface AdminBuildQueueComponentProps {
    buildQueueOptions: string;
    includeResourceLimitsSection: boolean;
    includeConcurrentJobsSection: boolean;
    resourceUsages: DistributedTask.ResourceUsage[];
    taskHubLicenseDetails: DistributedTask.TaskHubLicenseDetails;
    selfHostedLicensePurchaseLink: string;
    microsoftHostedLicensePurchaseLink: string;
}

class AdminBuildQueueComponent extends React.Component<AdminBuildQueueComponentProps, {}> {

    private filePathArtifactsAndDeleteTemplate = `<tr>
    <td style="width: 200px; height: 25px;">
        <label>${BuildResources.RetentionTabDeleteFileShareLabel}</label>
    </td>
    <td>
        <label data-bind="text: deleteFileShare"/>
    </td>
</tr>
<tr>
    <td style="width: 200px; height: 25px;">
        <label>${BuildResources.RetentionTabDeleteSymbolsLabel}</label>
    </td>
    <td>
        <label data-bind="text: deleteSymbols"/>
    </td>
</tr>`;

    private buildvnextAdminSettingsTabTemplatePart1 = `<div class="buildvnext-admin-settings-view buildvnext-tab">
    <h3 style="margin-left: 22px;">${BuildResources.MaximumRetentionPolicyLabel}</h3>
    <ul class="default-retention-policy" data-bind="with: maximumRetentionPolicyVM">
        <li style="list-style: none;">
            <table>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDaysToKeepLabel} </label>
                    </td>
                    <td>
                        <input data-bind="visible: !$parent.isHosted(), css: { 'invalid': _daysToKeepInvalid() }, value: daysToKeep, valueUpdate: 'afterkeydown'" class="days_to_keep_textbox" type="text"/>
                        <label data-bind="visible: $parent.isHosted(), text: daysToKeep"/>
                    </td>
                </tr>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabMinimumToKeepLabel} </label>
                    </td>
                    <td>
                        <input data-bind="visible: !$parent.isHosted(), css: { 'invalid': _minimumToKeepInvalid() }, value: minimumToKeep, valueUpdate: 'afterkeydown'" class="days_to_keep_textbox" type="text"/>
                        <label data-bind="visible: $parent.isHosted(), text: minimumToKeep"/>
                    </td>
                </tr>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDeleteBuildRecordLabel} </label>
                    </td>
                    <td>
                        <label data-bind="text: deleteBuildRecord"/>
                    </td>
                </tr>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDeleteSourceLabelLabel}</label>
                    </td>
                    <td>
                        <label data-bind="text: deleteSourceLabel"/>
                    </td>
                </tr>`;                
                                                    
    private buildvnextAdminSettingsTabTemplatePart2 = `<tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDeleteTestResultsLabel}</label>
                    </td>
                    <td>
                        <label data-bind="text: deleteTestResults"/>
                    </td>
                </tr>                   
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabBranchesLabel} </label>
                    </td>
                    <td>
                        <label>${BuildResources.RetentionTabDefaultBranchesLabel}</label>
                    </td>
                </tr>
            </table>
        </li>
    </ul>
    <h3 style="margin-left: 22px;">${BuildResources.DefaultRetentionPolicyLabel}</h3>
    <ul class="default-retention-policy" data-bind="with: defaultRetentionPolicyVM">
        <li style="list-style: none;">
            <table>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDaysToKeepLabel} </label>
                    </td>
                    <td>
                        <input data-bind="visible: !$parent.isHosted(), css: { 'invalid': _daysToKeepInvalid() || $parent.defaultDaysToKeepTooHigh() }, value: daysToKeep, valueUpdate: 'afterkeydown'" class="days_to_keep_textbox" type="text"/>
                        <label data-bind="visible: $parent.isHosted(), text: daysToKeep"/>
                    </td>
                </tr>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabMinimumToKeepLabel} </label>
                    </td>
                    <td>
                        <input data-bind="visible: !$parent.isHosted(), css: { 'invalid': _minimumToKeepInvalid() || $parent.defaultMinimumToKeepTooHigh() }, value: minimumToKeep, valueUpdate: 'afterkeydown'" class="days_to_keep_textbox" type="text"/>
                        <label data-bind="visible: $parent.isHosted(), text: minimumToKeep"/>
                    </td>
                </tr>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDeleteBuildRecordLabel} </label>
                    </td>
                    <td>
                        <label data-bind="text: deleteBuildRecord"/>
                    </td>
                </tr>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDeleteSourceLabelLabel}</label>
                    </td>
                    <td>
                        <label data-bind="text: deleteSourceLabel"/>
                    </td>
                </tr>`;                
                                                    
    private buildvnextAdminSettingsTabTemplatePart3 = `<tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabDeleteTestResultsLabel}</label>
                    </td>
                    <td>
                        <label data-bind="text: deleteTestResults"/>
                    </td>
                </tr>                    
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.RetentionTabBranchesLabel} </label>
                    </td>
                    <td>
                        <label>${BuildResources.RetentionTabDefaultBranchesLabel}</label>
                    </td>
                </tr>
            </table>
        </li>
    </ul>
    <h3 style="margin-left: 22px;">${BuildResources.RetentionDestroyHeader}</h3>
    <ul class="destroy-retention-policy">
        <li style="list-style: none;">
            <table>
                <tr>
                    <td style="width: 200px; height: 25px;">
                        <label>${BuildResources.DestroyBuildsAfterDaysLabel}</label>
                    </td>
                    <td>
                        <input data-bind="visible: !isHosted(), css: { 'invalid': daysToKeepBeforeDestroyInvalid() }, value: daysToKeepBeforeDestroy, valueUpdate: 'afterkeydown'" class="days_to_keep_textbox" type="text"/>
                        <label data-bind="visible: isHosted(), text: daysToKeepBeforeDestroy"/>
                    </td>
                </tr>
            </table>
        </li>
    </ul>
    <div style="margin-left: 22px;" data-bind="visible: !isHosted()">
        <div class="permission-button">
            <button data-bind="enable: isSaveEnabled(), click: saveSettings" class="submit-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" type="button">
                <span class="ui-button-text">${BuildResources.AdminHostsSaveChanges}</span>
            </button>
        </div>
        <div class="permission-button">
            <button data-bind="enable: settingsDirty, click: undoSettings" class="submit-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" type="button">
                <span class="ui-button-text">${BuildResources.AdminHostsUndoChanges}</span>
            </button>
        </div>
    </div>
</div>`;

    private brAdminResourcelimitsTabTemplate : string = `<div class="br-admin-resourcelimits-view buildvnext-tab">
    <!-- ko ifnot: isHosted -->
    <div class="r-admin-main r-throttle" role="region" aria-labelledby="rl-section-heading-onprem">
        <div class="r-sub-head">
            <table class="r-head-table">
                <tr>
                    <td>
                        <h3 id="rl-section-heading-onprem" class="r-main-head">${BuildResources.ResourceLimitParallelReleases}</h3>
                    </td>
                    <td>
                        <a class="r-learn-more" data-bind="attr: { href: learnMoreURL }" rel='noopener noreferrer' target="_blank">${BuildResources.LearnMoreAboutPipelinesLinkText}</a>
                    </td>
                </tr>
            </table>
            <div class="horizontal-line splitter horizontal r-splitter"></div>
            <div class="r-data-head">
                <div class="r-desc-onprem">${BuildResources.ResourceLimitsDescriptionOnPrem}</div>
                <table class="r-outer-tab">
                    <tr>
                        <td>
                            <table class="r-data">
                                <!-- Private pipelines data -->
                                <tr class="d-section">
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img class="img-pipelines" data-bind="attr: { src: pipelinesImgURL }" alt="${BuildResources.PipelinesText}" />
                                                </td>
                                                <td>
                                                    <div class="d-total-head-font">${BuildResources.PrivatePipelinesText}</div>
                                                    <div class="d-sub-text-font">${BuildResources.PrivatePipelinesHelpText}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width d-total-font" data-bind="text: totalPrivatePipelinesCount"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="column-padding">${BuildResources.ResourceLimitFreePipelines}</div>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width" data-bind="text: freeLicenseCount"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>${BuildResources.ResourceLimitIncludedVSEnterpriseUsers}</div>
                                        <div class="d-sub-text-font column-padding">${BuildResources.ResourceLimitIncludedVSEnterpriseUsersOnPremHelpText}</div>
                                    </td>
                                    <td class="d-padding">
                                        <div class="d-width" data-bind="text: enterpriseUsersCount"></div>
                                    </td>
                                    <td class="d-padding">
                                        <!-- ko if: canManageOnPremUsers -->
                                        <a tabindex="0" class="r-private-manage-users" aria-describedby="onprem-vse-users-manage-desc" data-bind="attr: { href: manageUsersURL }" target="_blank" rel="noopener noreferrer">${BuildResources.ManageResourceTitle}</a>
                                        <div id="onprem-vse-users-manage-desc" class="hidden">${BuildResources.ManageUsershelpText}</div>
                                        <!-- /ko -->
                                        <!-- ko ifnot: canManageOnPremUsers -->
                                        <span tabindex="0" role="tooltip" class="r-private-manage-users bowtie-icon bowtie-status-info-outline" data-bind="visible: hasBasicLicense, showRichContentTooltip: { text: manageVSEnterpriseUsersHelp, setAriaDescribedBy: true, popupTag: true }"></span>
                                        <!-- /ko -->
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="onprem-private-purchased-count-label">${BuildResources.ResourceLimitMonthlyPurchases}</div>
                                    </td>
                                    <td class="d-padding">
                                        <!-- ko if: hasBasicLicense -->
                                        <input type="text" class="onprem-private-purchased-count" aria-labelledby="onprem-private-purchased-count-label" data-bind="css: { 'invalid': isPurchasedInvalid }, value: purchasedLicenseCountValue, valueUpdate: 'afterkeydown'" maxlength="6"/>
                                        <!-- /ko -->
                                        <!-- ko ifnot: hasBasicLicense -->
                                        <div class="onprem-private-purchased-count" data-bind="visible: !hasBasicLicense(), text: purchasedLicenseCount"></div>
                                        <!-- /ko -->
                                    </td>
                                    <td class="d-padding">
                                        <!-- ko if: hasBasicLicense -->
                                        <div tabindex="0" role="button" data-bind="event: { click: onBuyMoreLicenses, keydown: onLinkKeyDown }" class="r-buy-more as-link">${BuildResources.ChangeText}</div>
                                        <!-- /ko -->
                                    </td>
                                </tr>
                                <!-- ko if: hasBasicLicense -->
                                <tr>
                                    <td>
                                        <div class="r-update-button bowtie">
                                            <button tabindex="0" class="cta" data-bind="enable: enableSave, click: updateLicenseLimits">${BuildResources.UpdateResourcesButtonLable}</button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- /ko -->
                            </table>
                        </td>
                        <td class="r-total-data">
                            <div class="r-total-limit">
                                <div class="r-heading">${BuildResources.ResourceLimitTotalParallelReleases}</div>
                                <div class="r-count-data" data-bind="text: totalLicenseCount"></div>
                                <div>${BuildResources.ResourceLimitFreeReleaseDescirption}</div>
                                <!-- ko if: hasBasicLicense -->
                                <div>
                                    <div class='horizontal-title-separator adjust-margin'></div>
                                    <div class='pipeline-plan-groups-queue-dialog-placeholder'></div>
                                    <div tabindex="0" data-bind="event: { keydown: onLinkKeyDown, click: showPlanGroupsQueueDialog }" class="pipeline-plan-groups-queue-dialog-open-link as-link" role="button">${BuildResources.PipelinesPlanGroupsQueueLinkText}</div>
                                </div>
                                <!-- /ko -->
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <!-- /ko -->
    <!-- ko if: isHosted -->
    <div class="r-admin-main r-throttle" role="region" aria-labelledby="rl-section-heading-hosted">
        <div class="r-sub-head">
            <table class="r-head-table">
                <tr>
                    <td>
                        <h3 id="rl-section-heading-hosted" class="r-main-head">${BuildResources.AdminResourceLimitsHeading}</h3>
                    </td>
                    <td>
                        <a class="r-learn-more" data-bind="attr: { href: learnMoreURL }" target="_blank" rel="noopener noreferrer">${BuildResources.LearnMoreAboutPipelinesLinkText}</a>
                    </td>
                </tr>
            </table>
            <div class="horizontal-line splitter horizontal r-splitter"></div>
            <div class="r-data-head">
                <div class="r-desc">${BuildResources.ResourceLimitsDescriptionHosted}</div>
                <table class="r-outer-tab">
                    <tr>
                        <td>
                            <table class="r-data">
                                <!-- Private pipelines data -->
                                <tr class="d-section">
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img class="img-pipelines" data-bind="attr: { src: pipelinesImgURL }" alt="${BuildResources.PipelinesText}" />
                                                </td>
                                                <td>
                                                    <div class="d-total-head-font">${BuildResources.PrivatePipelinesText}</div>
                                                    <div class="d-sub-text-font">${BuildResources.PrivatePipelinesHelpText}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width d-total-font" data-bind="text: totalPrivatePipelinesCount"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="column-padding">${BuildResources.ResourceLimitFreeWithAccount}</div>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width" data-bind="text: freeLicenseCount"></div>
                                    </td>
                                </tr>
                                <!-- ko if: (freeAdditionalGrants() !== "") -->
                                <tr>
                                    <td>
                                        <div class="column-padding">${BuildResources.PipelineAdditionalGrants}</div>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width" data-bind="text: freeAdditionalGrants"></div>
                                    </td>
                                </tr>
                                <!-- /ko -->
                                <tr>
                                    <td>
                                        <div>${BuildResources.ResourceLimitIncludedVSEnterpriseUsers}</div>
                                        <div class="d-sub-text-font column-padding">${BuildResources.ResourceLimitIncludedVSEnterpriseUsersHelpText}</div>
                                    </td>
                                    <td class="d-padding">
                                        <div class="d-width" data-bind="text: enterpriseUsersCount"></div>
                                    </td>
                                    <td class="d-padding">
                                        <!-- ko if: hasBasicLicense -->
                                        <a tabindex="0" class="r-private-manage-users" aria-describedby="vsts-vse-users-manage-desc" data-bind="attr: { href: manageUsersURL }" target="_blank" rel="noopener noreferrer">${BuildResources.ManageResourceTitle}</a>
                                        <div id="vsts-vse-users-manage-desc" class="hidden">${BuildResources.ManageUsershelpText}</div>
                                        <!-- /ko -->
                                    </td>
                                </tr>
                                <tr>
                                    <td class="d-section-end">
                                        <div>${BuildResources.ResourceLimitMonthlyPurchases}</div>
                                    </td>
                                    <td class="d-padding">
                                        <div class="d-width" data-bind="text: purchasedLicenseCount"></div>
                                    </td>
                                    <td class="d-padding">
                                        <!-- ko if: hasBasicLicense -->
                                        <a tabindex="0" class="r-private-change" aria-describedby="vsts-private-purchased-manage-desc" data-bind="attr: { href: privatePipelineExtensionURL }" target="_blank" rel="noopener noreferrer">${BuildResources.ChangeText}</a>
                                        <div id="vsts-private-purchased-manage-desc" class="hidden">${BuildResources.ChangePrivatePipelinesLinkTooltipText}</div>
                                        <!-- /ko -->
                                    </td>
                                </tr>
                                <!-- Hosted pipelines data -->
                                <tr class="d-section">
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img class="img-pipelines" data-bind="attr: { src: pipelinesImgURL }" alt="${BuildResources.PipelinesText}" />
                                                </td>
                                                <td>
                                                    <div class="d-total-head-font">${BuildResources.HostedPipelinesText}</div>
                                                    <div class="d-sub-text-font">${BuildResources.HostedPipelinesHelpText}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width d-total-font" data-bind="text: totalHostedPipelinesCount"></div>
                                    </td>
                                </tr>
                                <!-- ko if: (totalHostedPipelinesCount() <= 0) -->
                                <tr>
                                    <td>
                                        <div>${BuildResources.HostedAgentMinutesUsedLabelText}</div>
                                        <div class="d-sub-text-font column-padding" data-bind="text: hostedAgentMinutesHelpText"></div>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width" data-bind="text: hostedAgentMinutesUsedText"></div>
                                    </td>
                                </tr>
                                <!-- /ko -->
                                <!-- ko if: (totalHostedPipelinesCount() > 0) -->
                                    <tr>
                                        <td>
                                            <div class="column-padding">${BuildResources.ResourceLimitFreeWithAccount}</div>
                                        </td>
                                        <td colspan="2" class="d-padding">
                                            <div class="d-width" data-bind="text: freeHostedLicenseCount"></div>
                                        </td>
                                    </tr>
                                    <!-- ko if: (freeHostedAdditionalGrants() > 0) -->
                                    <tr>
                                        <td>
                                            <div class="column-padding">${BuildResources.PipelineAdditionalGrants}</div>
                                        </td>
                                        <td colspan="2" class="d-padding">
                                            <div class="d-width" data-bind="text: freeHostedAdditionalGrants"></div>
                                        </td>
                                    </tr>
                                    <!-- /ko -->
                                <!-- /ko -->
                                <tr>
                                    <td class="d-section-end">
                                        <div>${BuildResources.ResourceLimitMonthlyPurchases}</div>
                                        <div class="d-sub-text-font">${BuildResources.ResourceLimitMonthlyPurchasesHostedHelpText}</div>
                                    </td>
                                    <td class="d-padding">
                                        <div class="d-width" data-bind="text: purchasedHostedLicenseCount"></div>
                                    </td>
                                    <td class="d-padding">
                                        <!-- ko if: hasBasicLicense -->
                                        <a  class="r-hosted-change" aria-describedby="vsts-hosted-purchased-manage-desc" data-bind="attr: { href: hostedPipelineExtensionURL }" target="_blank" rel="noopener noreferrer">${BuildResources.ChangeText}</a>
                                        <div id="vsts-hosted-purchased-manage-desc" class="hidden">${BuildResources.ChangeHostedPipelinesLinkTooltipText}</div>
                                        <!-- /ko -->
                                    </td>
                                </tr>
                                <!-- Total pipelines data -->
                                <tr class="d-total-section">
                                    <td>
                                        <div class="d-total-head-font">${BuildResources.TotalPipelinesText}</div>
                                    </td>
                                    <td colspan="2" class="d-padding">
                                        <div class="d-width d-total-font" data-bind="text: totalLicenseCount"></div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="r-total-data">
                            <div class="r-total-limit">
                                <div class="r-heading">${BuildResources.ResourceLimitTotalPipelines}</div>
                                <div class="r-count-data" data-bind="text: totalLicenseCount"></div>
                                <div>${BuildResources.ResourceLimitFreeReleaseDescirption}</div>
                                <!-- ko if: hasBasicLicense -->
                                <div>
                                    <div class='horizontal-title-separator adjust-margin'></div>
                                    <div class='pipeline-plan-groups-queue-dialog-placeholder'></div>
                                    <div tabindex="0" data-bind="event: { keydown: onLinkKeyDown, click: showPlanGroupsQueueDialog }" class='pipeline-plan-groups-queue-dialog-open-link as-link' role="button">${BuildResources.PipelinesPlanGroupsQueueLinkText}</div>
                                </div>
                                <!-- /ko -->
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <!-- /ko -->
</div>`;

    private _ensureEnhancements = (ref: HTMLElement): void => {

        const $container = $(ref);
        const retentionTabDeleteFileShareEnabled = FeatureAvailabilityService.isFeatureEnabled(FeatureAvailabilityFlags.FilePathArtifactsAndSymbolsDeleteFeature, false);

        const filePathArtifactAndDelete = retentionTabDeleteFileShareEnabled ? this.filePathArtifactsAndDeleteTemplate : "";

        $container.find("#buildvnext_admin_settings_tab").html(
            this.buildvnextAdminSettingsTabTemplatePart1 
            + filePathArtifactAndDelete 
            + this.buildvnextAdminSettingsTabTemplatePart2 
            + filePathArtifactAndDelete
            + this.buildvnextAdminSettingsTabTemplatePart3
        );      
        $container.find("#br_admin_resourcelimits_tab").html(this.brAdminResourcelimitsTabTemplate);
        $container.find(".buildvnext-admin-view .options").html(this.props.buildQueueOptions);
        VSS.globalProgressIndicator.registerProgressElement($container.find(".pageProgressIndicator"));

        VSS_Controls.Enhancement.ensureEnhancements();
    }

    public render(): JSX.Element {

        return (
            <div className={"hub-view buildvnext-admin-view"} ref={this._ensureEnhancements}>           
                <script className="options"  type="application/json"></script>
                <div className="hub-content">        
                    <div className="hub-pivot" role="navigation">
                        <div className="views">
                            <ul className="empty pivot-view enhance buildvnext-admin-tabs" role="tablist">
                                <li className="selected" data-id="settings" role="presentation">
                                    <a aria-posinset={1} aria-setsize={2} href="#_a=settings" role="tab">Settings</a>
                                </li>
                                { this.props.includeResourceLimitsSection && <li data-id="resourceLimits" role="presentation">
                                    <a aria-posinset={2} aria-setsize={2} href="#_a=resourceLimits" role="tab">Resource limits</a>

                                </li>
                                }
                            </ul>
                        </div>
                        <div className="filters">
                            
                        </div>            
                    </div>
                    <div className="hub-pivot-content" role="main">
                        <div className="buildvnext-admin-content"></div>
                        <script id="buildvnext_admin_settings_tab" type="text/html"></script>
                        <script id="br_admin_resourcelimits_tab" type="text/html"></script>
                    </div>
                </div>
            </div>
        );
    }
}