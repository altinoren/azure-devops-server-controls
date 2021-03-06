// Copyright (C) Microsoft Corporation. All rights reserved.
define("Environments/Providers/Kubernetes/Resources", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeNameText = "Node Name";
    exports.NameText = "Name";
    exports.StatusText = "Status";
    exports.ImageText = "Image";
    exports.PodsDetailsText = "Pods";
    exports.StrategyText = "Strategy";
    exports.ReplicasCountText = "Pods #";
    exports.DeploymentsDetailsText = "Deployments";
    exports.ReplicaSetsDetailsText = "ReplicaSets";
    exports.ServicesDetailsText = "Services";
    exports.ClusterIPText = "Cluster IP";
    exports.ExternalIPText = "External IP";
    exports.TypeText = "Type";
    exports.AppNameText = "App Name";
    exports.LoadingLegacyComponent = "Loading view";
    exports.KubernetesSummaryDefaultTitle = "Kubernetes cluster summary";
    exports.KubernetesAuthValidationTitleText = "Validate to connect";
    exports.KubernetesAuthValidationHelpText = "The service account mapped to this resource doesn\u0027t have the necessary permissions to read workloads and services.";
    exports.ValidateText = "Validate";
    exports.LearnMoreText = "Learn more.";
    exports.AccessDeniedNewServiceAccountText = "Validate details to create a new service account. ";
    exports.AccessDeniedServiceAccountText = "Confirm that the service account has the necessary permissions and validate again. ";
    exports.KubernetesResourceDeletedHelpText = "Unable to connect to the cluster and namespace chosen for this resource. ";
    exports.KubernetesResourceDeletedAltText = "Unable to connect to the cluster and namespace";
    exports.DeleteResource = "Delete";
    exports.Loading = "Loading";
    exports.EditResource = "Validate";
    exports.DeleteResourceDialogHeader = "Delete \u0027{0}\u0027?";
    exports.DeleteResourceDialogText = "You will lose all the traceability associated with this resource. Are you sure you want to delete?";
});