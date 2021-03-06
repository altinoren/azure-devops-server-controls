import { IFeedSettingsState } from "Package/Scripts/Components/Settings/IFeedSettingsState";
import { FeedSettingsCi } from "Feed/Common/Constants/Constants";
import { IGeneralDialogProps } from "Package/Scripts/Dialogs/GeneralDialog";
import { CustomerIntelligenceHelper } from "Package/Scripts/Helpers/CustomerIntelligenceHelper";
import * as PackageResources from "Feed/Common/Resources";

/**
 * Show Delete permissions dialog when user clicked on Delete button in Permissions pivot
 */
export class ShowDeleteViewsDialogHandler {
    public static handle(state: IFeedSettingsState, emitCallback: () => void, onSaveCallback: () => void): void {
        state.dialogProps = {
            headerText: PackageResources.GeneralDialog_DeleteViews_Header,
            confirmText: PackageResources.GeneralDialog_DeleteViews_Content,
            severeWarningText: PackageResources.GeneralDialog_DeleteViews_Warning,
            saveButtonClassName: "delete-button",
            dialogClassName: "delete-dialog",
            saveButtonText: PackageResources.DeletionDialogContent_OkButton,
            onSavePrimaryButtonText: PackageResources.PackageCommands_DeletePackage_Deleting,
            onSaveCallback: async () => {
                CustomerIntelligenceHelper.publishEvent(FeedSettingsCi.ShowDeleteViewsDialog, {
                    feedId: state.feed().id,
                    action: "deleting"
                });

                try {
                    await onSaveCallback();
                } finally {
                    // set dialogProps to null to close the dialog
                    state.dialogProps = null;
                    emitCallback();
                }
            },
            onDismissCallback: () => {
                state.dialogProps = null;
                emitCallback();

                CustomerIntelligenceHelper.publishEvent(FeedSettingsCi.ShowDeleteViewsDialog, {
                    feedId: state.feed().id,
                    action: "dismissed"
                });
            }
        } as IGeneralDialogProps;
        emitCallback();
        CustomerIntelligenceHelper.publishEvent(FeedSettingsCi.ShowDeleteViewsDialog, {
            feedId: state.feed().id,
            action: "show"
        });
    }
}
