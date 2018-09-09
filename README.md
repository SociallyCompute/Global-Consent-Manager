 # Global Consent Manager

 This public repository is used to publish a Firefox web extension.
 
 This extension creates consent cookies to streamline the user's consent experience while on GDPR-regulated websites.<br />
 The code is not a finished product.
 
 ## How to install this web extension
 
 1. Download this repository to a location of your choice.
 2. Install Web-Ext from Mozilla's Github Repository here: https://github.com/mozilla/web-ext
 
 ### Installation: npm
 
 3. Install Global-Consent-Manager in its directory:
 ```
 npm install
 ```
 4. After the installation, you can run the program with the following command:
 ```
 npm start
 ```
 This will also launch Web-Ext.
 
 ## How to use this Web Extension
 
 Toggle the switch labeled "BLOCK CONSENT DIALOGS" to show or hide consent dialogs. <br /> 
     -If the toggle switch status is "ON", supported sites will not provide consent dialogs.<br /> 
     -If the toggle switch status is "OFF", supported sites will proceed normally.<br /> 
 <br /> 
 To show or hide consent dialogs on a single page, click Global Consent Manager's second button.<br />
     -If this button is labeled "WEBSITE TRUSTED", the current website should display a consent dialog.<br />
     -If this button is labeled "WEBSITE NOT TRUSTED" and the current website is on the list of supported websites, it should not display a consent dialog.<br />
     <br />
 Note: The secondary button will change its label to support primary consent options that are set by the user.<br />
 
 ## Licensing and Copyright
 
 All source code copyright is retained by the contributors. All contriubtions and source code are licensed under the MIT license. 
 
 Copyright (c) 2018 Global-Consent-Manager Contributors

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 ### Contributions
  
  Javascript WebExtension APIs used for the project are (c) Mozilla MDN.<br />
  This content is dedicated to the Public Domain.  http://creativecommons.org/publicdomain/zero/1.0/<br />
  Source: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API<br /> 
  WebExtension API packages currently used:<br />
   -cookies<br />
   -storage<br />
   -tabs
   
  The technical specifications and framework that this project depends on are (c) 2018 IAB Technology Laboratory.
  This content is used under the terms of the MIT License.<br /> 
  Source: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework
