# ScobbBucks

A Venmo-style app for trading ScobbBucks: 5,000 coins, six rarities, squishy avatars, a shop and trades. It runs on GitHub Pages and keeps its data in Firebase.

## What you need

- A GitHub account
- A Google account for Firebase. The free Spark plan is enough for a group of friends.

## 1. Set up Firebase

1. Go to https://console.firebase.google.com and create a project. You can turn off Google Analytics.
2. Turn on logins: open **Authentication**, click **Get started**, then under **Sign-in method** turn on **Email/Password** and save.
3. Create the database: open **Firestore Database**, click **Create database**, pick a location near you, and start in **production mode**.
4. Add the rules: open the **Rules** tab in Firestore, delete what's there, and paste everything from `firestore.rules`. Change `CHANGE_ME` to your username in lowercase, then click **Publish**.
5. Get your app's settings: open **Project settings** (the gear icon), scroll to **Your apps**, click the web icon (`</>`) and register an app. You don't need Firebase Hosting. Copy the `firebaseConfig` values it shows you.

## 2. Fill in firebase-config.js

- Paste your values into `FIREBASE_CONFIG`.
- Set `BANK_USERNAME` to the username you'll use. It has to match the name you put in `firestore.rules`.

These values aren't secret. Firebase web settings are meant to be public, and the rules are what protect the data.

## 3. Put it on GitHub Pages

1. Create a new public repository on GitHub, for example `scobbbucks`.
2. Click **Add file > Upload files** and upload `index.html` and `firebase-config.js`. You can add `README.md` and `firestore.rules` too. Then commit.
3. Open the repository's **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute or two, the site is live at `https://YOUR-GITHUB-NAME.github.io/scobbbucks/`.
5. Back in Firebase, open **Authentication > Settings > Authorized domains** and add `YOUR-GITHUB-NAME.github.io`.

## 4. Mint and invite

1. Open your site and create your account with the bank username. Do this right away so nobody else takes that name.
2. Mint the 5,000 ScobbBucks and make your avatar.
3. Send friends the link. They make their own accounts, and you can send them coins by username or phone number.

## Good to know

- Anyone with the link can make an account and see usernames, balances and items. Phone numbers are only stored as a scrambled code.
- There's no password reset, because accounts don't use real email addresses. Players can change their password in Settings while logged in.
- Usernames can't be changed, since that's how people log in.
- Every send, purchase, trade and mint is saved as a permanent record that can't be edited. The app checks every record, which keeps the coin supply honest.
- The shop rotates every Monday at midnight Eastern. There are thousands of cosmetics, and each week's shop shows 10 of them. Buying only works on items in that week's shop.
- The bank can add coins with **Mint more ScobbBucks** on the wallet, up to 5,000 at a time. Each new coin gets a random rarity with the same odds as the first 5,000.
- The free Firebase plan covers a group of friends. If lots of people use it every day, you may need to upgrade.
- This version has its own coins. The ScobbBucks you made in Claude keeps separate data.

## Scobb Farm (preview)

`farm.html` is a 30-minute live farm battle game. Build farms, trade Jelly at the market or with friends, raid each other's farms with scobbs, and chat during the round. Own half of all the farms (at least 10, and twice as many as anyone else) to win early.

- It's in preview: only the bank and the usernames in `FARM_TESTERS` (in `firebase-config.js`) can open it.
- Preview uses its own test data and pretend prizes, so real ScobbBucks aren't touched.
- To set it up, upload `farm.html` and `firebase-config.js`, and paste the updated `firestore.rules` into Firebase and click **Publish**.
- Open it at `https://YOUR-GITHUB-NAME.github.io/scobbbucks/farm.html`. The bank opens each round from that page.
