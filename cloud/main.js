let webpush = require('web-push');
let config = require('./config')

Parse.Cloud.define('hello', (req, res) => {
  return {req, res};
});

Parse.Cloud.define('sendMessage', async (req) => {
  const { params } = req;
  const Chat = Parse.Object.extend('Chat');
  const chat = new Chat();
  const inboxQuery = new Parse.Query('Inbox');
  inboxQuery.equalTo('inboxHash', params.inbox.inboxHash);

  const inbox = await inboxQuery.find();

  inbox[0].set('lastMessage', params.chat.message);
  inbox[0].save();
  inbox[1].set('lastMessage', params.chat.message);
  inbox[1].save()
  chat.save(params.chat);

  sendPush(params.pushData)
});

async function sendPush(pushData) {
  const query = new Parse.Query('NewsLetter');
  const notificationPayload = {
    notification: {
      title: pushData.userName,
      body: pushData.message,
      icon: 'assets/icons/logo.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
    }
  };

  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.publicKey,
    config.privateKey
  );
  
  query.equalTo('userId', pushData.userId)
  const results = await query.find();
 
  try {
    await Promise.all(results.map((news) => {
      webpush.sendNotification(news.get('subs'), JSON.stringify(notificationPayload));
    }))

    return 'notification sent successfully';
  } catch (err) {
    return err;
  }
}
