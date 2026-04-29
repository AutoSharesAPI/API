### Overview

AutoShares is a cross-platform online trading solution for Stocks, Options, and ETFs with all-encompassing trading functionality. Even though AutoShares provides both the web and the mobile interfaces for executing trades and analyzing markets, some users opt to implement their own custom interfaces that suit their requirements. For this purpose, AutoShares offers a trading platform as well as extended REST API that can be invoked to perform various trading operations like creating users, getting quotes, and placing orders. 

In this scenario AutoShares serves as the backend platform for your own custom-made web terminal or mobile app. Your task is to develop the mobile and web UI that invokes our API to perform all of the trading operations. On our side, we will execute your customers' orders on the required exchange, settle all transactions with the clearing firm, and take care of all of behind-the-scenes technicalities.

Another frequent use-case of our API is to augment the existing functionality of AutoShares trading platform by designing custom widgets. In this scenario you create your own custom JavaScript-based widgets that can load various information about the user's positions, place new orders, and perform just about any other action. For example, you can create a widget that displays the user's most frequently traded securities; or a widget that displays the list of users' positions with the highest profit or highest loss.

### Trading APIs

This is the trader's API that invokes actions typically performed by trader's widgets: placing orders, getting quotes, configuring price alerts, and so forth. This API can be called from anywhere simply using your app's API key and a user's credentials. 

