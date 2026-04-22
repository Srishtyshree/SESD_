class NotificationObserver {
  update(event, data) {
    throw new Error('Method update() must be implemented');
  }
}

class EmailNotificationObserver extends NotificationObserver {
  update(event, data) {
    console.log(`[Email] Sending notification for ${event}:`, data);
    // In a real app, use nodemailer or similar
  }
}

class PushNotificationObserver extends NotificationObserver {
  update(event, data) {
    console.log(`[Push] Sending notification for ${event}:`, data);
  }
}

class NotificationService {
  #observers = [];

  subscribe(observer) {
    this.#observers.push(observer);
  }

  unsubscribe(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  notify(event, data) {
    this.#observers.forEach(obs => obs.update(event, data));
  }
}

const notificationService = new NotificationService();
notificationService.subscribe(new EmailNotificationObserver());
notificationService.subscribe(new PushNotificationObserver());

module.exports = notificationService;
