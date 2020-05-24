// Copyright (C) Microsoft Corporation. All rights reserved.
define("TFS/Admin/Views/OrganizationOverview/Resources", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubscriptionId = "Azure Subscription ID {0}";
    exports.BillingTitle = "Billing Information";
    exports.BillingText = "Set up billing for your organization";
    exports.LearnMoreBillingText = "Learn more";
    exports.LearnMoreBillingLink = "https://go.microsoft.com/fwlink/?LinkID=512045";
    exports.ManageAzureSubscriptionLinkText = "Manage billing";
    exports.ManageAzureSubscriptionLink = "https://go.microsoft.com/fwlink/?LinkID=512046";
    exports.ChangeOrganizationOwnerTitle = "Change organization owner";
    exports.SearchUsers = "Search users";
    exports.PlaceholderText = "Enter name or email address";
    exports.ChangeButton = "Change";
    exports.CancelButton = "Cancel";
    exports.ErrorText = "The selected user is not a member of this Azure DevOps organization.  Please add this user to {0} in the Organization Settings first.";
    exports.AriaSelectNewOWner = "Select New Owner";
    exports.UpdateOwnerSuccess = "Successfully updated organization owner";
    exports.ChangeOwner = "Change owner";
    exports.SelectedUserNotFoundError = "The selected user information could not be found.";
    exports.SelectedGroupError = "Groups are not supported as organization owners. Please select a user.";
    exports.NewOwnerFetchError = "Unable to fetch new owner data. Please refresh the page.";
    exports.SelectedSameUserError = "The selected user is the current owner of this organization. Please select a different user.";
    exports.DeleteOrganizationDialogTitle = "Delete organization";
    exports.DeleteOrganizationFirstParagraph = "Are you sure you want to delete the \"{0}\" organization? All users in your organization will immediately lose access.";
    exports.DeleteOrganizationSecondParagraph = "You will have up to 30 days to recover this organization after which it will be permanently deleted.  This will result in the loss of all organization and related project artifacts. ";
    exports.DeleteOrganizationConfirmationText = "To confirm this action, please type \"{0}\".";
    exports.DeleteOrganizationPlaceholderText = "Type organization name";
    exports.AgreementStatement = "By clicking {0} you agree to the {1} and {2}.";
    exports.BoldDelete = "delete";
    exports.TermsOfService = "Terms of Service";
    exports.TermsOfServiceLink = "https://azure.microsoft.com/en-us/support/legal/";
    exports.PrivacyStatement = "Privacy Statement";
    exports.PrivacyStatementLink = "https://privacy.microsoft.com/en-US/privacystatement";
    exports.DeleteOrganizationDialogLearnMoreText = "Learn more about restoring organizations";
    exports.DeleteOrganizationDialogLearnMoreLink = "https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/recover-your-organization";
    exports.DeleteOrganizationHeading = "Delete organization";
    exports.DeleteOrganizationNote = "This will affect all contents and members of this organization. ";
    exports.DeleteOrganizationLearnMoreText = "Learn more about deleting organizations";
    exports.DeleteOrganizationLearnMoreLink = "https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/delete-your-organization";
    exports.DeleteOrganizationButton = "Delete";
    exports.DeleteOrganizationRouteURL = "https://azure.microsoft.com/en-us/services/devops/";
    exports.SoftDeletedTitle = "Recently deleted projects";
    exports.SoftDeletedText = "Restoring a deleted project will recover all project artifacts including work items, repos, teams, and builds. Projects that appear here will be permanently deleted after 28 days. ";
    exports.SoftDeletedLearnMoreText = "Learn more about deleting and restoring projects.";
    exports.SoftDeletedLearnMoreLink = "https://aka.ms/recover-project";
    exports.SoftDeletedRestoreButton = "Restore";
    exports.SoftDeletedProjectDetails = "";
    exports.RestoreDialogTitle = "Restore deleted project";
    exports.RestoreDialogParagraph1 = "The project name \"{0}\" is no longer available. You can restore your project by choosing a different name.";
    exports.RestoreDialogParagraph2 = "Current name: {0}";
    exports.RestoreDialogPlaceholder = "Project name";
    exports.RestoreDialogCancel = "Cancel";
    exports.RestoreDialogConfirm = "Confirm";
    exports.RestoreDialogSameName = "A project with this name already exists. Please select a new project name";
    exports.RestoreProjectError = "Error restoring project";
    exports.InvalidProjectNameError = "\"{0}\" is not a valid project name.";
    exports.SeeMoreLink = "See More";
    exports.DeletedText = "Deleted {0}";
    exports.Name = "Name";
    exports.Icon = "Icon";
    exports.WaitError = "There was an error while waiting for the operation to complete.";
    exports.OrganizationOverviewHeading = "Overview";
    exports.CloseButton = "Close";
    exports.NameHeading = "Name";
    exports.DescriptionHeading = "Description";
    exports.OrganizationProfileImage = "Organization profile image";
    exports.LearnMorePrivacyUrl = "Learn more about the Privacy URL";
    exports.LearnMorePrivacyUrlLink = "https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/add-privacy-policy-url?view=azure-devops";
    exports.DomainLearnMore = "Learn more about URLs";
    exports.DomainLearnMoreLink = "https://aka.ms/new-domain";
    exports.Visualstudio = "{0}.visualstudio.com";
    exports.SaveButton = "Save";
    exports.Region = "Region";
    exports.TimeZone = "Time zone";
    exports.PrivacyUrlHeading = "Privacy URL";
    exports.DescriptionPlaceholder = "Add organization description";
    exports.NewDomain = "Use the new URL:  {0}";
    exports.CurrentDomain = "Current URL:  {0}";
    exports.AriaOrganizationName = "Organization name";
    exports.AriaToggle = "Enable new URL";
    exports.AriaPrivacyURL = "Organization Privacy URL";
    exports.AriaDescription = "Organization description";
    exports.AriaTimeZone = "Organization time zone";
    exports.AreaRegion = "Organization region";
    exports.ChangesWarning = "Changes made will affect all projects and members of the organization";
    exports.RenameOrganizationDialogTitle = "Change organization name";
    exports.RenameOrganizationDialog1 = "Changing your organization name has several side effects. Please read the following before you proceed.";
    exports.RenameOrganizationDialog2 = "Save all your work and ensure that nobody is using the service.\n\rThe existing organization URL {0} will not be redirected.\n\rWorkspaces and connection strings will need to be updated to point to the new URL. {1}";
    exports.RenameOrganizationDialog2Link = "https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/rename-organization";
    exports.RenameOrganizationConfirmationText = "I understand the consequences of renaming this organization.";
    exports.RenameOrganizationNewName = "New Organization Name";
    exports.InvalidOrganizationNameMessage = "\"{0}\" is not a valid organization name.";
    exports.OrganizationOwner = "Organization owner";
    exports.FailedUpdate = "Failure to update organization";
    exports.FailedMigration = "Migrate domain failure";
    exports.ChangeOrganizationDomain = "Change organization domain";
    exports.Cancel = "Cancel";
    exports.TenantId = "Tenant Id: {0}";
    exports.ChangeOrganizationText = "This change will affect all users in your organization. Links from many email and web-based links will change. Do you confirm this change?";
    exports.UpdateDetailsSuccess = "Successfully updated organization details";
    exports.UpdateToggleSuccess = "Successfully updated domain URL";
    exports.NameIsNotAvailable = "{0} is not available.  Please choose another.";
    exports.DataProviderError = "We are unable to load overview settings at this time.  Please try again later.";
});