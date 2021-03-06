import * as Performance from "VSS/Performance";
import * as CommonCIConstants from "Search/Scenarios/Shared/CustomerIntelligenceConstants";
import { ITelemetryWriter, publishTelemetryEvent, createTelemetryEventData, SearchPerfTelemetryAdditionalData } from "Search/Scenarios/Shared/Base/Telemetry";
import { CustomerIntelligenceConstants } from "Search/Scenarios/WorkItem/Constants";
import { SubsequentScenario } from "Search/Scenarios/Shared/Base/Scenario";

/**
 * Writes telemetry events for code search page.
 */
export class TelemetryWriter implements ITelemetryWriter {
    public readonly initialScenario: Scenario;
    public readonly subsequentScenario: SubsequentScenario;

    constructor(isInitialPageLoad: boolean) {
        this.initialScenario = new Scenario(isInitialPageLoad);
        this.subsequentScenario = new SubsequentScenario(CustomerIntelligenceConstants.SubsequentSearchScenarioName);
    }

    public publish = (feature: string, extraProperties: IDictionaryStringTo<any> = {}): void => {
        publishTelemetryEvent(createTelemetryEventData(feature, CustomerIntelligenceConstants.EntityName, extraProperties));
    }

    public dispose = (): void => {
        this.initialScenario.dispose();
        this.subsequentScenario.dispose();
    }
}

export class Scenario {
    private performanceScenario: Performance.IScenarioDescriptor;
    private previewPerformanceScenario: Performance.IScenarioDescriptor;

    constructor(isInitialPageLoad: boolean) {
        this.performanceScenario = this.getSearchScenario(isInitialPageLoad);
        this.previewPerformanceScenario = this.getPreviewScenario(isInitialPageLoad);

        this.performanceScenario.addSplitTiming("startedInitialization");
        this.previewPerformanceScenario.addSplitTiming("startedInitialization");
    }

    public notifySearchStarted = (): void => {
        if (this.performanceScenario.isActive()) {
            this.performanceScenario.addSplitTiming("searchStarted");
        }
    }

    public notifyResultsRendered = (data: SearchPerfTelemetryAdditionalData): void => {
        if (this.performanceScenario.isActive()) {
            this.performanceScenario.addSplitTiming("resultsRendered");
            this.performanceScenario.addData(data);
            this.performanceScenario.end();
        }
    }

    public notifySearchFailed = (): void => {
        if (this.performanceScenario) {
            this.performanceScenario.abort();
        }

        if (this.previewPerformanceScenario) {
            this.previewPerformanceScenario.abort();
        }
    }

    public notifyPreviewRendered = (isSuccess: boolean): void => {
        if (this.previewPerformanceScenario.isActive()) {
            if (isSuccess) {
                this.previewPerformanceScenario.addSplitTiming("previewRendered");

                this.previewPerformanceScenario.end();
            }
            else {
                this.previewPerformanceScenario.abort();
            }
        }
    }

    public dispose = (): void => {
        this.performanceScenario.abort();
        this.previewPerformanceScenario.abort();
    }

    private getSearchScenario(isInitialPageLoad): Performance.IScenarioDescriptor {
        return isInitialPageLoad
            ? Performance.getScenarioManager().startScenarioFromNavigation(CommonCIConstants.SEARCH_AREA, CustomerIntelligenceConstants.TTIScenarioName, true)
            : Performance.getScenarioManager().startScenario(CommonCIConstants.SEARCH_AREA, CustomerIntelligenceConstants.TabSwitchScenarioName);
    }

    private getPreviewScenario(isInitialPageLoad): Performance.IScenarioDescriptor {
        return isInitialPageLoad
            ? Performance.getScenarioManager().startScenarioFromNavigation(CommonCIConstants.SEARCH_AREA, CustomerIntelligenceConstants.RedirectedPreviewScenario)
            : Performance.getScenarioManager().startScenario(CommonCIConstants.SEARCH_AREA, CustomerIntelligenceConstants.PreviewOnTabSwitchScenario);
    }
}