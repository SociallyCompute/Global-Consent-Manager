 # Global Consent Cookie Sandbox

 This public repository is used to publish a Firefox web extension.
 
 This extension creates consent cookies to streamline the user's consent experience while on GDPR-regulated websites.<br />
 The code is not a finished product.
 
 ## How to install this web extension
 
 1. Download this repository to a location of your choice.
 2. Install Web-Ext from Mozilla's Github Repository here: https://github.com/mozilla/web-ext
 
 ### Installation: npm
 
 3. Install Global-Consent-Cookie-Sandbox in its directory:
 ```
 npm install
 ```
 4. After the installation, you can run the program with the following command:
 ```
 npm start
 ```
 This will also launch Web-Ext.
 
 ## How to use this Web Extension
 
 To preload all possible cookies that are available. Click the "PRELOAD COOKIES" button.<br /> 
 Any website that this web extension supports should retain its dialog when loaded, for now.
 
 ### Explanation of Features
 
 "LOG ALL COOKIES" will send information of all of your cookies to your browser log (ctrl+shift+J).
 
 "LOG COOKIES (CD)" will send names and values of your cookies in the current directory to your browser log.
 
 "CHECK GVCC" will list only consent cookies on listed domains.
 
 "PRELOAD COOKIES" will load required cookies for certain domains.
 
 "SNAPSHOT CHANGES" will take a "snapshot" of modified cookies.
 
 ## Licensing and Copyright
 
 All source code copyright is retained by the contributors. All contriubtions and source code are licensed under the MIT license. 
 
 Copyright (c) 2018 Global-Consent-Cookie-Sandbox Contributors

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 ### Contributions
  
  Javascript WebExtension APIs used for the project are (c) Mozilla MDN.<br />
  This content is dedicated to the Public Domain.  http://creativecommons.org/publicdomain/zero/1.0/<br />
  Source: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API<br /> 
  WebExtension API packages currently used:<br />
   -cookies<br />
   -tabs<br />
   -browsingData
