import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() { }

  async scheduleNotification() {
    // await LocalNotifications.schedule({
    //   notifications: [
    //     {
    //       title: 'Custom Sound Alert',
    //       body: 'This notification has a custom sound 🔔',
    //       id: 4,
    //       sound: 'notify_sound', // file name without extension
    //       schedule: { at: new Date(Date.now() + 1000 * 5) }, // 5 seconds later
    //       attachments: undefined,
    //       actionTypeId: '',
    //       extra: null,
    //     },
    //   ],
    // });
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'New Message',
          body: 'Tap to open chat',
          id: 5,
          extra: { page: '/chat' },
        },
      ],
    });

    console.log('Notification scheduled!');
  }

  async scheduleDailyReminder() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Daily Reminder',
          body: 'Don’t forget to check your tasks for today ✅',
          id: 2,
          schedule: {
            on: { hour: 9, minute: 0 }, // fires every day at 9:00 AM
            repeats: true,
          },
        },
      ],
    });

    console.log('Daily reminder scheduled!');
  }

  async scheduleActionNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Task Reminder',
          body: 'Complete your daily report 📝',
          id: 3,
          actionTypeId: 'TASK_ACTIONS',
        },
      ],
    });

    console.log('Action notification scheduled!');
  }
}
