import * as OneSignal from "@onesignal/node-onesignal";
import { TokenProvider } from "@onesignal/node-onesignal";
import { ObjectId } from "mongoose";

enum NotificationType {
  NotifyToAllMember = "notifyToAllMember",
  NotifyToOwner = "NotifyToOwner",
  NotifyToUser = "NotifyToUser",
  NotifyToConcernedUser = "NotifyToConcernedUser",
  NotifyToNonShopUser = "NotifyToNonShopUser",
  NotifyToShopUser = "NotifyToShopUser",
  NotifyToSelectedUser = "NotifyToSelectedUser",
}

const AndroidClient = new OneSignal.DefaultApi(
  OneSignal.createConfiguration({
    authMethods: {
      app_key: {
        tokenProvider: {
          getToken: () => process.env.ONE_SIGNAL_AUTHORIZATION_ANDROID!,
        },
      },
    },
  })
);

const IosClient = new OneSignal.DefaultApi(
  OneSignal.createConfiguration({
    authMethods: {
      app_key: {
        tokenProvider: {
          getToken: () => process.env.ONE_SIGNAL_AUTHORIZATION_IOS!,
        },
      },
    },
  })
);

class LSNotification extends OneSignal.Notification {
  notificationType: NotificationType;
  notificationCreatorId: ObjectId;

  constructor(
    notificationType: NotificationType,
    notificationCreatorId: ObjectId
  ) {
    super();
    this.notificationType = notificationType;
    this.notificationCreatorId = notificationCreatorId;
  }

  setTitle(title: string) {
    this.headings = {
      en: title,
    };
  }

  setContent(content: string) {
    this.contents = {
      en: content,
    };
  }
}

export default LSNotification;
