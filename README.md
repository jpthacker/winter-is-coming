# Winter Is Coming

> Because no matter the weather, winter is always coming… especially in Wales!

## Running the App

### Prerequisites

- Node.js v20.19.4 or higher
- npm

### Install and start

Run `npm install` then `npx expo start`

### Platforms

**Web (recommended):**
Press `w` in the terminal or navigate to `http://localhost:8081`

**Android:**
Install Expo Go from the Play Store, ensure your device is on the
same WiFi network, and scan the QR code in the terminal.
If the connection fails, press `t` to switch to tunnel mode:
npx expo start --tunnel

**iOS:**
Note: This project uses Expo SDK 56 which is currently ahead of
the App Store version of Expo Go at time of submission. iOS testing
requires either joining the Expo Go TestFlight beta at expo.dev/go,
or running on an iOS simulator via Xcode. Web is the recommended
way to review this submission.

## Development Notes & scalability

I adopted a two-layer (api and domain) typing approach (`api.ts` & `weather.ts`, respectively) to ensure a seperation between the application layer and the external API. This brings two main benefits… First, it protects my application code from API changes (such as if a weather property is re-named by Open Meteo). Additionally, it preserves all the transformations in one place, meaning that this doesn't take place in components, making testing easier.

The seperation between my domain and api means that adding a new data point would be relatively straightforward, and, importantly, changes would be contained between layer boundaries. Moreover, my single transformer means I could potentially source weather data from multiple APIs without having to complicate my domain data structure in my application layer.

I chose TanStack Query as its retry, polling and caching features are well suited to mobile apps, which can suffer connectivity issues when in the hands of users. It manages the full lifecycle of server state with minimal configuration, so I only need to handle three states: loading, error, and success.

Polling is configured for a 15 minute interval which is appropriate for weather data. During development a shorter interval was used to verify the behaviour.

I used constants for the api configuration and the weather code lookups for ease and simplicity. Adding icons or other weather metadata for additional weather codes would be single line or minimal changes.

Using Tanstack Query means that if I needed to fetch data from another external source, I could simple add another custom hook and leave the existing code untouched.

## Monitoring

If this was an app aimed for production, I'd look into adding Sentry, which has a React Native SDK available. The setup for this appears to be simple for React Native applications, but it's not a technology I've used, so I'd need to access its effectiveness. I didn't have time to look into using open telemetery, like we do throughout Tes, but its compatability with React Native is also an area that I'd explore if I had the opportunity.

## Future Improvements

With more time, I would've broken up my homescreen view into smaller components, such as a dedicated current weather card and specific components for the forecast list and its items.

Likewise, I would've seperated out much of the transformation logic into dedicated functions in their own files, such a formatDate() function, to conform with a seperation of concerns.

I would've loved to have had the opportunity to experiment with Expo's app router for navigation, which I could've possibly made use of if I'd had the chance to implement the daily forecast as a carousel of weather cards.

Other improvements could include dynamic styling based on weather conditions, the addition of extra weather measurements (easily added with just a few single line changes in the types, transformer and views), and a location feature, but this last addition would be more ambitious.

Finally, I would've cleaned up the folder structure and removed unneccessary files that were added during `npx create-expo-app` initialization.
