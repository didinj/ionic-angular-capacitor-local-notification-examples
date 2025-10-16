import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { LocalNotifications } from '@capacitor/local-notifications';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  async ngOnInit() {
    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === 'granted') {
      // Define notification actions
      await LocalNotifications.registerActionTypes({
        types: [
          {
            id: 'TASK_ACTIONS',
            actions: [
              {
                id: 'done',
                title: 'Done',
              },
              {
                id: 'snooze',
                title: 'Snooze',
              },
            ],
          },
        ],
      });

      console.log('Notification actions registered!');
    }

    LocalNotifications.addListener('localNotificationActionPerformed', (event) => {
      const actionId = event.actionId;
      console.log('User tapped action:', actionId);

      if (actionId === 'done') {
        alert('Good job! Task marked as done.');
      } else if (actionId === 'snooze') {
        alert('Snoozed for 5 minutes.');
      }
    });

    // ✅ Listen for foreground notifications
    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Notification received in foreground:', notification);
      alert(`📬 ${notification.title}\n${notification.body}`);
    });

    LocalNotifications.addListener('localNotificationActionPerformed', (event) => {
      // const notification = event.notification;
      // const actionId = event.actionId;

      // console.log('Notification tapped:', notification);
      // console.log('Action selected:', actionId);

      // // Handle notification actions
      // if (actionId === 'done') {
      //   alert('✅ Task marked as done!');
      // } else if (actionId === 'snooze') {
      //   alert('😴 Task snoozed for 5 minutes!');
      // } else {
      //   // Default tap (no action)
      //   alert(`You opened: ${notification.title}`);
      // }
      const page = event.notification.extra?.page;
      if (page) {
        console.log(`Navigate to: ${page}`);
        // Example: this.router.navigate([page]);
      }
    });

    App.addListener('appUrlOpen', (data) => {
      console.log('App opened from URL:', data);
    });

    App.addListener('appStateChange', (state) => {
      console.log('App state changed:', state);
    });
  }
}
